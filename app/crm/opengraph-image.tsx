import { ogImageSize, pageOgImage } from "@/components/seo/og-image";
import { site } from "@/lib/site";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = `${site.crm.name} — CRM for real-estate consultants`;

export default function Image() {
  return pageOgImage({
    eyebrow: site.crm.name,
    title: "Never lose an enquiry again",
    footerRight: "Free during early access",
  });
}
