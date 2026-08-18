import type { ElementType, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* ── Section shell ────────────────────────────────────────────────────────── */

type Tone = "light" | "alt" | "warm" | "dark" | "ink";

const tones: Record<Tone, string> = {
  light: "bg-surface text-ink-800",
  alt: "bg-surface-alt text-ink-800",
  warm: "bg-surface-warm text-ink-800",
  dark: "bg-ink-900 text-ink-100",
  ink: "bg-ink-950 text-ink-100",
};

export function Section({
  children,
  className,
  tone = "light",
  id,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  size?: "sm" | "md" | "lg";
}) {
  const padding = {
    sm: "py-14 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-36",
  }[size];

  return (
    <section id={id} className={cn(tones[tone], padding, className)}>
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as;
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

/* ── Eyebrow ──────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
        onDark ? "text-gold-300" : "text-gold-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8", onDark ? "bg-gold-300/60" : "rule-gold")}
      />
      {children}
    </span>
  );
}

/* ── Section heading ──────────────────────────────────────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as;
  return (
    <Reveal
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <Eyebrow onDark={onDark} className={align === "center" ? "mb-5" : "mb-5"}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          "text-4xl text-balance-tight",
          onDark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <div
          className={cn(
            "mt-6 text-lg leading-relaxed",
            onDark ? "text-ink-300" : "text-ink-600",
          )}
        >
          {intro}
        </div>
      )}
    </Reveal>
  );
}
