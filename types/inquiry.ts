/**
 * Inquiry types for the locally simulated contact and property inquiry forms.
 * Nothing here is transmitted or persisted; see openspec inquiry-forms spec.
 */

export interface InquiryValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Present when the inquiry is opened from a property detail page. */
  propertySlug?: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

export interface DemoInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertySlug?: string;
  /** ISO date string. */
  createdAt: string;
  /** Always true: every previewed inquiry is clearly labeled sample data. */
  sample: true;
}
