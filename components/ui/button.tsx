import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 ease-brand rounded-pill whitespace-nowrap disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-ink-950 hover:bg-gold-400 hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-ink-300 bg-surface text-ink-800 hover:border-gold-500 hover:text-gold-700 hover:-translate-y-0.5",
  ghost: "text-ink-700 hover:text-gold-700",
  onDark:
    "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-gold-400 hover:bg-gold-500 hover:text-ink-950 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
