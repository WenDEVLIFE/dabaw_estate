# DABAW ESTATE — Theme and Design System

## 1. Purpose

Define the visual identity and UI design rules for **DABAW ESTATE**, a frontend-only real estate prototype focused on Davao City, Philippines.

**Brand tagline:** Find your place in Davao.

The interface should feel premium, trustworthy, locally relevant, calm, and easy to use. It should resemble a polished real estate business website rather than a generic dashboard template.

This is a demo. Sample properties, prices, agents, and availability must not be presented as verified real-world information.

## 2. Brand Personality

- **Premium:** strong photography, refined typography, restrained accents.
- **Trustworthy:** clear pricing, readable details, honest disclosures, consistent interactions.
- **Local:** Davao City neighborhoods and context without implying government affiliation.
- **Welcoming:** approachable copy and straightforward navigation.
- **Practical:** search and contact actions are prominent and easy to understand.

Avoid overly flashy gradients, excessive glassmorphism, cartoonish illustrations, cluttered layouts, and unnecessary animation.

## 3. Color Tokens

Use the following palette consistently. Define these as CSS variables or Tailwind theme tokens rather than scattering raw hex values throughout components.

| Token | Hex | Intended use |
|---|---|---|
| `--color-forest` | `#183D32` | Primary brand color, header accents, primary buttons |
| `--color-forest-hover` | `#245344` | Hover and active states for forest buttons |
| `--color-forest-deep` | `#102B23` | Strong contrast surfaces, footer, occasional hero overlay |
| `--color-gold` | `#D8B77A` | Small premium accents, icons, decorative details |
| `--color-gold-soft` | `#E9D9B6` | Subtle highlight backgrounds and separators |
| `--color-ivory` | `#F7F5EF` | Main warm page background |
| `--color-white` | `#FFFFFF` | Cards, form fields, clean content surfaces |
| `--color-charcoal` | `#242824` | Main text |
| `--color-muted` | `#6C726D` | Secondary text, helper text |
| `--color-border` | `#E4E3DC` | Card borders, dividers, input outlines |
| `--color-surface-muted` | `#EFEEE8` | Secondary surfaces and filter areas |
| `--color-success` | `#2F6B4F` | Successful local demo feedback |
| `--color-error` | `#B54747` | Form validation errors |
| `--color-warning` | `#8A641D` | Demo warnings and status notices |

### Color usage rules

- Use forest green as the main brand anchor, not for every surface.
- Use gold sparingly. Do not use gold for long paragraphs or small text on ivory when contrast is insufficient.
- Use ivory for page backgrounds and white for cards and input surfaces.
- Use charcoal for primary text and muted gray-green for supporting text.
- Every status must have readable text or an icon; do not communicate meaning by color alone.
- Keep interactive focus indicators clearly visible.
- Verify text and control contrast before finishing.

## 4. Typography

Use a restrained editorial typography system.

### Recommended fonts

- **Headings:** `DM Serif Display` or another available refined serif.
- **Body and UI:** `Inter` or a clean sans-serif fallback.
- If external font loading adds unnecessary complexity, use well-supported system fallbacks.

### Type scale

| Role | Desktop guideline | Mobile guideline |
|---|---:|---:|
| Hero heading | 56–72 px | 36–46 px |
| Page heading | 40–48 px | 30–36 px |
| Section heading | 28–36 px | 24–30 px |
| Card title | 18–22 px | 18–20 px |
| Body | 16–18 px | 15–17 px |
| Supporting text | 13–14 px | 13–14 px |
| Eyebrow / label | 11–12 px | 11–12 px |

Use fluid sizing where appropriate, such as `clamp()`. Keep headings readable and avoid oversized type that pushes property search too far below the fold.

### Typography rules

- Use serif display type selectively for brand and major editorial headings.
- Use sans-serif for navigation, forms, filters, metadata, and prices.
- Use clear hierarchy and comfortable line height.
- Prices should be prominent, easy to scan, and formatted consistently in Philippine pesos when appropriate.
- Do not use all caps for large paragraphs. Small eyebrow labels may use uppercase with slight letter spacing.

## 5. Layout and Spacing

Use a consistent spacing scale based on 4 px:

`4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`

### Container rules

- Main content maximum width: approximately `1200–1320px`.
- Center content with consistent horizontal padding.
- Desktop page padding: approximately `32–48px`.
- Tablet page padding: approximately `24px`.
- Mobile page padding: approximately `16–20px`.
- Use generous vertical spacing between major sections.
- Keep property grids aligned and card heights consistent where practical.

