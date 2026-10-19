# DABAW ESTATE — Project Specification

## 1. Project Overview

**Project name:** DABAW ESTATE  
**Tagline:** Find your place in Davao.  
**Project type:** Frontend-only real estate website prototype  
**Primary location:** Davao City, Philippines  
**Purpose:** Portfolio presentation and demonstration to prospective real estate clients.

DABAW ESTATE is a polished, responsive website concept for discovering residential properties for sale, long-term rentals, commercial spaces, and short-term stays within Davao City.

This is a **demo prototype only**. All property records, prices, availability, agents, and inquiries shown in the interface are sample content unless explicitly verified and replaced by the project owner.

## 2. Non-Negotiable Technical Constraints

The application must run without a database or backend.

- Do not install, configure, or connect any database.
- Do not use Supabase, Firebase, Prisma, Drizzle, MongoDB, PostgreSQL, MySQL, or similar database technologies.
- Do not create backend APIs, server actions, authentication services, or payment integrations.
- Do not require API keys, database credentials, or backend environment variables.
- Keep property records in local TypeScript or JSON files.
- Use React state for interactive features and in-memory demo admin operations.
- `localStorage` is optional only for simple browser preferences, such as favorites. Do not use it as a database.
- Inquiry forms must simulate submission locally. Do not send or claim to send inquiries to a real business.
- Admin changes and demo inquiries are temporary and may reset after refresh.
- The app must be deployable as a frontend-only demo on Vercel.

## 3. Recommended Technology Stack

- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui where useful
- **Icons:** Lucide
- **State:** React state and hooks
- **Data:** Static TypeScript objects or JSON files
- **Images:** Local public assets or suitable remote image URLs configured for Next.js
- **Deployment:** Vercel

Before adding dependencies, inspect the existing project and reuse suitable packages already installed. Avoid unnecessary libraries.

## 4. Brand and Visual Direction

### Brand
- **Name:** DABAW ESTATE
- **Tagline:** Find your place in Davao.
- **Market:** Davao City, Philippines
- **Tone:** Trustworthy, polished, welcoming, locally relevant

### Color palette
- Forest green: `#183D32`
- Muted gold: `#D8B77A`
- Ivory: `#F7F5EF`
- Charcoal: `#242824`

Use forest green for key brand surfaces and actions, muted gold sparingly for accents, ivory for warm backgrounds, and charcoal for readable text. Maintain accessible contrast.

### Design principles
- Premium, elegant real estate aesthetic
- Strong architectural and property photography
- Refined typography and generous spacing
- Clear navigation and property search
- Consistent property cards, badges, forms, and buttons
- Subtle transitions, never distracting animations
- Mobile-first responsive layouts for phone, tablet, and desktop
- Accessible keyboard navigation, labels, focus states, and semantic HTML

## 5. Location Scope

The prototype is focused on **Davao City only**. Provide location filters and sample listings for representative areas such as:

- Matina
- Ecoland
- Buhangin
- Lanang
- Bajada
- Toril
- Downtown Davao

These are filter options, not a claim that real properties are available in each area. Do not include other cities as property locations.

## 6. Property Categories

Support the following listing categories:

1. **For Sale** — houses, townhouses, condominiums, residential lots, and other homes.
2. **For Rent** — apartments, houses, condominiums, and long-term rentals.
3. **Commercial** — office spaces, retail units, warehouses, and commercial lots.
4. **Short Stay** — furnished condos, transient accommodation, and short-term rentals.

Each property should have a category and transaction type that can be used for filtering.

## 7. Site Map and Routes

Implement these pages using Next.js App Router:

- `/` — Homepage
- `/properties` — All property listings, search, filters, and sorting
- `/properties/[slug]` — Property details
- `/buy` — Properties for sale
- `/rent` — Long-term rentals
- `/commercial` — Commercial properties
- `/short-stays` — Short-term stays
- `/contact` — Contact information and simulated inquiry form
- `/admin` — Demo-only property management and inquiry preview

Keep navigation consistent across pages. Include useful empty states and not-found handling for invalid property slugs.

## 8. Homepage Requirements

The homepage should include:

- Responsive header with brand, navigation, and a clear contact or inquiry action
- Hero section with the headline “Find your place in Davao.”
- Search controls for location, category, and transaction type
- Featured properties populated from mock data
- Property category cards
- Davao City area highlights
- A short “Why DABAW ESTATE” section
- Call-to-action for browsing properties or making an inquiry
- Footer with navigation and demo disclosure

Avoid unsupported claims such as “number one,” “verified listings,” or specific customer counts.

## 9. Property Listings and Search

The `/properties` page must include:

- Responsive property card grid
- Search by title, area, or description
- Filters for category, transaction type, location, and price range
- Relevant optional filters, such as bedrooms and bathrooms, where applicable
- Sorting by price and newest/sample featured order
- Active filter indicators and a clear-filters action
- Result count based on the current filtered sample data
- Empty state when no properties match
- Links to each property detail page

All filtering, searching, and sorting must work in the browser using local data. No network request or backend is needed.

## 10. Property Details

Each property detail page should show, where relevant:

