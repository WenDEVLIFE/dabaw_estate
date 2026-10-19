"use client";

import { useState } from "react";
import { AltArrowDownIcon, TuningIcon } from "@solar-icons/react/linear";
import type { ListingFilters } from "@/lib/listing";
import {
  BATH_OPTIONS,
  BED_OPTIONS,
  CATEGORIES,
  CATEGORY_LABELS,
  DAVAO_AREAS,
  TRANSACTIONS,
  TRANSACTION_LABELS,
  type Category,
  type DavaoArea,
  type TransactionType,
} from "@/types/property";
import { cn } from "@/lib/utils";

const CONTROL_CLASSES =
  "min-h-11 w-full rounded-control border border-border bg-white px-3 text-sm text-charcoal transition-colors hover:border-forest/60";

function parsePrice(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

/**
 * Listing filters. Controls combine with AND logic in `applyFilters`.
 * On mobile the panel collapses behind a labeled disclosure button; on
 * desktop it stays visible.
 */
export function PropertyFilters({
  filters,
  activeCount,
  lockedCategory,
  onChange,
}: {
  filters: ListingFilters;
  activeCount: number;
  lockedCategory?: Category;
  onChange: (patch: Partial<ListingFilters>) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-card border border-border bg-surface-muted p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-charcoal">
          <TuningIcon aria-hidden="true" className="h-4 w-4 text-forest" />
          Filters
          {activeCount > 0 ? (
            <span className="text-sm font-medium text-muted">
              ({activeCount} active)
            </span>
          ) : null}
        </h2>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="listing-filters-panel"
          onClick={() => setOpen((previous) => !previous)}
          className="inline-flex min-h-11 items-center gap-2 rounded-control border border-border bg-white px-3 text-sm font-medium text-charcoal transition-colors hover:text-forest lg:hidden"
        >
          {open ? "Hide filters" : "Show filters"}
          <AltArrowDownIcon
            aria-hidden="true"
            className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      <div
        id="listing-filters-panel"
        className={cn(
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
          open ? "grid" : "hidden",
          "lg:grid",
        )}
      >
        {lockedCategory ? (
          <p className="text-sm text-muted sm:col-span-2 lg:col-span-4">
            Category:{" "}
            <span className="font-medium text-charcoal">
              {CATEGORY_LABELS[lockedCategory]}
            </span>{" "}
            (fixed by this page)
          </p>
        ) : (
          <div className="flex min-w-0 flex-col gap-1.5">
            <label
              htmlFor="filter-category"
              className="text-sm font-medium text-charcoal"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={filters.category ?? ""}
              onChange={(event) =>
                onChange({
                  category: event.target.value
                    ? (event.target.value as Category)
                    : undefined,
                })
              }
              className={CONTROL_CLASSES}
            >
              <option value="">Any category</option>
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {CATEGORY_LABELS[option]}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="filter-transaction"
            className="text-sm font-medium text-charcoal"
          >
            Transaction
          </label>
          <select
            id="filter-transaction"
            value={filters.transaction ?? ""}
            onChange={(event) =>
              onChange({
                transaction: event.target.value
                  ? (event.target.value as TransactionType)
                  : undefined,
              })
            }
            className={CONTROL_CLASSES}
          >
            <option value="">Any transaction</option>
            {TRANSACTIONS.map((option) => (
              <option key={option} value={option}>
                {TRANSACTION_LABELS[option]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="filter-area"
            className="text-sm font-medium text-charcoal"
          >
            Location
          </label>
          <select
            id="filter-area"
            value={filters.area ?? ""}
            onChange={(event) =>
              onChange({
                area: event.target.value
                  ? (event.target.value as DavaoArea)
                  : undefined,
              })
            }
            className={CONTROL_CLASSES}
          >
            <option value="">Any Davao area</option>
            {DAVAO_AREAS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="flex min-w-0 flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
          <legend className="mb-1.5 text-sm font-medium text-charcoal">
            Price range (₱)
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              aria-label="Minimum price in pesos"
              placeholder="Min"
              value={filters.minPrice ?? ""}
              onChange={(event) =>
                onChange({ minPrice: parsePrice(event.target.value) })
              }
              className={CONTROL_CLASSES}
            />
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              aria-label="Maximum price in pesos"
              placeholder="Max"
              value={filters.maxPrice ?? ""}
              onChange={(event) =>
                onChange({ maxPrice: parsePrice(event.target.value) })
              }
              className={CONTROL_CLASSES}
            />
          </div>
        </fieldset>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="filter-beds"
            className="text-sm font-medium text-charcoal"
          >
            Bedrooms
          </label>
          <select
            id="filter-beds"
            value={filters.beds ?? ""}
            onChange={(event) =>
              onChange({
                beds: event.target.value
                  ? Number(event.target.value)
                  : undefined,
              })
            }
            className={CONTROL_CLASSES}
          >
            <option value="">Any bedrooms</option>
            {BED_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 4 ? "4+ bedrooms" : `${option}+ bedrooms`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="filter-baths"
            className="text-sm font-medium text-charcoal"
          >
            Bathrooms
          </label>
          <select
            id="filter-baths"
            value={filters.baths ?? ""}
            onChange={(event) =>
              onChange({
                baths: event.target.value
                  ? Number(event.target.value)
                  : undefined,
              })
            }
            className={CONTROL_CLASSES}
          >
            <option value="">Any bathrooms</option>
            {BATH_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 4 ? "4+ bathrooms" : `${option}+ bathrooms`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
