"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Span two grid columns — used for the wide panoramics. */
  wide?: boolean;
};

/**
 * Grid + lightbox. The Angular gallery rendered full-resolution brochure scans
 * (3–4 MB each) inline, with no thumbnails and no way to enlarge them.
 *
 * Radix Dialog supplies the focus trap, Escape handling and scroll lock; arrow
 * keys move between images.
 */
export function LightboxGallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const go = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? null : (current + delta + items.length) % items.length,
      );
    },
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.caption} className={cn(item.wide && "col-span-2")}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-card bg-ink-100"
              aria-label={`Enlarge: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, 50vw"
                className={cn(
                  "size-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]",
                  item.wide ? "aspect-21/9" : "aspect-4/3",
                )}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="absolute inset-x-4 bottom-3 text-left text-xs text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-950/94 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-50 flex flex-col outline-none">
            <Dialog.Title className="sr-only">
              {active ? active.caption : "Gallery"}
            </Dialog.Title>

            <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
              <p className="text-sm text-ink-400 tabular-nums">
                {openIndex === null ? "" : `${openIndex + 1} / ${items.length}`}
              </p>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close gallery"
                  className="inline-flex size-11 items-center justify-center rounded-pill text-white transition-colors hover:bg-white/10"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
              {active && (
                <Image
                  src={active.src}
                  alt={active.alt}
                  placeholder="blur"
                  quality={85}
                  sizes="100vw"
                  className="max-h-full w-auto rounded-card object-contain"
                />
              )}

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-1 inline-flex size-11 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-3"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-1 inline-flex size-11 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-3"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>

            {active && (
              <p className="shrink-0 px-4 pb-6 text-center text-sm text-ink-300 sm:px-6">
                {active.caption}
              </p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
