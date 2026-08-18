import Image from "next/image";
import treeSunset from "@/assets/images/hero/tree-sunset.webp";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Eyebrow } from "@/components/ui/section";
import { stats } from "@/content/home";

/**
 * Revives the "Our Records" block that was fully written and then commented out
 * in main.component.html — as odometer counters over a fixed backdrop.
 */
export function Stats() {
  return (
    <section className="relative grain isolate overflow-hidden bg-ink-950 py-20 md:py-28">
      <Image
        src={treeSunset}
        alt=""
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/55"
      />

      <Container>
        <Reveal>
          <Eyebrow onDark>Our record</Eyebrow>
        </Reveal>

        <Stagger className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="font-display text-6xl text-white tabular-nums">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <span aria-hidden="true" className="mt-5 block h-px w-12 bg-gold-500" />
              <p className="mt-4 max-w-3xs text-sm leading-relaxed tracking-wide text-ink-300">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
