import { DrawIcon } from "@/components/motion/draw-icon";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pillars } from "@/content/home";

export function Pillars() {
  return (
    <Section tone="alt">
      <Container>
        <SectionHeading
          eyebrow="Why SV Lots"
          title="Four things we will not compromise on"
          intro="Every layout we take to market has to clear the same four tests before a single plot is offered."
        />

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-card border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <StaggerItem key={pillar.title} className="bg-surface">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-surface-warm">
                <span className="flex size-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <DrawIcon
                    name={pillar.icon}
                    delay={0.15 + index * 0.12}
                    className="size-6"
                  />
                </span>
                <p className="mt-7 font-display text-xs tracking-[0.2em] text-ink-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl">{pillar.title}</h3>
                <span aria-hidden="true" className="mt-4 block h-px w-10 rule-gold" />
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
