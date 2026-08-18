import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { services } from "@/content/services";

/** Compact index of the nine service lines, linking through to /services. */
export function ServicesStrip() {
  return (
    <Section tone="warm">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="What we do"
            title="Nine specialist service lines"
            intro="Survey, valuation, infrastructure and supervision under one roof — the technical work that determines whether a property holds its value."
            className="max-w-2xl"
          />
          <ButtonLink href="/services" variant="secondary" className="mb-1">
            All services
          </ButtonLink>
        </div>

        <Stagger
          gap={0.05}
          className="mt-14 grid gap-x-10 gap-y-0 border-t border-ink-200 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <StaggerItem key={service.slug} y={14}>
              <div className="flex gap-5 border-b border-ink-200 py-6">
                <span className="font-display text-sm text-gold-600 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                    {service.summary}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
