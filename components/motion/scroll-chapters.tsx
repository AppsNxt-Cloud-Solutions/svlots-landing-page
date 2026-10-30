"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type Chapter = {
  id: string;
  /** Short label for the progress rail. */
  label: string;
  content: ReactNode;
  visual: ReactNode;
};

const ChapterActive = createContext(true);

/** True while this visual's chapter is the one being read. */
export function useChapterActive(): boolean {
  return useContext(ChapterActive);
}

/**
 * Scrollytelling layout. On large screens the visuals are pinned in a sticky
 * column and cross-fade as each chapter's text passes the middle of the
 * viewport; a rail above them shows where the reader is. On small screens
 * there is no pinning: each visual sits under its own text and becomes active
 * when it scrolls into view.
 *
 * Visuals that animate read `useChapterActive()` instead of observing the
 * viewport themselves, so a pinned visual plays when its chapter is reached,
 * not when the sticky column first appears.
 */
export function ScrollChapters({
  chapters,
  className,
}: {
  chapters: Chapter[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className={cn("grid gap-x-16 lg:grid-cols-[1fr_1.2fr]", className)}>
      <ol className="space-y-24 lg:space-y-0">
        {chapters.map((chapter, index) => (
          <ChapterText key={chapter.id} onActive={() => setActive(index)}>
            {chapter.content}
            <div className="mt-10 lg:hidden">
              <InViewActive>{chapter.visual}</InViewActive>
            </div>
          </ChapterText>
        ))}
      </ol>

      <div aria-hidden="true" className="hidden lg:block">
        <div className="sticky top-24 flex h-[calc(100svh-7rem)] flex-col justify-center">
          <div className="flex gap-2">
            {chapters.map((chapter, index) => (
              <div key={chapter.id} className="flex-1">
                <div className="h-0.5 overflow-hidden rounded-pill bg-ink-200">
                  <motion.div
                    className="h-full origin-left bg-gold-500"
                    initial={false}
                    animate={{ scaleX: index <= active ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p
                  className={cn(
                    "mt-3 text-2xs font-semibold tracking-[0.16em] uppercase transition-colors duration-500",
                    index === active ? "text-gold-700" : "text-ink-400",
                  )}
                >
                  {chapter.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-8 aspect-[16/11]">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: index === active ? 1 : 0,
                  y: index === active ? 0 : index < active ? -24 : 24,
                  scale: index === active ? 1 : 0.97,
                }}
                transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: index === active ? "auto" : "none" }}
              >
                <ChapterActive.Provider value={index === active}>
                  {chapter.visual}
                </ChapterActive.Provider>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterText({
  children,
  onActive,
}: {
  children: ReactNode;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // A thin band across the middle of the viewport: whichever chapter's text
  // crosses it is the one being read.
  const inBand = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inBand) onActive();
  }, [inBand, onActive]);

  return (
    <li ref={ref} className="lg:flex lg:min-h-[85svh] lg:flex-col lg:justify-center">
      {children}
    </li>
  );
}

function InViewActive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref}>
      <ChapterActive.Provider value={inView}>{children}</ChapterActive.Provider>
    </div>
  );
}
