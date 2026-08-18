import type { MetadataRoute } from "next";
import { articles } from "@/content/insights";
import { getProjects } from "@/lib/api/svlots";
import { site } from "@/lib/site";

/** The Angular site had no sitemap at all. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  // Typed before the map, otherwise the literal changeFrequency values widen
  // to `string` and no longer satisfy MetadataRoute.Sitemap.
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${base}/about`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/property-models`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}/gallery`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/insights`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
      {
        url: `${base}/tools/area-calculator`,
        changeFrequency: "yearly",
        priority: 0.7,
      },
      { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const insightRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Projects come from the live catalogue, so new listings appear automatically.
  const projects = await getProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // /login and /admin/* are deliberately absent — both are noindex.
  return [...staticRoutes, ...insightRoutes, ...projectRoutes];
}
