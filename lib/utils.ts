import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Ensure an outbound link has a protocol. The API stores links like
 *  "prestigegroup.isite.me" with no scheme. */
export function absoluteUrl(url: string): string {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/** "WhiteField , Bengaluru" → "Whitefield, Bengaluru" */
export function tidyText(value: string): string {
  return value.replace(/\s+,/g, ",").replace(/\s+/g, " ").trim();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
