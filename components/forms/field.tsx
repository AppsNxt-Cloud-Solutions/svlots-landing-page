import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline-error form field. The Angular forms surfaced every problem in a
 * SweetAlert2 modal with no field-level messages at all.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-gold-600">
            *
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs font-medium text-danger"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-lg border bg-surface px-4 py-3 text-[0.95rem] text-ink-900 transition-colors duration-200 placeholder:text-ink-400 focus:outline-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500/25";

export function fieldBorder(error?: string) {
  return error ? "border-danger/70" : "border-ink-300 hover:border-ink-400";
}
