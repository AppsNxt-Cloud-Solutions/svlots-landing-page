"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Travel distance in percent of the element's height. Negative = upward. */
  distance?: number;
};

/**
 * Scroll-linked vertical parallax. The child should be oversized relative to
 * its clipping parent (e.g. `-inset-y-[12%]`) so the travel never exposes an
 * edge.
 */
export function Parallax({ children, className, distance = 12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
