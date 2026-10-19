import Link from "next/link";
import { BathIcon, BedIcon, CarIcon, MapPointIcon, MaximizeIcon } from "@solar-icons/react/linear";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/ui/safe-image";
import { buttonClasses } from "@/components/ui/button";
import { FavoriteButton } from "@/components/properties/favorite-button";
import {
  CATEGORY_LABELS,
  type Property,
} from "@/types/property";
import { formatArea, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const CARD_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Property summary card. Shows only the facts that apply to the record, so
 * commercial listings never render bedroom or bathroom details.
 */
export function PropertyCard({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const image = property.images[0];

  const facts: Array<{ key: string; label: string; Icon: typeof BedIcon }> = [];
  if (property.bedrooms !== undefined) {
    facts.push({
      key: "beds",
      label: `${property.bedrooms} bd`,
      Icon: BedIcon,
    });
  }
  if (property.bathrooms !== undefined) {
    facts.push({
      key: "baths",
      label: `${property.bathrooms} ba`,
      Icon: BathIcon,
    });
  }
  if (property.floorArea !== undefined) {
    facts.push({
      key: "floor",
      label: formatArea(property.floorArea),
      Icon: MaximizeIcon,
    });
  }
  if (property.parking !== undefined) {
    facts.push({
      key: "parking",
      label: `${property.parking} parking`,
      Icon: CarIcon,
    });
  }

  const detailHref = `/properties/${property.slug}`;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-card border border-border bg-white transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="relative">
        <SafeImage
          src={image.src}
          alt={image.alt}
          sizes={CARD_IMAGE_SIZES}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone="category">{CATEGORY_LABELS[property.category]}</Badge>
          {property.featured ? (
            <Badge tone="featured">Featured</Badge>
          ) : null}
        </div>
        <FavoriteButton
          propertyId={property.id}
          propertyTitle={property.title}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-snug text-charcoal">
          <Link
            href={detailHref}
            className="rounded-control underline-offset-4 hover:text-forest hover:underline"
          >
            {property.title}
          </Link>
        </h3>

        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPointIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          {property.location}, Davao City
        </p>

        <p className="price text-xl text-forest">
          {formatPrice(property.price, property.priceLabel)}
        </p>

        {facts.length > 0 ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {facts.map(({ key, label, Icon }) => (
              <li key={key} className="flex items-center gap-1.5">
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-2">
          <Link
            href={detailHref}
            className={buttonClasses({
              variant: "secondary",
              size: "sm",
              className: "w-full",
            })}
          >
            View property
          </Link>
        </div>
      </div>
    </article>
  );
}
