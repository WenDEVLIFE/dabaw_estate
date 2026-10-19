"use client";

import Image from "next/image";
import { GalleryIcon } from "@solar-icons/react/linear";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export interface SafeImageProps {
  src: string;
  alt: string;
  /** Responsive `sizes` hint. Provide one whenever the layout changes width. */
  sizes?: string;
  /** Preload the image, e.g. the single above-the-fold hero image. */
  preload?: boolean;
  /** Tailwind aspect-ratio utility for the reserved image surface. */
  aspectClassName?: string;
  /** Extra classes for the positioned wrapper. */
  className?: string;
  /** Classes for the underlying image element. */
  imageClassName?: string;
}

/**
 * `next/image` wrapper that reserves a fixed aspect ratio and shows an
 * "Image unavailable" surface when a remote image fails to load.
 * Needs to be a Client Component to handle the error state (openspec design).
 */
export function SafeImage({
  src,
  alt,
  sizes = DEFAULT_SIZES,
  preload = false,
  aspectClassName = "aspect-[4/3]",
  className,
  imageClassName,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cn(
        "relative block overflow-hidden bg-surface-muted",
        aspectClassName,
        className,
      )}
      role={failed ? "img" : undefined}
      aria-label={failed ? alt : undefined}
    >
      {failed ? (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-muted">
          <GalleryIcon aria-hidden="true" className="h-6 w-6" />
          <span className="text-xs font-medium">Image unavailable</span>
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          onError={() => setFailed(true)}
          className={cn("object-cover", imageClassName)}
        />
      )}
    </span>
  );
}
