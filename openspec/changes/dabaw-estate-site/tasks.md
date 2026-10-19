# Tasks: DABAW ESTATE Frontend-Only Real Estate Prototype

Legend: `[NEW]` = create file, `[MOD]` = modify existing file. No test runner is installed (config: `strict_tdd: false`); verification is lint + typecheck + production build + a manual spec-scenario matrix.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~4,300–5,200 authored (excludes generated `package-lock.json`) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested PR slices | 14 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

```text
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High
```

Greenfield build: 9 routes, ~45 authored files, one generated lockfile. Count authored additions + deletions only. The lockfile stays in snapshot identity but is excluded from the authored threshold.

### Suggested Work Units

| Unit | Goal (one slice) | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------------------|-----------|----------------------|-----------------|-------------------|
| 1 | `lucide-react`, image allowlist, brand tokens/typography | PR 1 | `npm run build` | `npm run dev` → `/` shell renders | `package.json`, `next.config.ts`, `app/globals.css` |
| 2 | Domain types + pure utils (`types/*`, `lib/utils`, `constants`, `navigation`) | PR 2 | `npx tsc --noEmit` | N/A — pure type/module layer, no runtime surface | `types/`, `lib/utils.ts`, `lib/constants.ts`, `lib/navigation.ts` |
| 3 | Listing logic, validation, favorites store | PR 3 | `npx tsc --noEmit` | N/A — pure modules, no route yet | `lib/listing.ts`, `lib/validation.ts`, `lib/favorites-store.ts` |
| 4 | 12-record mock dataset + lookups | PR 4 | `npx tsc --noEmit` | N/A — static data module | `data/` |
| 5 | Shared UI primitives | PR 5 | `npx tsc --noEmit` | `npm run dev` → primitives visible on `/` | `components/ui/*` except `inquiry-form.tsx` |
| 6 | Shell, layout, 404 | PR 6 | `npm run build` | `npm run dev` → header/footer/menu on any route | `app/layout.tsx`, `components/layout/`, `app/not-found.tsx` |
| 7 | Property display components | PR 7 | `npx tsc --noEmit` | `npm run dev` → cards/grid render | display files under `components/properties/` |
| 8 | Homepage | PR 8 | `npm run build` | `npm run dev` → `/` spec scenarios | `app/page.tsx`, `hero-search.tsx` |
| 9 | Listing search, filters, explorer | PR 9 | `npx tsc --noEmit` | `npm run dev` → `/properties` filter/sort/URL | `property-search.tsx`, `property-filters.tsx`, `listing-explorer.tsx` |
| 10 | Listings + category routes | PR 10 | `npm run build` | `npm run dev` → `/properties`, `/buy`, `/rent`, `/commercial`, `/short-stays` | the five route files |
| 11 | Property detail page | PR 11 | `npm run build` | `npm run dev` → valid + unknown slug | `app/properties/[slug]/`, `property-gallery.tsx`, `related-properties.tsx` |
| 12 | Inquiry forms | PR 12 | `npx tsc --noEmit` | `npm run dev` → `/contact` + detail form | `components/ui/inquiry-form.tsx`, `property-inquiry-form.tsx`, `app/contact/page.tsx` |
| 13 | Admin form, dialog, preview | PR 13 | `npx tsc --noEmit` | `npm run dev` → add/edit dialogs | `admin-property-form.tsx`, `admin-delete-dialog.tsx`, `admin-inquiry-preview.tsx` |
| 14 | Admin dashboard + route, a11y/responsive polish, full verification | PR 14 | `npm run lint && npx tsc --noEmit && npm run build` | `npm run dev` → `/admin` + 320–1280 px sweep | `admin-dashboard.tsx`, `app/admin/page.tsx`, polish tweaks |

Slice order is dependency-ordered. Slices 2–4 are intentionally runtime-free (explicit `N/A`); they gate later slices by typecheck only.

## Phase 1: Foundation & Dependencies

- [x] 1.1 [MOD] Install `lucide-react`; update `package.json` and `package-lock.json`.
- [x] 1.2 [MOD] Add `images.remotePatterns` for `images.unsplash.com` and `images.pexels.com` to `next.config.ts`.
- [x] 1.3 [MOD] `app/globals.css`: `@theme` color/radius/container tokens, `@theme inline` font vars, base typography, `.type-hero`/`.type-page-title`/`.type-section-title`/`.price`, global `:focus-visible` ring, `prefers-reduced-motion`.

## Phase 2: Domain Layer (types, data, utilities)

