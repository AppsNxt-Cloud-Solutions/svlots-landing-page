import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "SV Lots insights";

export default function Image() {
  return pageOgImage({ eyebrow: "Insights", title: "Notes on land, value and Tumkur" });
}
