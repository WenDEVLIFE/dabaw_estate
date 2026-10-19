import { InquiryForm } from "@/components/ui/inquiry-form";
import type { Property } from "@/types/property";

/**
 * Detail-page inquiry entry point. The current listing is preselected and
 * clearly identified; the shared form handles validation and simulation.
 */
export function PropertyInquiryForm({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  return (
    <InquiryForm
      lockedProperty={{ slug: property.slug, title: property.title }}
      className={className}
    />
  );
}
