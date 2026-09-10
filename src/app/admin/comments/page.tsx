import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import CommentsClient from "./CommentsClient";

export const metadata: Metadata = {
  title: "Comments",
};

export default async function AdminCommentsPage() {
  await requireAdmin();
  return <CommentsClient />;
}
