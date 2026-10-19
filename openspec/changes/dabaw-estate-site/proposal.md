# Proposal: DABAW ESTATE Frontend-Only Real Estate Prototype

## Intent

Deliver the DABAW ESTATE prototype (`docs/project.md`) as a client-ready, frontend-only Davao City demo: no DB, backend, API, auth, or payments; Vercel-deployable.

**Users:** prospective clients, visitors browsing/filtering/inquiring, and the owner demoing the admin.

## Scope

### In Scope
- All 9 routes (§7): `/`, `/properties`, `/properties/[slug]`, `/buy`, `/rent`, `/commercial`, `/short-stays`, `/contact`, `/admin`.
- Homepage hero, search, and all sections (§8).
- Listings search, filters (category, transaction, location, price, beds/baths), sort, active filters, clear, count, empty state (§9); details with gallery, specs, amenities, related, not-found (§10).
- Type-safe mock model + ~12 fictional listings across 4 categories and 7 Davao areas (§11).
- Simulated inquiries (§12), favorites (§14), in-memory admin CRUD (§13), responsive/a11y (§16), Lucide icons, remote images.

### Out of Scope
- Database, backend, APIs, server actions, auth, payments, real inquiry delivery.
- Locations outside Davao City; "verified/secured/number-one" claims.
- shadcn/ui or new UI libraries; maps, pagination, i18n.

## Capabilities

### New Capabilities
- `mock-property-data`, `site-shell`, `homepage`, `property-listings`, `category-listings`, `property-details`, `inquiry-forms`, `favorites`, `demo-admin`.

### Modified Capabilities
- None (greenfield; `openspec/specs/` empty).

## Approach

- App Router segments in repo-root `app/`; `layout.tsx` mounts header/footer, fonts, tokens.
- New `components/{layout,properties,ui}`, `types/property.ts`, `data/*`, `lib/utils.ts`.
- Static pages as Server Components; `"use client"` for search/filter/sort, favorites, inquiries, admin.
- Tokens in `app/globals.css` from `docs/theme.md` §3/§17 + `docs/TYPOGRAPHY.MD`; DM Serif Display + Inter.
- `localStorage` for favorites only; demo disclosures throughout.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/layout.tsx`, `app/globals.css` | Modified | Fonts, tokens, shell |
| `app/page.tsx` | Modified | Homepage |
| `app/properties/**` + 6 segments | New | Pages |
| `components/**`, `data/**`, `types/**`, `lib/**` | New | UI, data, types |
| `next.config.ts` | Modified | Remote image hosts |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Remote images fail | Med | Fixed dimensions, alt text, fallback |
| Client/Server boundary misuse | Med | `"use client"` only where needed |
| A11y gaps | Med | Landmarks, labels, focus, reduced-motion |
| Backend scope creep | Low | Enforce §2; demo disclosures |

## Rollback Plan

Additive greenfield: `git revert` per commit; `git checkout -- app/ next.config.ts`; delete new `components/`, `data/`, `types/`, `lib/`. No persisted data.

## Success Criteria

- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` pass; no backend/keys.
- [ ] 9 routes render; invalid slugs show not-found; search, filters, sort, favorites, navigation work on local data.
- [ ] Inquiries validate; "Demo submission complete. No message was sent."
- [ ] Admin CRUD works in memory with the temporary banner.
- [ ] Demo disclosed; responsive; no broken links/console errors; Vercel-deployable (§18).
