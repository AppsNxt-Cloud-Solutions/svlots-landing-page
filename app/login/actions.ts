"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { login } from "@/lib/api/svlots";
import type { LoginState } from "@/app/login/state";
import { createSession, destroySession } from "@/lib/session";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  next: z.string().optional(),
});

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) {
    const errors: LoginState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "email" && !errors.email) errors.email = issue.message;
      if (field === "password" && !errors.password) errors.password = issue.message;
    }
    return { status: "error", errors, email: String(formData.get("email") ?? "") };
  }

  const result = await login(parsed.data.email, parsed.data.password);

  if (!result.ok) {
    const message =
      result.reason === "credentials"
        ? "Those details did not match. Please check and try again."
        : result.reason === "not-authorised"
          ? "This account does not have access to the SV Lots site."
          : "We could not reach the sign-in service. Please try again shortly.";
    return { status: "error", message, email: parsed.data.email };
  }

  await createSession({
    email: result.email,
    name: result.name,
    role: result.role,
  });

  // Only allow internal redirect targets.
  const target = parsed.data.next?.startsWith("/admin")
    ? parsed.data.next
    : "/admin/projects";
  redirect(target);
}

export async function signOut(): Promise<void> {
  await destroySession();
  redirect("/login");
}
