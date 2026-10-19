export interface NavItem {
  href: string;
  label: string;
}

/** Primary header navigation. The header also exposes a separate browse action. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/commercial", label: "Commercial" },
  { href: "/short-stays", label: "Short Stays" },
  { href: "/contact", label: "Contact" },
];

/** Footer navigation, including the full listings index. */
export const FOOTER_NAV: readonly NavItem[] = [
  { href: "/properties", label: "All Properties" },
  ...PRIMARY_NAV,
];
