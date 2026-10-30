"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A panel that starts tipped back in perspective and settles flat as it rises
 * into view — for product shots that should feel like they are being laid on
 * the table in front of the reader.
 */
export function ScrollTilt({
  children,
  className,
  from = 20,
}: {
  children: ReactNode;
  className?: string;
  /** Starting tilt in degrees. */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });
  // A light spring takes the edge off wheel-step jumps without lagging.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const rotateX = useTransform(progress, [0, 1], [from, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const opacity = useTransform(progress, [0, 0.35], [0.4, 1]);

  return (
    <div ref={ref} className={cn("perspective-distant", className)}>
      <motion.div
        style={
          reduced ? undefined : { rotateX, scale, opacity, transformOrigin: "50% 0%" }
        }
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
