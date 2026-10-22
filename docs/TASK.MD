
# Bookora — Development Tasks

## Phase 1: Project Setup

- [ ] Initialize the Next.js application with TypeScript.
- [ ] Configure Tailwind CSS.
- [ ] Install and configure Lucide icons.
- [ ] Configure global styles and design tokens.
- [ ] Implement the shared typography system.
- [ ] Create reusable Button, Input, Card, Badge, and Modal components.
- [ ] Set up application layouts and route structure.
- [ ] Verify development and production builds.

**Deliverable:** A working application foundation.

## Phase 2: Local Data and Business Logic

- [ ] Define TypeScript types for services, staff, and bookings.
- [ ] Create realistic sample services with PHP prices and durations.
- [ ] Create sample staff profiles and service assignments.
- [ ] Create sample appointments with different statuses.
- [ ] Implement demo-data initialization and reset functionality.
- [ ] Implement safe localStorage persistence.
- [ ] Build reusable date and time formatting helpers.
- [ ] Implement staff availability calculations.
- [ ] Prevent overlapping appointments in the demo booking state.
- [ ] Handle invalid and expired time slots.

**Deliverable:** Reliable demo data and reusable booking logic.

## Phase 3: Public Landing Page

- [ ] Build responsive navigation.
- [ ] Create the hero section with a prominent booking CTA.
- [ ] Add featured services and pricing.
- [ ] Add the booking process explanation.
- [ ] Add staff highlights.
- [ ] Add testimonials using fictional demo content.
- [ ] Build the footer with business contact information.
- [ ] Add responsive layouts and interaction states.

**Deliverable:** A polished marketing page suitable for a portfolio presentation.

## Phase 4: Service Catalog

- [ ] Display service cards with descriptions, prices, and durations.
- [ ] Add service category filtering.
- [ ] Add service search.
- [ ] Add service detail presentation.
- [ ] Add loading and empty states where appropriate.
- [ ] Link service selections to the booking flow.
- [ ] Hide inactive services from new bookings.

**Deliverable:** A functional service discovery experience.

## Phase 5: Customer Booking Flow

- [ ] Implement the multi-step booking interface.
- [ ] Step 1: Select a service.
- [ ] Step 2: Select a staff member or any available professional.
- [ ] Step 3: Select an appointment date.
- [ ] Step 4: Display valid available time slots.
- [ ] Step 5: Collect and validate customer details.
- [ ] Step 6: Present a final booking summary.
- [ ] Step 7: Confirm and create the demo booking.
- [ ] Generate a unique booking reference.
- [ ] Display the booking confirmation page.
- [ ] Support back navigation without losing valid selections.
- [ ] Revalidate availability before confirmation.
- [ ] Prevent duplicate submissions.
- [ ] Display helpful validation and error messages.

**Deliverable:** A complete, interactive customer booking journey.

## Phase 6: Admin Dashboard

- [ ] Create the admin layout and sidebar navigation.
- [ ] Build the dashboard overview.
- [ ] Calculate daily booking metrics from actual demo data.
- [ ] Display upcoming appointments.
- [ ] Display estimated booked service value.
- [ ] Add recent activity or appointment summaries.
- [ ] Add responsive metric cards and charts if useful.
- [ ] Add navigation between all admin sections.

**Deliverable:** A realistic business dashboard.

## Phase 7: Appointment Management

- [ ] Display appointments in a table or responsive card list.
- [ ] Search by customer, service, and reference.
- [ ] Filter by date and booking status.
- [ ] View complete appointment details.
- [ ] Confirm pending bookings.
- [ ] Mark confirmed bookings as completed.
- [ ] Cancel appointments with confirmation.
- [ ] Update dashboard metrics after changes.
- [ ] Handle empty results and invalid actions.

**Deliverable:** Functional appointment management.

## Phase 8: Service and Staff Management

### Services
- [ ] Display the service directory.
- [ ] Add new services.
- [ ] Edit service details.
- [ ] Validate price and duration.
- [ ] Activate and deactivate services.
- [ ] Persist changes in demo storage.

### Staff
- [ ] Display staff profiles.
- [ ] Add and edit staff members.
- [ ] Assign services to staff.
- [ ] Configure working days and hours.
- [ ] Configure unavailable dates or periods.
- [ ] Activate and deactivate staff members.
- [ ] Ensure booking availability reflects these settings.

**Deliverable:** Interactive business configuration screens.

## Phase 9: Responsive Design and UX

- [ ] Verify the desktop layout.
- [ ] Verify tablet navigation and card grids.
- [ ] Verify mobile booking steps.
- [ ] Convert wide admin tables to mobile-friendly layouts.
- [ ] Check text wrapping and prevent horizontal overflow.
- [ ] Add keyboard-accessible interactions.
- [ ] Add visible focus indicators.
- [ ] Respect reduced-motion preferences.
- [ ] Verify status colors and text contrast.
- [ ] Check every button, link, dropdown, and form.

**Deliverable:** A consistent experience across screen sizes.

## Phase 10: Quality Assurance

- [ ] Test the complete customer booking flow.
- [ ] Test past-date and invalid-time rejection.
- [ ] Test overlapping booking prevention.
- [ ] Test staff and service availability rules.
- [ ] Test admin status transitions.
- [ ] Test dashboard metric calculations.
- [ ] Test browser refresh and persisted state.
- [ ] Test reset-demo-data functionality.
- [ ] Test missing or malformed local storage.
- [ ] Check for console errors and broken routes.
- [ ] Run linting and production build.
- [ ] Document prototype limitations.

**Deliverable:** A stable, demonstrable portfolio MVP.

## Phase 11: Portfolio Presentation

- [ ] Create a custom Bookora wordmark or logo.
- [ ] Create a polished favicon.
- [ ] Prepare attractive demo data.
- [ ] Capture desktop and mobile screenshots.
- [ ] Write the project overview and feature list.
- [ ] Document the technology stack.
- [ ] Add setup instructions to README.md.
- [ ] Deploy the demo using an appropriate hosting platform.
- [ ] Verify the production deployment.
- [ ] Add the project to the WenDEV portfolio.

**Deliverable:** A client-ready portfolio showcase.

## Priority Order

### P0 — Required for MVP
- Application foundation
- Design system
- Local demo data
- Service catalog
- Complete booking flow
- Booking confirmation
- Admin dashboard
- Appointment status management
- Responsive layout

### P1 — Important Enhancements
- Service management
- Staff management
- Advanced availability settings
- Search and filters
- Local persistence
- Reset demo data
- Accessible feedback and validation

### P2 — Portfolio Polish
- Logo and favicon
- Subtle animations
- Refined empty states
- Enhanced dashboard charts
- Screenshots and documentation
- Deployment and portfolio integration

## Completion Criteria

Bookora is complete when a visitor can book a valid appointment, see a confirmation, and observe the resulting booking in the admin dashboard. Admin actions must update the demo interface consistently, booking conflicts must be checked, and the entire experience must remain usable on mobile.

All demo-only limitations must be documented clearly. Production authentication, server-side booking protection, real notifications, and payment processing remain out of scope.
