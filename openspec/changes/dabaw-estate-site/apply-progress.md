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

---

## Batch 2 — Phases 7–11 (tasks 7.1 → 11.1)

**Status:** complete
**Scope:** Homepage · listing search/filter/sort + five routes · property detail + gallery/related · inquiry forms · favorites integration verification.
**Out of scope (untouched):** Phases 12–14 (demo admin, a11y/responsive polish, final verification).

### Tasks completed (all ticked `[x]` in `tasks.md`)

- [x] 7.1–7.3 `hero-search.tsx`, `app/page.tsx`, homepage scenario checks
- [x] 8.1–8.6 `property-search.tsx`, `property-filters.tsx`, `listing-explorer.tsx`, `/properties` + four category routes, listing scenario checks
- [x] 9.1–9.5 `property-gallery.tsx`, `related-properties.tsx`, `/properties/[slug]/page.tsx`, route `not-found.tsx`, detail scenario checks
- [x] 10.1–10.4 `ui/inquiry-form.tsx`, `property-inquiry-form.tsx`, `/contact`, inquiry scenario checks
- [x] 11.1 Favorites integration verification (and a blocked-storage read fix)

### Files created / modified

| File | Action | Notes |
|------|--------|-------|
| `app/page.tsx` | Modified | Replaced starter with hero, `HeroSearch`, featured grid, category grid, area highlights, why section, CTA, in-content `DemoNotice`. Single H1. |
| `components/properties/hero-search.tsx` | Created | Client form with visible location/category/transaction labels; pushes validated query to `/properties`. |
| `components/properties/property-search.tsx` | Created | Labeled `q` search input. |
| `components/properties/property-filters.tsx` | Created | Category/transaction/area/price/beds/baths controls; mobile disclosure with `aria-expanded`/`aria-controls`; locked-category notice. |
| `components/properties/listing-explorer.tsx` | Created | Client state from `useSearchParams`, `replaceState` URL sync, sort, active chips, clear-all, polite count, empty state. |
| `app/properties/page.tsx` | Created | Static shell + `<Suspense>` around the explorer. |
| `app/buy/page.tsx`, `app/rent/page.tsx`, `app/commercial/page.tsx`, `app/short-stays/page.tsx` | Created | Unique H1s; locked category; shared explorer. |
| `components/properties/property-gallery.tsx` | Created | Prev/next buttons + arrow keys, “Image N of M” polite live region, `SafeImage` fallback. |
| `components/properties/related-properties.tsx` | Created | Up to 3 related records via `getRelated` (current slug excluded). |
| `app/properties/[slug]/page.tsx` | Created | `generateStaticParams` (12), `generateMetadata`, Suspense child awaiting `params`, `notFound()`, conditional facts, inquiry aside. |
| `app/properties/[slug]/not-found.tsx` | Created | Property-specific not-found UI + back link. |
| `components/ui/inquiry-form.tsx` | Created | Client validation, field-keyed errors, `aria-invalid`/`aria-describedby`, first-invalid focus, pending state, exact success string. |
| `components/properties/property-inquiry-form.tsx` | Created | Preselected/identified property context for detail pages. |
| `app/contact/page.tsx` | Created | Static contact copy + shared inquiry form + optional property select. |
| `lib/constants.ts` | Modified | Added `INQUIRY_DISCLOSURE` for the simulated-submission notice. |
| `lib/favorites-store.ts` | Modified | Guarded `localStorage.getItem` reads (`readStored`) so blocked storage falls back to an in-memory set. |
| `openspec/changes/dabaw-estate-site/tasks.md` | Modified | Tickboxes only (Phases 7–11). |

### Requirement coverage

- **Homepage:** exact single H1, hero image with alt text and overlay, labeled hero search, featured-only grid (3), four category cards, seven area highlights, why section, CTA, in-content demo disclosure.
- **Listings:** case-insensitive search over title/area/description, AND-combined filters, sort (featured/newest/price), URL query persistence via `replaceState`, visible active filters, polite result count, empty state, clear-all. Category routes lock their category and hide the category select.
- **Detail:** slug resolution, unknown-slug not-found UI, sale/rental price context, conditional facts (commercial omits bedrooms), gallery keyboard/live region, amenity list, related set excluding current, single H1, inquiry entry point.
- **Inquiry:** visible labels, email-or-phone rule, inline associated errors, focus first invalid after commit, disabled pending control, exact `Demo submission complete. No message was sent.`, no fetch/storage/transmission, disclosure near each form.
- **Favorites:** shared store across cards/detail, `aria-pressed` + title-bearing labels, guarded persistence, corrupt-JSON tolerance, blocked-storage fallback.

