"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  rating: number;
  title: string;
  body: string | null;
  displayName: string;
  applicationVersion: string | null;
  platform: string | null;
  status: string;
  createdAt: string;
};

const STATUS_STYLE: Record<string, string> = {
  Approved: "bg-primary/10 text-primary",
  Pending: "bg-surface-stroke/50 text-text-dimmed",
  Rejected: "bg-data-down/10 text-data-down",
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`material-symbols-outlined text-[16px] ${
            s <= rating ? "text-primary fill" : "text-surface-stroke"
          }`}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/api/reviews?status=${encodeURIComponent(filter)}`)
      .then((r) => r.json())
      .then((data) => {
        if (active) setReviews(data.reviews || []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filter]);

  async function refresh() {
    const res = await fetch(
      `/api/reviews?status=${encodeURIComponent(filter)}`
    );
    const data = await res.json();
    setReviews(data.reviews || []);
  }

  async function setStatus(id: string, status: string) {
    await fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    refresh();
  }

  async function remove(id: string) {
    await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  }

  const stats = {
    all: reviews.length,
    approved: reviews.filter((r) => r.status === "approved").length,
    pending: reviews.filter((r) => r.status === "pending").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Reviews
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Moderate and manage user reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {stats.all}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Total Reviews
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-primary font-bold mb-1">
            {stats.approved}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Approved
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-up font-bold mb-1">
            {stats.pending}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Pending
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-down font-bold mb-1">
            {stats.rejected}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Rejected
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "approved", "pending", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded font-body-md text-body-md font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary text-on-primary"
                : "bg-surface-container border border-surface-stroke text-on-surface-variant hover:border-primary/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-stroke/50">
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Review</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Rating</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Date</th>
                <th className="text-right px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-dimmed">
                    Loading…
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-dimmed">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b border-surface-stroke/30 hover:bg-surface-container-highest/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-body-md text-body-md text-on-surface font-medium">
                        {review.title}
                      </div>
                      <div className="font-body-md text-body-md text-text-dimmed">
                        by {review.displayName}
                      </div>
                      {review.body && (
                        <div className="font-body-sm text-body-sm text-text-dimmed mt-1 line-clamp-2">
                          {review.body}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StarRow rating={review.rating} />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-label-mono text-label-mono px-3 py-1 rounded-full ${
                          STATUS_STYLE[
                            review.status.charAt(0).toUpperCase() +
                              review.status.slice(1)
                          ] || "bg-surface-stroke/50 text-text-dimmed"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-label-mono text-label-mono text-text-dimmed">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {review.status !== "approved" && (
                        <button
                          onClick={() => setStatus(review.id, "approved")}
                          title="Approve"
                          className="text-primary hover:brightness-110 transition-all mr-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </button>
                      )}
                      {review.status !== "rejected" && (
                        <button
                          onClick={() => setStatus(review.id, "rejected")}
                          title="Reject"
                          className="text-data-down hover:brightness-110 transition-all mr-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                      <button
                        onClick={() => remove(review.id)}
                        title="Delete"
                        className="text-text-dimmed hover:text-data-down transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
