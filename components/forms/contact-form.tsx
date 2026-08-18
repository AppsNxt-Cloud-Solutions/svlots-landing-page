"use client";

import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useId, useRef } from "react";
import { submitLead } from "@/app/contact/actions";
import { Field, fieldBorder, inputClasses } from "@/components/forms/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { services } from "@/content/services";
import { site, telHref, whatsappHref } from "@/lib/site";
import { initialLeadState } from "@/lib/validation/lead";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialLeadState);
  const params = useSearchParams();
  const ids = useId();

  // Pre-selected service arrives as ?service=<slug> from the Services page,
  // replacing the Angular component-state handoff.
  const serviceParam = params.get("service") ?? "";
  const knownService = services.some((service) => service.slug === serviceParam)
    ? serviceParam
    : "";

  // Time-to-fill, used server-side as a bot signal.
  const mountedAt = useRef<number>(0);
  const elapsedRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const values = state.values ?? {};
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-forest-500/30 bg-forest-50 p-8 text-center md:p-10">
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto size-10 text-forest-500"
          strokeWidth={1.5}
        />
        <h2 className="mt-5 text-2xl">Enquiry received</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-600">
          {state.message}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/projects" variant="secondary">
            Browse projects
          </ButtonLink>
          <ButtonLink href="/" variant="ghost">
            Back to home
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={() => {
        if (elapsedRef.current) {
          elapsedRef.current.value = String(Date.now() - mountedAt.current);
        }
      }}
      className="rounded-card border border-ink-200 bg-surface p-7 shadow-soft md:p-9"
      noValidate
    >
      {/* Honeypot — visually and programmatically hidden from real users */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${ids}-company`}>Company</label>
        <input id={`${ids}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={elapsedRef} type="hidden" name="elapsed" defaultValue="0" />

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mb-7 flex gap-3 rounded-lg border border-danger/30 bg-danger/5 p-4"
        >
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-danger"
          />
          <div className="text-sm">
            <p className="font-medium text-danger">{state.message}</p>
            {!Object.keys(errors).length && (
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-ink-600">
                <a href={telHref} className="underline hover:text-gold-700">
                  {site.phone.display}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gold-700"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="underline hover:text-gold-700"
                >
                  {site.email}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${ids}-name`} label="Your name" error={errors.name} required>
          <input
            id={`${ids}-name`}
            name="name"
            autoComplete="name"
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids}-name-error` : undefined}
            className={cn(inputClasses, fieldBorder(errors.name))}
            placeholder="Full name"
          />
        </Field>

        <Field id={`${ids}-phone`} label="Phone" error={errors.phone} required>
          <input
            id={`${ids}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${ids}-phone-error` : undefined}
            className={cn(inputClasses, fieldBorder(errors.phone))}
            placeholder="10-digit mobile"
          />
        </Field>

        <Field id={`${ids}-email`} label="Email" error={errors.email} required>
          <input
            id={`${ids}-email`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids}-email-error` : undefined}
            className={cn(inputClasses, fieldBorder(errors.email))}
            placeholder="you@example.com"
          />
        </Field>

        <Field id={`${ids}-city`} label="City" error={errors.city} hint="Optional">
          <input
            id={`${ids}-city`}
            name="city"
            autoComplete="address-level2"
            defaultValue={values.city}
            className={cn(inputClasses, fieldBorder(errors.city))}
            placeholder="Tumkur"
          />
        </Field>

        <Field
          id={`${ids}-service`}
          label="What is this about?"
          className="sm:col-span-2"
        >
          <select
            id={`${ids}-service`}
            name="service"
            defaultValue={values.service || knownService}
            className={cn(inputClasses, fieldBorder(), "appearance-none")}
          >
            <option value="">General enquiry</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${ids}-message`}
          label="Your message"
          error={errors.message}
          required
          className="sm:col-span-2"
        >
          <textarea
            id={`${ids}-message`}
            name="message"
            rows={5}
            defaultValue={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${ids}-message-error` : undefined}
            className={cn(inputClasses, fieldBorder(errors.message), "resize-y")}
            placeholder="Tell us about the property, the location, or what you are looking for."
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs leading-relaxed text-ink-500">
          We only use your details to reply to this enquiry.
        </p>
      </div>
    </form>
  );
}
