import { LetterIcon, PhoneIcon } from "@solar-icons/react/linear";
import { Badge } from "@/components/ui/badge";
import { demoInquiries } from "@/data/demo-inquiries";

/**
 * Preview of the fictional sample inquiries. Every entry is explicitly marked
 * as sample data; nothing here is a real customer inquiry and no message was
 * sent or received. Dates are shown as the stored ISO strings so the markup is
 * identical on the server and the client (no locale/timezone drift).
 */
export function AdminInquiryPreview() {
  return (
    <section
      aria-labelledby="admin-inquiries-heading"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <h2
          id="admin-inquiries-heading"
          className="text-lg font-semibold text-charcoal"
        >
          Sample inquiries
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          Every entry below is fictional sample data. None of these are real
          customer inquiries, and no message has been sent or received.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {demoInquiries.map((inquiry) => (
          <li
            key={inquiry.id}
            className="flex flex-col gap-2 rounded-card border border-border bg-white p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="sample">Sample inquiry</Badge>
              <span className="text-sm font-semibold text-charcoal">
                {inquiry.name}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-charcoal/90">
              {inquiry.message}
            </p>

            <ul className="flex flex-col gap-1 text-xs text-muted sm:flex-row sm:flex-wrap sm:gap-x-4">
              {inquiry.email ? (
                <li className="flex items-center gap-1.5">
                  <LetterIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {inquiry.email}
                </li>
              ) : null}
              {inquiry.phone ? (
                <li className="flex items-center gap-1.5">
                  <PhoneIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {inquiry.phone}
                </li>
              ) : null}
              <li>Sample record · {inquiry.createdAt}</li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
