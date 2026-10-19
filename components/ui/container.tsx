import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Page-width wrapper with responsive horizontal padding.
 * Max width and padding follow docs/theme.md §5.
 */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-page px-4 sm:px-6 lg:px-12",
        className,
      )}
      {...props}
    />
  );
}
