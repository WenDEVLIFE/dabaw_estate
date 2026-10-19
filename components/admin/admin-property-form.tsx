"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { DangerCircleIcon, AddIcon, DisketteIcon } from "@solar-icons/react/linear";
import { Button } from "@/components/ui/button";
import { validatePropertyDraft } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  DAVAO_AREAS,
  PRICE_LABELS,
  PROPERTY_TYPES,
  TRANSACTIONS,
  TRANSACTION_LABELS,
  type Category,
  type DavaoArea,
  type PriceLabel,
  type Property,
  type PropertyDraft,
  type PropertyDraftErrors,
  type PropertyType,
  type TransactionType,
} from "@/types/property";
import { cn } from "@/lib/utils";

const CONTROL_CLASSES =
  "min-h-11 w-full rounded-control border bg-white px-3 py-2 text-sm text-charcoal transition-colors";

/** Fallback imagery for admin-created rows, matching the sample URL shape. */
const PLACEHOLDER_IMAGE = {
  src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  alt: "Sample photo: placeholder image added by the demo admin form",
} as const;

/** Raw form state: a `PropertyDraft` plus the fields the validator ignores. */
interface AdminFormState extends PropertyDraft {
  priceLabel: PriceLabel | "";
  addressLabel: string;
  featured: boolean;
}

/** Field order used to focus the first invalid control after a failed submit. */
const FIELD_ORDER: ReadonlyArray<keyof PropertyDraft> = [
  "title",
  "category",
  "transactionType",
  "propertyType",
  "price",
  "location",
  "description",
  "bedrooms",
  "bathrooms",
  "floorArea",
  "lotArea",
  "parking",
];

function emptyState(): AdminFormState {
  return {
    title: "",
    category: "",
    transactionType: "",
    propertyType: "",
    price: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    floorArea: "",
    lotArea: "",
    parking: "",
    amenities: "",
    priceLabel: "",
    addressLabel: "",
    featured: false,
  };
}

