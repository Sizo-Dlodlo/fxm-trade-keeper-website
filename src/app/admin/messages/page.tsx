import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import MessagesClient from "./MessagesClient";

export const metadata: Metadata = {
  title: "Messages",
};

export default async function AdminMessagesPage() {
  await requireAdmin();
  return <MessagesClient />;
}
