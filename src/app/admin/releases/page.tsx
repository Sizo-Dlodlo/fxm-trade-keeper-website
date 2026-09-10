import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import ReleasesClient from "./ReleasesClient";

export const metadata: Metadata = {
  title: "Releases",
};

export default async function AdminReleasesPage() {
  await requireAdmin();
  return <ReleasesClient />;
}
