import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function AdminSettingsPage() {
  await requireAdmin();
  return <SettingsClient />;
}
