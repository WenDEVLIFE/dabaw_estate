"use client";

import { MagnifierIcon } from "@solar-icons/react/linear";
import { cn } from "@/lib/utils";

/**
 * Labeled listing text search. The explorer owns the value so results update
 * locally on every keystroke and the URL stays in sync.
 */
export function PropertySearch({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label
        htmlFor="listing-search"
        className="text-sm font-medium text-charcoal"
      >
        Search properties
      </label>
      <div className="relative">
        <MagnifierIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          id="listing-search"
          name="q"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try Lanang, Matina, or garden"
          autoComplete="off"
          className="min-h-11 w-full rounded-control border border-border bg-white py-2 pl-10 pr-3 text-sm text-charcoal transition-colors hover:border-forest/60"
        />
      </div>
      <p className="text-xs leading-relaxed text-muted">
        Matches sample titles, areas, and descriptions as you type.
      </p>
    </div>
  );
}
