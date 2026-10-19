import { cn } from "@/lib/utils";

/**
 * Neutral loading surface used as a Suspense fallback.
 * `animate-pulse` collapses under `prefers-reduced-motion` (see globals.css).
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-card bg-surface-muted", className)}
    />
  );
}

/** Placeholder for a single property card. */
export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-white">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-2/5" />
      </div>
    </div>
  );
}

/** Placeholder grid for the listings explorer. */
export function ListingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading properties"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
}

/** Placeholder for the property detail page. */
export function DetailSkeleton() {
  return (
    <div role="status" aria-label="Loading property" className="flex flex-col gap-8">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
