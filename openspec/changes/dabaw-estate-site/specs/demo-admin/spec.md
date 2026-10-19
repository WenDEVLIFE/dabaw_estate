# Delta for Demo Admin

**Traceability:** `docs/project.md` §2, §13, §16; `docs/theme.md` §11, §16; `docs/TYPOGRAPHY.MD` §13.
**Route:** `/admin`.

## ADDED Requirements

### Requirement: Demo disclosure

The page MUST persistently display “Demo admin — changes are temporary and visible only in this browser session.” in a prominent position. It MUST NOT show a fake login, require credentials, or imply real authentication or security.

#### Scenario: Banner is always visible

- GIVEN the admin page loads
- WHEN the top of the page renders
- THEN the exact demo banner text is visible
- AND no login form or authentication claim appears

### Requirement: Overview metrics

The page MUST show summary cards with counts derived from the current in-memory mock properties and sample inquiries, and those counts MUST update after add or delete actions.

#### Scenario: Counts match current data

- GIVEN the mock dataset contains twelve properties
- WHEN the admin page renders
- THEN the total property count is twelve
- AND category counts sum to the total

#### Scenario: Count updates after add

- GIVEN the admin adds a property
- WHEN the overview renders again
- THEN the total property count increases by one

### Requirement: Property management

The admin MUST provide a searchable or filterable property list, an add-property form with validation, an edit interaction, and a delete action with confirmation. All changes MUST update React state in memory only, MUST NOT persist to a server or `localStorage`, and MUST reset on reload.

#### Scenario: Add a property

- GIVEN a valid add-property form
- WHEN the user submits
- THEN the new property appears in the admin list
- AND the overview count increases

#### Scenario: Edit a property

- GIVEN an existing property in the admin list
- WHEN the user saves a changed title
- THEN the list shows the updated title
- AND the change is in memory only

#### Scenario: Delete requires confirmation

- GIVEN an existing property
- WHEN the user activates delete
- THEN a confirmation prompt appears
- AND the property is removed only after confirmation

#### Scenario: Reload resets changes

- GIVEN a property was added in this session
- WHEN the page is reloaded
- THEN the dataset returns to its original sample state

### Requirement: Sample inquiry preview

The admin MUST preview mock inquiries using clearly labeled sample data and MUST NOT describe them as real customer inquiries.

#### Scenario: Inquiries are labeled sample

- GIVEN the inquiry preview section
- WHEN it renders
- THEN each entry is marked as sample or demo
- AND no claim of a real customer or delivered message appears

### Requirement: Accessible, responsive admin

Forms MUST have visible labels and associated errors, dialogs MUST be keyboard-operable with focus moved in and returned to the trigger, controls MUST show visible focus, and tables or lists MUST avoid horizontal overflow at 320 px. Motion MUST respect `prefers-reduced-motion`.

#### Scenario: Delete dialog is keyboard-safe

- GIVEN a keyboard-only user activates delete
- WHEN the confirmation dialog opens
- THEN focus moves into it
- AND Escape or the cancel action closes it and returns focus to the delete control

#### Scenario: Mobile admin remains usable

- GIVEN a 320 px viewport
- WHEN the admin page renders
- THEN lists and forms fit or scroll within their own container
- AND the page itself does not overflow horizontally
