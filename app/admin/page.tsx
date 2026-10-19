import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Demo admin",
  description:
    "Frontend-only demo dashboard for managing sample Davao City property records in memory.",
};

/**
 * Admin route shell. Metadata is static; all interactive state lives in the
 * client `AdminDashboard` island and resets on reload.
 */
export default function AdminPage() {
  return (
    <Container className="py-8 md:py-12">
      <AdminDashboard />
    </Container>
  );
}