function numberToString(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

function stateFromProperty(property: Property): AdminFormState {
  return {
    title: property.title,
    category: property.category,
    transactionType: property.transactionType,
    propertyType: property.propertyType,
    price: String(property.price),
    location: property.location,
    description: property.description,
    bedrooms: numberToString(property.bedrooms),
    bathrooms: numberToString(property.bathrooms),
    floorArea: numberToString(property.floorArea),
    lotArea: numberToString(property.lotArea),
    parking: numberToString(property.parking),
    amenities: property.amenities?.join(", ") ?? "",
    priceLabel: property.priceLabel ?? "",
    addressLabel: property.addressLabel ?? "",
    featured: property.featured,
  };
}

function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseAmenities(value: string): string[] | undefined {
  const items = value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm text-error">
      <DangerCircleIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export interface AdminPropertyFormProps {
  mode: "add" | "edit";
  /** Present in `edit` mode; the row being changed. */
  property?: Property;
  /** Current slugs, used to keep a generated slug unique on add. */
  takenSlugs: readonly string[];
  onSave: (property: Property) => void;
  onCancel: () => void;
}

/**
 * Add/edit dialog for demo properties. Values are validated with the shared
 * pure `validatePropertyDraft`; the saved record is built entirely in memory.
 * Add mode generates a unique slug and id from the title; edit mode keeps the
 * existing id/slug stable so in-session links stay valid.
 */
export function AdminPropertyForm({
  mode,
  property,
  takenSlugs,
  onSave,
  onCancel,
}: AdminPropertyFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const idPrefix = useId();
  const [state, setState] = useState<AdminFormState>(() =>
    property ? stateFromProperty(property) : emptyState(),
  );
  const [errors, setErrors] = useState<PropertyDraftErrors>({});

  useEffect(() => {
    const dialog = dialogRef.current;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
      previous?.focus();
    };
  }, []);

  const headingId = `${idPrefix}-heading`;
  const descriptionId = `${idPrefix}-description`;

  function fieldId(field: string): string {
    return `${idPrefix}-${field}`;
  }

  function describedBy(field: keyof PropertyDraft): string | undefined {
    return errors[field] ? `${fieldId(field)}-error` : undefined;
  }

  function setField<K extends keyof AdminFormState>(
    field: K,
    value: AdminFormState[K],
  ) {
    setState((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const key = field as keyof PropertyDraftErrors;
      if (!previous[key]) {
        return previous;
      }
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function uniqueSlug(base: string): string {
    const taken = new Set(takenSlugs);
    let candidate = base;
    let counter = 2;
    while (taken.has(candidate)) {
      candidate = `${base}-${counter}`;
      counter += 1;
    }
    return candidate;
  }

  function buildProperty(): Property {
    const slug = property
      ? property.slug
      : uniqueSlug(slugify(state.title) || "sample-listing");

    const record: Property = {
      id: property?.id ?? `p-admin-${slug}`,
      slug,
      title: state.title.trim(),
      category: state.category as Category,
      transactionType: state.transactionType as TransactionType,
      propertyType: state.propertyType as PropertyType,
      price: Number(state.price.trim()),
      location: state.location as DavaoArea,
      description: state.description.trim(),
      images: property?.images ?? [PLACEHOLDER_IMAGE],
      featured: state.featured,
      status: "sample",
      createdAt: property?.createdAt ?? new Date().toISOString().slice(0, 10),
    };

    if (state.priceLabel) {
      record.priceLabel = state.priceLabel;
    }
    const addressLabel = state.addressLabel.trim();
    if (addressLabel) {
      record.addressLabel = addressLabel;
    }
    const bedrooms = parseOptionalNumber(state.bedrooms);
    if (bedrooms !== undefined) {
      record.bedrooms = bedrooms;
    }
    const bathrooms = parseOptionalNumber(state.bathrooms);
    if (bathrooms !== undefined) {
      record.bathrooms = bathrooms;
    }
    const floorArea = parseOptionalNumber(state.floorArea);
    if (floorArea !== undefined) {
      record.floorArea = floorArea;
    }
    const lotArea = parseOptionalNumber(state.lotArea);
    if (lotArea !== undefined) {
      record.lotArea = lotArea;
    }
    const parking = parseOptionalNumber(state.parking);
    if (parking !== undefined) {
      record.parking = parking;
    }
    const amenities = parseAmenities(state.amenities);
    if (amenities) {
      record.amenities = amenities;
    }

    return record;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validatePropertyDraft(state);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        // Wait for the error markup to commit so `aria-describedby` resolves
        // before focus moves to the first invalid control.
        window.requestAnimationFrame(() => {
          document.getElementById(fieldId(firstInvalid))?.focus();
        });
      }
      return;
    }

    onSave(buildProperty());
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      onCancel={onCancel}
      className="w-[calc(100%-2rem)] max-w-2xl rounded-card border border-border bg-white p-0 text-charcoal shadow-xl"
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex max-h-[85vh] flex-col"
      >
        <header className="flex flex-col gap-1.5 border-b border-border px-5 py-4 sm:px-6">
          <h2 id={headingId} className="text-lg font-semibold text-charcoal">
            {mode === "add" ? "Add a sample property" : "Edit sample property"}
          </h2>
          <p
            id={descriptionId}
            className="text-sm leading-relaxed text-muted"
          >
            Changes stay in this browser session only. The public sample dataset
            is not modified, and a reload restores everything.
          </p>
        </header>

        <div className="flex flex-col gap-4 overflow-y-auto px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={fieldId("title")}
              className="text-sm font-medium text-charcoal"
            >
              Title <span aria-hidden="true" className="text-error">*</span>
            </label>
            <input
              id={fieldId("title")}
              name="title"
              type="text"
              value={state.title}
              onChange={(event) => setField("title", event.target.value)}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={describedBy("title")}
              className={cn(
                CONTROL_CLASSES,
                errors.title
                  ? "border-error"
                  : "border-border hover:border-forest/60",
              )}
            />
            <FieldError id={fieldId("title-error")} message={errors.title} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("category")}
                className="text-sm font-medium text-charcoal"
              >
                Category <span aria-hidden="true" className="text-error">*</span>
              </label>
              <select
                id={fieldId("category")}
                value={state.category}
                onChange={(event) =>
                  setField("category", event.target.value as Category | "")
                }
                aria-invalid={Boolean(errors.category)}
                aria-describedby={describedBy("category")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.category
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {CATEGORY_LABELS[option]}
                  </option>
                ))}
              </select>
              <FieldError
                id={fieldId("category-error")}
                message={errors.category}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("transactionType")}
                className="text-sm font-medium text-charcoal"
              >
                Transaction{" "}
                <span aria-hidden="true" className="text-error">*</span>
              </label>
              <select
                id={fieldId("transactionType")}
                value={state.transactionType}
                onChange={(event) =>
                  setField(
                    "transactionType",
                    event.target.value as TransactionType | "",
                  )
                }
                aria-invalid={Boolean(errors.transactionType)}
                aria-describedby={describedBy("transactionType")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.transactionType
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              >
                <option value="">Select a transaction</option>
                {TRANSACTIONS.map((option) => (
                  <option key={option} value={option}>
                    {TRANSACTION_LABELS[option]}
                  </option>
                ))}
              </select>
              <FieldError
                id={fieldId("transactionType-error")}
                message={errors.transactionType}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("propertyType")}
                className="text-sm font-medium text-charcoal"
              >
                Property type{" "}
                <span aria-hidden="true" className="text-error">*</span>
              </label>
              <select
                id={fieldId("propertyType")}
                value={state.propertyType}
                onChange={(event) =>
                  setField("propertyType", event.target.value as PropertyType | "")
                }
                aria-invalid={Boolean(errors.propertyType)}
                aria-describedby={describedBy("propertyType")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.propertyType
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              >
                <option value="">Select a property type</option>
                {PROPERTY_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError
                id={fieldId("propertyType-error")}
                message={errors.propertyType}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("location")}
                className="text-sm font-medium text-charcoal"
              >
                Location <span aria-hidden="true" className="text-error">*</span>
              </label>
              <select
                id={fieldId("location")}
                value={state.location}
                onChange={(event) =>
                  setField("location", event.target.value as DavaoArea | "")
                }
                aria-invalid={Boolean(errors.location)}
                aria-describedby={describedBy("location")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.location
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              >
                <option value="">Select a Davao area</option>
                {DAVAO_AREAS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError
                id={fieldId("location-error")}
                message={errors.location}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("price")}
                className="text-sm font-medium text-charcoal"
              >
                Price (₱) <span aria-hidden="true" className="text-error">*</span>
              </label>
              <input
                id={fieldId("price")}
                name="price"
                type="number"
                inputMode="numeric"
                min={1}
                step={1000}
                value={state.price}
                onChange={(event) => setField("price", event.target.value)}
                aria-invalid={Boolean(errors.price)}
                aria-describedby={describedBy("price")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.price
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              />
              <FieldError id={fieldId("price-error")} message={errors.price} />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("priceLabel")}
                className="text-sm font-medium text-charcoal"
              >
                Rental period
              </label>
              <select
                id={fieldId("priceLabel")}
                value={state.priceLabel}
                onChange={(event) =>
                  setField("priceLabel", event.target.value as PriceLabel | "")
                }
                className={cn(
                  CONTROL_CLASSES,
                  "border-border hover:border-forest/60",
                )}
              >
                <option value="">No rental period</option>
                {PRICE_LABELS.map((option) => (
                  <option key={option} value={option}>
                    {option === "/month"
                      ? "Per month (/month)"
                      : "Per night (/night)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={fieldId("description")}
              className="text-sm font-medium text-charcoal"
            >
              Description{" "}
              <span aria-hidden="true" className="text-error">*</span>
            </label>
            <textarea
              id={fieldId("description")}
              name="description"
              rows={3}
              value={state.description}
              onChange={(event) => setField("description", event.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={describedBy("description")}
              className={cn(
                CONTROL_CLASSES,
                "resize-y",
                errors.description
                  ? "border-error"
                  : "border-border hover:border-forest/60",
              )}
            />
            <FieldError
              id={fieldId("description-error")}
              message={errors.description}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={fieldId("addressLabel")}
              className="text-sm font-medium text-charcoal"
            >
              Street label (optional)
            </label>
            <input
              id={fieldId("addressLabel")}
              name="addressLabel"
              type="text"
              value={state.addressLabel}
              onChange={(event) => setField("addressLabel", event.target.value)}
              className={cn(
                CONTROL_CLASSES,
                "border-border hover:border-forest/60",
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("bedrooms")}
                className="text-sm font-medium text-charcoal"
              >
                Bedrooms (optional)
              </label>
              <input
                id={fieldId("bedrooms")}
                name="bedrooms"
                type="number"
                inputMode="numeric"
                min={0}
                value={state.bedrooms}
                onChange={(event) => setField("bedrooms", event.target.value)}
                aria-invalid={Boolean(errors.bedrooms)}
                aria-describedby={describedBy("bedrooms")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.bedrooms
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              />
              <FieldError
                id={fieldId("bedrooms-error")}
                message={errors.bedrooms}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("bathrooms")}
                className="text-sm font-medium text-charcoal"
              >
                Bathrooms (optional)
              </label>
              <input
                id={fieldId("bathrooms")}
                name="bathrooms"
                type="number"
                inputMode="numeric"
                min={0}
                value={state.bathrooms}
                onChange={(event) => setField("bathrooms", event.target.value)}
                aria-invalid={Boolean(errors.bathrooms)}
                aria-describedby={describedBy("bathrooms")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.bathrooms
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              />
              <FieldError
                id={fieldId("bathrooms-error")}
                message={errors.bathrooms}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("floorArea")}
                className="text-sm font-medium text-charcoal"
              >
                Floor area, sqm (optional)
              </label>
              <input
                id={fieldId("floorArea")}
                name="floorArea"
                type="number"
                inputMode="numeric"
                min={0}
                value={state.floorArea}
                onChange={(event) => setField("floorArea", event.target.value)}
                aria-invalid={Boolean(errors.floorArea)}
                aria-describedby={describedBy("floorArea")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.floorArea
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              />
              <FieldError
                id={fieldId("floorArea-error")}
                message={errors.floorArea}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("lotArea")}
                className="text-sm font-medium text-charcoal"
              >
                Lot area, sqm (optional)
              </label>
              <input
                id={fieldId("lotArea")}
                name="lotArea"
                type="number"
                inputMode="numeric"
                min={0}
                value={state.lotArea}
                onChange={(event) => setField("lotArea", event.target.value)}
                aria-invalid={Boolean(errors.lotArea)}
                aria-describedby={describedBy("lotArea")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.lotArea
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              />
              <FieldError
                id={fieldId("lotArea-error")}
                message={errors.lotArea}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor={fieldId("parking")}
                className="text-sm font-medium text-charcoal"
              >
                Parking slots (optional)
              </label>
              <input
                id={fieldId("parking")}
                name="parking"
                type="number"
                inputMode="numeric"
                min={0}
                value={state.parking}
                onChange={(event) => setField("parking", event.target.value)}
                aria-invalid={Boolean(errors.parking)}
                aria-describedby={describedBy("parking")}
                className={cn(
                  CONTROL_CLASSES,
                  errors.parking
                    ? "border-error"
                    : "border-border hover:border-forest/60",
                )}
              />
              <FieldError
                id={fieldId("parking-error")}
                message={errors.parking}
              />
            </div>

            <div className="flex items-center gap-2.5 sm:pt-7">
              <input
                id={fieldId("featured")}
                name="featured"
                type="checkbox"
                checked={state.featured}
                onChange={(event) =>
                  setField("featured", event.target.checked)
                }
                className="h-5 w-5 shrink-0 rounded border-border text-forest accent-forest"
              />
              <label
                htmlFor={fieldId("featured")}
                className="text-sm font-medium text-charcoal"
              >
                Featured sample listing
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={fieldId("amenities")}
              className="text-sm font-medium text-charcoal"
            >
              Amenities (optional)
            </label>
            <textarea
              id={fieldId("amenities")}
              name="amenities"
              rows={2}
              value={state.amenities}
              onChange={(event) => setField("amenities", event.target.value)}
              aria-describedby={fieldId("amenities-help")}
              className={cn(
                CONTROL_CLASSES,
                "resize-y border-border hover:border-forest/60",
              )}
            />
            <p id={fieldId("amenities-help")} className="text-xs text-muted">
              Separate amenities with commas or new lines.
            </p>
          </div>
        </div>

        <footer className="flex flex-col gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "add" ? (
              <>
                <AddIcon aria-hidden="true" className="h-4 w-4" />
                Add property
              </>
            ) : (
              <>
                <DisketteIcon aria-hidden="true" className="h-4 w-4" />
                Save changes
              </>
            )}
          </Button>
        </footer>
      </form>
    </dialog>
  );
}
