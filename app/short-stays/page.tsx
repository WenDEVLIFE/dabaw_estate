import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { ListingSkeleton } from "@/components/ui/skeleton";
import { DemoNotice } from "@/components/layout/demo-notice";
import { ListingExplorer } from "@/components/properties/listing-explorer";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Short-Term Stays",
  description:
    "Sample furnished suites and transient units for short stays in Davao City.",
};

export default function ShortStaysPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 md:py-14">
      <header className="flex flex-col gap-4">
        <p className="type-eyebrow text-muted">Short Stay · sample catalog</p>
        <h1 className="type-page-title text-charcoal">Short-Term Stays</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Sample furnished suites and transient units for short visits. Nightly
          sample rates are shown on every card.
        </p>
        <DemoNotice />
      </header>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingExplorer
          properties={properties}
          basePath="/short-stays"
          lockedCategory="short-stay"
          ariaLabel="Sample short-term stays"
        />
      </Suspense>
    </Container>
  );
}
