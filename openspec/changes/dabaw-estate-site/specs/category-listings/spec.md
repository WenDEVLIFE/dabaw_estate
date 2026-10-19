# Delta for Category Listings

**Traceability:** `docs/project.md` §6, §7, §9, §16; `docs/theme.md` §5, §8, §15–§16.
**Routes:** `/buy`, `/rent`, `/commercial`, `/short-stays`.

## ADDED Requirements

### Requirement: Category route mapping

Each category route MUST render only records belonging to its category: `/buy` for sale, `/rent` for long-term rent, `/commercial` for commercial, and `/short-stays` for short stay. These pages MUST reuse the shared property card and grid behavior.

#### Scenario: Buy excludes rentals

- GIVEN the sample dataset contains sale and rent records
- WHEN `/buy` renders
- THEN every card belongs to the For Sale category
- AND no For Rent record appears

#### Scenario: Short stays are isolated

- GIVEN the short-stay category has sample records
- WHEN `/short-stays` renders
- THEN only Short Stay records appear
- AND each card links to its detail page

### Requirement: Page identity and heading

Each route MUST render a unique page H1 describing its category, a short introductory sentence, and the shared header and footer. The active navigation item MUST reflect the current category.

#### Scenario: Distinct headings

- GIVEN `/rent` and `/commercial`
- WHEN both pages render
- THEN each has one H1 naming its category
- AND the two headings differ

#### Scenario: Navigation marks the category

- GIVEN the visitor is on `/commercial`
- WHEN the header renders
- THEN the Commercial link exposes `aria-current="page"`

### Requirement: Scoped result feedback

Each category page MUST show the number of matching records and MUST show an empty state with a clear action when the scoped set is empty. It MAY reuse the listing search, filter, and sort controls scoped to the category.

#### Scenario: Count reflects the category

- GIVEN the For Rent category contains four sample records
- WHEN `/rent` renders
- THEN the visible count is four

#### Scenario: Empty scoped result

- GIVEN a category-scoped query matches no record
- WHEN results render
- THEN an empty-state message appears
- AND a control to clear the query is available

### Requirement: Accessible, responsive category pages

Category pages MUST preserve semantic heading order, keyboard-operable cards and controls, visible focus, and the responsive grid breakpoints: one column on mobile, two on tablet, three on desktop. No page MUST overflow horizontally at 320 px.

#### Scenario: Keyboard traversal

- GIVEN a keyboard-only visitor on `/buy`
- WHEN they tab through the page
- THEN cards, favorite toggles, and controls receive visible focus in logical order
- AND no focus trap exists outside an open menu

#### Scenario: No mobile overflow

- GIVEN a 320 px viewport
- WHEN any category page renders
- THEN the grid uses one column
- AND horizontal overflow does not occur
