# Delta for Property Details

**Traceability:** `docs/project.md` §7, §10, §16; `docs/theme.md` §8–§9, §13, §15–§16; `docs/TYPOGRAPHY.MD` §5.
**Route:** `/properties/[slug]`.

## ADDED Requirements

### Requirement: Slug resolution and not-found

A valid slug MUST render the matching property. An unknown or malformed slug MUST render a not-found state with a clear message and a link back to `/properties`, without a crash.

#### Scenario: Valid slug resolves

- GIVEN a slug that exists in the sample dataset
- WHEN `/properties/[slug]` loads
- THEN the matching property title renders as the H1

#### Scenario: Unknown slug is handled

- GIVEN a slug absent from the sample dataset
- WHEN the route loads
- THEN a not-found message appears
- AND a link returns to the listings page

### Requirement: Property information

The page MUST show the title, sample listing status, formatted price with sale or rental context, Davao City area, category and property type, description, key features, amenities when present, a gallery, a breadcrumb or back-to-results link, and a visible sample-data disclosure.

#### Scenario: Rental detail shows its rate

- GIVEN a For Rent property
- WHEN its detail page renders
- THEN the price displays the peso amount with its rental period
- AND the sample status is visible

#### Scenario: Core sections are present

- GIVEN a valid property
- WHEN the page renders
- THEN it contains a gallery, description, and inquiry entry point
- AND the demo disclosure appears in the main content

### Requirement: Conditional attributes

The page MUST show bedrooms, bathrooms, floor area, lot area, and parking only when applicable to that property and present in the data. It MUST NOT claim real availability, legal status, ownership, or a verified agent.

#### Scenario: Office omits bedrooms

- GIVEN a commercial office record with no bedroom value
- WHEN its detail page renders
- THEN no bedroom field or icon appears
- AND floor area and parking render when present

#### Scenario: No verification claim

- GIVEN any detail page
- WHEN its copy is reviewed
- THEN no verified, secured, or guaranteed-availability statement appears

### Requirement: Accessible gallery

The gallery MUST present multiple images with alt text, keyboard-operable previous and next controls with accessible names, visible focus, and a graceful fallback when an image fails to load. Transitions MUST respect `prefers-reduced-motion`.

#### Scenario: Gallery works by keyboard

- GIVEN a property with three images
- WHEN the user focuses the gallery and activates next
- THEN the second image and its alt text become current
- AND focus remains on an operable control

#### Scenario: Image failure degrades gracefully

- GIVEN a gallery image URL fails
- WHEN the gallery renders
- THEN a fallback surface or message appears
- AND the layout does not collapse

### Requirement: Related properties and inquiry

The page SHOULD show up to three related properties from the same local dataset, excluding the current record, using shared cards. It MUST provide an inquiry entry point for the current property as defined by the inquiry-forms capability.

#### Scenario: Related set excludes current record

- GIVEN a property with related records available
- WHEN the related section renders
- THEN no card repeats the current slug
- AND every card links to a valid detail page

### Requirement: Accessible, responsive details layout

The page MUST use one H1, ordered section headings, accessible labels, visible focus, and no horizontal overflow at 320 px. On mobile, the inquiry form MUST follow the main property information; on desktop it MAY sit beside it.

#### Scenario: Mobile stacking

- GIVEN a 375 px viewport
- WHEN a detail page renders
- THEN the inquiry form appears after the property information
- AND no gallery control is clipped or unreachable

#### Scenario: Single primary heading

- GIVEN any detail page
- WHEN its headings are enumerated
- THEN exactly one H1 is present
- AND subsection headings follow in order
