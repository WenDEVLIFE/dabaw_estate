import type { DemoInquiry } from "@/types/inquiry";

/**
 * Fictional sample inquiries for the demo admin preview.
 * Every entry is explicitly marked `sample` and must never be presented as a
 * real customer inquiry. Nothing here is transmitted or persisted.
 */
export const demoInquiries: readonly DemoInquiry[] = [
  {
    id: "inq-sample-001",
    name: "Sample Inquiry A",
    email: "sample.a@example.com",
    phone: "+63 900 000 0001",
    message:
      "Sample message: asking about viewing times for the Matina Family Home.",
    propertySlug: "matina-family-home",
    createdAt: "2026-10-16",
    sample: true,
  },
  {
    id: "inq-sample-002",
    name: "Sample Inquiry B",
    email: "sample.b@example.com",
    phone: "+63 900 000 0002",
    message:
      "Sample message: interested in the monthly rent for the Bajada City Apartment.",
    propertySlug: "bajada-city-apartment",
    createdAt: "2026-10-15",
    sample: true,
  },
  {
    id: "inq-sample-003",
    name: "Sample Inquiry C",
    email: "sample.c@example.com",
    phone: "",
    message:
      "Sample message: requesting short-stay availability for the Ecoland Short Stay Suite.",
    propertySlug: "ecoland-short-stay-suite",
    createdAt: "2026-10-14",
    sample: true,
  },
  {
    id: "inq-sample-004",
    name: "Sample Inquiry D",
    email: "sample.d@example.com",
    phone: "+63 900 000 0004",
    message:
      "Sample message: general question about commercial retail space options.",
    createdAt: "2026-10-12",
    sample: true,
  },
];
