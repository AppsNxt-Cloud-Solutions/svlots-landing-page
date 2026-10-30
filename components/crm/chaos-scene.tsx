"use client";

import {
  Building2,
  FileSpreadsheet,
  Footprints,
  Globe,
  Handshake,
  Megaphone,
  MessageCircle,
  PhoneMissed,
} from "lucide-react";
import { type MotionValue, motion, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { ScrollScene, useSceneProgress } from "@/components/motion/scroll-scene";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { type ChaosSource, chaos } from "@/content/crm";

const icons: Record<ChaosSource["icon"], ReactNode> = {
  ad: <Megaphone className="size-4" strokeWidth={1.6} />,
  web: <Globe className="size-4" strokeWidth={1.6} />,
  whatsapp: <MessageCircle className="size-4" strokeWidth={1.6} />,
  missed: <PhoneMissed className="size-4" strokeWidth={1.6} />,
  portal: <Building2 className="size-4" strokeWidth={1.6} />,
  walkin: <Footprints className="size-4" strokeWidth={1.6} />,
  referral: <Handshake className="size-4" strokeWidth={1.6} />,
  sheet: <FileSpreadsheet className="size-4" strokeWidth={1.6} />,
};

/**
 * Where each source starts, as an offset from its resting row in the list:
 * scattered across the stage and tipped at an angle. vw/vh so the scatter
 * fills a phone as convincingly as a desktop.
 */
const scatter = [
  { x: -34, y: -26, r: -8 },
  { x: 30, y: -30, r: 6 },
  { x: -28, y: 4, r: 5 },
  { x: 33, y: -4, r: -7 },
  { x: -36, y: 26, r: -4 },
  { x: 26, y: 22, r: 9 },
  { x: -10, y: -38, r: -10 },
  { x: 14, y: 36, r: 4 },
  { x: -20, y: 40, r: 7 },
];

/**
 * Act one. Leads float scattered around the stage while the "before" line
 * reads; as the visitor scrolls they drift into a single tidy list inside a
 * workspace card, and the copy swaps to the "after" line.
 */
export function ChaosScene() {
  return (
    <ScrollScene
      length={260}
      aria-labelledby="chaos-heading"
      className="bg-ink-950 text-ink-100"
      stageClassName="grain isolate flex items-center"
    >
      <Stage />
    </ScrollScene>
  );
}

function Stage() {
  const progress = useSceneProgress();

  const beforeOpacity = useTransform(progress, [0.05, 0.35, 0.45], [1, 1, 0]);
  const beforeY = useTransform(progress, [0.35, 0.45], [0, -24]);
  const afterOpacity = useTransform(progress, [0.5, 0.62], [0, 1]);
  const afterY = useTransform(progress, [0.5, 0.62], [24, 0]);
  const cardOpacity = useTransform(progress, [0.4, 0.62], [0, 1]);
  const cardScale = useTransform(progress, [0.4, 0.62], [0.94, 1]);
  const glow = useTransform(progress, [0.5, 0.8], [0, 1]);

  return (
    <Container className="relative grid w-full items-center gap-8 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
      {/* The copy swap. Both lines are in the DOM for assistive tech; only the
          visual treatment changes. */}
      <div className="relative z-10">
        <Eyebrow onDark>{chaos.eyebrow}</Eyebrow>
        <h2 id="chaos-heading" className="sr-only">
          {chaos.before} {chaos.after}
        </h2>
        <div aria-hidden="true" className="relative mt-6 grid">
          <motion.p
            style={{ opacity: beforeOpacity, y: beforeY }}
            className="col-start-1 row-start-1 font-display text-2xl leading-snug text-white md:text-4xl"
          >
            {chaos.before}
          </motion.p>
          <motion.p
            style={{ opacity: afterOpacity, y: afterY }}
            className="col-start-1 row-start-1 font-display text-2xl leading-snug text-white md:text-4xl"
          >
            {chaos.after.split("—")[0]}
            <span className="text-gold-400">—{chaos.after.split("—")[1]}</span>
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <motion.div
          aria-hidden="true"
          style={{ opacity: glow }}
          className="absolute -inset-10 -z-10 rounded-full bg-gold-500/15 blur-3xl"
        />
        <motion.div
          style={{ opacity: cardOpacity, scale: cardScale }}
          className="absolute -inset-4 rounded-card border border-white/10 bg-white/[0.04] shadow-lift"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="text-2xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Bhoomi · All leads
            </span>
            <span className="text-2xs text-ink-400">Today</span>
          </div>
        </motion.div>

        <ul className="relative space-y-2 pt-12 pb-2">
          {chaos.sources.map((source, index) => (
            <SourceChip
              key={source.label}
              source={source}
              index={index}
              progress={progress}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
}

function SourceChip({
  source,
  index,
  progress,
}: {
  source: ChaosSource;
  index: number;
  progress: MotionValue<number>;
}) {
  const from = scatter[index % scatter.length];
  // Each chip lands a beat after the one before it, so the list assembles
  // top to bottom rather than snapping together.
  const start = 0.18 + index * 0.025;
  const end = start + 0.3;
  const x = useTransform(progress, [start, end], [`${from.x}vw`, "0vw"]);
  const y = useTransform(progress, [start, end], [`${from.y}vh`, "0vh"]);
  const rotate = useTransform(progress, [start, end], [from.r, 0]);
  const owner = useTransform(progress, [end - 0.04, end + 0.06], [0, 1]);

  return (
    <motion.li
      style={{ x, y, rotate }}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-white/10 bg-ink-900/95 px-4 py-2 shadow-soft backdrop-blur-sm sm:py-2.5",
        // A phone's stage has room for six; the rest join from sm up.
        index >= 6 && "hidden sm:flex",
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
        {icons[source.icon]}
      </span>
      <span className="text-sm text-ink-100">{source.label}</span>
      <motion.span
        style={{ opacity: owner }}
        className="ml-auto rounded-pill bg-forest-500/20 px-2.5 py-0.5 text-2xs font-medium text-forest-100"
      >
        Assigned
      </motion.span>
    </motion.li>
  );
}
