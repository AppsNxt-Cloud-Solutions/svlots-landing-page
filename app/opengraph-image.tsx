import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default share card. The Angular site had no OG image, so links pasted into
 * WhatsApp, LinkedIn or Slack rendered as bare text — which matters when the
 * marketing team shares the site.
 */
export default async function Image() {
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
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          {site.legalName}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ color: "#ffffff", fontSize: 86, lineHeight: 1.05 }}>
          Elevating the value
        </span>
        <span style={{ fontSize: 86, lineHeight: 1.05, color: "#bd9666" }}>
          of your property
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          color: "#9ca3af",
          fontSize: 24,
        }}
      >
        <span>Tumkur, Karnataka</span>
        <span>svlots.com</span>
      </div>
    </div>,
    size,
  );
}
