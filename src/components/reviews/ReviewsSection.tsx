"use client";

import { useState } from "react";

const reviews = [
  {
    rating: 5,
    title: "Game changer for my trading",
    body: "Trade Keeper has completely changed how I journal. The MT5 import saves me hours every week, and the edge analytics helped me identify my best setups.",
    author: "Sarah K.",
    version: "2.0.0",
    platform: "Windows",
    date: "2 weeks ago",
  },
  {
    rating: 5,
    title: "Finally a free journal that works",
    body: "I've tried dozens of trading journals and this is the first one that's actually free and doesn't compromise on features. The risk manager alone is worth it.",
    author: "Marcus T.",
    version: "2.0.0",
    platform: "Windows",
    date: "1 month ago",
  },
  {
    rating: 5,
    title: "Privacy-first approach is refreshing",
    body: "As a prop trader, I need my data to stay local. Trade Keeper does exactly that. No cloud, no accounts, just a solid journal.",
    author: "David L.",
    version: "2.0.0",
    platform: "Windows",
    date: "1 month ago",
  },
  {
    rating: 4,
    title: "Great for prop firm traders",
    body: "The risk management features are perfect for prop firm rules. I can track my drawdown and lot sizes in real-time. Would love to see a Mac version eventually.",
    author: "Alex M.",
    version: "2.0.0",
    platform: "Windows",
    date: "2 months ago",
  },
  {
    rating: 5,
    title: "Strategy tracking is brilliant",
    body: "The strategy playbook feature lets me document every setup and track which ones actually work. The AI analysis is a nice bonus.",
    author: "Jordan R.",
    version: "2.0.0",
    platform: "Windows",
    date: "2 months ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-[20px] ${
            star <= rating ? "text-primary fill" : "text-surface-stroke"
          }`}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-16">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="bg-surface-container border border-surface-stroke rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <StarRating rating={review.rating} />
            <h3 className="font-display text-lg text-on-surface mt-3 mb-2">
              &ldquo;{review.title}&rdquo;
            </h3>
            <p className="font-body text-body-md text-on-surface-variant mb-4">
              {review.body}
            </p>
            <div className="flex items-center justify-between font-mono text-label-mono text-text-dimmed">
              <span>{review.author}</span>
              <span>
                v{review.version} &middot; {review.platform}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review CTA */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-on-primary font-display text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined">rate_review</span>
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-surface-container border border-surface-stroke rounded-xl p-8">
            <h3 className="font-display text-headline-md text-on-surface mb-6">
              Share Your Experience
            </h3>
            <form className="space-y-4">
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="material-symbols-outlined text-[28px] text-surface-stroke hover:text-primary transition-colors"
                    >
                      star
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Summarize your experience"
                />
              </div>
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell others about your experience with FXM Trade Keeper..."
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-on-primary font-display text-base px-8 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">send</span>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
