import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "category"
  | "transaction"
  | "featured"
  | "sample"
  | "neutral";

const TONES: Record<BadgeTone, string> = {
  category: "bg-forest text-white",
  transaction: "bg-forest-deep text-gold-soft",
  featured: "bg-gold-soft text-forest-deep",
  sample: "border border-warning bg-ivory text-warning",
  neutral: "border border-border bg-white text-muted",
};

const BASE =
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]";

/**
 * Small text badge. Meaning is always carried by the label text, never color
 * alone (openspec accessibility requirements).
 */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={cn(BASE, TONES[tone], className)}>{children}</span>
  );
}
