# Delta for Property Listings

**Traceability:** `docs/project.md` §7, §9, §16; `docs/theme.md` §5, §8, §10, §15–§16; `docs/TYPOGRAPHY.MD` §7–§8.
**Route:** `/properties`.

## ADDED Requirements

### Requirement: Property card grid

The page MUST render every matching property in a responsive grid: one column on mobile, two on tablet, and three on desktop. Each card MUST show an image with alt text, a category or transaction badge, a favorite toggle, title, area, formatted price, applicable key details, and a link to the detail page.

#### Scenario: Card links to details

- GIVEN a listed property
- WHEN its card is activated
- THEN `/properties/[slug]` loads for that record

#### Scenario: Inapplicable details are omitted

- GIVEN a commercial listing without bedrooms
- WHEN its card renders
- THEN no bedroom value or icon is shown
- AND the price and area remain visible

### Requirement: Client-side search

Search MUST match the query, case-insensitively, against title, area, and description, and MUST update results in the browser without a page reload or network request.

#### Scenario: Search matches area

- GIVEN the listings page shows all records
- WHEN the user types “Lanang”
- THEN results include every record whose area or description matches
- AND unrelated records disappear without a reload

### Requirement: Combined filters

The page MUST offer category, transaction type, location, and price-range filters plus bedroom and bathroom filters where applicable. Active filters MUST combine with AND logic and MUST be read from and written to URL query parameters.

#### Scenario: Filters narrow results

- GIVEN category “For Rent” and area “Buhangin” are selected
- WHEN filtering completes
- THEN only records matching both criteria appear
- AND the URL reflects both selections

#### Scenario: Filter state survives reload

- GIVEN a filtered URL
- WHEN the page is reloaded
- THEN the same controls are active
- AND the result set is unchanged

### Requirement: Sorting

The page MUST support sorting by price ascending, price descending, and newest or sample featured order.

#### Scenario: Price sorting

- GIVEN an unsorted result set
- WHEN the user selects price low to high
- THEN the first card has the lowest price
- AND the sequence is non-decreasing

### Requirement: Result count, active filters, and empty state

The page MUST show the result count for the current criteria, visible active-filter indicators, and a clear-all action. When no records match, it MUST show an empty state explaining the outcome and offering to clear filters.

#### Scenario: Empty result set

- GIVEN filters that match no record
- WHEN results render
- THEN the count is zero
- AND an empty-state message and clear-filters action appear

#### Scenario: Clear filters restores all records

- GIVEN active filters
- WHEN the user activates clear filters
- THEN all controls reset
- AND the count equals the full sample dataset

### Requirement: Accessible, responsive listing controls

All inputs and buttons MUST have visible labels or accessible names, keyboard operation, and visible focus. The result count MUST be announced through a polite live region. On mobile, filters MUST collapse or stack without horizontal overflow, and touch targets MUST be at least 44 px.

#### Scenario: Screen reader hears count

- GIVEN a screen reader user changes a filter
- WHEN results update
- THEN the new result count is announced politely

#### Scenario: Mobile filters remain usable

- GIVEN a 360 px viewport
- WHEN the filter panel is opened
- THEN every control is reachable and operable by touch and keyboard
- AND the page does not scroll horizontally
