import { Check, Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import skylineNight from "@/assets/images/hero/skyline-night.webp";
import managingDirector from "@/assets/images/people/managing-director.webp";
import sustainability from "@/assets/images/sections/sustainability.webp";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { leadership, mission, story, strengths, vision } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SV Lots is a Tumkur-based real estate platform led by three decades of civil engineering experience — maximising property value through documentation, location, access and sustainability.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SV Lots"
        title="Built on engineering, not guesswork"
        accentWords={[2]}
        image={skylineNight}
        imageAlt=""
        intro="Three decades of civil engineering and property development behind every plot we take to market."
      />

      {/* Story + strengths */}
      <Section>
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-4xl text-balance-tight">{story.title}</h2>
            </Reveal>
            {story.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 20)} delay={0.1 + i * 0.1}>
                <p className="mt-6 text-lg leading-relaxed text-ink-600">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left">
            <Card className="h-full p-8 md:p-10">
              <Eyebrow>{strengths.eyebrow}</Eyebrow>
              <h3 className="mt-5 text-2xl">{strengths.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-600">{strengths.intro}</p>
              <ul className="mt-8 space-y-3.5">
                {strengths.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.95rem] text-ink-700">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold-600"
                      strokeWidth={2.5}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Leadership */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people behind SV Lots"
            intro="Sixty years of combined engineering experience directing how these properties are assessed, documented and developed."
          />

          <div className="mt-16 space-y-16 md:space-y-20">
            {leadership.map((leader, index) => (
              <Reveal key={leader.name}>
                <article
                  className={`grid gap-8 md:gap-12 ${
                    leader.hasPortrait
                      ? "lg:grid-cols-[320px_1fr]"
                      : "lg:grid-cols-[320px_1fr]"
                  }`}
                >
                  {/* Portrait, or a typographic plate when none exists */}
                  <div className="relative">
                    {leader.hasPortrait ? (
                      <div className="relative aspect-4/5 overflow-hidden rounded-card bg-ink-100">
                        <Image
                          src={managingDirector}
                          alt={`${leader.name}, ${leader.role} of SV Lots`}
                          placeholder="blur"
                          sizes="(min-width: 1024px) 320px, 90vw"
                          className="size-full object-cover object-top saturate-[0.72] contrast-[1.04]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-gold-700/25 via-transparent to-transparent mix-blend-multiply"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-4/5 items-center justify-center rounded-card border border-ink-200 bg-ink-900">
                        <span
                          aria-hidden="true"
                          className="font-display text-6xl text-gold-500/70"
                        >
                          {leader.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-display text-xs tracking-[0.2em] text-ink-400">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-3xl">{leader.name}</h3>
                    <p className="mt-1.5 text-xs font-semibold tracking-[0.18em] text-gold-600 uppercase">
                      {leader.role}
                    </p>
                    <span aria-hidden="true" className="mt-5 block h-px w-12 rule-gold" />
                    {leader.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="mt-4 leading-relaxed text-ink-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {leader.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="rounded-pill border border-ink-200 bg-surface px-3 py-1.5 text-xs text-ink-600"
                        >
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Vision & Mission — typographic, replacing the two clichéd stock graphics */}
      <Section tone="dark">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-card border border-white/10 p-8 md:p-10">
              <Image
                src={sustainability}
                alt=""
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="absolute inset-0 -z-10 size-full object-cover opacity-15"
              />
              <Quote aria-hidden="true" className="size-8 text-gold-500" />
              <h2 className="mt-6 text-3xl text-white">{vision.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-300">{vision.body}</p>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="h-full rounded-card border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <h2 className="text-3xl text-white">{mission.title}</h2>
              <p className="mt-5 leading-relaxed text-ink-300">{mission.intro}</p>
              <Stagger className="mt-7 space-y-4">
                {mission.commitments.map((commitment, i) => (
                  <StaggerItem key={commitment.slice(0, 20)} y={12}>
                    <div className="flex gap-4">
                      <span className="font-display text-sm text-gold-500 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[0.95rem] leading-relaxed text-ink-300">
                        {commitment}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-7 border-t border-white/10 pt-6 text-sm leading-relaxed text-ink-400">
                {mission.outro}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" size="sm">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl text-balance-tight">Talk to the team directly</h2>
            <p className="mt-3 text-ink-600">
              Tell us what you are looking for and we will point you at the right land.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Contact us
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="secondary">
              Our services
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
