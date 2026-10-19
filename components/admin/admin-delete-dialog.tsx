"use client";

import { useEffect, useId, useRef } from "react";
import { DangerTriangleIcon } from "@solar-icons/react/linear";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types/property";

export interface AdminDeleteDialogProps {
  property: Property;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}

/**
 * Native `<dialog>` confirmation for the demo delete action.
 *
 * `showModal()` gives the platform modal semantics: focus moves into the
 * dialog, background content is inert, and Escape fires `cancel`/`close`.
 * Focus returns to the control that opened the dialog when the component
 * unmounts.
 */
export function AdminDeleteDialog({
  property,
  onConfirm,
  onCancel,
}: AdminDeleteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const idPrefix = useId();

  useEffect(() => {
    // Capture the element and the previously focused node up front: React
    // nulls refs before passive-effect cleanup runs on unmount.
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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      onCancel={onCancel}
      className="w-[calc(100%-2rem)] max-w-md rounded-card border border-border bg-white p-0 text-charcoal shadow-xl"
    >
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
            <DangerTriangleIcon aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h2 id={headingId} className="text-lg font-semibold text-charcoal">
              Remove sample property?
            </h2>
            <p
              id={descriptionId}
              className="text-sm leading-relaxed text-muted"
            >
              <span className="font-medium text-charcoal">
                {property.title}
              </span>{" "}
              will be removed from this browser session only. The public sample
              dataset is unchanged, and a reload restores everything.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(property.id)}
          >
            Remove property
          </Button>
        </div>
      </div>
    </dialog>
  );
}
