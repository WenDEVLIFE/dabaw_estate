import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive";

export type ButtonSize = "md" | "sm";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-forest text-white hover:bg-forest-hover",
  secondary:
    "border border-forest bg-white text-forest hover:bg-gold-soft/40",
  tertiary:
    "px-1 text-forest underline-offset-4 hover:text-forest-hover hover:underline",
  destructive: "bg-error text-white hover:opacity-90",
};

const SIZES: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  sm: "min-h-11 px-3.5 text-sm",
};

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Shared class builder so links and buttons stay visually identical.
 * Used both by `<Button>` and by `<Link className={buttonClasses(...)}>`.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonClassOptions = {}): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonClassOptions {}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}
