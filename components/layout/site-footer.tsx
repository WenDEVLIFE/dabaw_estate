import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FOOTER_NAV } from "@/lib/navigation";
import { DEMO_DISCLOSURE, SITE_LOCATION_LABEL, SITE_NAME, SITE_TAGLINE, COPYRIGHT_YEAR } from "@/lib/constants";

/** Server-rendered site footer: brand line, navigation, and demo disclosure. */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-forest-deep text-ivory">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-display text-xl tracking-tight">{SITE_NAME}</p>
              <p className="type-eyebrow mt-1 text-gold-soft">
                {SITE_LOCATION_LABEL}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/80">
              {SITE_TAGLINE} A frontend-only demo prototype for browsing sample
              property listings in Davao City.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="type-eyebrow text-gold-soft">Explore</p>
            <ul className="flex flex-col gap-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/90 underline-offset-4 hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-gold-soft">
            {DEMO_DISCLOSURE}
          </p>
          <p className="text-xs text-ivory/60">
            © {COPYRIGHT_YEAR} {SITE_NAME}. Demo prototype — no real listings,
            agents, or transactions.
          </p>
        </div>
      </Container>
    </footer>
  );
}
