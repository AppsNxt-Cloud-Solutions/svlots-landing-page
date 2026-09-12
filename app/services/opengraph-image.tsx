import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "SV Lots services";

export default function Image() {
  return pageOgImage({
    eyebrow: "Services",
    title: "Surveying, valuation and property services",
  });
}
