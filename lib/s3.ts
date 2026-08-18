import "server-only";

import { createDecipheriv } from "node:crypto";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * Server-only S3 access for project imagery.
 *
 * The bucket is PRIVATE: the `imageUrl` values the API returns are bare S3 URLs
 * that answer 403 to anonymous requests. The Angular app worked around this by
 * pulling AWS credentials into the BROWSER, decrypting them with an AES key and
 * IV hardcoded in the bundle, and calling s3.getObject client-side — which made
 * live credentials readable by anyone who opened devtools.
 *
 * Credential resolution here, in order of preference:
 *   1. AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY environment variables.
 *   2. The legacy encrypted-credential endpoints, decrypted SERVER-SIDE only.
 *
 * Path 2 exists so the site works today without a backend change. It is not a
 * long-term answer: the legacy key and IV are already public, having shipped in
 * every Angular bundle. ROTATE THE KEYS, set the env vars, then delete
 * `fetchLegacyCredentials` and this comment.
 */

const REGION = process.env.AWS_REGION ?? "ap-south-1";
export const S3_BUCKET = process.env.S3_BUCKET ?? "spropertydetails";

const API_BASE = process.env.SVLOTS_API_BASE ?? "https://loginapi.svlots.com";
const LEGACY_KEY = process.env.LEGACY_S3_CRED_KEY ?? "";
const LEGACY_IV = process.env.LEGACY_S3_CRED_IV ?? "";

type Credentials = { accessKeyId: string; secretAccessKey: string };

/** AES-128-CBC requires exactly 16 bytes for both the key and the IV. */
const AES_128_BYTES = 16;

/**
 * Validates the configured key and IV before use.
 *
 * Without this, a malformed value surfaces as `ERR_CRYPTO_INVALID_IV` from deep
 * inside node:crypto, which says nothing about which environment variable is
 * wrong. A stray missing newline in .env.local once concatenated the IV with the
 * following assignment, producing a 77-byte "IV" and exactly that opaque error.
 */
function assertAesLength(label: string, value: string): void {
  const bytes = Buffer.byteLength(value, "utf8");
  if (bytes !== AES_128_BYTES) {
    throw new Error(
      `${label} must be exactly ${AES_128_BYTES} bytes for AES-128-CBC, but is ${bytes}. ` +
        `Check .env.local for a missing newline — a value that runs into the next ` +
        `assignment produces exactly this. Received ${bytes} bytes.`,
    );
  }
}

/** AES-128-CBC, matching the scheme the Angular client used. */
function decrypt(base64: string, key: string, iv: string): string {
  assertAesLength("LEGACY_S3_CRED_KEY", key);
  assertAesLength("LEGACY_S3_CRED_IV", iv);

  const decipher = createDecipheriv(
    "aes-128-cbc",
    Buffer.from(key, "utf8"),
    Buffer.from(iv, "utf8"),
  );
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(base64, "base64")),
    decipher.final(),
  ]).toString("utf8");

  if (!plaintext) {
    throw new Error(
      "Decryption produced an empty value. The legacy key/IV may no longer match " +
        "what the API is using.",
    );
  }
  return plaintext;
}

async function fetchLegacyCredentials(): Promise<Credentials> {
  if (!LEGACY_KEY || !LEGACY_IV) {
    throw new Error(
      "No S3 credentials. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY, " +
        "or LEGACY_S3_CRED_KEY and LEGACY_S3_CRED_IV for the legacy path.",
    );
  }

  const [accessRes, secretRes] = await Promise.all([
    fetch(`${API_BASE}/GetAmazons3CredentialsS3AccessKey`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${API_BASE}/GetAmazons3CredentialsS3SecretKey`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!accessRes.ok || !secretRes.ok) {
    throw new Error("Legacy credential endpoints did not return 200");
  }

  const accessKeyId = decrypt((await accessRes.text()).trim(), LEGACY_KEY, LEGACY_IV);
  const secretAccessKey = decrypt((await secretRes.text()).trim(), LEGACY_KEY, LEGACY_IV);

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Legacy credentials decrypted to an empty value");
  }
  return { accessKeyId, secretAccessKey };
}

let clientPromise: Promise<S3Client> | null = null;

function createClient(): Promise<S3Client> {
  const envAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const envSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (envAccessKeyId && envSecretAccessKey) {
    return Promise.resolve(
      new S3Client({
        region: REGION,
        credentials: {
          accessKeyId: envAccessKeyId,
          secretAccessKey: envSecretAccessKey,
        },
      }),
    );
  }

  return fetchLegacyCredentials().then(
    (credentials) => new S3Client({ region: REGION, credentials }),
  );
}

function getClient(): Promise<S3Client> {
  if (!clientPromise) {
    clientPromise = createClient().catch((error) => {
      // Don't cache a failed init — the next request should retry.
      clientPromise = null;
      throw error;
    });
  }
  return clientPromise;
}

export type S3Object = {
  body: ReadableStream<Uint8Array>;
  contentType: string;
  contentLength?: number;
  etag?: string;
};

export async function getS3Object(key: string): Promise<S3Object | null> {
  const client = await getClient();

  const result = await client.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }));
  if (!result.Body) return null;

  return {
    body: result.Body.transformToWebStream(),
    contentType: result.ContentType ?? guessContentType(key),
    contentLength: result.ContentLength,
    etag: result.ETag,
  };
}

/** The bucket stores mixed-case extensions like ".PNG" and ".jpeg". */
function guessContentType(key: string): string {
  const extension = key.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "avif":
      return "image/avif";
    case "pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

/* ── Upload ─────────────────────────────────────────────────────────────────
   The Angular uploader used `Key: file.name`, so two uploads called plot.jpg
   silently overwrote each other, and it validated neither type nor size.
   ───────────────────────────────────────────────────────────────────────── */

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const MAX_UPLOAD_BYTES = 6 * 1024 * 1024; // 6 MB

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type UploadResult =
  | { ok: true; key: string; url: string }
  | { ok: false; reason: "type" | "size" | "failed" };

/** Content-hashed key: identical bytes de-duplicate, different bytes never collide. */
export async function uploadProjectImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return { ok: false, reason: "type" };
  }
  if (file.size > MAX_UPLOAD_BYTES || file.size === 0) {
    return { ok: false, reason: "size" };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hash = Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Flat key (no slashes) so the /api/media/[...key] round-trip stays unambiguous.
  const key = `project-${hash}.${EXTENSION_BY_TYPE[file.type]}`;

  try {
    const client = await getClient();
    await client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: bytes,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (error) {
    console.error("S3 upload failed", error);
    return { ok: false, reason: "failed" };
  }

  return {
    ok: true,
    key,
    // Stored on the record for parity with the existing data, though the site
    // renders through /api/media because the bucket is private.
    url: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}`,
  };
}
