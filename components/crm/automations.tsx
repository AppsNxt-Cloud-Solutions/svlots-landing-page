import { Check, Zap } from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { ScrollLine } from "@/components/motion/scroll-progress";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { automation } from "@/content/crm";

/** Ready-made recipes in the product today (apps/api/src/modules/automations/recipes.ts). */
const RECIPE_COUNT = 13;

/**
 * "When this happens → Bhoomi does that", with each connector drawing itself
 * as the row passes the middle of the screen.
 */
export function Automations() {
  return (
    <Section size="lg">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow={automation.eyebrow}
            title={automation.title}
            intro={automation.intro}
          />
          <Reveal delay={0.15} className="lg:text-right">
            <p className="font-display text-6xl text-gold-600 tabular-nums">
              <Counter to={RECIPE_COUNT} />
            </p>
            <p className="mt-2 text-sm text-ink-500">ready-made automation recipes</p>
          </Reveal>
        </div>

        <ol className="mt-16 space-y-5">
          {automation.flows.map((flow) => (
            <li
              key={flow.when}
              className="grid items-center gap-3 md:grid-cols-[1fr_6rem_1fr] md:gap-0"
            >
              <Reveal direction="left" amount={0.6}>
                <div className="rounded-card border border-ink-200 bg-surface p-5 shadow-soft">
                  <p className="text-2xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                    When
                  </p>
                  <p className="mt-1.5 text-lg text-ink-900">{flow.when}</p>
                </div>
              </Reveal>

              <div className="relative flex items-center justify-center">
                <ScrollLine
                  orientation="horizontal"
                  className="hidden h-px w-full md:block"
                />
                <ScrollLine orientation="vertical" className="h-8 w-px md:hidden" />
                <span className="absolute flex size-8 items-center justify-center rounded-full border border-gold-300 bg-gold-100 text-gold-700">
                  <Zap aria-hidden="true" className="size-4" />
                </span>
              </div>

              <Reveal direction="right" amount={0.6}>
                <div className="rounded-card border border-gold-300 bg-gold-100/60 p-5">
                  <p className="text-2xs font-semibold tracking-[0.18em] text-gold-700 uppercase">
                    Bhoomi does
                  </p>
                  <p className="mt-1.5 text-lg text-ink-900">{flow.action}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Stagger className="mt-16 grid gap-x-10 gap-y-4 border-t border-ink-200 pt-10 sm:grid-cols-2">
          {automation.insights.map((item) => (
            <StaggerItem key={item}>
              <p className="flex gap-3 text-ink-700">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-gold-600"
                />
                {item}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
