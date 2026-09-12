import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Shared layout for per-route share cards. Before this, every marketing page
 * except the homepage and article pages fell back to the same static root
 * image on WhatsApp/LinkedIn/Slack — a shared card gives each page its own
 * headline while keeping one visual language.
 */
export const ogImageSize = { width: 1200, height: 630 };

export function pageOgImage({
  eyebrow,
  title,
  footerRight,
}: {
  eyebrow: string;
  title: string;
  footerRight?: string;
}) {
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
          {eyebrow}
        </span>
      </div>

      <span
        style={{
          color: "#ffffff",
          fontSize: title.length > 44 ? 58 : 70,
          lineHeight: 1.1,
          display: "flex",
        }}
      >
        {title}
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
        <span>{footerRight ?? "svlots.com"}</span>
      </div>
    </div>,
    ogImageSize,
  );
}
