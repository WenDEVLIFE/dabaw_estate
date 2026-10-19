import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  BathIcon,
  BedIcon,
  BuildingsIcon,
  CarIcon,
  CheckIcon,
  MapPointIcon,
  MaximizeIcon,
  RulerIcon,
} from "@solar-icons/react/linear";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { DemoNotice } from "@/components/layout/demo-notice";
import { FavoriteButton } from "@/components/properties/favorite-button";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyInquiryForm } from "@/components/properties/property-inquiry-form";
import { RelatedProperties } from "@/components/properties/related-properties";
import { getPropertyBySlug, properties } from "@/data/properties";
import { formatArea, formatPrice } from "@/lib/utils";
import { SAMPLE_LISTING_LABEL } from "@/lib/constants";
import {
  CATEGORY_LABELS,
  TRANSACTION_LABELS,
  type Property,
} from "@/types/property";

/**
 * All twelve slugs are enumerated below, so every valid URL is prerendered at
 * build time.
 *
 * `dynamicParams = false` is NOT available under `nextConfig.cacheComponents`
 * (Next 16 removed it; exporting it fails the build with
 * "Route segment config \"dynamicParams\" is not compatible with
 * nextConfig.cacheComponents"). To make unknown slugs return a real HTTP 404
 * instead of a streamed 200, this route opts out of instant navigation with
 * `instant = false`, so the server resolves `params` and runs the `notFound()`
 * check before it commits a status code.
 * See node_modules/next/dist/docs/01-app/02-guides/building.md
 * ("A blocking product page"), 02-guides/streaming.md ("When does streaming
 * start?"), 03-api-reference/03-file-conventions/02-route-segment-config/
 * ensureStatic.md ("Dynamic route parameters"), and
 * 02-guides/migrating-to-cache-components.md ("dynamicParams is not supported").
 */
export const instant = false;

/**
 * Require the complete route to be produced during prerendering. For slug
 * values not returned by `generateStaticParams`, Next.js waits for the page to
 * be generated before serving it, so the `notFound()` check runs before any
 * status code is committed and unknown slugs return a real HTTP 404.
 */
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property not found" };
  }

  return {
    title: property.title,
    description: `${property.propertyType} in ${property.location}, Davao City. ${property.description}`,
  };
}

/** Human-readable price context for the sample sale/rental amounts. */
function getPriceContext(property: Property): string {
  if (property.priceLabel === "/month") {
    return property.category === "commercial"
      ? "Monthly sample lease rate"
      : "Monthly sample rate";
  }
  if (property.priceLabel === "/night") {
    return "Nightly sample rate";
  }
  return "Sample sale price";
}

/**
 * Detail page. `params` is awaited at the top level — the pattern the Next 16
 * docs prescribe when `generateStaticParams` is used with Cache Components —
 * so an unknown slug can call `notFound()` before any output streams.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const facts: Array<{
    key: string;
    label: string;
    value: string;
    Icon: typeof BedIcon;
  }> = [
    {
      key: "type",
      label: "Property type",
      value: property.propertyType,
      Icon: BuildingsIcon,
    },
  ];

  if (property.bedrooms !== undefined) {
    facts.push({
      key: "bedrooms",
      label: "Bedrooms",
      value: String(property.bedrooms),
      Icon: BedIcon,
    });
  }
  if (property.bathrooms !== undefined) {
    facts.push({
      key: "bathrooms",
      label: "Bathrooms",
      value: String(property.bathrooms),
      Icon: BathIcon,
    });
  }
  if (property.floorArea !== undefined) {
    facts.push({
      key: "floor",
      label: "Floor area",
      value: formatArea(property.floorArea),
      Icon: MaximizeIcon,
    });
  }
  if (property.lotArea !== undefined) {
    facts.push({
      key: "lot",
      label: "Lot area",
      value: formatArea(property.lotArea),
      Icon: RulerIcon,
    });
  }
  if (property.parking !== undefined) {
    facts.push({
      key: "parking",
      label: "Parking",
      value: `${property.parking} slot${property.parking === 1 ? "" : "s"}`,
      Icon: CarIcon,
    });
  }

  return (
    <Container className="flex flex-col gap-8 py-8 md:py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/properties"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-forest underline-offset-4 hover:underline"
        >
          <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
          Back to all properties
        </Link>
        <DemoNotice variant="compact" className="lg:max-w-2xl" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-10">
          <PropertyGallery
            images={property.images}
            title={property.title}
          />

          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone="category">
                {CATEGORY_LABELS[property.category]}
              </Badge>
              <Badge tone="transaction">
                {TRANSACTION_LABELS[property.transactionType]}
              </Badge>
              <Badge tone="sample">{SAMPLE_LISTING_LABEL}</Badge>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-2">
                <h1 className="type-page-title text-charcoal">
                  {property.title}
                </h1>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPointIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {property.location}, Davao City
                  {property.addressLabel ? ` · ${property.addressLabel}` : ""}
                </p>
              </div>
              <FavoriteButton
                propertyId={property.id}
                propertyTitle={property.title}
                variant="labeled"
              />
            </div>

            <div>
              <p className="text-sm text-muted">{getPriceContext(property)}</p>
              <p className="price text-3xl text-forest">
                {formatPrice(property.price, property.priceLabel)}
              </p>
            </div>
          </header>

          <section
            aria-labelledby="property-details-heading"
            className="flex flex-col gap-4"
          >
            <h2
              id="property-details-heading"
              className="type-section-title text-charcoal"
            >
              Property details
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(({ key, label, value, Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-card border border-border bg-white p-4"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-gold-soft/40 text-forest">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                      {label}
                    </dt>
                    <dd className="text-sm font-medium text-charcoal">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="property-description-heading"
            className="flex flex-col gap-3"
          >
            <h2
              id="property-description-heading"
              className="type-section-title text-charcoal"
            >
              About this property
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-charcoal/90">
              {property.description}
            </p>
          </section>

          {property.amenities && property.amenities.length > 0 ? (
            <section
              aria-labelledby="property-amenities-heading"
              className="flex flex-col gap-3"
            >
              <h2
                id="property-amenities-heading"
                className="type-section-title text-charcoal"
              >
                Amenities
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-charcoal"
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-forest"
                    />
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <RelatedProperties property={property} />
        </div>

        <aside
          aria-labelledby="inquiry-heading"
          className="flex flex-col gap-4 rounded-card border border-border bg-white p-5 sm:p-6 lg:sticky lg:top-20 lg:self-start"
        >
          <h2
            id="inquiry-heading"
            className="type-section-title text-charcoal"
          >
            Inquire about this property
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            This sample inquiry form is preselected with{" "}
            <span className="font-medium text-charcoal">
              {property.title}
            </span>
            . Nothing is transmitted.
          </p>
          <PropertyInquiryForm property={property} />
        </aside>
      </div>
    </Container>
  );
}
