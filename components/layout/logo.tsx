import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/images/brand/mark.png";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Header lockup: the mark as an image, "SV LOTS" as live type.
 *
 * The only logo asset with transparency is 338x402, so a full raster lockup
 * cannot be rendered crisply at large sizes. Setting the wordmark as text also
 * means it scales, stays selectable, and is readable to crawlers.
 */
export function Logo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.legalName} — home`}
    >
      <Image
        src={mark}
        alt=""
        height={48}
        width={25}
        priority
        className="h-11 w-auto transition-transform duration-500 ease-brand group-hover:scale-105 sm:h-12"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-[0.14em] text-white sm:text-xl">
          SV LOTS
        </span>
        {showTagline && (
          <span className="mt-1 hidden text-[0.5625rem] font-medium tracking-[0.2em] text-gold-400 uppercase sm:block">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
