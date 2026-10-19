import type { InquiryErrors, InquiryValues } from "@/types/inquiry";
import type { PropertyDraft, PropertyDraftErrors } from "@/types/property";

/**
 * Pragmatic email check: a non-empty local part, an `@`, and a dotted domain.
 * This is demo formatting guidance, not deliverability verification.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate inquiry values and return a field-keyed error map.
 * `name` and `message` are required; at least one of `email` or `phone` is
 * required, and a provided email must be format-valid.
 */
export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!email && !phone) {
    const requirement = "Enter an email address or a phone number.";
    errors.email = requirement;
    errors.phone = requirement;
  } else if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

function validateOptionalPositiveNumber(
  value: string,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return "Enter a number of 0 or more.";
  }
  return undefined;
}

/**
 * Validate a raw admin property draft and return a field-keyed error map.
 * Numeric fields are entered as strings and parsed here.
 */
export function validatePropertyDraft(draft: PropertyDraft): PropertyDraftErrors {
  const errors: PropertyDraftErrors = {};

  if (!draft.title.trim()) {
    errors.title = "Title is required.";
  }
  if (!draft.category) {
    errors.category = "Select a category.";
  }
  if (!draft.transactionType) {
    errors.transactionType = "Select a transaction type.";
  }
  if (!draft.propertyType) {
    errors.propertyType = "Select a property type.";
  }
  if (!draft.location) {
    errors.location = "Select a location.";
  }

  const price = Number(draft.price.trim());
  if (!draft.price.trim() || !Number.isFinite(price) || price <= 0) {
    errors.price = "Enter a price greater than zero.";
  }

  if (!draft.description.trim()) {
    errors.description = "Description is required.";
  }

  const numericFields: Array<keyof PropertyDraft> = [
    "bedrooms",
    "bathrooms",
    "floorArea",
    "lotArea",
    "parking",
  ];
  for (const field of numericFields) {
    const fieldError = validateOptionalPositiveNumber(draft[field]);
    if (fieldError) {
      errors[field] = fieldError;
    }
  }

  return errors;
}
