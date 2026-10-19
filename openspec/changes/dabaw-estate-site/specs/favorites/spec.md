# Delta for Favorites

**Traceability:** `docs/project.md` §14, §16; `docs/theme.md` §8, §16.
**Routes:** `/`, `/properties`, `/buy`, `/rent`, `/commercial`, `/short-stays`, `/properties/[slug]`.

## ADDED Requirements

### Requirement: Favorite toggle availability

Every property card and every property detail page MUST expose a favorite toggle with an accessible name that includes the property title and a state exposed through `aria-pressed`. State MUST NOT be conveyed by color alone.

#### Scenario: Toggle is identifiable

- GIVEN a card for “Matina Family Home”
- WHEN the toggle receives focus
- THEN its accessible name includes the property title
- AND its pressed state reflects whether the property is favorited

#### Scenario: Icon alone is not the signal

- GIVEN a favorited property
- WHEN the toggle renders
- THEN both a visual state and a programmatic pressed state are present

### Requirement: Session consistency

Toggling a favorite on any card or detail page MUST update every rendered instance of that property during the same browser session.

#### Scenario: Card and details stay in sync

- GIVEN a property is not favorited
- WHEN the user favorites it on its card and opens its detail page
- THEN the detail toggle shows it as favorited

### Requirement: Safe persistence

Favorites MAY persist only property IDs in `localStorage`, MUST tolerate missing, malformed, or unparsable stored data without crashing, and MUST NOT store personal information. If storage is unavailable, favorites MUST continue to work for the current session.

#### Scenario: Corrupt stored value is ignored

- GIVEN `localStorage` contains invalid JSON for favorites
- WHEN the app loads
- THEN favorites initialize to a safe empty state
- AND no runtime error occurs

#### Scenario: Storage unavailable

- GIVEN browsing mode blocks `localStorage`
- WHEN the user toggles a favorite
- THEN the state updates for the current session
- AND the app does not crash

#### Scenario: Reload preserves favorites

- GIVEN a property was favorited and storage is available
- WHEN the page is reloaded
- THEN the property remains favorited

### Requirement: Accessible favorite interaction

The toggle MUST be operable by keyboard and pointer, MUST show visible focus, and MUST provide a touch target of at least 44 px. Any toggle transition MUST respect `prefers-reduced-motion`.

#### Scenario: Keyboard toggles favorite

- GIVEN a keyboard-only visitor
- WHEN they focus the favorite button and press Enter or Space
- THEN the pressed state changes
- AND focus remains visible on the control

#### Scenario: Reduced motion

- GIVEN the user prefers reduced motion
- WHEN the favorite state changes
- THEN no non-essential animation plays
