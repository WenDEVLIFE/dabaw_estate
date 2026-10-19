import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ListingSkeleton } from "@/components/ui/skeleton";
import { DemoNotice } from "@/components/layout/demo-notice";
import { ListingExplorer } from "@/components/properties/listing-explorer";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties for Rent",
  description:
    "Sample long-term rental properties in Davao City, including apartments, houses, and condominiums.",
};

export default function RentPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 md:py-14">
      <header className="flex flex-col gap-4">
        <p className="type-eyebrow text-muted">For Rent · sample catalog</p>
        <h1 className="type-page-title text-charcoal">
          Properties for Rent
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Sample long-term rentals in Davao City, including apartments, family
          houses, and lofts. Monthly sample rates are shown on every card.
        </p>
        <DemoNotice />
      </header>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingExplorer
          properties={properties}
          basePath="/rent"
          lockedCategory="for-rent"
          ariaLabel="Sample long-term rentals"
        />
      </Suspense>
    </Container>
  );
}
