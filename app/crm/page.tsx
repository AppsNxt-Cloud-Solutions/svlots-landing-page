import type { Metadata } from "next";
import { Automations } from "@/components/crm/automations";
import { ChaosScene } from "@/components/crm/chaos-scene";
import { Channels } from "@/components/crm/channels";
import {
  CrmClosing,
  Faq,
  Pricing,
  Steps,
  TalkToUs,
  Trust,
} from "@/components/crm/closing-sections";
import { CrmHero } from "@/components/crm/crm-hero";
import { Developers } from "@/components/crm/developers";
import { InventoryShowcase } from "@/components/crm/inventory-showcase";
import { Journey } from "@/components/crm/journey";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SoftwareApplicationJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

const description = `${site.crm.name} is the CRM for Indian real-estate consultants: leads from ads and portals, WhatsApp, SMS and calls, site visits, inventory and bookings in one workspace. Free during early access.`;

export const metadata: Metadata = {
  title: `${site.crm.name} — CRM for real-estate consultants`,
  description,
  alternates: { canonical: "/crm" },
  openGraph: { description },
  keywords: [
    "real estate CRM India",
    "CRM for real estate consultants",
    "channel partner CRM",
    "WhatsApp CRM real estate",
    site.crm.name,
  ],
};

/**
 * The Bhoomi CRM story, in four acts: the chaos of scattered enquiries, one
 * buyer's journey through the product, the workspace around it, and how to
 * start. Copy lives in content/crm.ts.
 */
export default function CrmPage() {
  return (
    <>
      <ScrollProgress />
      <SoftwareApplicationJsonLd description={description} />
      <CrmHero />
      <ChaosScene />
      <Journey />
      <Channels />
      <InventoryShowcase />
      <Automations />
      <Developers />
      <Trust />
      <Steps />
      <Pricing />
      <Faq />
      <TalkToUs />
      <CrmClosing />
    </>
  );
}
