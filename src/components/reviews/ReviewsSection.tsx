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
  createdAt: string;
};

function StarRating({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-primary ${
            star <= rating ? "fill" : "text-surface-stroke"
          }`}
          style={{ fontSize: size }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (active) setReviews(data.reviews || []);
      })
      .catch(() => {
        if (active) setReviews([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, title, body, displayName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setMessage(
        "Thanks for your review! It will appear once approved by a moderator."
      );
      setTitle("");
      setBody("");
      setDisplayName("");
      setShowForm(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {message && (
        <div className="mb-8 flex items-center gap-2 bg-primary/10 text-primary px-4 py-3 rounded-lg font-body-md text-body-md max-w-2xl mx-auto">
          <span className="material-symbols-outlined">check_circle</span>
          {message}
        </div>
      )}

      {loading ? (
        <p className="font-body-md text-body-md text-text-dimmed text-center">
          Loading reviews…
        </p>
      ) : reviews.length === 0 ? (
        <p className="font-body-md text-body-md text-text-dimmed text-center mb-10">
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-16">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface-container border border-surface-stroke rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <StarRating rating={review.rating} />
              <h3 className="font-headline-md text-lg text-on-surface mt-3 mb-2">
                &ldquo;{review.title}&rdquo;
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                {review.body}
              </p>
              <div className="flex items-center justify-between font-label-mono text-label-mono text-text-dimmed">
                <span>{review.displayName}</span>
                <span>
                  {review.applicationVersion
                    ? `v${review.applicationVersion} · `
                    : ""}
                  {review.platform || ""}
                </span>
              </div>
              <div className="font-label-mono text-label-mono text-text-dimmed mt-1">
                {formatDate(review.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write Review CTA */}
      <div className="text-center">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setError(null);
            setMessage(null);
          }}
          className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined">rate_review</span>
          {showForm ? "Close" : "Write a Review"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-surface-container border border-surface-stroke rounded-xl p-8">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6">
              Share Your Experience
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`material-symbols-outlined text-[28px] transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-primary fill"
                          : "text-surface-stroke hover:text-primary"
                      }`}
                    >
                      star
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Summarize your experience"
                />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell others about your experience with FXM Trade Keeper..."
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-data-down/10 text-data-down px-4 py-3 rounded-lg font-body-md text-body-md">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-on-primary font-headline-md text-base px-8 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
                {submitting ? "Submitting…" : "Submit Review"}
              </button>
              <p className="font-body-sm text-body-sm text-text-dimmed">
                Reviews are moderated before appearing.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
