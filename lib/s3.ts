import "server-only";

import { createDecipheriv } from "node:crypto";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

/** AES-128-CBC, matching the scheme the Angular client used. */
function decrypt(base64: string, key: string, iv: string): string {
  const decipher = createDecipheriv(
    "aes-128-cbc",
    Buffer.from(key, "utf8"),
    Buffer.from(iv, "utf8"),
  );
  return Buffer.concat([
    decipher.update(Buffer.from(base64, "base64")),
    decipher.final(),
  ]).toString("utf8");
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
