import "server-only";

import { z } from "zod";
import { slugify, tidyText } from "@/lib/utils";

/**
 * Server-only client for the existing SV Lots API.
 *
 * Nothing in here may be imported by a Client Component. The Angular app called
 * this API straight from the browser; every call now happens on the server so
 * no endpoint, key or credential is exposed.
 */

const API_BASE = process.env.SVLOTS_API_BASE ?? "https://loginapi.svlots.com";

/** Cache tag so the admin "add project" action can invalidate the catalogue. */
export const PROJECTS_TAG = "projects";

/**
 * Shape observed from GET /api/SVLots/GetProjects. `imageUrl` is a bare S3 URL
 * that returns 403 to anonymous requests — the bucket is private — so it is
 * accepted but never used for rendering. Images are served through
 * /api/media/[key] instead, keyed on `fileName`.
 */
const apiProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  location: z.string().nullish(),
  type: z.string().nullish(),
  externalLink: z.string().nullish(),
  fileName: z.string().nullish(),
  imageUrl: z.string().nullish(),
});

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  location: string;
  type: string;
  externalLink: string | null;
  /** S3 object key, or null when the record has no image. */
  fileName: string | null;
};

function normalise(raw: z.infer<typeof apiProjectSchema>): Project {
  return {
    id: raw.id,
    slug: slugify(raw.title) || `project-${raw.id}`,
    title: tidyText(raw.title),
    description: tidyText(raw.description ?? ""),
    // The API returns values like "WhiteField , Bengaluru".
    location: tidyText(raw.location ?? ""),
    type: tidyText(raw.type ?? ""),
    externalLink: raw.externalLink?.trim() ? raw.externalLink.trim() : null,
    fileName: raw.fileName?.trim() ? raw.fileName.trim() : null,
  };
}

/**
 * Fetch the public project catalogue.
 *
 * Returns [] rather than throwing if the upstream is unavailable — a marketing
 * page should degrade to "no projects listed" rather than a 500.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE}/api/SVLots/GetProjects`, {
      next: { revalidate: 300, tags: [PROJECTS_TAG] },
    });

    if (!response.ok) {
      console.error(`GetProjects failed: HTTP ${response.status}`);
      return [];
    }

    const parsed = z.array(apiProjectSchema).safeParse(await response.json());
    if (!parsed.success) {
      console.error("GetProjects returned an unexpected shape", parsed.error.issues);
      return [];
    }

    return parsed.data.map(normalise);
  } catch (error) {
    console.error("GetProjects request threw", error);
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

/** Distinct filter values, derived from the catalogue itself. */
export function facetsOf(projects: Project[]) {
  const collect = (key: "location" | "type") =>
    [...new Set(projects.map((p) => p[key]).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b),
    );
  return { locations: collect("location"), types: collect("type") };
}

/* ───────────────────────────────────────────────────────────────────────────
   Lead submission
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * POST /api/SVLots/AddServiceRequest
 *
 * Verified to exist upstream (responds 405 with `allow: POST` to a GET).
 *
 * NOTE on the contact form: the Angular app posted general enquiries to
 * /api/SVLots/SubmitContactForm at `https://localhost:7192`. That endpoint
 * returns **404 on production** — it was never deployed, so the contact form has
 * never worked outside a developer's machine. General enquiries therefore go
 * through this endpoint too, with `message` included in the payload. If the
 * backend ignores unknown fields the message is preserved by the email fallback
 * in lib/leads.ts.
 *
 * Success is judged on HTTP status. The Angular code string-matched the response
 * body against "Service request added successfully.", so any wording change
 * upstream turned a success into an error modal.
 */