### Grid rules

- Desktop property grid: 3 columns, with 4 only when card content remains readable.
- Tablet property grid: 2 columns.
- Mobile property grid: 1 column by default; use 2 only when cards and prices remain legible.
- Filter layouts should become a compact drawer, collapsible panel, or stacked controls on mobile.
- Avoid horizontal overflow at any viewport size.

## 6. Header and Navigation

Create a refined, consistent header.

- Brand wordmark: `DABAW ESTATE`.
- Optional small supporting label: `DAVAO CITY · PHILIPPINES`.
- Use a clean background, subtle bottom border, and clear active navigation state.
- Desktop navigation may include Buy, Rent, Commercial, Short Stays, and Contact.
- Primary action: “Explore Properties” or “Inquire Now”.
- Mobile navigation must use an accessible menu button with a visible open/close state.
- Keep the header sticky only if it improves navigation without consuming excessive screen space.
- Ensure the header does not obscure page headings or anchor destinations.

## 7. Homepage Visual Direction

### Hero section

- Use a strong, high-quality property or Davao-inspired architectural image.
- Favor natural light, warm neutral interiors, tropical landscaping, and contemporary architecture.
- Use a subtle dark or forest overlay only where needed for text contrast.
- Main heading: **“Find your place in Davao.”**
- Supporting copy should be short and clear.
- Put search controls near the hero so the website's purpose is immediately obvious.
- The hero should feel spacious and premium, not like an overfilled advertising banner.

### Search panel

- White or ivory surface with restrained shadow or border.
- Fields should have clear labels or accessible names.
- Use forest green for the primary search action.
- Keep the controls easy to use on mobile.
- Search must work against the local mock data.

### Homepage sections

1. Featured properties
2. Browse by category
3. Explore Davao City areas
4. Why DABAW ESTATE
5. Contact / inquiry call-to-action
6. Footer

Use alternating ivory and white surfaces to create rhythm. Avoid placing every section inside a rounded card.

## 8. Property Cards

Property cards are a core design element and must be consistent across the site.

### Structure

1. Property image with a consistent aspect ratio, preferably around `4:3`.
2. Small category or transaction badge.
3. Favorite toggle with accessible label.
4. Property title.
5. Neighborhood and Davao City location.
6. Price with appropriate sale or rental period.
7. Key details such as bedrooms, bathrooms, and area where applicable.
8. Clear link or action to view details.

### Card styling

- White surface on ivory backgrounds.
- Subtle border; use shadow sparingly.
- Rounded corners around `12–16px`.
- Image corners should align with the card.
- Hover effects may slightly raise the card or image, but must remain subtle.
- Keep titles to a reasonable line count without hiding important details.
- Do not show bedroom or bathroom icons when the information is not applicable.
- Never label sample properties as verified or available unless that status is actually verified.

## 9. Property Detail Page

- Use a clear breadcrumb or back-to-results link.
- Give the image gallery visual priority.
- Show title, location, and price near the top.
- Display key facts in a compact, readable row or grid.
- Separate description, amenities, and property details into clear sections.
- Keep the inquiry panel visible on desktop without overwhelming the page.
- On mobile, stack the inquiry form after the main property information or use a restrained sticky action only if accessible.
- Related properties should use the same card design as the listing page.
- Include an obvious sample-data disclosure.

## 10. Forms and Controls

### Inputs

- White background, charcoal text, clear border, comfortable padding.
- Use consistent input heights, generally around `44–48px`.
- Focus state should use a visible forest-green border or ring.
- Include labels, validation feedback, and helpful placeholder text.
- Never rely on placeholders as the only labels.

### Buttons

- Primary: forest green with white text.
- Secondary: white or ivory with forest border and charcoal/forest text.
- Tertiary: text button for low-emphasis actions.
- Destructive: error red and used only for destructive admin demo actions.
- Use consistent heights, padding, and corner radius.
- Provide hover, active, disabled, and keyboard-focus states.
- Button text should describe the action, e.g. “View Property”, “Apply Filters”, or “Send Demo Inquiry”.

### Inquiry feedback

A successful local simulation must say clearly:

**“Demo submission complete. No message was sent.”**

Do not show a fake sent-email confirmation or claim a real agent has been notified.

