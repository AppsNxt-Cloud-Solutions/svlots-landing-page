import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "Projects represented by SV Lots";

export default function Image() {
  return pageOgImage({ eyebrow: "Projects", title: "Property we represent" });
}
