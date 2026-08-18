import { getProjects } from "@/lib/api/svlots";
import { getS3Object } from "@/lib/s3";

/**
 * Streams a project image out of the private S3 bucket.
 *
 * This exists because the bucket is private and the API's `imageUrl` values 403
 * anonymously. Credentials stay on the server; the browser only ever sees
 * /api/media/<key>, which next/image can optimise like any local path.
 *
 * SECURITY: the requested key is checked against the set of `fileName` values in
 * the project catalogue. Without that check this route would be an open read
 * proxy to every object in the bucket.
 */

// Long-lived at the CDN: these objects are immutable in practice, and the
// allowlist is revalidated with the catalogue.
const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/media/[...key]">,
) {
  const { key } = await context.params;
  const objectKey = decodeURIComponent(Array.isArray(key) ? key.join("/") : key);

  const projects = await getProjects();
  const allowed = new Set(
    projects.map((project) => project.fileName).filter((name): name is string => !!name),
  );

  if (!allowed.has(objectKey)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const object = await getS3Object(objectKey);
    if (!object) return new Response("Not found", { status: 404 });

    return new Response(object.body, {
      headers: {
        "Content-Type": object.contentType,
        "Cache-Control": CACHE_CONTROL,
        ...(object.contentLength
          ? { "Content-Length": String(object.contentLength) }
          : {}),
        ...(object.etag ? { ETag: object.etag } : {}),
      },
    });
  } catch (error) {
    // Distinguish "we are misconfigured" from "the object is unavailable", so the
    // log says which one without needing to read a crypto stack trace.
    const message = error instanceof Error ? error.message : String(error);
    const isConfig =
      message.includes("must be exactly") ||
      message.includes("No S3 credentials") ||
      message.includes("no longer match");

    console.error(
      isConfig
        ? `[api/media] CONFIGURATION ERROR — cannot decrypt S3 credentials: ${message}`
        : `[api/media] Failed to stream "${objectKey}": ${message}`,
    );
    return new Response(isConfig ? "Media not configured" : "Upstream error", {
      status: isConfig ? 500 : 502,
    });
  }
}
