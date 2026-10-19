import type { PriceLabel } from "@/types/property";

/**
 * Join conditional class names. Intentionally dependency-free: no runtime
 * dependency is needed here, so this is a small local helper rather than clsx.
 */
export function cn(
  ...inputs: Array<string | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}

const numberFormatter = new Intl.NumberFormat("en-PH", {
  maximumFractionDigits: 0,
});

/** Format a whole peso amount, e.g. `8500000` -> `₱8,500,000`. */
export function formatPeso(amount: number): string {
  return `₱${numberFormatter.format(amount)}`;
}

/** Format a display price, including a rental period when present. */
export function formatPrice(price: number, priceLabel?: PriceLabel): string {
  return `${formatPeso(price)}${priceLabel ?? ""}`;
}

/** Format a square-meter value, e.g. `120` -> `120 sqm`. */
export function formatArea(squareMeters: number): string {
  return `${numberFormatter.format(squareMeters)} sqm`;
}

/** Format a plain number with thousand separators. */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** Format an ISO date string for display, e.g. `Oct 19, 2026`. */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Convert arbitrary text into a URL-safe slug.
 * Used for generated demo property ids/slugs in the admin form.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
