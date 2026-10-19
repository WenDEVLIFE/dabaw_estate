import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Empty listings or admin state with an optional action slot. */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-card border border-border bg-white px-6 py-12 text-center",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
