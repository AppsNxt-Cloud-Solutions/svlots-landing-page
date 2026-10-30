"use client";

import { type MotionValue, motionValue, useReducedMotion, useScroll } from "motion/react";
import { createContext, type ReactNode, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SceneProgress = createContext<MotionValue<number> | null>(null);

/**
 * A pinned, scroll-scrubbed scene: the section is `length` viewport-heights
 * tall and its stage sticks to the viewport while the visitor scrolls through
 * it. Children read the 0→1 progress with `useSceneProgress()` and map it with
 * `useTransform`.
 *
 * Under reduced motion the section collapses to a normal block and progress is
 * pinned at 1, so every child renders its finished state and nothing scrubs.
 */
export function ScrollScene({
  children,
  length = 220,
  className,
  stageClassName,
  id,
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  /** Scroll distance in viewport heights (svh). */
  length?: number;
  className?: string;
  stageClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // The ref is attached in both branches: useScroll warns about a target that
  // never hydrates.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [settled] = useState(() => motionValue(1));

  if (reduced) {
    return (
      <section ref={ref} id={id} aria-labelledby={labelledBy} className={className}>
        <div className={stageClassName}>
          <SceneProgress.Provider value={settled}>{children}</SceneProgress.Provider>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", className)}
      style={{ height: `${length}svh` }}
    >
      <div className={cn("sticky top-0 h-svh overflow-hidden", stageClassName)}>
        <SceneProgress.Provider value={scrollYProgress}>
          {children}
        </SceneProgress.Provider>
      </div>
    </section>
  );
}

/** 0→1 progress of the enclosing `ScrollScene`. */
export function useSceneProgress(): MotionValue<number> {
  const progress = useContext(SceneProgress);
  if (!progress) throw new Error("useSceneProgress must be used inside <ScrollScene>");
  return progress;
}
