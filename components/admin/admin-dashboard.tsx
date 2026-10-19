"use client";

import { useMemo, useState } from "react";
import {
  InfoCircleIcon,
  PenIcon,
  AddIcon,
  MagnifierIcon,
  TrashBinTrashIcon,
} from "@solar-icons/react/linear";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
import { AdminInquiryPreview } from "@/components/admin/admin-inquiry-preview";
import { AdminPropertyForm } from "@/components/admin/admin-property-form";
import { properties as sampleProperties } from "@/data/properties";
import { demoInquiries } from "@/data/demo-inquiries";
import { ADMIN_BANNER } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type Category,
  type Property,
} from "@/types/property";

type EditorState =
  | { mode: "add" }
  | { mode: "edit"; property: Property }
  | null;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-card border border-border bg-white p-4">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="price text-2xl text-forest">{value}</dd>
    </div>
  );
}

/**
 * Demo admin dashboard. Every add/edit/delete mutates a shallow, in-memory copy
 * of the sample dataset, so nothing is persisted and a reload restores the
 * original records. There is no authentication and the page is not secure by
 * design (openspec demo-admin spec).
 */
export function AdminDashboard() {
  const [items, setItems] = useState<Property[]>(() => [...sampleProperties]);
  const [query, setQuery] = useState("");
  const [editor, setEditor] = useState<EditorState>(null);
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [status, setStatus] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      "for-sale": 0,
      "for-rent": 0,
      commercial: 0,
      "short-stay": 0,
    };
    for (const item of items) {
      counts[item.category] += 1;
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items;
    }
    return items.filter((item) =>
      [item.title, item.location, item.propertyType, CATEGORY_LABELS[item.category]]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  function handleSave(saved: Property) {
    const isEdit = editor?.mode === "edit";
    setItems((previous) => {
      const index = previous.findIndex((item) => item.id === saved.id);
      if (index === -1) {
        return [saved, ...previous];
      }
      const next = [...previous];
      next[index] = saved;
      return next;
    });
    setStatus(
      isEdit
        ? `Updated ${saved.title} in the demo list.`
        : `Added ${saved.title} to the demo list.`,
    );
    setEditor(null);
  }

  function handleConfirmDelete(id: string) {
    const target = items.find((item) => item.id === id);
    setItems((previous) => previous.filter((item) => item.id !== id));
    setDeleteTarget(null);
    setStatus(
      target
        ? `Removed ${target.title} from the demo list.`
        : "Removed a property from the demo list.",
    );
  }

  function clearSearch() {
    setQuery("");
  }

  const noun = filtered.length === 1 ? "property" : "properties";

  return (
    <>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="type-eyebrow text-muted">Frontend-only demo</p>
            <h1 className="type-page-title text-charcoal">Demo admin</h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted">
              A visual demonstration of property management. There is no login,
              no database, and no persistence — the page is intentionally not
              secure.
            </p>
          </div>
          <p
            role="note"
            className="flex items-start gap-2 rounded-card border border-warning/40 bg-gold-soft/50 px-4 py-3 text-sm font-medium text-warning"
          >
            <InfoCircleIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="leading-relaxed">{ADMIN_BANNER}</span>
          </p>
        </header>

        <section
          aria-labelledby="admin-overview-heading"
          className="flex flex-col gap-4"
        >
          <h2
            id="admin-overview-heading"
            className="text-lg font-semibold text-charcoal"
          >
            Overview
          </h2>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Total properties" value={items.length} />
            {CATEGORIES.map((category) => (
              <StatCard
                key={category}
                label={CATEGORY_LABELS[category]}
                value={categoryCounts[category]}
              />
            ))}
            <StatCard label="Sample inquiries" value={demoInquiries.length} />
          </dl>
        </section>

        <section
          aria-labelledby="admin-properties-heading"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <label
                  htmlFor="admin-property-search"
                  className="text-sm font-medium text-charcoal"
                >
                  Search sample properties
                </label>
                <div className="relative">
                  <MagnifierIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="admin-property-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Try Matina, condo, or commercial"
                    autoComplete="off"
                    className="min-h-11 w-full rounded-control border border-border bg-white py-2 pl-10 pr-3 text-sm text-charcoal transition-colors hover:border-forest/60"
                  />
                </div>
              </div>
              <Button
                onClick={() => setEditor({ mode: "add" })}
                className="sm:shrink-0"
              >
                <AddIcon aria-hidden="true" className="h-4 w-4" />
                Add property
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="admin-properties-heading"
                className="text-lg font-semibold text-charcoal"
              >
                Sample properties
              </h2>
              <p className="text-sm text-muted">
                {filtered.length} {noun}
                {query.trim() ? " match your search" : ""}
              </p>
            </div>
          </div>

          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              status
                ? "rounded-control border border-success/30 bg-success/10 px-3 py-2 text-sm text-success"
                : "sr-only",
            )}
          >
            {status}
          </p>

          {filtered.length === 0 ? (
            <EmptyState
              title="No sample properties match"
              description="No demo record matches your search. Clear the search to see every sample property again."
              action={
                <Button variant="secondary" onClick={clearSearch}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {filtered.map((item) => (
                <li
                  key={item.id}
                  className="rounded-card border border-border bg-white p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="category">
                          {CATEGORY_LABELS[item.category]}
                        </Badge>
                        {item.featured ? (
                          <Badge tone="featured">Featured</Badge>
                        ) : null}
                        <Badge tone="neutral">{item.propertyType}</Badge>
                      </div>
                      <h3 className="text-base font-semibold leading-snug text-charcoal">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted">
                        {item.location}, Davao City
                      </p>
                      <p className="price text-lg text-forest">
                        {formatPrice(item.price, item.priceLabel)}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setEditor({ mode: "edit", property: item })}
                        aria-label={`Edit ${item.title}`}
                      >
                        <PenIcon aria-hidden="true" className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => setDeleteTarget(item)}
                        aria-label={`Delete ${item.title}`}
                      >
                        <TrashBinTrashIcon aria-hidden="true" className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <AdminInquiryPreview />
      </div>

      {editor ? (
        <AdminPropertyForm
          mode={editor.mode}
          property={editor.mode === "edit" ? editor.property : undefined}
          takenSlugs={items.map((item) => item.slug)}
          onSave={handleSave}
          onCancel={() => setEditor(null)}
        />
      ) : null}

      {deleteTarget ? (
        <AdminDeleteDialog
          property={deleteTarget}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      ) : null}
    </>
  );
}
