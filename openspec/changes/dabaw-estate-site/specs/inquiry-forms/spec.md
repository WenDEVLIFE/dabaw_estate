# Delta for Inquiry Forms

**Traceability:** `docs/project.md` §2, §12, §16; `docs/theme.md` §10, §16; `docs/TYPOGRAPHY.MD` §11.
**Routes:** `/contact` and `/properties/[slug]`.

## ADDED Requirements

### Requirement: Inquiry fields

An inquiry form MUST collect name, email or phone, a message, and the selected property when the form appears on a detail page. Every field MUST have a persistently visible label; placeholders MUST NOT be the only label. On a detail page the property context MUST be preselected and clearly identified.

#### Scenario: General contact inquiry

- GIVEN the visitor is on `/contact`
- WHEN the form renders
- THEN name, contact, and message fields are present with visible labels
- AND no property is required

#### Scenario: Property context is preselected

- GIVEN the visitor opens an inquiry from a detail page
- WHEN the form renders
- THEN the current property is shown as the selected property

### Requirement: Client-side validation

The form MUST validate required fields and email format when email is used, MUST display an inline error message associated with each invalid field, and MUST move focus to the first invalid field after a failed submission. No submission may occur while validation errors remain.

#### Scenario: Empty submission is blocked

- GIVEN an empty inquiry form
- WHEN the user submits
- THEN each required field shows an error
- AND focus moves to the first invalid field
- AND no success message appears

#### Scenario: Invalid email is rejected

- GIVEN an email value without a valid address format
- WHEN the user submits
- THEN the email field shows an error
- AND the submission is not completed

### Requirement: Simulated submission

Submission MUST be simulated locally with no API call, email, or external transmission. During the simulation the submit control MUST be disabled with visible pending feedback. On completion the form MUST display exactly “Demo submission complete. No message was sent.”

#### Scenario: Valid submission completes locally

- GIVEN all required fields contain valid values
- WHEN the user submits
- THEN the submit control becomes disabled while pending
- AND the form displays “Demo submission complete. No message was sent.”

#### Scenario: No transmission occurs

- GIVEN a completed demo submission
- WHEN network activity is inspected
- THEN no request carries inquiry data
- AND no message claims an agent was notified

### Requirement: Honest inquiry presentation

The form MUST disclose that submission is a demo simulation and MUST NOT present mock inquiries as real customer inquiries. Inquiry data MUST NOT be written to `localStorage` or any persistent store.

#### Scenario: Disclosure is visible

- GIVEN either inquiry form location
- WHEN the form renders
- THEN demo-simulation disclosure text is visible near the form
- AND the success message matches the required wording

### Requirement: Accessible, responsive form

Controls MUST be keyboard-operable, errors MUST be programmatically associated with their fields, focus MUST be visible, and touch targets MUST be at least 44 px. On mobile the form MUST stack without horizontal overflow. Pending transitions MUST respect `prefers-reduced-motion`.

#### Scenario: Error is announced and associated

- GIVEN a screen reader user submits an invalid form
- WHEN errors appear
- THEN each error is associated with its field
- AND the first invalid field receives focus

#### Scenario: Mobile form fits

- GIVEN a 320 px viewport
- WHEN the inquiry form renders
- THEN fields and labels fit without horizontal scrolling
- AND the submit action remains reachable
