import Link from "next/link";
import { MapPointIcon } from "@solar-icons/react/linear";
import { areas } from "@/data/areas";

/**
 * Seven Davao City area highlights. Each area links to the listings page
 * filtered by that area using the shared URL query contract.
 */
export function AreaHighlights() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {areas.map(({ area, blurb }) => (
        <li key={area}>
          <Link
            href={`/properties?area=${encodeURIComponent(area)}`}
            className="flex h-full flex-col gap-2 rounded-card border border-border bg-white p-5 transition-colors hover:border-forest"
          >
            <span className="flex items-center gap-1.5 text-base font-semibold text-charcoal">
              <MapPointIcon aria-hidden="true" className="h-4 w-4 text-gold" />
              {area}
            </span>
            <span className="text-sm leading-relaxed text-muted">{blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
