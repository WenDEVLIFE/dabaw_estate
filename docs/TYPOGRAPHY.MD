
# DABAW ESTATE — Typography System

## 1. Overview

DABAW ESTATE is a premium real estate website prototype focused on Davao City, Philippines.

**Tagline:** Find your place in Davao.

This document defines the typography system used throughout the website. Follow `project.md` for functionality and `theme.md` for colors and overall visual design.

The typography should feel elegant, modern, trustworthy, and readable, especially for property prices, descriptions, locations, and search controls.

## 2. Font Families

### Display Font — DM Serif Display

Use DM Serif Display for:
- Homepage hero headings
- Main page titles
- Editorial section headings
- Promotional headlines
- Brand-focused statements

Recommended weight: 400 (Regular).

The serif font adds a premium, editorial real estate aesthetic.

### Interface Font — Inter

Use Inter for:
- Body text
- Navigation
- Property cards
- Prices and property details
- Search filters
- Buttons
- Forms
- Admin dashboard
- Badges and metadata

Recommended weights:
- 400 — Regular body text
- 500 — Medium labels and navigation
- 600 — Property titles and buttons
- 700 — Important prices and emphasis

Avoid using too many font weights or mixing additional font families.

## 3. Font Loading

For Next.js, prefer `next/font/google` if the build environment supports downloading Google Fonts.

Example:

```tsx
import { DM_Serif_Display, Inter } from "next/font/google";

export const displayFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const sansFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
```

Apply both font variables in the root layout and configure the font families in the global stylesheet or Tailwind theme.

Adapt the implementation to the existing project and installed versions.

Fallbacks:

```css
font-family: "DM Serif Display", Georgia, "Times New Roman", serif;

font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## 4. Typography Scale

Use responsive sizing and maintain consistent hierarchy across all pages.

| Element | Desktop | Mobile |
|---|---:|---:|
| Hero heading | 56–72px | 36–46px |
| Page heading | 40–48px | 30–36px |
| Section heading | 28–36px | 24–30px |
| Subsection heading | 22–26px | 20–24px |
| Property card title | 18–22px | 18–20px |
| Large body text | 18px | 16–17px |
| Standard body text | 16px | 15–16px |
| Supporting text | 14px | 13–14px |
| Metadata and captions | 12–13px | 12–13px |
| Eyebrow labels | 11–12px | 11–12px |
| Property price | 22–30px | 20–26px |

Do not make essential information excessively small. Important property details should generally be at least 14px.

## 5. Heading Styles

### Hero Heading

- Font: DM Serif Display
- Weight: 400
- Line height: 1.05–1.15
- Desktop size: 56–72px
- Mobile size: 36–46px
- Text: "Find your place in Davao."

Keep the heading concise, visually strong, and easy to read over the hero image.

### Page Headings

Use DM Serif Display for major headings.

Examples:
- Discover Properties
- Homes for Sale
- Properties for Rent
- Commercial Spaces
- Short-Term Stays

Use a line height around 1.1–1.2.

### Section Headings

Use DM Serif Display for prominent editorial sections.

Use Inter for compact, utility-focused headings, especially in the admin dashboard and filter panels.

Maintain a semantic hierarchy with one primary H1 per page, followed by H2 and H3 headings as appropriate.

## 6. Body Text

- Font: Inter
- Weight: 400
- Desktop size: 16–18px
- Mobile size: 15–16px
- Line height: 1.5–1.7
- Color: theme charcoal or an accessible muted text color

Keep paragraphs concise and readable.

Property descriptions should be divided into logical sections rather than displayed as large walls of text.

Avoid uppercase body paragraphs and unnecessary decorative typography.

## 7. Property Card Typography

### Property Title

- Font: Inter
- Weight: 600
- Size: 18–22px
- Line height: 1.3

Allow titles to wrap naturally without clipping.

### Location

- Font: Inter
- Weight: 400 or 500
- Size: 13–15px

Make the neighborhood and Davao City context easy to identify.

### Property Features

- Font: Inter
- Size: 13–15px
- Weight: 400 or 500

Use concise labels for bedrooms, bathrooms, parking, and floor area.

Only display features that apply to the specific property type.

## 8. Price Typography

Property prices must be visually prominent and easy to scan.

### Listing Cards

- Font: Inter
- Weight: 600 or 700
- Size: 20–26px

### Property Details

- Font: Inter
- Weight: 700
- Size: 24–32px

Use consistent Philippine peso formatting.

Examples:
- ₱8,500,000
- ₱25,000/month
- ₱18,000/month

Always specify the rental period where applicable.

Use tabular numerals when supported:

```css
.price {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

Do not use the display serif for property prices.

All prices in the prototype must be treated as sample data, not verified market prices.

## 9. Navigation Typography

- Font: Inter
- Size: 14–16px
- Weight: 500
- Line height: 1.4

Navigation labels should be short and easy to scan.

Examples:
- Buy
- Rent
- Commercial
- Short Stays
- Contact

Use a clear active state and visible keyboard focus.

Avoid excessive letter spacing or uppercase navigation labels.

## 10. Button Typography

- Font: Inter
- Size: 14–16px
- Weight: 600

Use sentence case.

Examples:
- Explore Properties
- View Details
- Apply Filters
- Clear Filters
- Contact Agent
- Submit Inquiry

Button labels should be concise and action-oriented.

Keep button typography consistent across the public website and admin dashboard.

## 11. Forms and Input Typography

### Labels

- Font: Inter
- Size: 13–14px
- Weight: 500 or 600

Labels must remain visible above or beside their controls.

Never rely on placeholders as the only form labels.

### Input Text

- Font: Inter
- Size: 15–16px
- Weight: 400

### Helper and Validation Text

- Font: Inter
- Size: 13–14px
- Line height: 1.4–1.5

Ensure error messages are readable and clearly associated with their fields.

Simulated inquiry forms must display:

"Demo submission complete. No message was sent."

## 12. Eyebrows and Badges

Use Inter with:
- Size: 11–12px
- Weight: 600
- Letter spacing: 0.06em–0.1em for short uppercase labels

Examples:
- DAVAO CITY · PHILIPPINES
- FOR SALE
- FOR RENT
- COMMERCIAL
- SHORT STAY
- SAMPLE LISTING

Do not apply wide letter spacing to long text.

Ensure badges remain legible on mobile devices.

## 13. Admin Dashboard Typography

Use Inter throughout the admin dashboard for consistency and readability.

Recommended sizes:
- Page title: 28–36px desktop, 24–30px mobile
- Section title: 18–22px
- Table content: 14–15px
- Form labels: 13–14px
- Supporting metadata: 12–13px

Use tabular numerals for statistics, counts, and prices.

Display this notice prominently:

"Demo admin — changes are temporary and visible only in this browser session."

Do not imply the demo admin dashboard has real authentication or persistent data storage.

## 14. Responsive Typography

Use CSS `clamp()` for fluid heading sizes where appropriate.

```css
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 4.5rem);
  line-height: 1.08;
  font-weight: 400;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(1.875rem, 3.5vw, 3rem);
  line-height: 1.12;
  font-weight: 400;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  line-height: 1.2;
  font-weight: 400;
}

.body-text {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.6;
}
```

Verify that:
- Headings do not overflow on mobile.
- Prices remain readable.
- Property titles do not obscure actions.
- Buttons do not wrap awkwardly.
- There is no horizontal scrolling caused by text.
- Navigation remains usable on small screens.

## 15. CSS Design Tokens

Add these to the global stylesheet or adapt them to the project's existing token system.

```css
:root {
  --font-display: "DM Serif Display", Georgia, "Times New Roman", serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --text-hero: clamp(2.25rem, 5vw, 4.5rem);
  --text-page-title: clamp(1.875rem, 3.5vw, 3rem);
  --text-section-title: clamp(1.5rem, 2.5vw, 2.25rem);
  --text-card-title: 1.125rem;
  --text-body: 1rem;
  --text-caption: 0.8125rem;

  --leading-heading: 1.12;
  --leading-body: 1.6;
}
```

Reuse these tokens across shared components rather than defining inconsistent font sizes in each page.

## 16. Typography Do and Don't

### Do
- Use DM Serif Display for selected prominent headings.
- Use Inter for the main interface and body.
- Keep a consistent hierarchy across every route.
- Use comfortable line heights.
- Prioritize readability of property prices and locations.
- Test desktop and mobile sizes.
- Use tabular numerals for prices and statistics when helpful.
- Keep forms and validation messages accessible.

### Don't
- Use more than two primary font families.
- Use thin weights for essential information.
- Use tiny, low-contrast text for property details.
- Use uppercase for paragraphs.
- Mix inconsistent heading sizes across similar pages.
- Use serif typography for dense admin tables or filter controls.
- Allow typography to cause clipped prices or horizontal overflow.

## 17. Final Instructions

Treat `Typography.md` as the typography source of truth for DABAW ESTATE.

- Follow `project.md` for functionality and technical requirements.
- Follow `theme.md` for colors, spacing, and overall visual design.
- Follow `Typography.md` for font pairing, type scale, hierarchy, and text treatment.
- Reuse shared typography tokens and components throughout the app.
- Keep the application frontend-only: no database, backend, real authentication, or real inquiry delivery.
'''
print(content)