- [x] 2.1 [NEW] `types/property.ts`: `CATEGORIES`, `TRANSACTIONS`, `DAVAO_AREAS`, `PROPERTY_TYPES`, `Property`, `PropertyImage`, label/sort/bed/bath option metadata.
- [x] 2.2 [NEW] `types/inquiry.ts`: inquiry values, field-keyed errors, demo-inquiry shape.
- [x] 2.3 [NEW] `lib/utils.ts`: `cn`, PHP price formatting, area/number formatting, slug generation.
- [x] 2.4 [NEW] `lib/constants.ts`: demo disclosure, admin banner, inquiry success string, favorites storage key.
- [x] 2.5 [NEW] `lib/navigation.ts`: shared primary and footer nav items.
- [x] 2.6 [NEW] `data/properties.ts`: 12 typed records (all 7 areas, all 4 categories, unique id/slug, 3 featured) + `getPropertyBySlug`/`getFeatured`/`getByCategory`/`getRelated`.
- [x] 2.7 [NEW] `data/categories.ts`, `data/areas.ts`, `data/demo-inquiries.ts`.
- [x] 2.8 [NEW] `lib/listing.ts`: `parseListingFilters`, `applyFilters`, `sortProperties`, `filtersToQuery`, `countActiveFilters`.
- [x] 2.9 [NEW] `lib/validation.ts`: pure `validateInquiry` and `validatePropertyDraft` returning field-keyed error maps.

## Phase 3: Favorites Store

- [x] 3.1 [NEW] `lib/favorites-store.ts`: guarded localStorage parse/validate/dedupe/cap, `subscribe`/`getSnapshot`/`getServerSnapshot`/`toggleFavorite`, in-memory fallback, `storage` event sync.

## Phase 4: Shared UI Primitives

- [x] 4.1 [NEW] `components/ui/container.tsx` (page width + responsive padding).
- [x] 4.2 [NEW] `components/ui/button.tsx` (variants, focus, 44 px targets).
- [x] 4.3 [NEW] `components/ui/badge.tsx` (category/transaction/featured/sample).
- [x] 4.4 [NEW] `components/ui/section-heading.tsx` (eyebrow + heading + copy).
- [x] 4.5 [NEW] `components/ui/empty-state.tsx` (message + action slot).
- [x] 4.6 [NEW] `components/ui/skeleton.tsx` (Suspense fallbacks).
- [x] 4.7 [NEW] `components/ui/safe-image.tsx` (client `next/image` wrapper, `fill`+`sizes`, error fallback, fixed aspect).

## Phase 5: Shell & Layout

- [x] 5.1 [NEW] `components/layout/demo-notice.tsx` (compact/default variants).
- [x] 5.2 [NEW] `components/layout/site-footer.tsx` (nav + brand + disclosure).
- [x] 5.3 [NEW] `components/layout/site-header.tsx` (client: `aria-current`, primary action, mobile menu `aria-expanded`/`aria-controls`, Escape, focus move/return).
- [x] 5.4 [MOD] `app/layout.tsx`: DM Serif Display + Inter vars on `<html>`, metadata template, skip link, header/main/footer shell, one `<main id="main-content">`.
- [x] 5.5 [NEW] `app/not-found.tsx` (shell 404 linking to `/properties`).

## Phase 6: Property Display Components

- [x] 6.1 [NEW] `components/properties/favorite-button.tsx` (client, store-backed, `aria-pressed`, title-bearing label).
- [x] 6.2 [NEW] `components/properties/property-card.tsx` (image, badges, favorite, title, area, price, applicable facts, detail link).
- [x] 6.3 [NEW] `components/properties/property-grid.tsx` (1/2/3-column responsive grid).
- [x] 6.4 [NEW] `components/properties/category-card.tsx`, `components/properties/area-highlights.tsx`.

## Phase 7: Homepage

- [ ] 7.1 [NEW] `components/properties/hero-search.tsx` (client: labeled area/category/transaction, pushes validated criteria to `/properties`).
- [ ] 7.2 [MOD] `app/page.tsx`: replace starter with hero (single H1 “Find your place in Davao.”), `HeroSearch`, featured grid, category grid, area highlights, why section, CTA, in-content demo notice.
- [ ] 7.3 Verify homepage scenarios: exactly one H1, featured-only cards, category links route correctly, disclosure visible outside footer.

## Phase 8: Listings & Category Pages

