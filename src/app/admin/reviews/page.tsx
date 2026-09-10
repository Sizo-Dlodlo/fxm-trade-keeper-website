import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Reviews",
};

export default async function AdminReviewsPage() {
  await requireAdmin();
  return <ReviewsClient />;
}
