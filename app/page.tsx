import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { ModelsTeaser } from "@/components/sections/models-teaser";
import { Pillars } from "@/components/sections/pillars";
import { ServicesStrip } from "@/components/sections/services-strip";
import { Stats } from "@/components/sections/stats";

// The only marketing route with no metadata export of its own — it inherited
// the root layout's `title.default` (which happens to render correctly,
// since the layout applies its `%s · SV Lots` template only to a page-level
// title override, never to `default`) but had no page-specific description,
// explicit canonical, or OpenGraph copy distinct from the sitewide fallback.
const description =
  "Open plots, layouts and land services in Tumkur and Bengaluru, Karnataka — surveying, valuation and property solutions from SV Lots.";

export const metadata: Metadata = {
  description,
  alternates: { canonical: "/" },
  openGraph: { description },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Pillars />
      <Stats />
      <FeaturedProject />
      <ModelsTeaser />
      <ServicesStrip />
      <CtaBand />
    </>
  );
}
