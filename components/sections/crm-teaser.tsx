import { ArrowRight } from "lucide-react";
import pipeline from "@/assets/images/crm/pipeline.webp";
import { ScreenFrame } from "@/components/crm/screen-frame";
import { Reveal } from "@/components/motion/reveal";
import { ScrollTilt } from "@/components/motion/scroll-tilt";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { crmSignupUrl, homeTeaser } from "@/content/crm";

/** Home page band introducing Bhoomi CRM and pointing to /crm. */
export function CrmTeaser() {
  return (
    <section className="relative grain isolate overflow-hidden bg-ink-950 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -z-10 h-[30rem] w-[44rem] -translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow onDark>{homeTeaser.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-4xl text-white text-balance-tight">
              {homeTeaser.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
              {homeTeaser.body}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/crm" size="lg">
              Explore Bhoomi CRM
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={crmSignupUrl} external size="lg" variant="onDark">
              Start free
            </ButtonLink>
          </Reveal>
        </div>

        <ScrollTilt from={16}>
          <ScreenFrame
            src={pipeline}
            alt="The Bhoomi CRM leads board, with leads arranged by pipeline stage"
            path="/leads/board"
          />
        </ScrollTilt>
      </Container>
    </section>
  );
}
