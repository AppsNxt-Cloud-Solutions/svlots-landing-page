import { ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import farmland from "@/assets/images/sections/farmland.webp";
import landNandihalli from "@/assets/images/flyers/land-nandihalli.webp";
import layoutGubbi from "@/assets/images/flyers/layout-gubbi.webp";
import layoutResidential from "@/assets/images/flyers/layout-residential.webp";
import retailTumkur from "@/assets/images/flyers/retail-tumkur.webp";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { flyerSteps, propertyModels } from "@/content/models";

export const metadata: Metadata = {
  title: "Property Models",
  description:
    "Five property models from SV Lots — Revenue, Layout, Rental, Sites and Building. Capture a property's details, add media, and generate a professional flyer you can download and share.",
};

const exampleFlyers = [
  { src: layoutGubbi, label: "Residential layout, Gubbi" },
  { src: retailTumkur, label: "Retail towers, BH Road, Tumkur" },
  { src: landNandihalli, label: "Agricultural land, Nandihalli village" },
  { src: layoutResidential, label: "Residential layout" },
];

export default function PropertyModelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Property models"
        title="Turn a property into a flyer in minutes"
        accentWords={[5]}
        image={farmland}
        imageAlt=""
        intro="Five models covering revenue land through to income-producing buildings. Fill in the form, add your photographs, and the system generates a professional flyer ready to print or share."
      />

      {/* How it works */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Four steps, no design work"
            intro="The same flow across every live model — the tool handles the layout so you only supply the facts and the photographs."
          />

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-card border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
            {flyerSteps.map((step, index) => (
              <StaggerItem key={step.title} className="bg-surface">
                <div className="h-full p-7">
                  <p className="font-display text-3xl text-gold-500 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* The five models */}
      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="The models"
            title="One model per kind of property"
            intro="Three are live today. Sites and Building are in development."
          />

          <div className="mt-14 space-y-6">
            {propertyModels.map((model, index) => (
              <Reveal key={model.slug}>
                <Card
                  interactive={model.status === "live"}
                  className={model.status === "coming-soon" ? "opacity-85" : undefined}
                >
                  <div className="grid gap-8 p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:p-9">
                    <p className="font-display text-4xl text-ink-200 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl">{model.name}</h3>
                        {model.flyerName && (
                          <span className="rounded-pill bg-gold-100 px-3 py-1 text-2xs font-semibold tracking-[0.1em] text-gold-700 uppercase">
                            {model.flyerName}
                          </span>
                        )}
                        {model.status === "coming-soon" && (
                          <span className="inline-flex items-center gap-1.5 rounded-pill bg-ink-100 px-3 py-1 text-2xs font-semibold tracking-[0.1em] text-ink-500 uppercase">
                            <Lock aria-hidden="true" className="size-3" />
                            In development
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs font-semibold tracking-[0.14em] text-gold-600 uppercase">
                        {model.tagline}
                      </p>
                      <p className="mt-4 max-w-2xl leading-relaxed text-ink-600">
                        {model.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {model.captures.map((item) => (
                          <li
                            key={item}
                            className="rounded-pill border border-ink-200 bg-surface px-3 py-1 text-xs text-ink-600"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:justify-self-end">
                      {model.href ? (
                        <ButtonLink href={model.href} external variant="secondary">
                          Get access
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </ButtonLink>
                      ) : (
                        <span className="text-sm text-ink-400">Coming soon</span>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Example output */}
      <Section tone="dark">
        <Container>
          <Reveal>
            <Eyebrow onDark>Example output</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-4xl text-white text-balance-tight">
              Flyers generated from real listings
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-300">
              Each of these was produced from a single form submission — no designer
              involved.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {exampleFlyers.map((flyer) => (
              <StaggerItem key={flyer.label}>
                <figure>
                  <div className="overflow-hidden rounded-card border border-white/10 bg-white/5">
                    <Image
                      src={flyer.src}
                      alt={`Generated property flyer — ${flyer.label}`}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="size-full object-cover transition-transform duration-700 ease-brand hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs tracking-wide text-ink-400">
                    {flyer.label}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="warm" size="sm">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl text-balance-tight">
              Need the area before you list?
            </h2>
            <p className="mt-3 text-ink-600">
              Work out an irregular plot's area from its side lengths, in sq m, sq ft,
              guntha or acres.
            </p>
          </div>
          <ButtonLink href="/tools/area-calculator" size="lg">
            Open the area calculator
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
