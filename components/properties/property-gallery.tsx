"use client";

import { useState, type KeyboardEvent } from "react";
import { AltArrowLeftIcon, AltArrowRightIcon } from "@solar-icons/react/linear";
import { SafeImage } from "@/components/ui/safe-image";
import type { PropertyImage } from "@/types/property";

/**
 * Keyboard-operable image gallery. Previous/next buttons stop at the ends,
 * the position is announced through a polite live region, and `SafeImage`
 * supplies a fallback surface when a remote image fails.
 */
export function PropertyGallery({
  images,
  title,
}: {
  images: readonly PropertyImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  if (total === 0) {
    return null;
  }

  const safeIndex = Math.min(index, total - 1);
  const current = images[safeIndex];
  const hasMultiple = total > 1;

  function goTo(next: number) {
    setIndex(Math.min(Math.max(next, 0), total - 1));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(safeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(safeIndex + 1);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="group"
        aria-roledescription="image gallery"
        aria-label={`${title} image gallery`}
        onKeyDown={handleKeyDown}
        className="relative overflow-hidden rounded-card border border-border bg-surface-muted"
      >
        <SafeImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          sizes="(max-width: 1024px) 100vw, 60vw"
          aspectClassName="aspect-[4/3]"
        />

        {hasMultiple ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo(safeIndex - 1)}
              disabled={safeIndex === 0}
              className="absolute left-3 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-charcoal shadow-sm transition-colors hover:text-forest disabled:cursor-not-allowed disabled:opacity-40"
            >
              <AltArrowLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo(safeIndex + 1)}
              disabled={safeIndex === total - 1}
              className="absolute right-3 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-charcoal shadow-sm transition-colors hover:text-forest disabled:cursor-not-allowed disabled:opacity-40"
            >
              <AltArrowRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-muted"
        >
          Image {safeIndex + 1} of {total}
        </p>
        {hasMultiple ? (
          <p className="text-xs text-muted">
            Use the arrow buttons or left and right arrow keys.
          </p>
        ) : null}
      </div>
    </div>
  );
}
