"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import landDusk from "@/assets/images/hero/land-dusk.webp";
import { Reveal } from "@/components/motion/reveal";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { hero } from "@/content/home";

/**
 * Home hero: layered parallax image, gold wash, film grain, per-word masked
 * headline, and a scroll-linked fade/scale on exit.
 *
 * Replaces a 3-slide setInterval carousel that mutated style.transform
 * imperatively, auto-advanced every 3s with no pause control, and used the same
 * image for slides 1 and 3.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image drifts down slightly while the content lifts and fades away.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative grain isolate flex min-h-[92svh] items-end overflow-hidden bg-ink-950 pt-18"
    >
      <motion.div
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src={landDusk}
          alt="Palm trees mirrored in still water at dusk near Tumkur, Karnataka"
          placeholder="blur"
          priority
          quality={85}
          sizes="100vw"
          className="size-full object-cover"
        />
      </motion.div>

      {/* Legibility scrim + gold wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/65 to-ink-950/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_12%_85%,rgba(189,150,102,0.22),transparent_60%)]"
      />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="w-full pb-16 md:pb-24"
      >
        <Container>
          <Reveal blur={false}>
            <span className="text-xs font-semibold tracking-[0.24em] text-gold-300 uppercase">
              {hero.eyebrow}
            </span>
          </Reveal>

          <TextMask
            text={hero.title}
            as="h1"
            accentWords={hero.accentWords}
            mask={false}
            className="mt-6 max-w-4xl text-7xl text-white"
          />

          {/* Not wrapped in Reveal: this is the LCP element, and an initial
              opacity of 0 delays the paint by the whole animation duration. */}
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-200">
            {hero.intro}
          </p>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/projects" size="lg">
              View our projects
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="onDark">
              Talk to our team
            </ButtonLink>
          </Reveal>
        </Container>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#who-we-are"
        aria-label="Scroll to content"
        className="absolute inset-x-0 bottom-6 mx-auto hidden size-10 place-items-center rounded-pill text-white/50 transition-colors hover:text-white md:grid"
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ArrowDown aria-hidden="true" className="size-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
