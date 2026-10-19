# Delta for Mock Property Data

**Traceability:** `docs/project.md` §2, §5, §6, §11; `docs/theme.md` §12–§13.
**Routes:** data consumed by `/`, `/properties`, `/properties/[slug]`, `/buy`, `/rent`, `/commercial`, `/short-stays`, `/admin`.

## ADDED Requirements

### Requirement: Typed property model

The system MUST define a reusable TypeScript property type with required `id`, `slug`, `title`, `category`, `transactionType`, `propertyType`, `price`, `location`, `description`, `images`, `featured`, `status`, and `createdAt`, and MAY omit attributes that do not apply to a listing (`priceLabel`, `addressLabel`, `bedrooms`, `bathrooms`, `floorArea`, `lotArea`, `parking`, `amenities`).

#### Scenario: Complete record satisfies the contract

- GIVEN a sample record containing every required field
- WHEN the project is type-checked
- THEN it compiles without errors
- AND optional attributes may be absent

#### Scenario: Unsupported category is rejected

- GIVEN a record whose category is outside the four categories in `docs/project.md` §6
- WHEN the project is type-checked
- THEN a type error is reported

### Requirement: Local fictional dataset

The system MUST provide at least 12 locally stored sample property records covering all four categories and all seven Davao City areas listed in `docs/project.md` §5, with unique `id` and `slug` values. Property data MUST NOT be fetched from a database, API, or remote service.

#### Scenario: Required coverage exists

- GIVEN the complete sample dataset
- WHEN it is inspected
- THEN at least 12 records exist
- AND every category and area appears in at least one record
- AND all ids and slugs are unique

#### Scenario: Data resolves without a backend

- GIVEN the app runs with no backend configured
- WHEN any route loads property data
- THEN records resolve from local modules
- AND no database, API, or server action is called

### Requirement: Clearly fictional content

Sample records MUST use fictional names, prices, and availability, MUST be identifiable as sample data, and MUST NOT claim verified status, legal title, ownership, or a real agent relationship.

#### Scenario: No unsupported claim appears

- GIVEN any rendered sample record
- WHEN its text is reviewed
- THEN it contains no "verified", "secured", or guaranteed-availability claim
- AND its sample status is visible

### Requirement: Image metadata

Every property image MUST provide a URL and descriptive alternative text. Decorative images MUST use empty alternative text.

#### Scenario: Images are described

- GIVEN a property with one or more images
- WHEN its card or gallery renders
- THEN each meaningful image has non-empty alt text
- AND decorative images have empty alt text

### Requirement: Consistent price and location

Each record MUST expose a Philippine-peso display price, MUST state the rental period for rent and short-stay listings, and MUST use a location from the Davao City area list only.

#### Scenario: Rental price shows its period

- GIVEN a For Rent or Short Stay record
- WHEN its price is displayed
- THEN the price includes the applicable period (for example, `/month`)

#### Scenario: Sale price omits a period

- GIVEN a For Sale record
- WHEN its price is displayed
- THEN it shows a peso amount without a rental period
- AND no non-Davao location is present
