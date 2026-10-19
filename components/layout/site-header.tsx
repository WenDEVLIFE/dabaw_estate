"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { PRIMARY_NAV } from "@/lib/navigation";
import {
  SITE_LOCATION_LABEL,
  SITE_NAME,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Client header: marks the active route with `aria-current`, offers a primary
 * browse action, and collapses navigation into an accessible mobile menu that
 * moves focus in on open and returns focus to the trigger on Escape/close.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    }
  }, [open]);

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeMenu();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ivory/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex flex-col rounded-control leading-none"
          aria-label={`${SITE_NAME} home`}
        >
          <span className="font-display text-lg tracking-tight text-forest">
            {SITE_NAME}
          </span>
          <span className="type-eyebrow mt-0.5 text-muted">
            {SITE_LOCATION_LABEL}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-control px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-forest"
                    : "text-charcoal hover:text-forest",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/properties"
            className={buttonClasses({ variant: "primary", size: "sm" })}
          >
            Explore Properties
          </Link>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-border bg-white text-charcoal transition-colors hover:text-forest lg:hidden"
          aria-expanded={open}
          aria-controls="site-mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((previous) => !previous)}
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </Container>

      <div
        id="site-mobile-menu"
        hidden={!open}
        onKeyDown={handleMenuKeyDown}
        className="border-t border-border bg-white lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-4">
          {PRIMARY_NAV.map((item, index) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-control px-3 py-3 text-sm font-medium transition-colors",
                  active ? "text-forest" : "text-charcoal hover:text-forest",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/properties"
            onClick={() => setOpen(false)}
            className={buttonClasses({
              variant: "primary",
              size: "md",
              className: "mt-2",
            })}
          >
            Explore Properties
          </Link>
        </Container>
      </div>
    </header>
  );
}
