import type { Metadata } from "next";
import ReviewsSection from "@/components/reviews/ReviewsSection";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what traders are saying about FXM Trade Keeper. See reviews from the community and share your own experience.",
};

export default function ReviewsPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          COMMUNITY REVIEWS
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
          Trusted by Disciplined Traders
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
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
          <span className="font-headline-md text-lg text-on-surface font-bold">
            4.9
          </span>
          <span className="font-body-md text-body-md text-text-dimmed">
            average rating
          </span>
        </div>
      </header>

      {/* Reviews Section */}
      <section className="w-full">
        <ReviewsSection />
      </section>
    </main>
  );
}
