import { getRelated } from "@/data/properties";
import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyGrid } from "@/components/properties/property-grid";
import type { Property } from "@/types/property";

/**
 * Up to three related sample records from the local dataset.
 * `getRelated` always excludes the current slug.
 */
export function RelatedProperties({ property }: { property: Property }) {
  const related = getRelated(property, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-properties-heading"
      className="flex flex-col gap-6"
    >
      <SectionHeading
        id="related-properties-heading"
        eyebrow="Keep exploring"
        title="Related properties"
        description="More sample records from the same local dataset."
      />
      <PropertyGrid properties={related} ariaLabel="Related sample properties" />
    </section>
  );
}
