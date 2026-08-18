"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Pillar } from "@/content/home";

/**
 * Line-art glyphs that draw themselves when scrolled into view.
 *
 * Replaces the Font Awesome CDN (which the Angular app loaded twice, from two
 * different 6.0.0 builds, in two different templates) for these four marks.
 */

const glyphs: Record<Pillar["icon"], React.ReactNode> = {
  document: (
    <>
      <path d="M7 3.5h6.5L18 8v12.5H7z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M9.75 12.5h5.5M9.75 16h3.5" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  road: (
    <>
      <path d="M8 3.5 5 20.5M16 3.5l3 17" />
      <path d="M12 4.5v3M12 10.5v3M12 16.5v3" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4.5c0 8-4.9 12.5-10.5 12.5H5.5C5.5 9.5 11.5 4.5 20 4.5Z" />
      <path d="M4 20.5c1.8-4.6 5-8 9.5-10" />
    </>
  ),
};

export function DrawIcon({
  name,
  className,
  delay = 0,
}: {
  name: Pillar["icon"];
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      <motion.g
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25, delay },
            },
          },
        }}
      >
        {glyphs[name]}
      </motion.g>
    </motion.svg>
  );
}
