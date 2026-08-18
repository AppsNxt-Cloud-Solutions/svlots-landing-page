import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Long-form text styling for legal pages and articles. Tailwind utility classes
 * only — no typography plugin, and no per-page stylesheet.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl text-ink-700",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:font-sans",
        "[&_p]:mt-4 [&_p]:leading-relaxed",
        "[&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:leading-relaxed",
        "[&_ol]:mt-4 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol>li]:list-decimal",
        "[&_a]:text-gold-700 [&_a]:underline [&_a]:decoration-gold-300 [&_a]:underline-offset-2 [&_a:hover]:decoration-gold-600",
        "[&_strong]:font-semibold [&_strong]:text-ink-900",
        "[&_hr]:my-10 [&_hr]:border-ink-200",
        className,
      )}
    >
      {children}
    </div>
  );
}
