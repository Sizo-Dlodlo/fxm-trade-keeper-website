"use client";

import { useEffect, useState } from "react";

type CommentType = "guide" | "blog";

type Comment = {
  id: string;
  contentType: string;
  contentSlug: string;
  authorName: string;
  body: string;
  createdAt: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function CommentsSection({
  type,
  slug,
}: {
  type: CommentType;
  slug: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/comments?type=${type}&slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (active) setComments(data.comments || []);
      })
      .catch(() => {
        if (active) setComments([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [type, slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: type,
          contentSlug: slug,
          authorName: name,
          authorEmail: email,
          commentBody: body,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setMessage(
        data.moderated
          ? "Your comment was submitted."
          : "Thanks! Your comment has been submitted and will appear once approved."
      );
      setBody("");
      setName("");
      setEmail("");
      setShowForm(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-16 border-t border-surface-stroke/60 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Comments{" "}
          <span className="text-text-dimmed text-base font-normal">
            ({loading ? "…" : comments.length})
          </span>
        </h3>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setError(null);
            setMessage(null);
          }}
          className="inline-flex items-center gap-2 bg-primary text-on-primary font-body-md text-body-md font-semibold px-4 py-2 rounded hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">comment</span>
          {showForm ? "Cancel" : "Leave a comment"}
        </button>
      </div>

      {message && (
        <div className="mb-6 flex items-center gap-2 bg-primary/10 text-primary px-4 py-3 rounded-lg font-body-md text-body-md">
          <span className="material-symbols-outlined">check_circle</span>
          {message}
        </div>
      )}
      {error && !showForm && (
        <div className="mb-6 flex items-center gap-2 bg-data-down/10 text-data-down px-4 py-3 rounded-lg font-body-md text-body-md">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-xl p-6 md:p-8 mb-10 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Your display name"
              />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                Email (optional, kept private)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
              Comment *
            </label>
            <textarea
              rows={4}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={2000}
              className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              placeholder="Share your thoughts…"
            />
          </div>
          {error && showForm && (
            <div className="flex items-center gap-2 bg-data-down/10 text-data-down px-4 py-3 rounded-lg font-body-md text-body-md">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-body-md text-body-md font-semibold px-6 py-3 rounded hover:brightness-110 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            {submitting ? "Posting…" : "Submit Comment"}
          </button>
          <p className="font-body-sm text-body-sm text-text-dimmed">
            Comments are moderated before appearing.
          </p>
        </form>
      )}

      {loading ? (
        <p className="font-body-md text-body-md text-text-dimmed">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="font-body-md text-body-md text-text-dimmed">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <ul className="space-y-6">
          {comments.map((c) => (
            <li
              key={c.id}
              className="bg-surface-container border border-surface-stroke rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-headline-md text-sm font-bold">
                  {getInitials(c.authorName)}
                </div>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md font-semibold text-on-surface">
                    {c.authorName}
                  </span>
                  <span className="font-label-mono text-label-mono text-text-dimmed">
                    {formatDate(c.createdAt)}
                  </span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