### Commands run

| Command | Result | Summary |
|---------|--------|---------|
| `npm run lint` | Pass | Final run after the favorites fix: exit 0, 0 errors / 0 warnings. |
| `npx tsc --noEmit` | Pass | Final run: exit 0, no output (strict-clean). |
| `npm run build` | Pass | Final run: `Compiled successfully`; `Finished TypeScript`; `Generating static pages (23/23)`; routes `/`, `/_not-found`, `/buy`, `/commercial`, `/contact`, `/properties`, `/rent`, `/short-stays` static; `/properties/[slug]` partial-prerender with all 12 slugs generated. No Suspense/`useSearchParams` errors. |

Two intermediate build attempts failed in `app/globals.css` with `Node.js subprocess crashed while evaluating loaders [@tailwindcss/turbopack] ... (os error 10054)` — a Turbopack loader crash, not a code error. Lingering `next start` node processes from the runtime harness plus a stale `.next` cache caused it. After terminating those processes and clearing `.next`, the rebuild passed clean.

### Runtime harness evidence

Production server (`npx next start -p 3100`) HTTP checks:

| Scenario | Exact result |
|----------|--------------|
| `/` | Exactly 1 `<h1>`; hero text present; non-featured `Ecoland Garden Townhouse` absent (featured-only); demo disclosure present. |
| `/properties/matina-family-home` | 1 `<h1>`; gallery counter `Image 1 of 3`; `Next image` control; property inquiry preselected (`Preselected from this listing`); `Bedrooms` fact present. |
| `/properties/matina-greenview-house` | `Monthly sample rate` present; `₱45,000/month` present. |
| `/properties/lanang-retail-frontage` | `Bedrooms` absent; `Property type` and `Parking` present; `Monthly sample lease rate` present. |
| `/contact` | 1 `<h1>`; name/email/phone/message/property controls rendered; simulation disclosure present; success string absent until submit. |
| `/properties/does-not-exist` | Property not-found UI and back link render (HTTP 200 because streaming has started; see Deviations). |
| Favorites markup | `/` has 3 `aria-pressed="false"` toggles; detail has 4 (main + 3 related); labels include the property title. |
| Dataset counts | `for-sale` 3, `for-rent` 4, `commercial` 2, `short-stay` 3; featured 3. |

### Work Unit Evidence

| Work unit | Focused command + result | Runtime harness + result | Rollback boundary |
|-----------|--------------------------|--------------------------|-------------------|
| Homepage | `npm run lint` + `npx tsc --noEmit` → pass | `/` HTTP → 1 H1, 3 featured cards, demo disclosure | `app/page.tsx`, `components/properties/hero-search.tsx` |
| Listing explorer + routes | `npm run lint` + `npx tsc --noEmit` + `npm run build` → pass | Category data counts 3/4/2/3; build proves every `useSearchParams` island sits under Suspense. Client grid is intentionally the post-hydration view. | `property-search.tsx`, `property-filters.tsx`, `listing-explorer.tsx`, five route files |
| Property detail | `npm run build` → 12 slug pages generated; `npx tsc --noEmit` pass | Valid slug → 1 H1, gallery, rental context, commercial omission; unknown slug → not-found UI | `app/properties/[slug]/`, `property-gallery.tsx`, `related-properties.tsx` |
| Inquiry forms | `npm run lint` + `npx tsc --noEmit` → pass | `/contact` form rendered; success string not pre-rendered; no fetch in source | `components/ui/inquiry-form.tsx`, `property-inquiry-form.tsx`, `app/contact/page.tsx` |
| Favorites integration | `npx tsc --noEmit` pass | 3 `aria-pressed` toggles on `/`, 4 on detail; shared store + guarded reads verified in source | `lib/favorites-store.ts` (blocked-storage guard only) |

### Deviations from design

1. **Unknown slug returns HTTP 200.** The property not-found UI and back link render correctly, but because `params` is awaited inside a Suspense boundary, streaming has begun before `notFound()` runs; Next documents that the status remains 200 in that case. The spec requires a not-found state, which is met.
2. **`lib/constants.ts` adds `INQUIRY_DISCLOSURE`.** The inquiry spec requires a simulation disclosure near the form; a shared constant prevents wording drift between `/contact` and detail pages.
3. **Favorites store read guard.** `localStorage.getItem` can itself throw when storage is blocked (not only `setItem`). Added `readStored()` so task 11.1’s blocked-storage fallback actually holds.
4. **First-invalid focus uses `requestAnimationFrame`.** This waits for the error markup/`aria-describedby` to commit before moving focus, improving screen-reader association.
5. **Detail routes are Partial Prerender (◐), not fully static.** Expected from awaiting `params` inside Suspense under `cacheComponents`.
6. **Filter state initializes from the URL once.** A same-route external query change does not re-sync local state; the design explicitly accepts this because changes already use `replaceState` and the explorer remounts on navigation.

