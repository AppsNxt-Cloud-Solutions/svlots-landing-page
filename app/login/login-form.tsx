"use client";

import { Eye, EyeOff, Loader2, TriangleAlert } from "lucide-react";
import { useActionState, useEffect, useId, useState } from "react";
import { signIn } from "@/app/login/actions";
import { initialLoginState } from "@/app/login/state";
import { Field, fieldBorder, inputClasses } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialLoginState);
  const ids = useId();

  // Read after mount rather than with useSearchParams — see the note in
  // contact-form.tsx. /login is a static route, so that hook would keep this
  // form out of the server-rendered HTML entirely.
  const [next, setNext] = useState("");
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("next") ?? "";
    if (target.startsWith("/admin")) setNext(target);
  }, []);
  const errors = state.errors ?? {};
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="mt-8" noValidate>
      <input type="hidden" name="next" value={next} />

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mb-6 flex gap-3 rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm"
        >
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-danger"
          />
          <p className="font-medium text-danger">{state.message}</p>
        </div>
      )}

      <div className="space-y-5">
        <Field id={`${ids}-email`} label="Email" error={errors.email} required>
          <input
            id={`${ids}-email`}
            name="email"
            type="email"
            autoComplete="username"
            defaultValue={state.email}
            aria-invalid={Boolean(errors.email)}
            className={cn(inputClasses, fieldBorder(errors.email))}
            placeholder="you@svlots.com"
          />
        </Field>

        <Field id={`${ids}-password`} label="Password" error={errors.password} required>
          <div className="relative">
            <input
              id={`${ids}-password`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              className={cn(inputClasses, "pr-11", fieldBorder(errors.password))}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink-500 hover:text-ink-900"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" className="size-4" />
              ) : (
                <Eye aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={pending}>
        {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
