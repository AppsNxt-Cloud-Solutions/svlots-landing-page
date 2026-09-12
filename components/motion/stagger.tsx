"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  gap?: number;
  delay?: number;
  amount?: number;
};

/**
 * Wrap a list; each direct <StaggerItem> child enters in sequence.
 */
export function Stagger({
  children,
  className,
  gap = 0.09,
  delay = 0,
  amount = 0.2,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  if (reduced) return <div className={className}>{children}</div>;

  // `animate`, not `whileInView`. With whileInView the container has no resolved
  // animate state, so a child that mounts after the reveal — a project card
  // returning when a filter is cleared — inherits `hidden` with nowhere to go
  // and stays at opacity 0 forever.
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-motion="reveal"
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(5px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
