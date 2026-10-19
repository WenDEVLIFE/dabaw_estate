import type { ReactNode } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

/**
 * Responsive property grid: one column on mobile, two on tablet, three on
 * desktop (openspec property-listings / category-listings specs).
 * Renders `emptyState` when there are no records.
 */
export function PropertyGrid({
  properties,
  emptyState,
  className,
  ariaLabel,
}: {
  properties: readonly Property[];
  emptyState?: ReactNode;
  className?: string;
  /** Optional accessible label for the grid list. */
  ariaLabel?: string;
}) {
  if (properties.length === 0) {
    return <>{emptyState ?? null}</>;
  }

  return (
    <ul
      aria-label={ariaLabel}
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {properties.map((property) => (
        <li key={property.id} className="flex">
          <PropertyCard property={property} className="w-full" />
        </li>
      ))}
    </ul>
  );
}
