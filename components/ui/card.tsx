import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One card implementation for the whole site. The Angular app hand-rolled a
 * white-surface / 8px-radius / rgba(0,0,0,0.1)-shadow card separately on every
 * page, with slightly different values each time.
 */

export function Card({
  children,
  className,
  interactive,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card",
        tone === "light"
          ? "border border-ink-200 bg-surface shadow-soft"
          : "border border-white/10 bg-white/[0.04]",
        interactive &&
          "transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Card whose whole surface is a link. */
export function CardLink({
  href,
  children,
  className,
  external,
  tone = "light",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  tone?: "light" | "dark";
  ariaLabel?: string;
}) {
  const classes = cn(
    "group relative block overflow-hidden rounded-card transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-lift",
    tone === "light"
      ? "border border-ink-200 bg-surface shadow-soft hover:border-gold-400"
      : "border border-white/10 bg-white/[0.04] hover:border-gold-400/60",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/** Numbered feature card with a gold rule — used for services and pillars. */
export function FeatureCard({
  index,
  title,
  children,
  icon,
  className,
}: {
  index?: number;
  title: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Card interactive className={cn("h-full p-7 md:p-8", className)}>
      <div className="flex items-start justify-between gap-4">
        {icon && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
            {icon}
          </span>
        )}
        {index !== undefined && (
          <span className="font-display text-2xl leading-none text-ink-200 tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="mt-6 text-xl">{title}</h3>
      <span aria-hidden="true" className="mt-4 block h-px w-10 rule-gold" />
      {children && (
        <div className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">{children}</div>
      )}
    </Card>
  );
}
