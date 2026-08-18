import Image from "next/image";
import documentation from "@/assets/images/sections/documentation.webp";
import surveyPlans from "@/assets/images/sections/survey-plans.webp";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { intro } from "@/content/home";

export function Intro() {
  return (
    <Section id="who-we-are" tone="light">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Offset image pair */}
        <Reveal direction="right" className="relative order-2 lg:order-1">
          <div className="relative aspect-4/5 overflow-hidden rounded-card">
            <Parallax distance={7} className="absolute -inset-y-[9%] inset-x-0">
              <Image
                src={surveyPlans}
                alt="Site plans and survey drawings on a desk"
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="size-full object-cover"
              />
            </Parallax>
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-2/5 overflow-hidden rounded-card border-4 border-surface shadow-lift sm:block">
            <Image
              src={documentation}
              alt="Bound property documents tied with a ribbon"
              placeholder="blur"
              sizes="20vw"
              className="aspect-square size-full object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-4xl text-balance-tight">{intro.title}</h2>
          </Reveal>
          {intro.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={0.1 + i * 0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-9">
            <ButtonLink href="/about" variant="secondary">
              More about SV Lots
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
