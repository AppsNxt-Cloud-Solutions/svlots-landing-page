import { ImageResponse } from "next/og";
import { getArticle } from "@/content/insights";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SV Lots insight";

/** Next 16: `params` is a Promise in image-generating functions. */
export default async function Image(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #0b1118 0%, #1f2937 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: 56, height: 4, background: "#bd9666" }} />
        <span
          style={{
            color: "#d0ad82",
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          {article?.category ?? "Insights"}
        </span>
      </div>

      <span
        style={{
          color: "#ffffff",
          fontSize: article && article.title.length > 60 ? 58 : 70,
          lineHeight: 1.1,
          display: "flex",
        }}
      >
        {article?.title ?? "SV Lots Insights"}
      </span>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#9ca3af",
          fontSize: 22,
        }}
      >
        <span>{site.legalName}</span>
        <span>{article ? `${article.readingMinutes} min read` : "svlots.com"}</span>
      </div>
    </div>,
    size,
  );
}
