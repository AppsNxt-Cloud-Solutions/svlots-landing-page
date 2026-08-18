import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { TextMask } from "@/components/motion/text-mask";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Compact dark band at the top of every interior page.
 *
 * Beyond giving each page a title, this guarantees the fixed header always sits
 * over a dark surface, so its white text never lands on white content — the
 * failure mode of a transparent header on a light page.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  accentWords,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  image?: StaticImageData;
  imageAlt?: string;
  accentWords?: number[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section
      className={cn(
        "relative grain isolate flex items-end overflow-hidden bg-ink-950 pt-18",
        image ? "min-h-[46svh]" : "min-h-[34svh]",
      )}
    >
      {!image && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_15%_0%,rgba(189,150,102,0.14),transparent_58%)]"
        />
      )}
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            placeholder="blur"
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 size-full object-cover opacity-45"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/40"
          />
        </>
      )}

      <Container className={cn("py-14 md:py-20", align === "center" && "text-center")}>
        {eyebrow && (
          <Reveal>
            <Eyebrow onDark className={cn(align === "center" && "justify-center")}>
              {eyebrow}
            </Eyebrow>
          </Reveal>
        )}
        <TextMask
          text={title}
          as="h1"
          accentWords={accentWords}
          mask={false}
          className={cn(
            "mt-5 text-5xl text-white",
            align === "center" ? "mx-auto max-w-4xl" : "max-w-4xl",
          )}
        />
        {intro && (
          <Reveal delay={0.25}>
            <div
              className={cn(
                "mt-6 text-lg leading-relaxed text-ink-300",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
              )}
            >
              {intro}
            </div>
          </Reveal>
        )}
        {children && <Reveal delay={0.35}>{children}</Reveal>}
      </Container>
    </section>
  );
}
