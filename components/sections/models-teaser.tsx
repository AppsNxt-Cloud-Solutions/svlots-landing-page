import { ArrowUpRight, Lock } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardLink } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { propertyModels } from "@/content/models";

export function ModelsTeaser() {
  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Property models"
            title="One record for every kind of property"
            intro="Five data models covering revenue land through to income-producing buildings — so the paperwork, the drawings and the approvals live in one place."
            className="max-w-2xl"
          />
          <ButtonLink href="/property-models" variant="secondary" className="mb-1">
            Explore all models
          </ButtonLink>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {propertyModels.map((model, index) => {
            const body = (
              <div className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-2xl leading-none text-ink-200 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {model.status === "live" ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-ink-300 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-600"
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-pill bg-ink-100 px-2.5 py-1 text-2xs font-semibold tracking-wide text-ink-500 uppercase">
                      <Lock aria-hidden="true" className="size-3" />
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl">{model.name}</h3>
                <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-gold-600 uppercase">
                  {model.tagline}
                </p>
                <span aria-hidden="true" className="mt-4 block h-px w-10 rule-gold" />
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
                  {model.description}
                </p>
              </div>
            );

            return (
              <StaggerItem key={model.slug} className="h-full">
                {model.href ? (
                  <CardLink
                    href={model.href}
                    external
                    className="h-full"
                    ariaLabel={`${model.name} — opens the ${model.name} application`}
                  >
                    {body}
                  </CardLink>
                ) : (
                  <Card className="h-full opacity-80">{body}</Card>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
