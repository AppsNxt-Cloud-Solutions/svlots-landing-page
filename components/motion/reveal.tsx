"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export type RevealProps = {
  as?: ElementType;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  /** Replay the animation every time it re-enters the viewport. */
  repeat?: boolean;
  blur?: boolean;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport">;

/**
 * Scroll-triggered reveal.
 *
 * Replaces the five near-identical `ngAfterViewInit` + IntersectionObserver
 * blocks in the Angular app (main, aboutus, projects, blog, knowmore), which
 * also toggled the class off on exit — so animations replayed on every scroll
 * up, reading as jitter. Here `repeat` defaults to false.
 */
export function Reveal({
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.65,
  amount = 0.25,
  repeat = false,
  blur = true,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Static = as as ElementType;
    return <Static {...(rest as object)}>{children}</Static>;
  }

  const offset = offsets[direction];

  return (
    <Component
      data-motion="reveal"
      initial={{ opacity: 0, ...offset, filter: blur ? "blur(6px)" : undefined }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: blur ? "blur(0px)" : undefined,
      }}
      viewport={{ once: !repeat, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