- [ ] 8.1 [NEW] `components/properties/property-search.tsx` (labeled text search).
- [ ] 8.2 [NEW] `components/properties/property-filters.tsx` (category, transaction, area, price min/max, beds, baths; mobile disclosure).
- [ ] 8.3 [NEW] `components/properties/listing-explorer.tsx` (client: local state, `replaceState` URL sync from `useSearchParams`, sort, active filters, clear, `role="status"` count, empty state).
- [ ] 8.4 [NEW] `app/properties/page.tsx` (static shell + `<Suspense>` around `ListingExplorer`).
- [ ] 8.5 [NEW] `app/buy/page.tsx`, `app/rent/page.tsx`, `app/commercial/page.tsx`, `app/short-stays/page.tsx` (each passes `lockedCategory`, unique H1, count + empty state).
- [ ] 8.6 Verify listing scenarios: `q=Lanang` matches area/description, AND-combined filters, reload persistence, price sort, count/empty/clear, category counts (3/4/2/3).

## Phase 9: Property Detail Page

- [ ] 9.1 [NEW] `components/properties/property-gallery.tsx` (client: prev/next keyboard, “Image N of M” live region, `SafeImage` fallback).
- [ ] 9.2 [NEW] `components/properties/related-properties.tsx` (up to 3, excludes current slug).
- [ ] 9.3 [NEW] `app/properties/[slug]/page.tsx`: `generateStaticParams`, `generateMetadata`, `<Suspense>` child awaiting `params`, `notFound()` on unknown slug.
- [ ] 9.4 [NEW] `app/properties/[slug]/not-found.tsx` (property 404 + back link).
- [ ] 9.5 Verify detail scenarios: valid slug H1, unknown slug 404, rental period shown, commercial omits bedrooms, gallery keyboard/failure, related excludes current, single H1.

## Phase 10: Inquiry Forms

- [ ] 10.1 [NEW] `components/ui/inquiry-form.tsx` (client: `validateInquiry`, inline `aria-invalid`/`aria-describedby`, focus first invalid field, disabled pending, exact success string, no transmission).
- [ ] 10.2 [NEW] `components/properties/property-inquiry-form.tsx` (preselected property, identified by title).
- [ ] 10.3 [NEW] `app/contact/page.tsx` (static copy + shared `InquiryForm`, optional property select).
- [ ] 10.4 Verify inquiry scenarios: empty submit blocked + focus moves, invalid email rejected, success text exact, no request carries data, disclosure visible, mobile 320 px fit.

## Phase 11: Favorites (Integration Verification)

- [ ] 11.1 Verify favorites across `/`, `/properties`, four category routes, and `/properties/[slug]`: `aria-pressed` + title-bearing label, card↔detail sync, reload persistence, corrupt JSON ignored, blocked storage session-only, keyboard toggle, reduced motion.

## Phase 12: Demo Admin

- [ ] 12.1 [NEW] `components/admin/admin-property-form.tsx` (add/edit dialog, `validatePropertyDraft`, generated id/slug, visible labels/errors).
- [ ] 12.2 [NEW] `components/admin/admin-delete-dialog.tsx` (native `<dialog>`, `showModal`, focus in/return).
- [ ] 12.3 [NEW] `components/admin/admin-inquiry-preview.tsx` (sample-labeled inquiries).
- [ ] 12.4 [NEW] `components/admin/admin-dashboard.tsx` (in-memory copy, search list, overview counts, dialog wiring, polite status).
- [ ] 12.5 [NEW] `app/admin/page.tsx` (metadata shell + `AdminDashboard`).
- [ ] 12.6 Verify admin scenarios: exact banner, count 12 + updates on add/delete, add/edit/delete-with-confirmation, reload resets, sample inquiry labels, dialog Escape/focus return, 320 px no overflow.

## Phase 13: Accessibility & Responsive Polish

- [ ] 13.1 Audit keyboard order, focus visibility/return, labels, live regions, `aria-current`, and 44 px targets across shell, cards, filters, forms, and admin.
- [ ] 13.2 Responsive pass at 320/360/375/768/1280 px; confirm no horizontal overflow and honor `prefers-reduced-motion`.

## Phase 14: Verification

- [ ] 14.1 Run `npm run lint && npx tsc --noEmit && npm run build`; confirm all nine routes prerender and no Suspense/`useSearchParams` build errors.
- [ ] 14.2 Execute the manual spec-scenario matrix for all nine specs (mock-property-data → demo-admin) per design §Testing.
- [ ] 14.3 Confirm no backend/API/auth/keys and no dependencies beyond `lucide-react`; close out the change.
