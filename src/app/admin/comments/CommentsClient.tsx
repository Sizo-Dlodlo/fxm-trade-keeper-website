"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Comment = {
  id: string;
  contentType: string;
  contentSlug: string;
  authorName: string;
  authorEmail: string | null;
  body: string;
  status: string;
  createdAt: string;
};

const TYPE_LINK: Record<string, string> = {
  guide: "/guides/",
  blog: "/blog/",
};

const STATUS_BADGE: Record<string, string> = {
  approved: "bg-primary/10 text-primary",
  pending: "bg-surface-stroke/50 text-text-dimmed",
  rejected: "bg-data-down/10 text-data-down",
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/api/comments/moderate?status=${encodeURIComponent(filter)}`)
      .then((r) => r.json())
      .then((data) => {
        if (active) setComments(data.comments || []);
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
      `/api/comments/moderate?status=${encodeURIComponent(filter)}`
    );
    const data = await res.json();
    setComments(data.comments || []);
  }

  async function setStatus(id: string, status: string) {
    await fetch("/api/comments/moderate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    refresh();
  }

  async function remove(id: string) {
    await fetch("/api/comments/moderate", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  }

  const stats = {
    all: comments.length,
    approved: comments.filter((c) => c.status === "approved").length,
    pending: comments.filter((c) => c.status === "pending").length,
    rejected: comments.filter((c) => c.status === "rejected").length,
  };

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Comments
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Moderate and manage comments on guides and blog posts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">{stats.all}</div>
          <div className="font-body-md text-body-md text-text-dimmed">Total</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-primary font-bold mb-1">{stats.approved}</div>
          <div className="font-body-md text-body-md text-text-dimmed">Approved</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-up font-bold mb-1">{stats.pending}</div>
          <div className="font-body-md text-body-md text-text-dimmed">Pending</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-down font-bold mb-1">{stats.rejected}</div>
          <div className="font-body-md text-body-md text-text-dimmed">Rejected</div>
        </div>
      </div>

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

      <div className="space-y-4">
        {loading ? (
          <p className="text-text-dimmed text-center py-8">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="text-text-dimmed text-center py-8">No comments found.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-surface-container border border-surface-stroke rounded-xl p-5"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {c.authorName}
                </span>
                <span
                  className={`font-label-mono text-label-mono px-3 py-0.5 rounded-full ${
                    STATUS_BADGE[c.status] || "bg-surface-stroke/50 text-text-dimmed"
                  }`}
                >
                  {c.status}
                </span>
                <span className="font-label-mono text-label-mono text-text-dimmed">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
                <Link
                  href={`${TYPE_LINK[c.contentType] || "/"}${c.contentSlug}`}
                  className="font-label-mono text-label-mono text-primary hover:brightness-110"
                >
                  {c.contentType}: {c.contentSlug}
                </Link>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3 whitespace-pre-line">
                {c.body}
              </p>
              {c.authorEmail && (
                <p className="font-label-mono text-label-mono text-text-dimmed mb-3">
                  {c.authorEmail}
                </p>
              )}
              <div className="flex gap-2">
                {c.status !== "approved" && (
                  <button
                    onClick={() => setStatus(c.id, "approved")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/10 text-primary font-body-md text-body-md font-medium hover:brightness-110 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    Approve
                  </button>
                )}
                {c.status !== "rejected" && (
                  <button
                    onClick={() => setStatus(c.id, "rejected")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-data-down/10 text-data-down font-body-md text-body-md font-medium hover:brightness-110 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                    Reject
                  </button>
                )}
                <button
                  onClick={() => remove(c.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-text-dimmed font-body-md text-body-md hover:text-data-down transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