### Issues found / gotchas

- The initial `/properties` and category HTML is the Suspense skeleton; the `useSearchParams` island renders the grid after hydration. This is expected, and `npm run build` confirms the boundary is correct.
- React inserts comment nodes between dynamic text segments, so the live region reads structurally as `Image <!-- -->1<!-- --> of <!-- -->3`. Screen readers still receive “Image 1 of 3”.
- `useId` generates ids containing colons; they are valid for `htmlFor`/`aria-describedby` and avoid duplicate ids across form instances.
- The parent-folder lockfile warning from batch 1 remains; it is outside this repo and did not affect the build.

### Blockers

None.

### Next

Batch 3 (Phases 12–14): demo admin dashboard, accessibility/responsive polish, and the final full verification matrix. Delivery remains a single PR with maintainer-approved `size:exception`.

---

## Batch 3 — Phases 12–14 (tasks 12.1 → 14.3) [+ unknown-slug 404 repair]

**Status:** complete
**Scope:** Demo admin audit · accessibility & responsive polish audit · final full verification (lint + typecheck + production build + HTTP scenario matrix) · unknown-slug 404 repair.
**Out of scope (untouched):** Batch 1–2 code, other routes, git state.

### Context: this was a repair run

A previous batch-3 run created the admin components but never ticked tasks 12.1–14.3, never appended a Batch 3 section, and never ran Phase 14. It also reported that `export const dynamicParams = false;` should be added to the property detail page. This repair run audited the existing admin implementation (did not recreate it), completed the verification, and resolved the 404 gap using the mechanism the bundled Next 16.4.2 docs actually prescribe.

### Tasks completed (all ticked `[x]` in `tasks.md`, 0 unchecked / 59 checked)

- [x] 12.1–12.5 Admin components + `/admin` route — **audited, already present and spec-compliant; no code changes needed**
- [x] 12.6 Admin scenario verification (static-HTML/SSR probes + code inspection)
- [x] 13.1 A11y audit (labels, live regions, `aria-current`/`aria-pressed`, focus, 44 px targets)
- [x] 13.2 Responsive pass + `prefers-reduced-motion` (code inspection + container/grid review)
- [x] 14.1 Full gate: `npm run lint && npx tsc --noEmit && npm run build`
- [x] 14.2 Manual spec-scenario matrix (nine specs), HTTP-measured where static/SSR-visible
- [x] 14.3 No backend/API/auth/keys; no dependency beyond `lucide-react`
- [x] (repair) Unknown property slug now returns a real **HTTP 404**

### Files created / modified

| File | Action | Notes |
|------|--------|-------|
| `app/properties/[slug]/page.tsx` | Modified | Added `export const instant = false;` and `export const ensureStatic = "navigation";`; rewrote the header comment to state the verified mechanism. No other logic changed. |
| `openspec/changes/dabaw-estate-site/tasks.md` | Modified | Tickboxes only (Phases 12–14). |
| `openspec/changes/dabaw-estate-site/apply-progress.md` | Modified | Appended this Batch 3 section (batches 1–2 preserved). |
| `components/admin/*.tsx` (4 files) | **Unchanged** | Existed from the prior run; audited and spec-compliant. |
| `app/admin/page.tsx` | **Unchanged** | Audited and spec-compliant. |

### Admin audit against `demo-admin` spec (result: compliant, no changes)

| Requirement | Evidence |
|---|---|
| Demo disclosure (exact text, no auth) | `ADMIN_BANNER` renders as `role="note"` in the dashboard header. HTTP probe on `/admin` confirms `"Demo admin"` and `"changes are temporary and visible only in this browser session"` are in the SSR HTML. No login/credentials/security claim; page states "no login, no database, and no persistence". |
| Overview metrics | SSR HTML stat values measured as **12, 3, 4, 2, 3, 4** (total, for-sale, for-rent, commercial, short-stay, sample inquiries). Category counts sum to 12. Cards derive from `items`/`demoInquiries`, so they update on add/delete via `useMemo`. |
| Property management | `AdminDashboard` holds an in-memory `useState([...sampleProperties])`; search filters title/location/type/category; add + edit share `AdminPropertyForm` with `validatePropertyDraft` and generated unique id/slug; delete requires `AdminDeleteDialog` confirmation. Nothing is written to a server or `localStorage`; reload resets. |
| Sample inquiry preview | `AdminInquiryPreview` labels every entry `Sample inquiry`, headings read "Sample inquiries", and copy states none are real and no message was sent/received. |
| Accessible/responsive admin | Visible labels + `aria-invalid`/`aria-describedby` on every control; native `<dialog>` + `showModal()` with focus moved in and restored to the trigger; `role="status" aria-live="polite"` save/delete feedback; `min-h-11` controls; rows stack below `md`; dialogs use `w-[calc(100%-2rem)]`; no fixed table widths. |

