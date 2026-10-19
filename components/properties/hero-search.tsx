"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { MagnifierIcon } from "@solar-icons/react/linear";
import { Button } from "@/components/ui/button";
import {
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

/**
 * Homepage search panel. Every control has a visible label; submitting pushes
 * the selected criteria to `/properties`, where the local explorer applies
 * them without a page reload.
 */
export function HeroSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [area, setArea] = useState<DavaoArea | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [transaction, setTransaction] = useState<TransactionType | "">("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (area) {
      params.set("area", area);
    }
    if (category) {
      params.set("category", category);
    }
    if (transaction) {
      params.set("transaction", transaction);
    }

    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  }

  return (
    <form
      aria-label="Find a sample property"
      onSubmit={handleSubmit}
      className={cn(
        "rounded-card border border-border bg-white p-4 shadow-lg shadow-forest-deep/10 sm:p-6",
        className,
      )}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="hero-area"
            className="text-sm font-medium text-charcoal"
          >
            Location
          </label>
          <select
            id="hero-area"
            name="area"
            value={area}
            onChange={(event) =>
              setArea(event.target.value as DavaoArea | "")
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

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="hero-category"
            className="text-sm font-medium text-charcoal"
          >
            Category
          </label>
          <select
            id="hero-category"
            name="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as Category | "")
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

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor="hero-transaction"
            className="text-sm font-medium text-charcoal"
          >
            Transaction
          </label>
          <select
            id="hero-transaction"
            name="transaction"
            value={transaction}
            onChange={(event) =>
              setTransaction(event.target.value as TransactionType | "")
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
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          Search runs against the local sample dataset only.
        </p>
        <Button type="submit" className="w-full sm:w-auto">
          <MagnifierIcon aria-hidden="true" className="h-4 w-4" />
          Search properties
        </Button>
      </div>
    </form>
  );
}
