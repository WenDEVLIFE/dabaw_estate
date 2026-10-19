import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

export const metadata = {
  title: "Page not found",
};

/** Shell-level 404 for unmatched routes. Rendered inside the root layout. */
export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="type-eyebrow text-muted">Error 404</p>
        <h1 className="type-page-title text-charcoal">Page not found</h1>
        <p className="text-base leading-relaxed text-muted">
          The page you were looking for does not exist or may have moved.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/properties"
            className={buttonClasses({ variant: "primary" })}
          >
            Browse properties
          </Link>
          <Link
            href="/"
            className={buttonClasses({ variant: "secondary" })}
          >
            Back to home
          </Link>
        </div>
      </div>
    </Container>
  );
}
