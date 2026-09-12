import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "SV Lots gallery";

export default function Image() {
  return pageOgImage({ eyebrow: "Gallery", title: "Prestige Raintree Park & Euphoria" });
}