- Property title and demo listing status
- Price and whether it is a sale price or rental rate
- Area within Davao City
- Image gallery
- Property category and type
- Bedrooms, bathrooms, floor area, lot area, and parking when applicable
- Description and key features
- Amenities
- Contact or inquiry form
- Related properties from the same local data set

Only show attributes that make sense for the property type. Do not invent claims of real availability, legal status, ownership, or verified agents.

## 11. Mock Data Model

Create reusable TypeScript types and a local sample data file, for example `src/data/properties.ts`.

A property record may include:

- `id`
- `slug`
- `title`
- `category`
- `transactionType`
- `propertyType`
- `price`
- `priceLabel` or rental period where relevant
- `location`
- `addressLabel`
- `description`
- `images`
- `bedrooms`
- `bathrooms`
- `floorArea`
- `lotArea`
- `parking`
- `amenities`
- `featured`
- `status`
- `createdAt`

Use optional fields for attributes that do not apply to every listing. Keep the model type-safe. Use realistic-looking but clearly fictional sample content and make the demo disclosure visible.

## 12. Inquiry Forms

Inquiry forms should include suitable fields such as:

- Name
- Email or phone
- Selected property, when applicable
- Message

Requirements:

- Client-side validation
- Accessible field labels and helpful error messages
- Disabled/loading-style feedback during simulated submission, if appropriate
- A clear success message such as: **“Demo submission complete. No message was sent.”**
- No API calls, emails, or external transmission
- Do not present mock inquiries as real customer inquiries

## 13. Demo Admin Dashboard

The `/admin` route is a visual demonstration, not a secured management system.

Include:
- Overview cards showing counts derived from mock data
- Property list with basic search or filtering
- Add-property form
- Edit-property interaction
- Delete action with confirmation
- Mock inquiry preview using clearly labeled sample inquiries

All CRUD-like actions must update React state in memory only. They are not persisted to a server and may reset when the page reloads. Do not implement fake authentication or imply the page is secure. Add a clear banner: **“Demo admin — changes are temporary and visible only in this browser session.”**

## 14. Favorites

Allow users to toggle a favorite on property cards and detail pages.

- Use React state for the current session.
- Optionally persist favorite IDs in `localStorage`.
- Handle missing or invalid stored values safely.
- Do not store sensitive personal information.

## 15. Suggested Component Structure

Adapt to the existing project rather than forcing this exact tree:

```text
src/
  app/
    page.tsx
    properties/
      page.tsx
      [slug]/
        page.tsx
    buy/
      page.tsx
    rent/
      page.tsx
    commercial/
      page.tsx
    short-stays/
      page.tsx
    contact/
      page.tsx
    admin/
      page.tsx
    layout.tsx
    globals.css
  components/
    layout/
      site-header.tsx
      site-footer.tsx
    properties/
      property-card.tsx
      property-grid.tsx
      property-search.tsx
      property-filters.tsx
      property-gallery.tsx
      property-inquiry-form.tsx
      favorite-button.tsx
    ui/
  data/
    properties.ts
    demo-inquiries.ts
  lib/
    utils.ts
  types/
    property.ts
```

This structure is a guide. Keep components cohesive and avoid unnecessary abstraction.

## 16. Responsive and Accessibility Requirements

- No horizontal overflow at mobile widths.
- Navigation works on small screens.
- Property grids adapt smoothly to viewport width.
- Images use appropriate sizing, aspect ratios, and alt text.
- Forms have labels, validation feedback, and keyboard accessibility.
- Buttons and links have clear names and visible focus states.
- Respect reduced-motion preferences where animations are used.
- Maintain readable contrast and reasonable text sizes.

## 17. Implementation Plan

1. Inspect the repository, package manager, existing routes, and installed dependencies.
2. Confirm the project runs before making changes.
3. Establish the brand tokens, typography, shared layout, header, and footer.
4. Define TypeScript interfaces and create sample Davao City property records.
5. Build reusable property cards and the homepage.
6. Build listings, client-side search, filters, sorting, and empty states.
7. Build dynamic property details and related properties.
8. Add buy, rent, commercial, and short-stay category pages.
9. Implement favorites and locally simulated inquiry forms.
10. Build the mock admin dashboard with temporary in-memory CRUD actions.
11. Add responsive polish, accessibility, and demo disclosures.
12. Run linting, type checking, and the production build.
13. Fix errors and manually verify the core routes and interactions.

## 18. Acceptance Criteria

The prototype is complete when:

- It starts and builds successfully using documented commands.
- No database, backend, API credentials, or server configuration is required.
- All required routes render correctly.
- Search, filters, sorting, favorites, and property navigation work.
- Invalid property slugs show a useful not-found state.
- Inquiry forms validate input and clearly state that submission is simulated.
- Admin demo actions work in memory and clearly disclose their temporary nature.
- Sample content is clearly identified as demo data.
- The design works on mobile, tablet, and desktop.
- There are no broken links, major console errors, or TypeScript/build errors.
- The app can be deployed to Vercel as a frontend-only demonstration.

## 19. Final Instruction to the Coding Agent

Prioritize a visually impressive, coherent, client-ready prototype while keeping the implementation simple. Do not add a database, backend, real authentication, or real inquiry delivery. If a feature would require a backend, create an honest client-side simulation and label it as a demo. Inspect the current repository first and preserve working code where possible.
