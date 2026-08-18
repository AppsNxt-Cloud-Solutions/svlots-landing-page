import { MapPin } from "lucide-react";
import Image from "next/image";
import gardenCourts from "@/assets/images/projects/prestige/garden-courts.webp";
import pool from "@/assets/images/projects/prestige/pool.webp";
import skyTerrace from "@/assets/images/projects/prestige/sky-terrace.webp";
import towersLake from "@/assets/images/projects/prestige/towers-lake.webp";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";

/**
 * Featured project band. Folds in the Prestige Group showcase that lived at the
 * orphaned /projects route — a fully built 383-line page nothing linked to.
 *
 * Imagery note: these come from Prestige's own lifestyle brochure, whose spreads
 * carry baked-in marketing copy ("MAJESTICALLY TOWERING OVER THE TRANQUIL
 * WATERS"), page numbers and "representational purposes" captions. Every crop
 * here is taken from a text-free photographic region of the spread — see the
 * crop boxes recorded in docs/asset-spec.md.
 */

const highlights = [
  {
    title: "Extraordinary living",
    copy: "1,520 homes across 18 towers, spanning 21 acres.",
  },
  {
    title: "Exhilarating panorama",
    copy: "Residences facing Varthur Lake and open greens.",
  },
  {
    title: "Expansive greens",
    copy: "Landscaped commons at the heart of the site.",
  },
];

export function FeaturedProject() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 text-ink-100">
      <div className="relative h-[58svh] min-h-78 overflow-hidden">
        <Parallax distance={9} className="absolute -inset-y-[10%] inset-x-0">
          <Image
            src={towersLake}
            alt="Prestige Raintree Park towers reflected in a lily-covered lake"
            placeholder="blur"
            sizes="100vw"
            className="size-full object-cover"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-ink-900/10"
        />
      </div>

      <Container className="relative -mt-28 pb-20 md:-mt-36 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow onDark>Featured project</Eyebrow>
              <h2 className="mt-5 text-4xl text-white text-balance-tight">
                Prestige Raintree Park
              </h2>
              <p className="mt-4 flex items-center gap-2 text-sm text-gold-300">
                <MapPin aria-hidden="true" className="size-4" />
                Whitefield, Bengaluru
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
                Prestige Raintree Park's location in prime Whitefield, directly opposite
                Varthur Lake, gives residents convenient access to every part of Bengaluru
                — while the site itself is built around water and landscaped green.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/projects">All projects</ButtonLink>
              <ButtonLink href="/gallery" variant="onDark">
                View the gallery
              </ButtonLink>
            </Reveal>
          </div>

          <Stagger className="grid gap-5 self-end sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="border-l border-gold-500/40 pl-5">
                  <h3 className="text-base text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                    {item.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <StaggerItem>
            <figure className="overflow-hidden rounded-card">
              <Image
                src={gardenCourts}
                alt="Aerial view of landscaped garden courts between residential towers"
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 92vw"
                className="aspect-16/9 size-full object-cover transition-transform duration-700 ease-brand hover:scale-[1.03]"
              />
            </figure>
          </StaggerItem>
          <StaggerItem>
            <figure className="overflow-hidden rounded-card">
              <Image
                src={skyTerrace}
                alt="Infinity pool terrace with lounge seating and a distant city skyline"
                placeholder="blur"
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="aspect-16/9 size-full object-cover transition-transform duration-700 ease-brand hover:scale-[1.03]"
              />
            </figure>
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-5">
          <figure className="overflow-hidden rounded-card">
            <Image
              src={pool}
              alt="Indoor swimming pool in the clubhouse"
              placeholder="blur"
              sizes="100vw"
              className="aspect-21/9 size-full object-cover"
            />
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
