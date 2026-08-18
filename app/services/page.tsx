import {
  Building2,
  ClipboardCheck,
  Compass,
  FileSearch,
  HardHat,
  Layers,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import surveyPlans from "@/assets/images/sections/survey-plans.webp";
import { PageHero } from "@/components/layout/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { type Service, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Precision land surveying, property valuation, infrastructure consultancy, supervision, technical Vastu, smart technology and general insurance — from SV Lots in Tumkur, Karnataka.",
};

const icons: Record<Service["icon"], ReactNode> = {
  survey: <Ruler className="size-5" strokeWidth={1.6} />,
  infrastructure: <Layers className="size-5" strokeWidth={1.6} />,
  supervision: <HardHat className="size-5" strokeWidth={1.6} />,
  valuation: <FileSearch className="size-5" strokeWidth={1.6} />,
  vastu: <Compass className="size-5" strokeWidth={1.6} />,
  solutions: <Building2 className="size-5" strokeWidth={1.6} />,
  technology: <Sparkles className="size-5" strokeWidth={1.6} />,
  consultancy: <ClipboardCheck className="size-5" strokeWidth={1.6} />,
  insurance: <ShieldCheck className="size-5" strokeWidth={1.6} />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Nine service lines, one technical standard"
        accentWords={[1]}
        image={surveyPlans}
        imageAlt=""
        intro="Survey, valuation, infrastructure and supervision under one roof — the technical work that decides whether a property holds its value."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Choose a service to request a call back"
            intro="Each enquiry reaches the team that handles that discipline, with the service already noted."
          />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <StaggerItem key={service.slug} className="h-full">
                <Card interactive className="group flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                      {icons[service.icon]}
                    </span>
                    <span className="font-display text-2xl leading-none text-ink-200 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl">{service.title}</h3>
                  <span aria-hidden="true" className="mt-4 block h-px w-10 rule-gold" />
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
                    {service.detail ?? service.summary}
                  </p>

                  <div className="mt-6 flex-1" />
                  <ButtonLink
                    href={`/contact?service=${service.slug}`}
                    variant="ghost"
                    size="sm"
                    className="self-start px-0 text-gold-700"
                  >
                    Request a call back →
                  </ButtonLink>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="dark" size="sm">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl text-white text-balance-tight">
              Not sure which service you need?
            </h2>
            <p className="mt-3 text-ink-300">
              Describe the property and we will tell you what is actually required.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Talk to us
            </ButtonLink>
            <ButtonLink href="/tools/area-calculator" size="lg" variant="onDark">
              Try the area calculator
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
