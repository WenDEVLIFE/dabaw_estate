# Apply Progress — DABAW ESTATE Frontend-Only Real Estate Prototype

Artifact store: `openspec` · Mode: **Standard** (`strict_tdd: false`, no test runner)
Delivery strategy: **single PR with maintainer-approved `size:exception`** (no chained PRs)
Active change: `dabaw-estate-site`

---

## Batch 1 — Phases 1–6 (tasks 1.1 → 6.4)

**Status:** complete
**Scope:** Foundation & dependencies · Domain layer · Favorites store · Shared UI primitives · Shell & layout · Property display components
**Out of scope (untouched):** Phases 7–14 (homepage, listings/category routes, detail page, inquiry, admin, polish, final verification)

### Tasks completed (all ticked `[x]` in `tasks.md`)

- [x] 1.1 Install `lucide-react` (+ `package.json`, `package-lock.json`)
- [x] 1.2 `images.remotePatterns` for `images.unsplash.com` + `images.pexels.com`
- [x] 1.3 `app/globals.css` tokens, typography utilities, focus ring, reduced motion
- [x] 2.1 `types/property.ts`
- [x] 2.2 `types/inquiry.ts`
- [x] 2.3 `lib/utils.ts`
- [x] 2.4 `lib/constants.ts`
- [x] 2.5 `lib/navigation.ts`
- [x] 2.6 `data/properties.ts` (12 records)
- [x] 2.7 `data/categories.ts`, `data/areas.ts`, `data/demo-inquiries.ts`
- [x] 2.8 `lib/listing.ts`
- [x] 2.9 `lib/validation.ts`
- [x] 3.1 `lib/favorites-store.ts`
- [x] 4.1–4.7 `components/ui/*` (container, button, badge, section-heading, empty-state, skeleton, safe-image)
- [x] 5.1–5.5 `components/layout/*`, `app/layout.tsx`, `app/not-found.tsx`
- [x] 6.1–6.4 `components/properties/*` (favorite-button, property-card, property-grid, category-card, area-highlights)

### Files created / modified

| File | Action | Notes |
|------|--------|-------|
| `package.json` / `package-lock.json` | Modified | Added `lucide-react` (only new runtime dep) |
| `next.config.ts` | Modified | Added `images.remotePatterns`; all other options untouched |
| `app/globals.css` | Modified | `@theme` tokens, `@theme inline` font vars, typography utilities, focus/reduced-motion |
| `types/property.ts` | Created | Unions, `Property`, `PropertyImage`, `PropertyDraft`, option metadata |
| `types/inquiry.ts` | Created | `InquiryValues`, `InquiryErrors`, `DemoInquiry` |
| `lib/utils.ts` | Created | `cn`, peso/area/date formatting, `slugify` |
| `lib/constants.ts` | Created | Exact demo disclosure, admin banner, success string, storage key, fixed copyright year |
| `lib/navigation.ts` | Created | `PRIMARY_NAV`, `FOOTER_NAV` |
| `lib/listing.ts` | Created | `parseListingFilters`, `applyFilters`, `sortProperties`, `filtersToQuery`, `countActiveFilters` |
| `lib/validation.ts` | Created | `validateInquiry`, `validatePropertyDraft` |
| `lib/favorites-store.ts` | Created | Guarded localStorage store + `useSyncExternalStore` snapshots |
| `data/properties.ts` | Created | 12 fictional records + lookup helpers |
| `data/categories.ts` | Created | 4 category cards |
| `data/areas.ts` | Created | 7 Davao area highlights |
| `data/demo-inquiries.ts` | Created | 4 clearly-labeled sample inquiries |
| `components/ui/*` (7 files) | Created | Shared primitives |
| `components/layout/*` (3 files) | Created | Demo notice, footer (server), header (client) |
| `app/layout.tsx` | Modified | Fonts, metadata template, skip link, header/main/footer shell |
| `app/not-found.tsx` | Created | Shell 404 → `/properties` |
| `components/properties/*` (5 files) | Created | Favorite button, card, grid, category card, area highlights |
| `openspec/changes/dabaw-estate-site/tasks.md` | Modified | Tickboxes only (Phases 1–6) |

### Data coverage check (spec: mock-property-data)

