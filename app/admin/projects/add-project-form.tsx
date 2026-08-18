"use client";

import { CheckCircle2, Loader2, TriangleAlert, Upload } from "lucide-react";
import { useActionState, useId, useState } from "react";
import { createProject } from "@/app/admin/projects/actions";
import { initialAddProjectState } from "@/app/admin/projects/state";
import { Field, fieldBorder, inputClasses } from "@/components/forms/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_MB = 6;

export function AddProjectForm() {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialAddProjectState,
  );
  const ids = useId();
  const [fileName, setFileName] = useState<string>("");
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-forest-500/30 bg-forest-50 p-8 text-center">
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto size-10 text-forest-500"
          strokeWidth={1.5}
        />
        <h2 className="mt-5 text-2xl">Project published</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-600">{state.message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/projects">View projects page</ButtonLink>
          <ButtonLink href="/admin/projects" variant="secondary">
            Add another
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-card border border-ink-200 bg-surface p-7 md:p-9"
      noValidate
    >
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mb-7 flex gap-3 rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm"
        >
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-danger"
          />
          <p className="font-medium text-danger">{state.message}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${ids}-title`} label="Project title" error={errors.title} required>
          <input
            id={`${ids}-title`}
            name="title"
            defaultValue={values.title}
            className={cn(inputClasses, fieldBorder(errors.title))}
            placeholder="Prestige Raintree Park"
          />
        </Field>

        <Field id={`${ids}-type`} label="Property type" error={errors.type} required>
          <input
            id={`${ids}-type`}
            name="type"
            defaultValue={values.type}
            className={cn(inputClasses, fieldBorder(errors.type))}
            placeholder="Flats / Apartments / Plots"
          />
        </Field>

        <Field
          id={`${ids}-location`}
          label="Location"
          error={errors.location}
          required
          className="sm:col-span-2"
        >
          <input
            id={`${ids}-location`}
            name="location"
            defaultValue={values.location}
            className={cn(inputClasses, fieldBorder(errors.location))}
            placeholder="Whitefield, Bengaluru"
          />
        </Field>

        <Field
          id={`${ids}-description`}
          label="Description"
          error={errors.description}
          required
          className="sm:col-span-2"
        >
          <textarea
            id={`${ids}-description`}
            name="description"
            rows={4}
            defaultValue={values.description}
            className={cn(inputClasses, fieldBorder(errors.description), "resize-y")}
            placeholder="What makes this project worth a buyer's attention?"
          />
        </Field>

        <Field
          id={`${ids}-link`}
          label="External link"
          error={errors.externalLink}
          hint="Optional. A bare domain is fine — https:// is added automatically."
          className="sm:col-span-2"
        >
          <input
            id={`${ids}-link`}
            name="externalLink"
            defaultValue={values.externalLink}
            className={cn(inputClasses, fieldBorder(errors.externalLink))}
            placeholder="prestigegroup.isite.me"
          />
        </Field>

        <Field
          id={`${ids}-image`}
          label="Project image"
          error={errors.image}
          hint={`JPEG, PNG or WebP · up to ${MAX_MB} MB`}
          required
          className="sm:col-span-2"
        >
          <label
            htmlFor={`${ids}-image`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-4 transition-colors",
              errors.image
                ? "border-danger/70"
                : "border-ink-300 hover:border-gold-500 hover:bg-gold-100/40",
            )}
          >
            <Upload aria-hidden="true" className="size-4 text-gold-600" />
            <span className="text-sm text-ink-600">{fileName || "Choose an image…"}</span>
            <input
              id={`${ids}-image`}
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
          </label>
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          {pending ? "Publishing…" : "Publish project"}
        </Button>
        <p className="text-xs text-ink-500">
          The projects page updates immediately after publishing.
        </p>
      </div>
    </form>
  );
}
