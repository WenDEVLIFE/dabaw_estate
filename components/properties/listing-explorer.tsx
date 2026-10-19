"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CloseIcon } from "@solar-icons/react/linear";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PropertyFilters } from "@/components/properties/property-filters";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertySearch } from "@/components/properties/property-search";
import {
  applyFilters,
  countActiveFilters,
  createEmptyFilters,
  filtersToQuery,
  parseListingFilters,
  sortProperties,
  type ListingFilters,
} from "@/lib/listing";
import { formatPeso } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  SORT_OPTIONS,
  TRANSACTION_LABELS,
  type Category,
  type Property,
  type SortOption,
} from "@/types/property";

/**
 * Client listing orchestrator. It renders from local state initialized from
 * the URL, then writes changes back with `window.history.replaceState` so the
 * query string stays shareable without an RSC navigation per keystroke.
 *
 * This component calls `useSearchParams`, so every page that renders it MUST
 * wrap it in a `<Suspense>` boundary.
 */
export function ListingExplorer({
  properties,
  basePath,
  lockedCategory,
  ariaLabel = "Property results",
}: {
  properties: readonly Property[];
  basePath: string;
  lockedCategory?: Category;
  ariaLabel?: string;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ListingFilters>(() => {
    const parsed = parseListingFilters(
      new URLSearchParams(searchParams.toString()),
    );
    if (lockedCategory) {
      delete parsed.category;
    }
    return parsed;
  });

  function commit(next: ListingFilters) {
    setFilters(next);
    if (typeof window === "undefined") {
      return;
    }
    const query = filtersToQuery(next);
    window.history.replaceState(
      null,
      "",
      query ? `${basePath}?${query}` : basePath,
    );
  }

  function update(patch: Partial<ListingFilters>) {
    commit({ ...filters, ...patch });
  }

  function clearAll() {
    commit(createEmptyFilters());
  }

  const results = sortProperties(
    applyFilters(properties, filters, lockedCategory),
    filters.sort,
  );
  const activeCount = countActiveFilters(filters);

  const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];
  const query = filters.q.trim();
  if (query) {
    chips.push({
      key: "q",
      label: `Search: "${query}"`,
      onRemove: () => update({ q: "" }),
    });
  }
  if (filters.category) {
    chips.push({
      key: "category",
      label: CATEGORY_LABELS[filters.category],
      onRemove: () => update({ category: undefined }),
    });
  }
  if (filters.transaction) {
    chips.push({
      key: "transaction",
      label: TRANSACTION_LABELS[filters.transaction],
      onRemove: () => update({ transaction: undefined }),
    });
  }
  if (filters.area) {
    chips.push({
      key: "area",
      label: filters.area,
      onRemove: () => update({ area: undefined }),
    });
  }

  const { minPrice, maxPrice } = filters;
  if (minPrice !== undefined || maxPrice !== undefined) {
    let priceLabel = "";
    if (minPrice !== undefined && maxPrice !== undefined) {
      priceLabel = `Price: ${formatPeso(minPrice)} to ${formatPeso(maxPrice)}`;
    } else if (minPrice !== undefined) {
      priceLabel = `Price from ${formatPeso(minPrice)}`;
    } else if (maxPrice !== undefined) {
      priceLabel = `Price up to ${formatPeso(maxPrice)}`;
    }
    chips.push({
      key: "price",
      label: priceLabel,
      onRemove: () => update({ minPrice: undefined, maxPrice: undefined }),
    });
  }

  if (filters.beds !== undefined) {
    chips.push({
      key: "beds",
      label: `${filters.beds}+ bedrooms`,
      onRemove: () => update({ beds: undefined }),
    });
  }
  if (filters.baths !== undefined) {
    chips.push({
      key: "baths",
      label: `${filters.baths}+ bathrooms`,
      onRemove: () => update({ baths: undefined }),
    });
  }

  const noun = results.length === 1 ? "property" : "properties";
  const verb = results.length === 1 ? "matches" : "match";
  const statusText =
    activeCount > 0
      ? `${results.length} ${noun} ${verb} the current filters.`
      : `${results.length} sample ${noun} shown.`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PropertySearch
          value={filters.q}
          onChange={(value) => update({ q: value })}
          className="lg:max-w-xl lg:flex-1"
        />

        <div className="flex min-w-0 flex-col gap-1.5 lg:w-56">
          <label
            htmlFor="listing-sort"
            className="text-sm font-medium text-charcoal"
          >
            Sort by
          </label>
          <select
            id="listing-sort"
            value={filters.sort}
            onChange={(event) =>
              update({ sort: event.target.value as SortOption })
            }
            className="min-h-11 w-full rounded-control border border-border bg-white px-3 text-sm text-charcoal transition-colors hover:border-forest/60"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <PropertyFilters
        filters={filters}
        activeCount={activeCount}
        lockedCategory={lockedCategory}
        onChange={update}
      />

      {chips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-charcoal">
            Active filters
          </span>
          <ul aria-label="Active filters" className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Remove filter ${chip.label}`}
                  className="inline-flex min-h-11 max-w-full items-center gap-1.5 whitespace-normal break-words rounded-full border border-border bg-white px-3 text-left text-sm text-charcoal transition-colors hover:border-forest hover:text-forest"
                >
                  {chip.label}
                  <CloseIcon aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm font-medium text-charcoal"
        >
          {statusText}
        </p>
        {activeCount > 0 ? (
          <Button variant="tertiary" size="sm" onClick={clearAll}>
            Clear all filters
          </Button>
        ) : null}
      </div>

      <PropertyGrid
        properties={results}
        ariaLabel={ariaLabel}
        emptyState={
          <EmptyState
            title="No sample properties match"
            description="Try a different search term, remove a filter, or clear everything to see the full sample set."
            action={
              <Button variant="secondary" onClick={clearAll}>
                Clear filters
              </Button>
            }
          />
        }
      />
    </div>
  );
}