export async function submitServiceRequest(input: {
  name: string;
  email: string;
  phone: string;
  city?: string;
  serviceHeading: string;
  message?: string;
}): Promise<{ ok: boolean; status: number; body?: string }> {
  const payload = {
    firstName: input.name,
    email: input.email,
    phone: input.phone,
    city: input.city ?? "",
    serviceHeading: input.serviceHeading,
    message: input.message ?? "",
  };

  try {
    const response = await fetch(`${API_BASE}/api/SVLots/AddServiceRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = await response.text().catch(() => undefined);
    return { ok: response.ok, status: response.status, body };
  } catch (error) {
    console.error("AddServiceRequest request threw", error);
    return { ok: false, status: 0 };
  }
}

/* ───────────────────────────────────────────────────────────────────────────
   Auth
   ─────────────────────────────────────────────────────────────────────────── */

const PROJECT_NAME = "SVLots";

export type LoginResult =
  | { ok: true; email: string; name?: string; role?: string }
  | {
      ok: false;
      reason: "credentials" | "not-authorised" | "unavailable";
      detail?: string;
    };

/**
 * POST /api/Auth/login
 *
 * The shared auth service is multi-tenant, so the response is checked to confirm
 * this account is entitled to the SVLots project.
 *
 * The Angular code declared this response TWICE with different fields —
 * AuthService's copy omitted `projectNames`, which is exactly the field
 * LoginComponent branched on. One schema here.
 *
 * Verified: invalid credentials return HTTP 401 {"message":"Invalid email or
 * password."}. The success shape is taken from the Angular implementation, which
 * worked in production and required projectNames to include "SVLots"; we keep
 * that requirement and fail closed.
 */
const loginResponseSchema = z.object({
  message: z.string().nullish(),
  email: z.string().nullish(),
  name: z.string().nullish(),
  role: z.string().nullish(),
  status: z.number().nullish(),
  projectName: z.string().nullish(),
  projectNames: z.array(z.string()).nullish(),
});

export async function login(email: string, password: string): Promise<LoginResult> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, projectName: PROJECT_NAME }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Login request threw", error);
    return { ok: false, reason: "unavailable" };
  }

  if (response.status === 401 || response.status === 403) {
    return { ok: false, reason: "credentials" };
  }
  if (!response.ok) {
    console.error(`Login failed: HTTP ${response.status}`);
    return { ok: false, reason: "unavailable" };
  }

  const parsed = loginResponseSchema.safeParse(await response.json().catch(() => null));
  if (!parsed.success) {
    console.error("Login returned an unexpected shape", parsed.error.issues);
    return { ok: false, reason: "unavailable" };
  }

  const data = parsed.data;

  // The old client also string-matched message === "Login successful."; an email
  // on a 2xx is the more durable signal, so treat a failure message as failure
  // but do not require exact success wording.
  if (/invalid|failed|incorrect/i.test(data.message ?? "") || !data.email) {
    return { ok: false, reason: "credentials" };
  }

  const entitled =
    data.projectNames?.includes(PROJECT_NAME) || data.projectName === PROJECT_NAME;

  if (!entitled) {
    // Log which keys came back (not their values) so a contract change is
    // diagnosable without putting account data in the logs.
    console.error("Login rejected: account not entitled to SVLots", {
      keys: Object.keys(data),
    });
    return { ok: false, reason: "not-authorised" };
  }

  return {
    ok: true,
    email: data.email,
    name: data.name ?? undefined,
    role: data.role ?? undefined,
  };
}

/* ───────────────────────────────────────────────────────────────────────────
   Admin: create project
   ─────────────────────────────────────────────────────────────────────────── */

export async function addProject(input: {
  title: string;
  description: string;
  location: string;
  type: string;
  externalLink: string;
  imageUrl: string;
  fileName: string;
}): Promise<{ ok: boolean; status: number; body?: string }> {
  try {
    const response = await fetch(`${API_BASE}/api/SVLots/AddProject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });
    const body = await response.text().catch(() => undefined);
    return { ok: response.ok, status: response.status, body };
  } catch (error) {
    console.error("AddProject request threw", error);
    return { ok: false, status: 0 };
  }
}
