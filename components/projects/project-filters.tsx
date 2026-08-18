"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";

/**
 * Location and type filters held in the URL rather than component state, so a
 * filtered view is shareable and the back button behaves. The Angular version
 * kept both in component fields, so neither was addressable.
 */
export function ProjectFilters({
  locations,
  types,
  total,
  shown,
}: {
  locations: string[];
  types: string[];
  total: number;
  shown: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const locationId = useId();
  const typeId = useId();

  // Ignore a URL value that is not in the current facet list — otherwise a
  // stale or hand-edited query leaves the select and the results disagreeing.
  const rawLocation = params.get("location") ?? "";
  const rawType = params.get("type") ?? "";
  const activeLocation = locations.includes(rawLocation) ? rawLocation : "";
  const activeType = types.includes(rawType) ? rawType : "";
  // Normalised values drive the selects. The escape hatch keys off the RAW query,
  // because a value that is not in the facet list still needs clearing — that is
  // exactly the case where the visitor is stuck.
  const hasFilters = Boolean(activeLocation || activeType);
  const hasQuery = Boolean(rawLocation || rawType);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  // Upstream returned nothing but the URL still carries a filter: show the way
  // out rather than an empty control.
  if (locations.length === 0 && types.length === 0) {
    return hasQuery ? (
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-200 pb-6">
        <p className="text-sm text-ink-600">Filters could not be loaded just now.</p>
        <Link
          href={pathname}
          scroll={false}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 transition-colors hover:text-gold-600"
        >
          <X aria-hidden="true" className="size-3.5" />
          Show all projects
        </Link>
      </div>
    ) : null;
  }

  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink-200 pb-6">
      <div className="flex flex-wrap gap-4">
        <div>
          <label
            htmlFor={locationId}
            className="block text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase"
          >
            Location
          </label>
          <select
            id={locationId}
            value={activeLocation}
            onChange={(event) => update("location", event.target.value)}
            className="mt-2 h-11 min-w-48 rounded-pill border border-ink-300 bg-surface px-4 text-sm text-ink-800 transition-colors hover:border-gold-500"
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={typeId}
            className="block text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase"
          >
            Type
          </label>
          <select
            id={typeId}
            value={activeType}
            onChange={(event) => update("type", event.target.value)}
            className="mt-2 h-11 min-w-48 rounded-pill border border-ink-300 bg-surface px-4 text-sm text-ink-800 transition-colors hover:border-gold-500"
          >
            <option value="">All types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm text-ink-500 tabular-nums">
          {shown === total ? `${total} projects` : `${shown} of ${total}`}
        </p>
        {/* Rendered only when it does something — an opacity-0 link is still
            focusable and still announced by a screen reader. */}
        {hasFilters && (
          <Link
            href={pathname}
            scroll={false}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-gold-700"
          >
            <X aria-hidden="true" className="size-3.5" />
            Clear filters
          </Link>
        )}
      </div>
    </div>
  );
}
