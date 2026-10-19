# Delta for Homepage

**Traceability:** `docs/project.md` §7, §8, §16; `docs/theme.md` §7, §15–§16; `docs/TYPOGRAPHY.MD` §5, §14.
**Route:** `/`.

## ADDED Requirements

### Requirement: Hero section

The homepage MUST present the exact heading “Find your place in Davao.” as its single H1, short supporting copy, and a property image with alternative text and sufficient text contrast. Hero typography MUST scale to the mobile and desktop ranges in `docs/TYPOGRAPHY.MD` §4.

#### Scenario: Hero content renders

- GIVEN the homepage loads
- WHEN the hero is visible
- THEN exactly one H1 contains “Find your place in Davao.”
- AND the hero image has meaningful alt text
- AND text remains readable over the image

#### Scenario: Mobile heading fits

- GIVEN a 360 px viewport
- WHEN the hero renders
- THEN the H1 uses the mobile size range
- AND it does not overflow horizontally

### Requirement: Hero search

The homepage MUST provide labeled controls for location, category, and transaction type with a primary search action. Submitting MUST navigate to `/properties` and apply the selected criteria to the local results without a network request.

#### Scenario: Search carries criteria

- GIVEN location “Matina”, category “For Sale”, and transaction “Sale” are selected
- WHEN the search action is submitted
- THEN `/properties` loads with those criteria active
- AND every result matches all selected criteria

#### Scenario: Empty search shows all listings

- GIVEN no search criteria are selected
- WHEN the search action is submitted
- THEN `/properties` shows the full sample dataset

### Requirement: Homepage sections

The homepage MUST include featured properties drawn only from records marked featured, four category cards linking to `/buy`, `/rent`, `/commercial`, and `/short-stays`, Davao City area highlights, a “Why DABAW ESTATE” section, and a browse or inquiry call to action.

#### Scenario: Featured filter is respected

- GIVEN some records are marked featured
- WHEN the featured section renders
- THEN only featured records appear
- AND each card links to its property detail page

#### Scenario: Category cards route correctly

- GIVEN the visitor selects the Short Stay card
- WHEN navigation completes
- THEN `/short-stays` renders short-stay listings

### Requirement: Honest marketing copy

The homepage MUST display a visible sample-data disclosure and MUST NOT claim “number one”, verified listings, guaranteed availability, or specific customer counts.

#### Scenario: Unsupported claims are absent

- GIVEN the rendered homepage copy
- WHEN it is reviewed
- THEN no unsupported superiority or verification claim appears
- AND the demo disclosure is visible outside the footer

### Requirement: Accessible, responsive sections

Homepage sections MUST use semantic headings in order, labeled controls, keyboard-operable actions, and visible focus. At mobile widths search controls MUST stack or collapse without overflow, and section spacing MUST remain usable.

#### Scenario: Keyboard-only search

- GIVEN a keyboard-only visitor on `/`
- WHEN they tab through the search panel
- THEN each control receives visible focus in reading order
- AND the search action is reachable and operable

#### Scenario: Mobile layout adapts

- GIVEN a 375 px viewport
- WHEN the homepage renders
- THEN search controls stack or collapse
- AND no section causes horizontal scrolling
