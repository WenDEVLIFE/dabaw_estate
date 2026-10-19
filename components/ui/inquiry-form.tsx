"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { DangerCircleIcon, CheckCircleIcon } from "@solar-icons/react/linear";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "@/components/layout/demo-notice";
import {
  INQUIRY_DISCLOSURE,
  INQUIRY_SUCCESS_MESSAGE,
} from "@/lib/constants";
import { validateInquiry } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { InquiryErrors, InquiryValues } from "@/types/inquiry";
import type { Property } from "@/types/property";

type Status = "idle" | "pending" | "success";
type FocusableField = "name" | "email" | "phone" | "message";

const FIELD_ORDER: readonly FocusableField[] = [
  "name",
  "email",
  "phone",
  "message",
];

const CONTROL_CLASSES =
  "min-h-11 w-full rounded-control border bg-white px-3 py-2 text-sm text-charcoal transition-colors";

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

export interface InquiryFormProps {
  /** Optional sample listings for the contact-page property select. */
  properties?: readonly Property[];
  /** Preselected, read-only property context from a detail page. */
  lockedProperty?: Pick<Property, "slug" | "title">;
  className?: string;
}

/**
 * Shared inquiry form. Validation, pending state, and success feedback are all
 * local: no fetch, API, email, or persistent storage is involved.
 */
export function InquiryForm({
  properties,
  lockedProperty,
  className,
}: InquiryFormProps) {
  const formId = useId();
  const [values, setValues] = useState<InquiryValues>(() => ({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertySlug: lockedProperty?.slug,
  }));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function fieldId(field: string): string {
    return `${formId}-${field}`;
  }

  function focusField(field: FocusableField) {
    switch (field) {
      case "name":
        nameRef.current?.focus();
        break;
      case "email":
        emailRef.current?.focus();
        break;
      case "phone":
        phoneRef.current?.focus();
        break;
      case "message":
        messageRef.current?.focus();
        break;
    }
  }

  function describedBy(
    field: keyof InquiryValues,
    ...extra: Array<string | undefined>
  ): string | undefined {
    const ids = [
      errors[field] ? `${fieldId(field)}-error` : undefined,
      ...extra,
    ].filter((value): value is string => Boolean(value));
    return ids.length > 0 ? ids.join(" ") : undefined;
  }

  function updateValue(field: keyof InquiryValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      if ((field === "email" || field === "phone") && value.trim()) {
        delete next.email;
        delete next.phone;
      }
      return next;
    });
    if (status === "success") {
      setStatus("idle");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") {
      return;
    }

    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        // Wait for the error markup to commit so `aria-describedby` resolves
        // before focus moves to the first invalid field.
        window.requestAnimationFrame(() => focusField(firstInvalid));
      }
      return;
    }

    setStatus("pending");
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setStatus("success");
      timerRef.current = null;
    }, 600);
  }

  const contactHelpId = fieldId("contact-help");
  const propertyHelpId = fieldId("property-help");
  const emailDescribedBy = describedBy("email", contactHelpId);
  const phoneDescribedBy = describedBy("phone", contactHelpId);

  return (
    <form
      noValidate
      aria-busy={status === "pending"}
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm leading-relaxed text-muted">
          {INQUIRY_DISCLOSURE}
        </p>
        <DemoNotice variant="compact" />
        <p className="text-xs text-muted">
          Fields marked <span className="text-error">*</span> are required.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId("name")}
          className="text-sm font-medium text-charcoal"
        >
          Name <span aria-hidden="true" className="text-error">*</span>
        </label>
        <input
          ref={nameRef}
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => updateValue("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
          className={cn(
            CONTROL_CLASSES,
            errors.name ? "border-error" : "border-border hover:border-forest/60",
          )}
        />
        <FieldError id={fieldId("name-error")} message={errors.name} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor={fieldId("email")}
            className="text-sm font-medium text-charcoal"
          >
            Email
          </label>
          <input
            ref={emailRef}
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={emailDescribedBy}
            className={cn(
              CONTROL_CLASSES,
              errors.email
                ? "border-error"
                : "border-border hover:border-forest/60",
            )}
          />
          <FieldError id={fieldId("email-error")} message={errors.email} />
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor={fieldId("phone")}
            className="text-sm font-medium text-charcoal"
          >
            Phone
          </label>
          <input
            ref={phoneRef}
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={phoneDescribedBy}
            className={cn(
              CONTROL_CLASSES,
              errors.phone
                ? "border-error"
                : "border-border hover:border-forest/60",
            )}
          />
          <FieldError id={fieldId("phone-error")} message={errors.phone} />
        </div>
      </div>

      <p id={contactHelpId} className="text-xs text-muted">
        Provide at least one of email or phone.
      </p>

      {lockedProperty ? (
        <div className="flex flex-col gap-1.5">
          <p
            id={fieldId("property-label")}
            className="text-sm font-medium text-charcoal"
          >
            Property
          </p>
          <div
            role="group"
            aria-labelledby={fieldId("property-label")}
            className="rounded-control border border-border bg-surface-muted px-3 py-2.5"
          >
            <p className="text-sm font-medium text-charcoal">
              {lockedProperty.title}
            </p>
            <p className="text-xs text-muted">
              Preselected from this listing.
            </p>
          </div>
        </div>
      ) : properties && properties.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={fieldId("property")}
            className="text-sm font-medium text-charcoal"
          >
            Property (optional)
          </label>
          <select
            id={fieldId("property")}
            name="propertySlug"
            value={values.propertySlug ?? ""}
            onChange={(event) =>
              updateValue("propertySlug", event.target.value)
            }
            aria-describedby={propertyHelpId}
            className={cn(
              CONTROL_CLASSES,
              "border-border hover:border-forest/60",
            )}
          >
            <option value="">No specific property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.slug}>
                {property.title} — {property.location}
              </option>
            ))}
          </select>
          <p id={propertyHelpId} className="text-xs text-muted">
            Choose a sample listing if your message is about a specific
            property.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId("message")}
          className="text-sm font-medium text-charcoal"
        >
          Message <span aria-hidden="true" className="text-error">*</span>
        </label>
        <textarea
          ref={messageRef}
          id={fieldId("message")}
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={cn(
            CONTROL_CLASSES,
            "min-h-28 resize-y",
            errors.message
              ? "border-error"
              : "border-border hover:border-forest/60",
          )}
        />
        <FieldError id={fieldId("message-error")} message={errors.message} />
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          status === "success"
            ? "flex items-start gap-2 rounded-control border border-success/30 bg-success/10 px-3 py-2.5 text-sm text-success"
            : "sr-only",
        )}
      >
        {status === "success" ? (
          <>
            <CheckCircleIcon
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span>{INQUIRY_SUCCESS_MESSAGE}</span>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={status === "pending"}
          className="w-full sm:w-auto"
        >
          {status === "pending" ? "Submitting..." : "Send Demo Inquiry"}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          No API, email, or storage is used by this form.
        </p>
      </div>
    </form>
  );
}