No gaps found. `02-guides` — the implementation already matched the spec, so no admin file was recreated or duplicated.

### The unknown-slug 404 repair — why the instructed change was NOT applied

The instruction was to add `export const dynamicParams = false;`. That is **incompatible with this project's `nextConfig.cacheComponents`** and was proven (not assumed) to break the build:

```
./app/properties/[slug]/page.tsx:40:14
Error: Route segment config "dynamicParams" is not compatible with `nextConfig.cacheComponents`. Please remove it.
```

Confirmed by three bundled Next 16.4.2 doc sources: `02-guides/migrating-to-cache-components.md` §"`dynamicParams` is not supported" ("**Delete the export.**"), `03-file-conventions/02-route-segment-config/dynamicParams.md` §"Good to know" ("not available when Cache Components is enabled"), and `02-route-segment-config/index.md` version history ("removed when Cache Components is enabled").

The documented path to a real 404 under Cache Components (`02-guides/building.md` §"A blocking product page" + `02-guides/streaming.md` §"When does streaming start?") is to stop the route from committing a `200` before the existence check runs. That is achieved with:

```tsx
export const instant = false;
export const ensureStatic = "navigation";
```

With `ensureStatic = "navigation"`, values not returned by `generateStaticParams` are generated before serving (`ensureStatic.md` §"Dynamic route parameters"), so the top-level `notFound()` executes before any status code is committed → real **404**. Measured on the final production build: unknown slugs return **404**; all 12 valid slugs and all nine routes return **200**.

### Commands run

| Command | Result | Summary |
|---------|--------|---------|
| `npm run lint` | Pass | Exit 0, 0 errors / 0 warnings. |
| `npx tsc --noEmit` | Pass | Exit 0, no output. |
| `npm run build` (final) | Pass | `Compiled successfully`; `Finished TypeScript`; generated 24/24 static pages. Nine routes present; `/properties/[slug]` prerenders with all 12 slugs. |
| `npm run build` (dynamicParams probe) | **Fail (expected)** | Exit 1 with `Route segment config "dynamicParams" is not compatible with nextConfig.cacheComponents`. Probe line was removed afterwards. |
| `node node_modules/next/dist/bin/next start -p 3100` + `curl.exe` | Pass | Probe matrix below. |

### Runtime harness evidence (production server, port 3100)

| Scenario | Exact result |
|---|---|
| All nine routes (including `/_not-found`) | HTTP **200**, exactly one `<h1>` each. |
| All 12 dataset slugs | HTTP **200**, one `<h1>` each. |
| Unknown slugs (`does-not-exist`, `matina-family-hom`, `zzz`, `12345`) | HTTP **404**; body contains the property not-found UI ("Property not found"), a `/properties` back link, and `noindex`. |
| `/admin` banner + stats | SSR HTML contains the exact banner text and stat values **12 / 3 / 4 / 2 / 3 / 4**. |
| `/` | One `<h1>` "Find your place in Davao.", in-content demo disclosure, links to `/buy`, `/rent`, `/commercial`, `/short-stays`. |
| `/contact` | Demo-simulation disclosure present; submit control "Send Demo Inquiry"; no success string pre-rendered. |
| `/properties/lanang-retail-frontage` | "Monthly sample lease rate", "Property type", "Parking" present; no "Bedrooms" (commercial omission). |

### Work Unit Evidence

| Work unit | Focused command + result | Runtime harness + result | Rollback boundary |
|-----------|--------------------------|--------------------------|-------------------|
| Admin audit | `npm run lint` + `npx tsc --noEmit` → pass | `/admin` SSR probe → banner + stats 12/3/4/2/3/4 | No code changed in this batch; revert is a no-op |
| A11y/responsive audit | `npm run lint` + `npx tsc --noEmit` → pass | Full-route HTTP probe → 1 H1 per route; label/live-region/marker greps clean | No code changed in this batch |
| Unknown-slug 404 | `npm run build` → pass (config probe → fail as documented) | Unknown slug **404**; valid slugs **200** | `app/properties/[slug]/page.tsx` (the two new exports + comment only) |
| Final gate | `npm run lint && npx tsc --noEmit && npm run build` → all pass | 24/24 pages generated; nine routes served | n/a |

