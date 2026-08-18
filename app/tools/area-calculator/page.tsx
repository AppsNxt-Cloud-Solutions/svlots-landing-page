import type { Metadata } from "next";
import plotMeasurement from "@/assets/images/sections/plot-measurement.webp";
import { PageHero } from "@/components/layout/page-hero";
import { AreaCalculator } from "@/components/tools/area-calculator";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Land Area Calculator",
  description:
    "Work out the area of an irregular plot from its side lengths and diagonals. Results in square metres, square feet, guntha and acres.",
};

const steps = [
  {
    title: "Walk the boundary",
    body: "Measure each side in order around the plot — clockwise or anticlockwise, as long as you keep going the same way.",
  },
  {
    title: "Measure the diagonals",
    body: "From one corner, measure across to each non-adjacent corner. These are what fix the shape; sides alone cannot.",
  },
  {
    title: "Read the area",
    body: "The plot is drawn to scale as you type, and the area is shown in all four units at once.",
  },
];

export default function AreaCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title="Land area calculator"
        image={plotMeasurement}
        imageAlt=""
        intro="Irregular plots rarely have a neat formula. Enter the side lengths and diagonals and this works out the area — in square metres, square feet, guntha or acres."
      />

      <Section>
        <Container>
          <AreaCalculator />
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="How to measure"
            title="Getting numbers you can trust"
            intro="The calculator is only as good as the measurements. Three things matter."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-ink-200 bg-ink-200 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-surface p-7">
                <p className="font-display text-3xl text-gold-500 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark" size="sm">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl text-white text-balance-tight">
              Need it measured properly?
            </h2>
            <p className="mt-3 max-w-xl text-ink-300">
              Our surveyors produce georeferenced reports that a bank or a buyer will
              accept — which a tape measure and a calculator cannot.
            </p>
          </div>
          <ButtonLink href="/contact?service=precision-land-surveying" size="lg">
            Request a survey
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
