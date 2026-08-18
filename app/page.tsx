import { CtaBand } from "@/components/sections/cta-band";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { ModelsTeaser } from "@/components/sections/models-teaser";
import { Pillars } from "@/components/sections/pillars";
import { ServicesStrip } from "@/components/sections/services-strip";
import { Stats } from "@/components/sections/stats";

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
