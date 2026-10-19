import type { Category, PropertyImage } from "@/types/property";

export interface CategoryCardData {
  category: Category;
  label: string;
  href: string;
  blurb: string;
  image: PropertyImage;
}

const UNSPLASH = "https://images.unsplash.com";

function image(id: string, alt: string): PropertyImage {
  return {
    src: `${UNSPLASH}/${id}?auto=format&fit=crop&w=900&q=80`,
    alt,
  };
}

/** Four homepage category cards linking to their dedicated routes. */
export const categories: readonly CategoryCardData[] = [
  {
    category: "for-sale",
    label: "Homes for Sale",
    href: "/buy",
    blurb: "Fictional houses, townhouses, and condominiums across Davao City.",
    image: image(
      "photo-1568605114967-8130f3a36994",
      "Sample photo: contemporary house exterior with a paved driveway",
    ),
  },
  {
    category: "for-rent",
    label: "Properties for Rent",
    href: "/rent",
    blurb: "Sample long-term rentals including apartments and family houses.",
    image: image(
      "photo-1502672260266-1c1ef2d93688",
      "Sample photo: apartment interior with a large window and seating",
    ),
  },
  {
    category: "commercial",
    label: "Commercial Spaces",
    href: "/commercial",
    blurb: "Showcase retail, office, and warehouse concepts for businesses.",
    image: image(
      "photo-1497366811353-6870744d04b2",
      "Sample photo: bright commercial space with desks and large windows",
    ),
  },
  {
    category: "short-stay",
    label: "Short-Term Stays",
    href: "/short-stays",
    blurb: "Furnished suites and transient units for short sample visits.",
    image: image(
      "photo-1571896349842-33c89424de2d",
      "Sample photo: furnished suite with a made bed and warm lighting",
    ),
  },
];
