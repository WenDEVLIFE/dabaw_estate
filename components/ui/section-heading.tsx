import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow + section heading + optional supporting copy.
 * Renders an `<h2>` by default so the page keeps one `<h1>` (openspec a11y).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className="type-eyebrow text-muted">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="type-section-title text-charcoal">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
