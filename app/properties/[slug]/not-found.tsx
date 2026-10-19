import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

export const metadata = {
  title: "Property not found",
};

/** Property-specific 404 used when an unknown slug calls `notFound()`. */
export default function PropertyNotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="type-eyebrow text-muted">Sample listing</p>
        <h1 className="type-page-title text-charcoal">Property not found</h1>
        <p className="text-base leading-relaxed text-muted">
          This sample property does not exist or may have been removed from the
          demo dataset. Browse the full sample collection to find another
          listing.
        </p>
        <Link
          href="/properties"
          className={buttonClasses({ variant: "primary", className: "mt-4" })}
        >
          Back to all properties
        </Link>
      </div>
    </Container>
  );
}
