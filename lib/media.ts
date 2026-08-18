/**
 * Builds the public URL for a project image. Safe to import from Client
 * Components — it only formats a path, it does not touch S3.
 *
 * Keys contain spaces (e.g. "euphoria image.PNG"), so they must be encoded.
 */
export function mediaUrl(fileName: string): string {
  return `/api/media/${encodeURIComponent(fileName)}`;
}
