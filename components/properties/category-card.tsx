import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import type { CategoryCardData } from "@/data/categories";
import { cn } from "@/lib/utils";

/**
 * Homepage category card. The whole card is a single link to the category
 * route, so it is one tab stop with a clear accessible name.
 */
export function CategoryCard({
  category,
  className,
}: {
  category: CategoryCardData;
  className?: string;
}) {
  return (
    <Link
      href={category.href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-shadow hover:shadow-md",
        className,
      )}
    >
      <SafeImage
        src={category.image.src}
        alt={category.image.alt}
        aspectClassName="aspect-[16/10]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-charcoal">
          {category.label}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{category.blurb}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-forest">
          Explore
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
