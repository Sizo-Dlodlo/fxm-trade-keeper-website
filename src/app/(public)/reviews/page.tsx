import type { Metadata } from "next";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import RatingSummary from "@/components/reviews/RatingSummary";

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
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-2">
          Trusted by Disciplined Traders
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          See what traders are saying about FXM Trade Keeper. Join a growing
          community of traders who take their performance seriously.
        </p>
        <RatingSummary />
      </header>

      {/* Reviews Section */}
      <section className="w-full">
        <ReviewsSection />
      </section>
    </main>
  );
}
