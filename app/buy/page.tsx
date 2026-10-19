import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ListingSkeleton } from "@/components/ui/skeleton";
import { DemoNotice } from "@/components/layout/demo-notice";
import { ListingExplorer } from "@/components/properties/listing-explorer";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Homes for Sale",
  description:
    "Sample homes for sale in Davao City, including houses, townhouses, and condominiums.",
};

export default function BuyPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 md:py-14">
      <header className="flex flex-col gap-4">
        <p className="type-eyebrow text-muted">For Sale · sample catalog</p>
        <h1 className="type-page-title text-charcoal">Homes for Sale</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Sample houses, townhouses, and condominiums for sale across Davao
          City. This page keeps the category fixed while the local controls
          narrow the results further.
        </p>
        <DemoNotice />
      </header>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingExplorer
          properties={properties}
          basePath="/buy"
          lockedCategory="for-sale"
          ariaLabel="Sample homes for sale"
        />
      </Suspense>
    </Container>
  );
}
