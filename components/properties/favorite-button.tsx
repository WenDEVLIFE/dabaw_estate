"use client";

import { HeartIcon } from "@solar-icons/react/linear";
import { useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  toggleFavorite,
} from "@/lib/favorites-store";
import { cn } from "@/lib/utils";

export interface FavoriteButtonProps {
  propertyId: string;
  propertyTitle: string;
  /** `labeled` also renders a text state next to the icon. */
  variant?: "icon" | "labeled";
  className?: string;
}

/**
 * Store-backed favorite toggle. Every instance subscribes to the same external
 * store, so a toggle on one card updates the detail page and other cards too.
 * State is exposed through `aria-pressed` plus a title-bearing label.
 */
export function FavoriteButton({
  propertyId,
  propertyTitle,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isFavorite = favorites.has(propertyId);
  const label = isFavorite
    ? `Remove ${propertyTitle} from favorites`
    : `Save ${propertyTitle} to favorites`;

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={label}
      title={label}
      onClick={() => toggleFavorite(propertyId)}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-control border border-border bg-white/90 text-charcoal shadow-sm transition-colors hover:text-forest",
        isFavorite && "border-gold text-forest",
        variant === "labeled" && "px-3",
        className,
      )}
    >
      <HeartIcon
        aria-hidden="true"
        className={cn("h-5 w-5", isFavorite && "fill-gold text-forest")}
      />
      {variant === "labeled" ? (
        <span className="text-sm font-medium">
          {isFavorite ? "Saved" : "Save"}
        </span>
      ) : null}
    </button>
  );
}
