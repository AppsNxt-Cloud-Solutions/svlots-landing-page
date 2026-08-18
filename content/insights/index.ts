import farmland from "@/assets/images/sections/farmland.webp";
import skyline from "@/assets/images/hero/skyline-night.webp";
import growth from "@/assets/images/sections/growth.webp";
import type { StaticImageData } from "next/image";

/**
 * Insights index.
 *
 * Article bodies live as MDX in this folder so the marketing team can author in
 * markdown rather than editing TypeScript. Each .mdx file exports `meta`; this
 * module re-exports them in display order and resolves the image key.
 *
 * To add an article: create `content/insights/<slug>.mdx` exporting `meta`, then
 * add one line to `articles` below.
 *
 * ⚠️  EDITORIAL NOTE: the Angular blog carried three posts that could not be
 * ported as-is:
 *   - "Discover the Best Open Plots in Tumkur" was headed Tumkur but its body
 *     described **Dholera, Gujarat** ("the first Mega Smart City") — unedited
 *     copy-paste from an unrelated article.
 *   - Two near-identical "Navigating the Surge" posts existed, one of them still
 *     branded **"T Homes"** rather than SV Lots.
 * The two articles here keep the original topics but were rewritten to be
 * accurate and non-duplicative. They avoid specific price or appreciation
 * claims. Have the client review the market commentary before launch.
 */

import { meta as hyderabadAndRera } from "./hyderabad-and-rera.mdx";
import { meta as openPlotsInTumkur } from "./open-plots-in-tumkur.mdx";

const images: Record<string, StaticImageData> = {
  farmland,
  skyline,
  growth,
};

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  category: string;
  image: string;
};

/** Newest first. */
const raw: ArticleMeta[] = [openPlotsInTumkur, hyderabadAndRera];

export const articles = raw.map((article) => ({
  ...article,
  cover: images[article.image] ?? farmland,
}));

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const articleSlugs = articles.map((article) => article.slug);

export function formatArticleDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
