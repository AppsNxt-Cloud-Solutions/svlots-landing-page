import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import landDusk from "@/assets/images/hero/land-dusk.webp";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";

/**
 * Phase 1 verification page — exercises every token, primitive and motion
 * component so regressions are visible. Replaced by the real home page in
 * Phase 3.
 */
export default function Home() {
  return (
    <>
      <section className="relative grain isolate flex min-h-[88svh] items-end overflow-hidden bg-ink-950 pt-18">
        <Image
          src={landDusk}
          alt=""
          placeholder="blur"
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/15"
        />
        <Container className="pb-20 md:pb-28">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.24em] text-gold-300 uppercase">
              SV Lots India Pvt Ltd
            </span>
          </Reveal>
          <TextMask
            text="Elevating the value of your property"
            as="h1"
            accentWords={[4]}
            className="mt-6 max-w-4xl text-6xl text-white"
          />
          <Reveal delay={0.5} className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/projects" size="lg">
              View Projects
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="onDark">
              Talk to us
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Design system"
            title="Tokens, motion and the UI kit are live"
            intro="Phase 1 output. The real home page, with its full scroll narrative, lands in Phase 3."
          />

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Secure Documentation", "Proper documentation for secure transactions"],
              ["Strategic Locations", "Strategic locations for high growth potential"],
              ["Easy Accessibility", "Ease of access and strong connectivity"],
              ["Sustainable Developments", "Environmentally sustainable developments"],
            ].map(([title, copy], i) => (
              <StaggerItem key={title}>
                <FeatureCard
                  index={i + 1}
                  title={title}
                  icon={<ShieldCheck className="size-5" strokeWidth={1.75} />}
                >
                  {copy}
                </FeatureCard>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-16 grid gap-8 border-t border-ink-200 pt-12 sm:grid-cols-3">
            {[
              { to: 30, suffix: "+", label: "Years of experience" },
              { to: 5, suffix: "", label: "Property models" },
              { to: 9, suffix: "", label: "Service lines" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl text-ink-900">
                  <Counter to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm tracking-wide text-ink-500 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
