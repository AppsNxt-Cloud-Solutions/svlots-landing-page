import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "SV Lots land area calculator";

export default function Image() {
  return pageOgImage({
    eyebrow: "Free Tool",
    title: "Measure an irregular plot from side lengths",
  });
}