## 11. Admin Demo Styling

The demo admin dashboard should share the same brand system but may use a more information-dense layout.

- Use a restrained sidebar or compact navigation.
- Use clear page titles, summary cards, and readable tables or lists.
- Keep green and gold accents subtle.
- Include status labels with text.
- Provide clear empty states and action confirmations.
- Show a persistent disclosure: **“Demo admin — changes are temporary and visible only in this browser session.”**
- Do not create a fake login screen that implies real authentication or security.
- All add, edit, and delete actions must work in in-memory React state only.

## 12. Badges, Statuses, and Demo Disclosure

Use small, legible badges for labels such as:

- For Sale
- For Rent
- Commercial
- Short Stay
- Featured
- Sample Listing

Avoid overly saturated badge colors and excessive pill-shaped labels.

Show a concise disclosure in the listings area and property details, for example:

**“Demo prototype: property information, prices, and availability are sample data and have not been verified.”**

Do not hide this notice only in the footer.

## 13. Photography and Images

- Favor high-quality architecture, homes, condos, interiors, and tropical landscaping.
- Use consistent aspect ratios and appropriate `object-fit: cover`.
- Provide useful alt text describing the image.
- Prevent layout shifts by reserving image dimensions.
- Include graceful fallback UI if an image fails to load.
- Avoid broken image links and unrelated images.
- Do not imply a sample image depicts the exact real-world property being advertised.
- If remote images are used, configure Next.js image handling correctly or use standard image elements where justified.

## 14. Icons and Motion

- Use Lucide icons consistently.
- Keep icons simple and use a consistent stroke weight.
- Pair icons with text when the meaning may be unclear.
- Use subtle transitions for hover, focus, menus, filters, and gallery interactions.
- Respect `prefers-reduced-motion`.
- Avoid large animated backgrounds, parallax-heavy effects, and unnecessary motion that affects performance.

## 15. Responsive Behavior

### Desktop
- Spacious container and balanced hero layout.
- Three-column property grid as the default.
- Filters may sit in a sidebar or horizontal toolbar.
- Inquiry panel can sit beside property details.

### Tablet
- Two-column property grid.
- Reduce hero text size and section spacing slightly.
- Keep navigation and search controls comfortable to use.

### Mobile
- Single-column property cards.
- Stack search fields vertically or use a compact, usable filter panel.
- Ensure buttons have touch-friendly targets, ideally around 44px or larger.
- Avoid tiny metadata and overcrowded card layouts.
- Make image galleries swipe-friendly only if interaction remains accessible.
- Keep prices and key property details easy to scan.

## 16. Accessibility and Quality

- Use semantic landmarks and heading hierarchy.
- Provide visible keyboard focus.
- Ensure all form controls have accessible names.
- Give icon-only buttons accessible labels.
- Maintain sufficient color contrast.
- Do not rely on color alone for status.
- Ensure dialogs and mobile menus can be operated by keyboard.
- Add useful alt text to meaningful images; use empty alt text for decorative images.
- Avoid layout shifts and unnecessarily large images.
- Check for console errors and broken links.

## 17. Suggested CSS Variables

Use these as a starting point and adapt to the project's current Tailwind setup:

```css
:root {
  --color-forest: #183D32;
  --color-forest-hover: #245344;
  --color-forest-deep: #102B23;
  --color-gold: #D8B77A;
  --color-gold-soft: #E9D9B6;
  --color-ivory: #F7F5EF;
  --color-white: #FFFFFF;
  --color-charcoal: #242824;
  --color-muted: #6C726D;
  --color-border: #E4E3DC;
  --color-surface-muted: #EFEEE8;
  --color-success: #2F6B4F;
  --color-error: #B54747;
  --color-warning: #8A641D;

  --radius-card: 16px;
  --radius-control: 10px;
  --content-max-width: 1280px;
}
```

## 18. Final Design Instructions

Treat this file as the visual source of truth for the prototype.

- Follow `project.md` for functionality, architecture, routes, and acceptance criteria.
- Follow `theme.md` for visual identity, colors, typography, spacing, and interaction styling.
- Inspect existing code before modifying the project.
- Reuse shared tokens and components instead of creating inconsistent one-off styles.
- Prefer clean, maintainable implementations over decorative complexity.
- The result should feel like one coherent DABAW ESTATE product across all routes.
- Keep the app frontend-only, with no database, backend, real authentication, or real inquiry delivery.
