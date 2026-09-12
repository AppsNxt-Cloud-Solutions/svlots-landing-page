import { getArticle } from "@/content/insights";
import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "SV Lots insight";

/** Next 16: `params` is a Promise in image-generating functions. */
export default async function Image(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);

  return pageOgImage({
    eyebrow: article?.category ?? "Insights",
    title: article?.title ?? "SV Lots Insights",
    footerRight: article ? `${article.readingMinutes} min read` : undefined,
  });
}