- 12 records, unique `id`/`slug`, 3 featured (`p-001`, `p-004`, `p-010`).
- Categories: `for-sale` 3, `for-rent` 4, `commercial` 2, `short-stay` 3.
- Areas: Matina, Ecoland, Buhangin, Lanang, Bajada, Toril, Downtown Davao — all present.
- Rent/short-stay carry `priceLabel`; sale records omit it. All `status: "sample"`, fictional copy, no verified/guaranteed claims.

### Commands run

| Command | Result | Summary |
|---------|--------|---------|
| `npm install lucide-react --save` | Pass | `added 1 package, audited 359 packages`. Project `package.json`/`package-lock.json` updated (`lucide-react ^1.59.0`). Pre-existing npm advisory output (5 high) unrelated to this change. |
| `npm run lint` | Pass | First run flagged `react-hooks/set-state-in-effect` in `site-header.tsx`; fixed by removing the pathname-change effect (menu links close on click, Escape returns focus). Final run: clean, 0 errors/0 warnings. |
| `npx tsc --noEmit` | Pass | No output (strict-clean). |
| `npm run build` | Pass | First run failed: `/ _not-found` blocked `new Date()` under `cacheComponents`. Fixed via static `COPYRIGHT_YEAR`. Final run: compiled + TypeScript + prerender OK; routes `/` and `/_not-found` prerendered as static. |

### Work Unit Evidence

| Evidence | Value |
|----------|-------|
| Focused test command and exact result | `npm run lint` → exit 0, no output (0 problems). `npx tsc --noEmit` → exit 0, no output. Both run in `E:\web_projects\dabaw_estate`. |
| Runtime harness command/scenario and exact result | `npm run build` → `Compiled successfully`; `Finished TypeScript`; prerendered `Generate static pages (4/4)`. Route table: `/` (static), `/_not-found` (static). Confirms the new shell (fonts, Tailwind `@theme` tokens, client `SiteHeader` island, server footer) compiles and prerenders under `cacheComponents`. No route-level UI in this batch beyond the shell/404. |
| Rollback boundary | Revert `app/layout.tsx`, `app/globals.css`, `next.config.ts`, `app/not-found.tsx`; delete `components/`, `data/`, `lib/`, `types/`; `npm uninstall lucide-react`. None of Phases 7–14 is started, so rollback removes only batch-1 work. |

### Deviations from design

1. **`lib/constants.ts` adds `COPYRIGHT_YEAR = "2026"`** (not listed in the design file map). Required because `cacheComponents` rejects the unstable `new Date()` value during prerender; the footer needs a static year. Documented inline.
2. **`types/property.ts` adds `PropertyDraft`, `PropertyDraftErrors`, `PriceLabel`, `PRICE_LABELS`, `SortOption`.** The design names `validatePropertyDraft`/`validateInquiry` but does not fix a draft shape; these types are the minimal contract the pure validators and the future admin form (Phase 12) share.
3. **`components/layout/site-header.tsx` does not close the menu on route change.** Removed to satisfy `react-hooks/set-state-in-effect`; every in-menu link and the menu CTA close the panel `onClick`, and Escape returns focus to the trigger. The spec scenario (select a menu link → route loads and menu closes) is preserved.
4. **`PropertyGrid` exposes an optional `ariaLabel`/`emptyState`.** Kept the grid presentational so Phase 8's `ListingExplorer` owns count/empty-state wording.
5. `data/demo-inquiries.ts` ships 4 sample inquiries (design says "sample inquiries"); each is `sample: true` and prefixed "Sample".

### Issues found / gotchas

- **Next 16 `cacheComponents` blocks `new Date()` in prerendered Server Components** (`blocking-prerender-current-time`). Any future footer/header/date logic must avoid runtime current-time, or be wrapped in `"use client"`/`"use cache"`. Captured for later batches (e.g. admin `createdAt` defaults are data strings, not `new Date()`).
- **Pre-existing parent lockfile warning:** `next build` warns `package-lock.json in E:\web_projects is outside the current Git repository`. The stray lockfile lives in the parent folder (`E:\web_projects\`), not in this repo. Warning only; build succeeds. Not modified by this batch.
- Remote image URLs (Unsplash) are curated but not individually fetch-verified during build; `SafeImage` provides an "Image unavailable" fallback per design.

### Blockers

None. Batch 1 is self-contained; nothing outside the assigned scope was touched.

### Next

Batch 2 (Phases 7–10: homepage, listings/category routes, detail page, inquiry forms). Phase 7 builds `app/page.tsx` and `HeroSearch`; the domain layer, shell, cards, and `EmptyState`/`Skeleton` primitives from this batch are ready for it.
