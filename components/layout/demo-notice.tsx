import { Info } from "lucide-react";
import { DEMO_DISCLOSURE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Visible sample-data disclosure. The design requires it in-content, not only
 * in the footer (openspec homepage / property-details specs).
 */
export function DemoNotice({
  variant = "default",
  className,
}: {
  variant?: "default" | "compact";
  className?: string;
}) {
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-control border border-warning/30 bg-gold-soft/40 text-warning",
        variant === "compact" ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="leading-relaxed">{DEMO_DISCLOSURE}</span>
    </p>
  );
}
