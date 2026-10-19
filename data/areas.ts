import type { DavaoArea } from "@/types/property";

export interface AreaHighlight {
  area: DavaoArea;
  blurb: string;
}

/**
 * Seven Davao City area highlights used on the homepage.
 * Areas are filter options only and do not imply real listings exist there.
 */
export const areas: readonly AreaHighlight[] = [
  {
    area: "Matina",
    blurb: "Established residential pockets and family neighborhoods.",
  },
  {
    area: "Ecoland",
    blurb: "Green surroundings near a sample commercial strip.",
  },
  {
    area: "Buhangin",
    blurb: "Suburban streets close to the airport corridor.",
  },
  {
    area: "Lanang",
    blurb: "Business district condominiums and retail frontage.",
  },
  {
    area: "Bajada",
    blurb: "Central apartments within reach of shops and transport.",
  },
  {
    area: "Toril",
    blurb: "Wider lots, riverside units, and logistics space.",
  },
  {
    area: "Downtown Davao",
    blurb: "Urban lofts, heritage-style studios, and offices.",
  },
];
