import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "About SV Lots";

export default function Image() {
  return pageOgImage({
    eyebrow: "About",
    title: "A dedicated real estate platform for Tumkur",
  });
}
