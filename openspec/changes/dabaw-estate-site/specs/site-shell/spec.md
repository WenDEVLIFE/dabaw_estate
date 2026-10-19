# Delta for Site Shell

**Traceability:** `docs/project.md` §4, §7, §8, §16; `docs/theme.md` §3–§6, §14–§16; `docs/TYPOGRAPHY.MD` §2–§3, §9, §15.
**Routes:** all nine routes.

## ADDED Requirements

### Requirement: Brand tokens and typography

The system MUST define the color, radius, and layout tokens from `docs/theme.md` §3 and §17 as reusable CSS variables and MUST apply DM Serif Display to display headings and Inter to interface text, prices, forms, and navigation.

#### Scenario: Typography roles are applied

- GIVEN a page with a heading and a property price
- WHEN both are rendered
- THEN the heading uses the display font family
- AND the price uses the interface font family with tabular numerals

#### Scenario: Tokens drive surfaces

- GIVEN the global stylesheet
- WHEN a brand color is changed at the token definition
- THEN surfaces using that token update without editing individual components

### Requirement: Global page shell

Every route MUST render the shared header and footer around one semantic `<main>` landmark, and the footer MUST include site navigation and a demo disclosure.

#### Scenario: Shell wraps every route

- GIVEN any required route
- WHEN it renders
- THEN exactly one `<main>` landmark is present
- AND the header and footer are present
- AND the footer discloses that content is demo data

### Requirement: Header navigation

The header MUST show the `DABAW ESTATE` wordmark, links to Buy, Rent, Commercial, Short Stays, and Contact, and a clear primary inquiry or browse action. The current route MUST be indicated with `aria-current`.

#### Scenario: Active route is identified

- GIVEN the visitor is on `/rent`
- WHEN the header renders
- THEN the Rent link exposes `aria-current="page"`
- AND the primary action is visible and named

### Requirement: Mobile navigation

Below the desktop breakpoint, navigation MUST collapse into a menu button with an accessible name and expanded state. The menu MUST open and close by keyboard, close with Escape, move focus into the menu when opened, and return focus to the trigger when closed. All header links MUST remain reachable.

#### Scenario: Keyboard-operable mobile menu

- GIVEN a 360 px viewport
- WHEN the user activates the menu button with the keyboard
- THEN the menu opens and `aria-expanded` becomes true
- AND focus moves into the menu
- AND Escape closes the menu and restores focus to the button

#### Scenario: Menu links work

- GIVEN the mobile menu is open
- WHEN the user selects Commercial
- THEN `/commercial` loads
- AND the menu is closed

### Requirement: Responsive layout and focus

The shell MUST avoid horizontal overflow from 320 px upward, use the container widths and padding from `docs/theme.md` §5, and provide touch targets of at least 44 px. Every interactive element MUST show a visible focus indicator, and transitions MUST respect `prefers-reduced-motion`.

#### Scenario: No overflow at mobile width

- GIVEN a 320 px viewport
- WHEN a page renders
- THEN no horizontal scrolling is possible
- AND header actions remain usable

#### Scenario: Reduced motion is honored

- GIVEN the user enables reduced motion
- WHEN menus or hover transitions occur
- THEN no non-essential animation plays
- AND interactive focus remains visible
