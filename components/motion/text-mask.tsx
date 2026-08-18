"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type TextMaskProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Seconds between words. */
  gap?: number;
  delay?: number;
  /** Words to render in the gold accent colour (0-indexed). */
  accentWords?: number[];
  /**
   * true  — words rise out of a clipped line (the fuller effect).
   * false — words are painted immediately and only drift up.
   *
   * Use false for anything above the fold. A clipped, transparent headline is
   * not "painted" as far as Largest Contentful Paint is concerned, so the mask
   * pushes LCP out by the whole animation duration — measured at +0.7s and
   * -5 Lighthouse points on the home hero.
   */
  mask?: boolean;
};

/**
 * Per-word mask reveal: each word rises out of a clipped line.
 * Used for hero and major section headlines.
 *
 * Renders the full string in a visually-hidden node so screen readers and
 * crawlers get one clean sentence rather than a pile of word fragments.
 */
export function TextMask({
  text,
  as = "h1",
  className,
  gap = 0.045,
  delay = 0.05,
  accentWords = [],
  mask = true,
}: TextMaskProps) {
  const reduced = useReducedMotion();
  const Tag = as;
  const accent = new Set(accentWords);

  // Keys are built here rather than from the render-time map index: a headline
  // can repeat a word ("value of your value"), so the position has to be part
  // of the identity.
  const words = text.split(" ").map((word, index) => ({
    word,
    key: `${index}:${word}`,
    accent: accent.has(index),
    delay: delay + index * gap,
    last: index === text.split(" ").length - 1,
  }));

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map(({ word, key, accent: isAccent }) =>
          isAccent ? (
            <span key={key} className="text-gold-500">
              {word}{" "}
            </span>
          ) : (
            `${word} `
          ),
        )}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map(({ word, key, accent: isAccent, delay: wordDelay, last }) => (
          <span
            key={key}
            className={cn(
              "inline-block pb-[0.12em] align-bottom",
              mask && "overflow-hidden",
            )}
          >
            <motion.span
              data-motion="reveal"
              className={cn("inline-block", isAccent && "text-gold-500")}
              initial={mask ? { y: "110%", opacity: 0 } : { y: "22%" }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: mask ? 0.75 : 0.6,
                delay: wordDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
            {!last && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
