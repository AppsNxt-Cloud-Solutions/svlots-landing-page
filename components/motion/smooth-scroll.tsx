"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Lenis smooth scrolling.
 *
 * Notes:
 * - Disabled entirely under `prefers-reduced-motion` (Lenis hijacks native
 *   scrolling, which is exactly what that preference asks us not to do).
 * - Reset to the top on route change. Next 16 no longer overrides
 *   `scroll-behavior` during navigation, and Lenis holds its own scroll
 *   position, so without this a new page opens mid-scroll.
 * - Deliberately no `scroll-behavior: smooth` in globals.css — that would
 *   fight Lenis.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than an emulated one.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Let anchor links work through Lenis.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -96 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll offset, so without this a new route opens
  // part-way down the previous page.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the body reads
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
