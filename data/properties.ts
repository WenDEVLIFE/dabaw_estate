import {
  type Category,
  type Property,
  type PropertyImage,
} from "@/types/property";

const UNSPLASH = "https://images.unsplash.com";

/**
 * Build a responsive Unsplash URL for a curated photo id.
 * Query strings are allowed by the `images.remotePatterns` entry in next.config.ts.
 */
function photo(id: string): string {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=1200&q=80`;
}

function image(id: string, alt: string): PropertyImage {
  return { src: photo(id), alt };
}

/**
 * Twelve fictional sample records covering all four categories and all seven
 * Davao City areas. Photos are generic stock images and do not depict the
 * listed sample properties. See openspec mock-property-data spec.
 */
export const properties = [
  {
    id: "p-001",
    slug: "matina-family-home",
    title: "Matina Family Home",
    category: "for-sale",
    transactionType: "sale",
    propertyType: "House",
    price: 8_500_000,
    location: "Matina",
    addressLabel: "Sample Street, Matina",
    description:
      "A fictional two-storey family home concept in Matina with a covered porch, garden lot, and open-plan living area. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1560518883-ce09059eeffa",
        "Sample photo: modern two-storey house exterior with a front lawn",
      ),
      image(
        "photo-1600585154340-be6161a56a0c",
        "Sample photo: bright open-plan living room with neutral furnishings",
      ),
      image(
        "photo-1600566753086-00f18fb6b3ea",
        "Sample photo: contemporary kitchen with island counter",
      ),
    ],
    bedrooms: 4,
    bathrooms: 3,
    floorArea: 210,
    lotArea: 300,
    parking: 2,
    amenities: [
      "Covered carport",
      "Garden lot",
      "Built-in wardrobes",
      "Laundry area",
    ],
    featured: true,
    status: "sample",
    createdAt: "2026-09-12",
  },
  {
    id: "p-002",
    slug: "ecoland-garden-townhouse",
    title: "Ecoland Garden Townhouse",
    category: "for-sale",
    transactionType: "sale",
    propertyType: "Townhouse",
    price: 6_200_000,
    location: "Ecoland",
    addressLabel: "Sample Lane, Ecoland",
    description:
      "A fictional three-bedroom townhouse concept in Ecoland with a small private garden and a shared community driveway. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1600596542815-ffad4c1539a9",
        "Sample photo: row of modern townhouses with landscaped frontage",
      ),
      image(
        "photo-1600607687939-ce8a6c25118c",
        "Sample photo: minimal townhouse living area with large windows",
      ),
    ],
    bedrooms: 3,
    bathrooms: 3,
    floorArea: 140,
    lotArea: 90,
    parking: 1,
    amenities: ["Private garden", "Guardhouse access", "Two-car driveway"],
    featured: false,
    status: "sample",
    createdAt: "2026-08-03",
  },
  {
    id: "p-003",
    slug: "lanang-skyline-condo",
    title: "Lanang Skyline Condo",
    category: "for-sale",
    transactionType: "sale",
    propertyType: "Condominium",
    price: 5_400_000,
    location: "Lanang",
    addressLabel: "Sample Avenue, Lanang",
    description:
      "A fictional one-bedroom condominium concept with skyline views near the Lanang business district. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1512917774080-9991f1c4c750",
        "Sample photo: modern condo building facade at dusk",
      ),
      image(
        "photo-1502672260266-1c1ef2d93688",
        "Sample photo: bright condo living space with city window view",
      ),
    ],
    bedrooms: 1,
    bathrooms: 1,
    floorArea: 48,
    parking: 1,
    amenities: ["Skyline view", "Shared gym", "24-hour sample reception desk"],
    featured: false,
    status: "sample",
    createdAt: "2026-10-02",
  },
  {
    id: "p-004",
    slug: "bajada-city-apartment",
    title: "Bajada City Apartment",
    category: "for-rent",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 25_000,
    priceLabel: "/month",
    location: "Bajada",
    addressLabel: "Sample Street, Bajada",
    description:
      "A fictional furnished two-bedroom apartment concept within walking distance of Bajada shops and transport. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1522708323590-d24dbb6b0267",
        "Sample photo: furnished apartment living room with sofa and coffee table",
      ),
      image(
        "photo-1560448204-e02f11c3d0e2",
        "Sample photo: compact apartment bedroom with natural light",
      ),
    ],
    bedrooms: 2,
    bathrooms: 1,
    floorArea: 62,
    parking: 1,
    amenities: ["Furnished", "Air conditioning", "Building elevator"],
    featured: true,
    status: "sample",
    createdAt: "2026-07-21",
  },
  {
    id: "p-005",
    slug: "matina-greenview-house",
    title: "Matina Greenview House",
    category: "for-rent",
    transactionType: "rent",
    propertyType: "House",
    price: 45_000,
    priceLabel: "/month",
    location: "Matina",
    addressLabel: "Sample Drive, Matina",
    description:
      "A fictional three-bedroom house rental concept in a quiet Matina neighborhood with a fenced yard. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1570129477492-45c003edd2be",
        "Sample photo: single-storey house with fenced front garden",
      ),
      image(
        "photo-1600047509807-ba8f99d2cdde",
        "Sample photo: spacious living room with wooden flooring",
      ),
    ],
    bedrooms: 3,
    bathrooms: 2,
    floorArea: 160,
    lotArea: 220,
    parking: 2,
    amenities: ["Fenced yard", "Built-in cabinets", "Utility room"],
    featured: false,
    status: "sample",
    createdAt: "2026-09-28",
  },
  {
    id: "p-006",
    slug: "buhangin-parkview-apartment",
    title: "Buhangin Parkview Apartment",
    category: "for-rent",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 18_000,
    priceLabel: "/month",
    location: "Buhangin",
    addressLabel: "Sample Road, Buhangin",
    description:
      "A fictional one-bedroom apartment concept near a Buhangin park, suitable for a single tenant or couple. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1583608205776-bfd35f0d9f83",
        "Sample photo: apartment building exterior with green surroundings",
      ),
      image(
        "photo-1580587771525-78b9dba3b914",
        "Sample photo: modern apartment interior with dining nook",
      ),
    ],
    bedrooms: 1,
    bathrooms: 1,
    floorArea: 38,
    parking: 1,
    amenities: ["Park view", "Air conditioning", "Shared laundry"],
    featured: false,
    status: "sample",
    createdAt: "2026-06-15",
  },
  {
    id: "p-007",
    slug: "downtown-executive-loft",
    title: "Downtown Executive Loft",
    category: "for-rent",
    transactionType: "rent",
    propertyType: "Condominium",
    price: 32_000,
    priceLabel: "/month",
    location: "Downtown Davao",
    addressLabel: "Sample Street, Downtown Davao",
    description:
      "A fictional open-plan loft concept in the downtown core with high ceilings and a dedicated work corner. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1600607687939-ce8a6c25118c",
        "Sample photo: open loft interior with tall windows and high ceiling",
      ),
      image(
        "photo-1497366754035-f200968a6e72",
        "Sample photo: tidy home office corner with desk",
      ),
    ],
    bedrooms: 1,
    bathrooms: 1,
    floorArea: 55,
    parking: 1,
    amenities: ["High ceiling", "Work corner", "Concierge desk"],
    featured: false,
    status: "sample",
    createdAt: "2026-10-08",
  },
  {
    id: "p-008",
    slug: "lanang-retail-frontage",
    title: "Lanang Retail Frontage",
    category: "commercial",
    transactionType: "lease",
    propertyType: "Retail",
    price: 120_000,
    priceLabel: "/month",
    location: "Lanang",
    addressLabel: "Sample Corner, Lanang",
    description:
      "A fictional ground-floor retail unit concept with street frontage along a busy Lanang corner. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1441986300917-64674bd600d8",
        "Sample photo: retail storefront with large glass windows",
      ),
      image(
        "photo-1565610222536-ef125c59da2e",
        "Sample photo: empty retail interior with shelving",
      ),
    ],
    floorArea: 180,
    parking: 4,
    amenities: ["Street frontage", "Glass facade", "Rear loading access"],
    featured: false,
    status: "sample",
    createdAt: "2026-05-30",
  },
  {
    id: "p-009",
    slug: "toril-logistics-warehouse",
    title: "Toril Logistics Warehouse",
    category: "commercial",
    transactionType: "sale",
    propertyType: "Warehouse",
    price: 45_000_000,
    location: "Toril",
    addressLabel: "Sample Highway, Toril",
    description:
      "A fictional single-storey warehouse concept with high clearance and truck access near a Toril highway junction. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1553413077-190dd305871c",
        "Sample photo: large warehouse interior with steel roof trusses",
      ),
      image(
        "photo-1565610222536-ef125c59da2e",
        "Sample photo: wide empty industrial floor area",
      ),
    ],
    floorArea: 1200,
    lotArea: 2000,
    parking: 8,
    amenities: ["High clearance", "Truck bay", "Perimeter fence"],
    featured: false,
    status: "sample",
    createdAt: "2026-04-18",
  },
  {
    id: "p-010",
    slug: "ecoland-short-stay-suite",
    title: "Ecoland Short Stay Suite",
    category: "short-stay",
    transactionType: "rent",
    propertyType: "Condominium",
    price: 3_200,
    priceLabel: "/night",
    location: "Ecoland",
    addressLabel: "Sample Street, Ecoland",
    description:
      "A fictional furnished studio suite concept for short visits in Ecoland, with a compact kitchenette. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1571896349842-33c89424de2d",
        "Sample photo: hotel-style suite with made bed and warm lighting",
      ),
      image(
        "photo-1590490360182-c33d57733427",
        "Sample photo: compact suite interior with kitchenette",
      ),
    ],
    bedrooms: 1,
    bathrooms: 1,
    floorArea: 32,
    amenities: ["Furnished", "Kitchenette", "Weekly sample housekeeping"],
    featured: true,
    status: "sample",
    createdAt: "2026-10-14",
  },
  {
    id: "p-011",
    slug: "downtown-heritage-studio",
    title: "Downtown Heritage Studio",
    category: "short-stay",
    transactionType: "rent",
    propertyType: "Apartment",
    price: 2_500,
    priceLabel: "/night",
    location: "Downtown Davao",
    addressLabel: "Sample Street, Downtown Davao",
    description:
      "A fictional studio concept styled after heritage downtown architecture, close to sample landmarks. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1502672260266-1c1ef2d93688",
        "Sample photo: studio interior with large window and city view",
      ),
      image(
        "photo-1522708323590-d24dbb6b0267",
        "Sample photo: small living area with sofa and reading lamp",
      ),
    ],
    bathrooms: 1,
    floorArea: 28,
    amenities: ["Furnished", "Air conditioning", "Self check-in locker"],
    featured: false,
    status: "sample",
    createdAt: "2026-08-25",
  },
  {
    id: "p-012",
    slug: "toril-riverside-transient",
    title: "Toril Riverside Transient",
    category: "short-stay",
    transactionType: "rent",
    propertyType: "Transient",
    price: 1_800,
    priceLabel: "/night",
    location: "Toril",
    addressLabel: "Sample Riverside, Toril",
    description:
      "A fictional two-bedroom transient unit concept near a Toril riverside area, suited to short family visits. Sample listing for demonstration only.",
    images: [
      image(
        "photo-1497366811353-6870744d04b2",
        "Sample photo: bright room with simple modern furnishings",
      ),
      image(
        "photo-1580587771525-78b9dba3b914",
        "Sample photo: transient unit dining area with natural light",
      ),
    ],
    bedrooms: 2,
    bathrooms: 1,
    floorArea: 45,
    parking: 1,
    amenities: ["Furnished", "Air conditioning", "Cooking allowed"],
    featured: false,
    status: "sample",
    createdAt: "2026-07-09",
  },
] satisfies readonly Property[];

/** Find a single sample record by slug. */
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

/** Featured records, newest first. */
export function getFeatured(): Property[] {
  return properties
    .filter((property) => property.featured)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

/** All records for a category, newest first. */
export function getByCategory(category: Category): Property[] {
  return properties
    .filter((property) => property.category === category)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

/**
 * Up to `limit` related records: same-category first, then newest of the rest.
 * The current record is always excluded.
 */
export function getRelated(property: Property, limit = 3): Property[] {
  const sameCategory = properties.filter(
    (candidate) =>
      candidate.slug !== property.slug &&
      candidate.category === property.category,
  );
  const others = properties.filter(
    (candidate) =>
      candidate.slug !== property.slug &&
      candidate.category !== property.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
