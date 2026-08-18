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