### Scenarios verified

- **mock-property-data:** 12 records; unique id/slug; all four categories (3/4/2/3) and seven areas; featured = 3; rent/short-stay carry a period label; sale omits it; `status: "sample"`; no verified/guaranteed claim.
- **site-shell:** one `<main>` per route; header + footer present; footer disclosure; `aria-current` on the active nav item (desktop + mobile); skip link; mobile menu `aria-expanded`/`aria-controls`, Escape closes and returns focus.
- **homepage:** exactly one H1 "Find your place in Davao."; in-content disclosure outside the footer; four category links; featured-only grid.
- **property-listings / category-listings:** search matches title/area/description case-insensitively; filters combine with AND; URL sync via `replaceState`; sort options; polite count; empty state + clear-all; category lock per route. (Client-rendered after hydration — verified by code inspection of `lib/listing.ts` + `ListingExplorer`; the initial HTML is the Suspense skeleton by design.)
- **property-details:** valid slug → matching H1; rental period shown; commercial omits bedrooms; gallery keyboard + "Image N of M" live region; related set excludes current; unknown slug → **real 404** with not-found UI + back link.
- **inquiry-forms:** visible labels; email-or-phone rule; inline `aria-invalid`/`aria-describedby` errors; first-invalid focus; disabled pending; exact success string; simulation disclosure near the form; no fetch/storage.
- **favorites:** `aria-pressed` + title-bearing accessible names; shared store sync; guarded `localStorage`; corrupt-JSON and blocked-storage tolerance; 44 px target.
- **demo-admin:** exact banner; counts 12 → updates in memory; add/edit/delete-with-confirmation; reload resets; sample-labeled inquiries; keyboard-safe dialogs.

### Scenarios not verified (and why)

- **Live client-interaction behavior** (typing in filters, add/edit/delete mutation, favorite toggle, dialog focus return at runtime, reduce-motion rendering): no headless browser is available to this executor. Verified by code inspection and by `curl`-based SSR/static HTML probes only. `chrome-devtools-mcp` processes exist on the host but expose no tool to this agent.
- **Pixel-level horizontal-overflow at 320/360/375/768/1280 px**: no browser/viewport measurement available. Verified structurally (single-column grids at mobile, `w-[calc(100%-2rem)]` dialogs, no fixed table widths, `min-w-0` on flexible columns, `break-words` on chips).
- **Screen-reader announcement quality** (polite live regions actually announcing): requires a real AT; verified by correct `role="status"`/`aria-live`/`aria-atomic` markup only.
- **Per-link prefetch / client-navigation instant-UI UX** after `instant = false`: not measurable via HTTP; the tradeoff is intentional (correctness of the 404 status over instant navigation for this route).

### Deviations from the orchestrator instruction

1. **`dynamicParams = false` was deliberately NOT added.** It fails the build under `cacheComponents` (proven, error message captured above; three bundled doc sources agree). The 404 goal was met with the documented `instant = false` + `ensureStatic = "navigation"` combination instead.
2. **No admin code was changed.** The audit found the existing implementation fully matches the `demo-admin` spec; recreating or "fixing" files would have been duplication.

### Deviations from design

1. `app/properties/[slug]/page.tsx` now exports `instant = false` and `ensureStatic = "navigation"`. The design predates these v16.3/v16.4 route-segment configs and simply stated "unknown slugs call `notFound()`". The added exports are the minimal, documented way to make that `notFound()` produce a real 404 status under Cache Components. No rendering model change for valid slugs (all 12 still prerender).

### Issues found / gotchas

- **Under `cacheComponents` + `partialPrefetching`, `notFound()` alone yields HTTP 200**, because the PPR shell commits the status before the async `params` resolution runs (`02-guides/streaming.md`). The status only becomes a real 404 once the route is made to block before committing (`ensureStatic = "navigation"`).
- **`dynamicParams` is removed in Next 16 when Cache Components is enabled** — never reintroduce it here.
- The prior run's inline comment claiming the page "returns a real 404 status because streaming has not started yet" was **factually wrong** (measured 200). It has been replaced with the verified explanation.
- Pre-existing parent-folder lockfile warning (`E:\web_projects\package-lock.json` outside the repo) persists; warning only, build succeeds.

### Blockers

None.

### Next

`sdd-verify` — the change is now fully implemented and self-verified. All 59 tasks are ticked, the gate passes, and the unknown-slug status is a measured 404. Note for the orchestrator: the `dynamicParams` instruction in the repair brief is unsafe for this config; the applied `instant`/`ensureStatic` combination is the correct fix.
