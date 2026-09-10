import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import LeadsClient from "./LeadsClient";

export const metadata: Metadata = {
  title: "Leads",
};

export default async function AdminLeadsPage() {
  await requireAdmin();
  return <LeadsClient />;
}
