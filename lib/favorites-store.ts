import { FAVORITES_STORAGE_KEY } from "@/lib/constants";

/**
 * Favorites live in a module-level external store read through
 * `useSyncExternalStore`. Only property ids are stored, never personal data.
 *
 * Reads are guarded, validated as `string[]`, deduplicated, and capped. When
 * storage is missing, corrupt, or blocked the store keeps working for the
 * current session using in-memory state.
 *
 * See openspec favorites spec.
 */

const MAX_FAVORITES = 500;

const EMPTY: ReadonlySet<string> = new Set<string>();

let favorites = new Set<string>();
let hydrated = false;
let cachedSnapshot: ReadonlySet<string> = EMPTY;
let storageAttached = false;

const listeners = new Set<() => void>();

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

function safeParse(raw: string | null): Set<string> {
  if (!raw) {
    return new Set();
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Set();
    }
    const ids = parsed
      .filter((value): value is string => typeof value === "string")
      .slice(0, MAX_FAVORITES);
    return new Set(ids);
  } catch {
    // Corrupt or unparsable stored value: start from a safe empty state.
    return new Set();
  }
}

function persist(next: Set<string>): void {
  if (!hasWindow()) {
    return;
  }
  try {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify([...next]),
    );
  } catch {
    // Storage unavailable (private mode, quota, blocked): keep session state.
  }
}

/**
 * Read and validate the stored ids. Accessing `window.localStorage` can throw
 * when storage is blocked (privacy mode, policy, sandbox), so the read is
 * guarded and falls back to an empty in-memory set.
 */
function readStored(): Set<string> {
  if (!hasWindow()) {
    return new Set();
  }
  try {
    return safeParse(window.localStorage.getItem(FAVORITES_STORAGE_KEY));
  } catch {
    return new Set();
  }
}

function ensureHydrated(): void {
  if (hydrated || !hasWindow()) {
    return;
  }
  hydrated = true;
  favorites = readStored();
  cachedSnapshot = new Set(favorites);
}

function notify(): void {
  cachedSnapshot = new Set(favorites);
  for (const listener of listeners) {
    listener();
  }
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== null && event.key !== FAVORITES_STORAGE_KEY) {
    return;
  }
  favorites = readStored();
  notify();
}

function attachStorageSync(): void {
  if (storageAttached || !hasWindow()) {
    return;
  }
  storageAttached = true;
  window.addEventListener("storage", handleStorage);
}

function detachStorageSync(): void {
  if (!storageAttached || !hasWindow()) {
    return;
  }
  storageAttached = false;
  window.removeEventListener("storage", handleStorage);
}

export function subscribe(listener: () => void): () => void {
  ensureHydrated();
  listeners.add(listener);
  if (listeners.size === 1) {
    attachStorageSync();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      detachStorageSync();
    }
  };
}

export function getSnapshot(): ReadonlySet<string> {
  ensureHydrated();
  return cachedSnapshot;
}

export function getServerSnapshot(): ReadonlySet<string> {
  return EMPTY;
}

export function toggleFavorite(id: string): void {
  ensureHydrated();
  if (favorites.has(id)) {
    favorites.delete(id);
  } else if (favorites.size < MAX_FAVORITES) {
    favorites.add(id);
  }
  persist(favorites);
  notify();
}
