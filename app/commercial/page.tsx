import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ListingSkeleton } from "@/components/ui/skeleton";
import { DemoNotice } from "@/components/layout/demo-notice";
import { ListingExplorer } from "@/components/properties/listing-explorer";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Commercial Spaces",
  description:
    "Sample commercial spaces in Davao City, including retail frontage, offices, and warehouse concepts.",
};

export default function CommercialPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 md:py-14">
      <header className="flex flex-col gap-4">
        <p className="type-eyebrow text-muted">Commercial · sample catalog</p>
        <h1 className="type-page-title text-charcoal">Commercial Spaces</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Sample retail, office, and warehouse concepts for business use. Cards
          omit residential details such as bedrooms when they do not apply.
        </p>
        <DemoNotice />
      </header>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingExplorer
          properties={properties}
          basePath="/commercial"
          lockedCategory="commercial"
          ariaLabel="Sample commercial spaces"
        />
      </Suspense>
    </Container>
  );
}
