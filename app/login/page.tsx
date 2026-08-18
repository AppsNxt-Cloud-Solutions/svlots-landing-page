import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import mark from "@/assets/images/brand/mark.png";
import { LoginForm } from "@/app/login/login-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100dvh-4.5rem)] items-center justify-center px-5 py-20">
      <div className="w-full max-w-md">
        <div className="rounded-card border border-ink-200 bg-surface p-8 shadow-soft md:p-10">
          <div className="flex items-center gap-3">
            <Image src={mark} alt="" height={40} width={21} className="h-10 w-auto" />
            <div>
              <p className="font-display text-lg tracking-[0.12em] text-ink-900">
                SV LOTS
              </p>
              <p className="text-2xs tracking-[0.16em] text-gold-600 uppercase">
                Team sign in
              </p>
            </div>
          </div>

          <h1 className="mt-8 text-2xl">Sign in to manage projects</h1>
          <p className="mt-2 text-sm text-ink-500">
            For {site.legalName} staff. Public enquiries go through{" "}
            <Link href="/contact" className="text-gold-700 underline">
              the contact page
            </Link>
            .
          </p>

          <Suspense fallback={<div className="mt-8 h-64" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-ink-500">
          Trouble signing in? Email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
