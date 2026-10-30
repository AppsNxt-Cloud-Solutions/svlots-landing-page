import inventoryShot from "@/assets/images/crm/inventory.webp";
import mapShot from "@/assets/images/crm/map.webp";
import { ScreenFrame } from "@/components/crm/screen-frame";
import { Counter } from "@/components/motion/counter";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { inventory } from "@/content/crm";
import { cn } from "@/lib/utils";

const dots = {
  forest: "bg-forest-500",
  gold: "bg-gold-500",
  ink: "bg-ink-500",
} as const;

/**
 * Two real screens layered at different scroll speeds: the layout map drifts
 * behind, the unit list rides in front.
 */
export function InventoryShowcase() {
  return (
    <Section tone="warm" size="lg" className="overflow-x-clip">
      <Container className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={inventory.eyebrow}
            title={inventory.title}
            intro={inventory.body}
          />
          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {inventory.statuses.map((status) => (
              <StaggerItem key={status.label}>
                <div className="rounded-card border border-ink-200 bg-surface p-4 shadow-soft">
                  <p className="font-display text-3xl text-ink-900 tabular-nums">
                    <Counter to={status.value} duration={1.2} />
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-ink-500">
                    <span
                      aria-hidden="true"
                      className={cn("size-2 rounded-full", dots[status.tone])}
                    />
                    {status.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-4 text-xs text-ink-500">Unit counts from a demo project.</p>
        </div>

        <div className="relative pb-24 sm:pb-32">
          <Parallax distance={6} className="w-[88%]">
            <ScreenFrame
              src={mapShot}
              alt="A published layout map in Bhoomi CRM showing plots, the main road and a central park"
              path="/maps"
              tone="light"
            />
          </Parallax>
          <Reveal direction="up" className="absolute right-0 bottom-0 w-[78%]">
            <Parallax distance={-10}>
              <ScreenFrame
                src={inventoryShot}
                alt="The Bhoomi CRM unit list with live statuses: Available, On Hold, Booked and Sold"
                path="/inventory"
                tone="light"
                className="shadow-gold"
              />
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
