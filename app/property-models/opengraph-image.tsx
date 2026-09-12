import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "SV Lots property models";

export default function Image() {
  return pageOgImage({
    eyebrow: "Property Models",
    title: "Revenue, Layout, Sites, Building and Rental",
  });
}
