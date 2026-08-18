import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Signed, httpOnly admin session.
 *
 * The Angular app kept `userEmail`, `userName` and — critically — `isAdmin` in
 * localStorage and trusted them verbatim, so a user could grant themselves admin
 * from the browser console. Nothing here is readable or writable by client JS.
 */

const COOKIE = "svlots_session";
const MAX_AGE_SECONDS = 60 * 60 * 8; // one working day

export type SessionPayload = {
  email: string;
  name?: string;
  role?: string;
};

class MissingSecretError extends Error {}

let warnedAboutSecret = false;

function key(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    // Fail closed, but say so once — a silently-unverifiable session means
    // "sign-in never works" with nothing in the logs to explain why.
    if (!warnedAboutSecret) {
      warnedAboutSecret = true;
      console.error(
        "[session] SESSION_SECRET is missing or shorter than 16 characters, so no " +
          "session can be issued or verified and sign-in will always fail. " +
          "Generate one with: openssl rand -base64 32",
      );
    }
    throw new MissingSecretError("SESSION_SECRET missing or too short");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: SessionPayload): Promise<void> {
  // Throws if the secret is absent — the caller must not report a successful
  // sign-in when no session was actually issued.
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(key());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Reads and verifies the session. Returns null for missing, tampered or expired. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return verifySessionToken(token);
}

/** Shared with proxy.ts, which reads the cookie from the request. */
export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    if (typeof payload.email !== "string") return null;
    return {
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : undefined,
      role: typeof payload.role === "string" ? payload.role : undefined,
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export const SESSION_COOKIE_NAME = COOKIE;
