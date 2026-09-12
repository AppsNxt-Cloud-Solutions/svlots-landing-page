import { ogImageSize, pageOgImage } from "@/components/seo/og-image";
import { site } from "@/lib/site";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "Contact SV Lots";

export default function Image() {
  return pageOgImage({
    eyebrow: "Contact",
    title: "Talk to SV Lots",
    footerRight: site.phone.display,
  });
}
