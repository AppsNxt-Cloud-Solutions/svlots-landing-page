"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav, site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-brand",
        scrolled
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-lg"
          : "border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent",
      )}
    >
      {/* 72px tall. The Angular header was a fixed 120px, which ate a third of a
          phone viewport and pushed anchor targets under itself. */}
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.href} item={item} pathname={pathname} />
            ) : (
              <NavLink key={item.href} href={item.href} pathname={pathname}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 px-2 text-sm font-medium text-ink-200 transition-colors hover:text-gold-400 xl:flex"
          >
            <Phone aria-hidden="true" className="size-3.5 text-gold-400" />
            {site.phone.display}
          </a>
          <Link
            href="/login"
            className="hidden items-center px-2 text-sm font-medium text-ink-200 transition-colors hover:text-gold-400 lg:flex"
          >
            Login
          </Link>
          <ButtonLink
            href="/contact"
            size="sm"
            variant="onDark"
            className="hidden sm:inline-flex"
          >
            Contact Us
          </ButtonLink>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

/* ── Desktop link ─────────────────────────────────────────────────────────── */

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const active = isActive(href, pathname);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-300",
        active ? "text-gold-400" : "text-ink-200 hover:text-white",
      )}
    >
      {children}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold-400"
        />
      )}
    </Link>
  );
}

/* ── Desktop dropdown ─────────────────────────────────────────────────────────
   The Angular dropdown opened on :hover only — its `.show` class was defined as
   `display: none`, so the click path did nothing and the menu was unreachable on
   touch devices. This is a real <button> driven by click, with aria-expanded,
   Escape to close, and outside-click dismissal.
   ────────────────────────────────────────────────────────────────────────── */

function NavDropdown({
  item,
  pathname,
}: {
  item: (typeof primaryNav)[number];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const active = isActive(item.href, pathname);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-300",
          active || open ? "text-gold-400" : "text-ink-200 hover:text-white",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-0 mt-2 w-72 overflow-hidden rounded-card border border-white/10 bg-ink-900/97 p-2 shadow-lift backdrop-blur-lg"
      >
        {item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
          >
            <span className="block text-sm font-medium text-white">{child.label}</span>
            {child.description && (
              <span className="mt-0.5 block text-xs leading-snug text-ink-400">
                {child.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile sheet ─────────────────────────────────────────────────────────────
   Radix Dialog supplies the focus trap, Escape handling, scroll lock and
   aria-modal wiring. The Angular overlay had none of these and no close button —
   dismissal relied on tapping a link.
   ────────────────────────────────────────────────────────────────────────── */

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger — close the sheet on navigation
  useEffect(() => setOpen(false), [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-11 items-center justify-center rounded-pill text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col border-l border-white/10 bg-ink-950 shadow-lift">
          <div className="flex h-18 shrink-0 items-center justify-between border-b border-white/10 px-5">
            <Dialog.Title className="font-display text-base tracking-[0.14em] text-white">
              MENU
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-pill text-white transition-colors hover:bg-white/10"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            {primaryNav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href, pathname) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-lg transition-colors",
                    isActive(item.href, pathname)
                      ? "text-gold-400"
                      : "text-ink-100 hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-1 ml-4 border-l border-white/10 pl-3">
                    {item.children
                      .filter((child) => child.href !== item.href)
                      .map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/login"
              aria-current={isActive("/login", pathname) ? "page" : undefined}
              className={cn(
                "block rounded-lg px-4 py-3 text-lg transition-colors",
                isActive("/login", pathname)
                  ? "text-gold-400"
                  : "text-ink-100 hover:bg-white/5",
              )}
            >
              Login
            </Link>
          </nav>

          <div className="shrink-0 border-t border-white/10 p-5">
            <ButtonLink href="/contact" className="w-full" size="md">
              Contact Us
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
