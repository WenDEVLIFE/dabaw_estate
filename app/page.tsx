import Link from "next/link";
import {
  ArrowRightIcon,
  BuildingsIcon,
  CompassIcon,
  MapPointIcon,
  MagnifierIcon,
} from "@solar-icons/react/linear";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeImage } from "@/components/ui/safe-image";
import { DemoNotice } from "@/components/layout/demo-notice";
import { HeroSearch } from "@/components/properties/hero-search";
import { PropertyGrid } from "@/components/properties/property-grid";
import { CategoryCard } from "@/components/properties/category-card";
import { AreaHighlights } from "@/components/properties/area-highlights";
import { categories } from "@/data/categories";
import { getFeatured } from "@/data/properties";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80";

const WHY_ITEMS = [
  {
    title: "Davao City focus",
    description:
      "Every sample record is placed in one of seven Davao City areas, from Matina to Downtown.",
    Icon: MapPointIcon,
  },
  {
    title: "Demo-first honesty",
    description:
      "Listings are clearly labeled sample content, and inquiry forms never contact a real agent.",
    Icon: CompassIcon,
  },
  {
    title: "Straightforward search",
    description:
      "Search, filter, and sort the local dataset in the browser without an account or backend.",
    Icon: MagnifierIcon,
  },
] as const;

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-deep text-white">
        <div className="absolute inset-0">
          <SafeImage
            src={HERO_IMAGE}
            alt="Sample photo: contemporary Davao house with a landscaped front yard"
            sizes="100vw"
            preload
            aspectClassName="h-full w-full"
            className="h-full w-full"
            imageClassName="object-cover"
          />
          <div className="absolute inset-0 bg-forest-deep/70" />
        </div>

        <Container className="relative flex flex-col gap-10 py-16 md:py-24">
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="type-eyebrow text-gold-soft">
              Davao City · Philippines
            </p>
            <h1 className="type-hero text-white">Find your place in Davao.</h1>
            <p className="max-w-2xl text-base leading-relaxed text-ivory/90 sm:text-lg">
              Explore sample homes, rentals, commercial spaces, and short stays
              across the city. Search locally, compare clearly, and preview the
              full browsing experience.
            </p>
          </div>

          <HeroSearch className="max-w-4xl" />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="flex flex-col gap-8 py-16 md:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected sample listings"
              title="Featured properties"
              description="A small selection of sample records marked as featured in the local dataset."
            />
            <Link
              href="/properties"
              className={buttonClasses({ variant: "secondary", size: "sm" })}
            >
              Browse all properties
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <PropertyGrid
            properties={featured}
            ariaLabel="Featured sample properties"
          />
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="flex flex-col gap-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Browse by category"
            title="What are you looking for?"
            description="Four sample categories cover homes for sale, long-term rentals, commercial space, and short stays."
          />
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.category} className="flex">
                <CategoryCard category={category} className="w-full" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="flex flex-col gap-8 py-16 md:py-24">
          <SectionHeading
            eyebrow="Across the city"
            title="Explore Davao City areas"
            description="Area highlights are filter options only. They do not imply that real listings are available in each area."
          />
          <AreaHighlights />
        </Container>
      </section>

      <section className="bg-forest text-white">
        <Container className="flex flex-col gap-10 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="type-eyebrow text-gold-soft">Why DABAW ESTATE</p>
            <h2 className="type-section-title mt-3 text-white">
              A calm, honest way to preview a real estate site
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ivory/80">
              This project is a frontend-only prototype built to demonstrate
              layout, search, and interaction patterns without a database or
              real transactions.
            </p>
          </div>

          <ul className="grid gap-6 md:grid-cols-3">
            {WHY_ITEMS.map(({ title, description, Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-3 rounded-card border border-white/15 bg-white/5 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-gold-soft/15 text-gold">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-ivory/80">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="py-16 md:py-24">
          <div className="flex flex-col gap-8 rounded-card border border-border bg-white p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="type-eyebrow text-muted">Start exploring</p>
              <h2 className="type-section-title text-charcoal">
                Ready to browse the sample listings?
              </h2>
              <p className="text-base leading-relaxed text-muted">
                Open the full listing explorer or preview the simulated inquiry
                form. No account, backend, or real message is involved.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/properties"
                className={buttonClasses({ variant: "primary" })}
              >
                Explore properties
                <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={buttonClasses({ variant: "secondary" })}
              >
                <BuildingsIcon aria-hidden="true" className="h-4 w-4" />
                Contact the demo
              </Link>
            </div>
          </div>

          <DemoNotice className="mt-6" />
        </Container>
      </section>
    </>
  );
}
