import type { Metadata } from "next";
import ReviewsSection from "@/components/reviews/ReviewsSection";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what traders are saying about FXM Trade Keeper. See reviews from the community and share your own experience.",
};

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Community Reviews
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Trusted by Disciplined Traders
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-8">
            See what traders are saying about FXM Trade Keeper. Join a growing
            community of traders who take their performance seriously.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="material-symbols-outlined text-[20px] text-primary fill"
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-display text-lg text-on-surface font-bold">
              4.9
            </span>
            <span className="font-body text-body-md text-text-dimmed">
              average rating
            </span>
          </div>
        </div>
      </header>

      {/* Reviews Section */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <ReviewsSection />
      </section>
    </>
  );
}
