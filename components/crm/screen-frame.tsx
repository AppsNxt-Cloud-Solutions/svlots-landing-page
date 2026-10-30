import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

/**
 * A product screenshot in a quiet browser window: ink chrome, three muted
 * dots, the address the screen really lives at. The gold glow ties the light
 * product UI into the dark SV Lots surfaces it sits on.
 */
export function ScreenFrame({
  src,
  alt,
  path,
  className,
  priority,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  tone = "dark",
}: {
  src: StaticImageData;
  alt: string;
  /** Path shown in the address bar, after crm.svlots.com. */
  path: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "dark" | "light";
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-card border shadow-lift",
        tone === "dark"
          ? "border-white/10 bg-ink-900 shadow-gold"
          : "border-ink-200 bg-surface",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          tone === "dark" ? "border-white/10" : "border-ink-200 bg-ink-100",
        )}
      >
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-ink-500/50" />
          <span className="size-2.5 rounded-full bg-ink-500/50" />
          <span className="size-2.5 rounded-full bg-ink-500/50" />
        </span>
        <span
          className={cn(
            "mx-auto truncate rounded-pill px-4 py-1 text-2xs tracking-wide",
            tone === "dark" ? "bg-white/5 text-ink-400" : "bg-surface text-ink-500",
          )}
        >
          crm.svlots.com{path}
        </span>
        <span aria-hidden="true" className="w-12" />
      </div>
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}
