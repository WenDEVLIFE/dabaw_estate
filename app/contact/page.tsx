import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, LetterIcon, MapPointIcon, PhoneIcon } from "@solar-icons/react/linear";
import { Container } from "@/components/ui/container";
import { DemoNotice } from "@/components/layout/demo-notice";
import { InquiryForm } from "@/components/ui/inquiry-form";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Preview the simulated DABAW ESTATE inquiry form. No message is transmitted or sent to a real agent.",
};

export default function ContactPage() {
  return (
    <Container className="flex flex-col gap-10 py-10 md:py-14">
      <header className="flex flex-col gap-4">
        <p className="type-eyebrow text-muted">Davao City · demo inquiries</p>
        <h1 className="type-page-title text-charcoal">Contact DABAW ESTATE</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Use this page to preview the inquiry experience. Submission is
          simulated in the browser, so nothing is emailed, stored, or sent to a
          real business.
        </p>
        <DemoNotice />
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <aside aria-labelledby="contact-details-heading" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2
              id="contact-details-heading"
              className="type-section-title text-charcoal"
            >
              Contact details
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              These are sample contact details for demonstration only. They do
              not reach a real office or agent.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-gold-soft/40 text-forest">
                <LetterIcon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Email
                </p>
                <p className="break-words text-sm font-medium text-charcoal">
                  hello@dabaw-estate.example
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-gold-soft/40 text-forest">
                <PhoneIcon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Phone
                </p>
                <p className="text-sm font-medium text-charcoal">
                  +63 (0) 000 000 0000
                </p>
                <p className="text-xs text-muted">Sample number only</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-gold-soft/40 text-forest">
                <MapPointIcon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Location
                </p>
                <p className="text-sm font-medium text-charcoal">
                  Davao City, Philippines
                </p>
              </div>
            </li>
          </ul>

          <Link
            href="/properties"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            Browse the sample listings instead
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
          </Link>
        </aside>

        <section
          aria-labelledby="contact-form-heading"
          className="rounded-card border border-border bg-white p-5 sm:p-8"
        >
          <h2
            id="contact-form-heading"
            className="type-section-title text-charcoal"
          >
            Send a demo inquiry
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            All fields are validated locally. A successful submission only shows
            a demo confirmation message.
          </p>
          <div className="mt-6">
            <InquiryForm properties={properties} />
          </div>
        </section>
      </div>
    </Container>
  );
}
