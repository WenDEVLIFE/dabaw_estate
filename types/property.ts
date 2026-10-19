/**
 * Domain types for DABAW ESTATE sample property data.
 * Option arrays are `as const` so they can drive both runtime filter metadata
 * and compile-time unions. See openspec design.md §Data Model and Interfaces.
 */

export const CATEGORIES = [
  "for-sale",
  "for-rent",
  "commercial",
  "short-stay",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const TRANSACTIONS = ["sale", "rent", "lease"] as const;
export type TransactionType = (typeof TRANSACTIONS)[number];

export const DAVAO_AREAS = [
  "Matina",
  "Ecoland",
  "Buhangin",
  "Lanang",
  "Bajada",
  "Toril",
  "Downtown Davao",
] as const;
export type DavaoArea = (typeof DAVAO_AREAS)[number];

export const PROPERTY_TYPES = [
  "House",
  "Townhouse",
  "Condominium",
  "Apartment",
  "Lot",
  "Office",
  "Retail",
  "Warehouse",
  "Transient",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PRICE_LABELS = ["/month", "/night"] as const;
export type PriceLabel = (typeof PRICE_LABELS)[number];

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  category: Category;
  transactionType: TransactionType;
  propertyType: PropertyType;
  /** Whole Philippine pesos. Sample data only. */
  price: number;
  priceLabel?: PriceLabel;
  location: DavaoArea;
  /** Fictional street-level label. Optional. */
  addressLabel?: string;
  description: string;
  /** `images[0]` is the card and detail hero image. */
  images: PropertyImage[];
  bedrooms?: number;
  bathrooms?: number;
  /** Square meters. */
  floorArea?: number;
  /** Square meters. */
  lotArea?: number;
  /** Parking slots. */
  parking?: number;
  amenities?: string[];
  featured: boolean;
  status: "sample";
  /** ISO date string. */
  createdAt: string;
}

/**
 * Editable, raw-string draft used by the demo admin property form.
 * Validation parses numeric strings and produces a field-keyed error map.
 */
export interface PropertyDraft {
  title: string;
  category: Category | "";
  transactionType: TransactionType | "";
  propertyType: PropertyType | "";
  price: string;
  location: DavaoArea | "";
  description: string;
  bedrooms: string;
  bathrooms: string;
  floorArea: string;
  lotArea: string;
  parking: string;
  amenities: string;
}

export type PropertyDraftErrors = Partial<Record<keyof PropertyDraft, string>>;

export const CATEGORY_LABELS = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  commercial: "Commercial",
  "short-stay": "Short Stay",
} as const satisfies Record<Category, string>;

export const TRANSACTION_LABELS = {
  sale: "Sale",
  rent: "Rent",
  lease: "Lease",
} as const satisfies Record<TransactionType, string>;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured first" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

/** Minimum bedroom count. `4` means "4 or more". */
export const BED_OPTIONS = [1, 2, 3, 4] as const;

/** Minimum bathroom count. `4` means "4 or more". */
export const BATH_OPTIONS = [1, 2, 3, 4] as const;
