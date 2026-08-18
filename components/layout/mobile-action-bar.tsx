"use client";

import { MessageCircle, Phone, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, telHref, whatsappHref } from "@/lib/site";

/**
 * Sticky call / WhatsApp / enquire bar, mobile only.
 *
 * This market converts on phone calls, and the Angular site surfaced no phone
 * number anywhere. Hidden on the admin and login routes, where it would just be
 * in the way.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={telHref}
          className="flex flex-col items-center gap-1 py-3 text-white transition-colors active:bg-white/10"
          aria-label={`Call ${site.phone.display}`}
        >
          <Phone aria-hidden="true" className="size-4 text-gold-400" />
          <span className="text-2xs font-semibold tracking-[0.12em] uppercase">Call</span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-white transition-colors active:bg-white/10"
        >
          <MessageCircle aria-hidden="true" className="size-4 text-gold-400" />
          <span className="text-2xs font-semibold tracking-[0.12em] uppercase">
            WhatsApp
          </span>
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center gap-1 py-3 text-white transition-colors active:bg-white/10"
        >
          <Send aria-hidden="true" className="size-4 text-gold-400" />
          <span className="text-2xs font-semibold tracking-[0.12em] uppercase">
            Enquire
          </span>
        </Link>
      </div>
    </div>
  );
}
