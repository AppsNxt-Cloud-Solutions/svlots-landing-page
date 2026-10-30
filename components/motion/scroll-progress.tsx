"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** A gold hairline across the top of the viewport that fills as the page is read. */
export function ScrollProgress({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-gold-500",
        className,
      )}
    />
  );
}

/**
 * A line that draws itself as its own box scrolls through the middle of the
 * viewport — vertical rails between steps, horizontal arrows between cards.
 */
export function ScrollLine({
  orientation = "vertical",
  className,
  trackClassName = "bg-ink-200",
  fillClassName = "bg-gold-500",
}: {
  orientation?: "vertical" | "horizontal";
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  const vertical = orientation === "vertical";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
    >
      <div className={cn("absolute inset-0", trackClassName)} />
      <motion.div
        style={
          reduced
            ? undefined
            : vertical
              ? { scaleY: scrollYProgress }
              : { scaleX: scrollYProgress }
        }
        className={cn(
          "absolute inset-0",
          vertical ? "origin-top" : "origin-left",
          fillClassName,
        )}
      />
    </div>
  );
}
