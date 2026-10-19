import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ListingSkeleton } from "@/components/ui/skeleton";
import { DemoNotice } from "@/components/layout/demo-notice";
import { ListingExplorer } from "@/components/properties/listing-explorer";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Discover Properties",
  description:
    "Browse and filter twelve sample property listings across Davao City. Search, filters, and sorting run locally in the browser.",
};

export default function PropertiesPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 md:py-14">
      <header className="flex flex-col gap-4">
        <p className="type-eyebrow text-muted">Davao City sample listings</p>
        <h1 className="type-page-title text-charcoal">Discover Properties</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Browse the full sample dataset, then narrow it by search text,
          category, transaction, area, price, bedrooms, and bathrooms. Filtering
          happens in your browser.
        </p>
        <DemoNotice />
      </header>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingExplorer
          properties={properties}
          basePath="/properties"
          ariaLabel="All sample properties"
        />
      </Suspense>
    </Container>
  );
}
