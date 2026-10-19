/**
 * Exact, shared copy for demo disclosures and simulated interactions.
 * Keeping these strings in one module prevents wording drift across routes.
 */

export const SITE_NAME = "DABAW ESTATE";

export const SITE_TAGLINE = "Find your place in Davao.";

export const SITE_LOCATION_LABEL = "DAVAO CITY · PHILIPPINES";

export const DEMO_DISCLOSURE =
  "Demo prototype: property information, prices, and availability are sample data and have not been verified.";

export const ADMIN_BANNER =
  "Demo admin — changes are temporary and visible only in this browser session.";

export const INQUIRY_SUCCESS_MESSAGE =
  "Demo submission complete. No message was sent.";

export const FAVORITES_STORAGE_KEY = "dabaw-estate:favorites";

export const SAMPLE_LISTING_LABEL = "Sample Listing";

/**
 * Fixed copyright year. `new Date()` is an unstable value and is rejected during
 * prerendering under `cacheComponents`, so the demo keeps a static value.
 */
export const COPYRIGHT_YEAR = "2026";
