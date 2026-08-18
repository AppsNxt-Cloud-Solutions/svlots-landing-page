"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition. `template.tsx` (unlike `layout.tsx`) remounts on every
 * navigation, which is what lets the enter animation replay.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
