import {
  CATEGORIES,
  DAVAO_AREAS,
  TRANSACTIONS,
  type Category,
  type DavaoArea,
  type Property,
  type SortOption,
  type TransactionType,
} from "@/types/property";

export type SortKey = SortOption;

export interface ListingFilters {
  q: string;
  category?: Category;
  transaction?: TransactionType;
  area?: DavaoArea;
  minPrice?: number;
  maxPrice?: number;
  /** Minimum bedrooms; `4` means "4 or more". */
  beds?: number;
  /** Minimum bathrooms; `4` means "4 or more". */
  baths?: number;
  sort: SortKey;
}

export const DEFAULT_SORT: SortKey = "featured";

const SORT_KEYS: readonly SortKey[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
];

export type ListingFilterInput =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

export function createEmptyFilters(): ListingFilters {
  return { q: "", sort: DEFAULT_SORT };
}

function readRaw(input: ListingFilterInput, key: string): string | undefined {
  if (input instanceof URLSearchParams) {
    return input.get(key) ?? undefined;
  }
  const value = input[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value ?? undefined;
}

function parsePositiveInt(value: string | undefined): number | undefined {
  if (value === undefined) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
}

function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

function isTransaction(value: string): value is TransactionType {
  return (TRANSACTIONS as readonly string[]).includes(value);
}

function isArea(value: string): value is DavaoArea {
  return (DAVAO_AREAS as readonly string[]).includes(value);
}

function isSortKey(value: string): value is SortKey {
  return (SORT_KEYS as readonly string[]).includes(value);
}

/**
 * Read and validate listing filters from a URL query.
 * Unknown or invalid values are dropped rather than rejected, so a hand-edited
 * URL always renders a sensible result set.
 */
export function parseListingFilters(
  input: ListingFilterInput,
): ListingFilters {
  const filters: ListingFilters = { q: "", sort: DEFAULT_SORT };

  const q = readRaw(input, "q");
  if (q) {
    filters.q = q;
  }

  const category = readRaw(input, "category");
  if (category && isCategory(category)) {
    filters.category = category;
  }

  const transaction = readRaw(input, "transaction");
  if (transaction && isTransaction(transaction)) {
    filters.transaction = transaction;
  }

  const area = readRaw(input, "area");
  if (area && isArea(area)) {
    filters.area = area;
  }

  const minPrice = parsePositiveInt(readRaw(input, "minPrice"));
  const maxPrice = parsePositiveInt(readRaw(input, "maxPrice"));
  // A contradictory range drops both bounds instead of matching nothing.
  const contradictoryRange =
    minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice;
  if (!contradictoryRange) {
    if (minPrice !== undefined) {
      filters.minPrice = minPrice;
    }
    if (maxPrice !== undefined) {
      filters.maxPrice = maxPrice;
    }
  }

  const beds = parsePositiveInt(readRaw(input, "beds"));
  if (beds !== undefined) {
    filters.beds = beds;
  }

  const baths = parsePositiveInt(readRaw(input, "baths"));
  if (baths !== undefined) {
    filters.baths = baths;
  }

  const sort = readRaw(input, "sort");
  if (sort && isSortKey(sort)) {
    filters.sort = sort;
  }

  return filters;
}

/**
 * Apply search text and filters with AND logic.
 * When `lockedCategory` is provided the category is fixed by the route and any
 * category value carried in the URL is ignored.
 */
export function applyFilters(
  properties: readonly Property[],
  filters: ListingFilters,
  lockedCategory?: Category,
): Property[] {
  const query = filters.q.trim().toLowerCase();

  let minPrice = filters.minPrice;
  let maxPrice = filters.maxPrice;
  if (
    minPrice !== undefined &&
    maxPrice !== undefined &&
    minPrice > maxPrice
  ) {
    minPrice = undefined;
    maxPrice = undefined;
  }

  return properties.filter((property) => {
    if (lockedCategory) {
      if (property.category !== lockedCategory) {
        return false;
      }
    } else if (filters.category && property.category !== filters.category) {
      return false;
    }

    if (
      filters.transaction &&
      property.transactionType !== filters.transaction
    ) {
      return false;
    }

    if (filters.area && property.location !== filters.area) {
      return false;
    }

    if (minPrice !== undefined && property.price < minPrice) {
      return false;
    }

    if (maxPrice !== undefined && property.price > maxPrice) {
      return false;
    }

    if (
      filters.beds !== undefined &&
      (property.bedrooms ?? -1) < filters.beds
    ) {
      return false;
    }

    if (
      filters.baths !== undefined &&
      (property.bathrooms ?? -1) < filters.baths
    ) {
      return false;
    }

    if (query) {
      const haystack =
        `${property.title} ${property.location} ${property.description}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/** Sort a copy of the records. Ties fall back to newest-first ordering. */
export function sortProperties(
  properties: readonly Property[],
  sort: SortKey,
): Property[] {
  const sorted = [...properties];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
  }
}

/** Serialize filters to a query string, omitting default values. */
export function filtersToQuery(filters: ListingFilters): string {
  const params = new URLSearchParams();

  const q = filters.q.trim();
  if (q) {
    params.set("q", q);
  }
  if (filters.category) {
    params.set("category", filters.category);
  }
  if (filters.transaction) {
    params.set("transaction", filters.transaction);
  }
  if (filters.area) {
    params.set("area", filters.area);
  }
  if (filters.minPrice !== undefined) {
    params.set("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", String(filters.maxPrice));
  }
  if (filters.beds !== undefined) {
    params.set("beds", String(filters.beds));
  }
  if (filters.baths !== undefined) {
    params.set("baths", String(filters.baths));
  }
  if (filters.sort !== DEFAULT_SORT) {
    params.set("sort", filters.sort);
  }

  return params.toString();
}

/** Count active filters, excluding sort and the search text. */
export function countActiveFilters(filters: ListingFilters): number {
  let count = 0;
  if (filters.q.trim()) {
    count += 1;
  }
  if (filters.category) {
    count += 1;
  }
  if (filters.transaction) {
    count += 1;
  }
  if (filters.area) {
    count += 1;
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    count += 1;
  }
  if (filters.beds !== undefined) {
    count += 1;
  }
  if (filters.baths !== undefined) {
    count += 1;
  }
  return count;
}
