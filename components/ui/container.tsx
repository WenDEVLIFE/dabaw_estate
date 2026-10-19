import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Page-width wrapper with responsive horizontal padding.
 * Base max width follows docs/theme.md §5 (1280px). On ultrawide viewports
 * (2xl / 1536px+) the container widens to 1536px so the layout does not leave
 * excessive empty gutters, while keeping a bounded, readable content width.
 */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-page px-4 sm:px-6 lg:px-12 2xl:max-w-[1536px]",
        className,
      )}
      {...props}
    />
  );
}
