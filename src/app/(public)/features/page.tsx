import type { Metadata } from "next";
import FeatureGrid from "@/components/features/FeatureGrid";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the full feature set of FXM Trade Keeper: Trading Journal, Risk Manager, Edge Analytics, Strategy Playbook, AI Insights, and more.",
};

export default function FeaturesPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="mb-8">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
          Total Control Over Your<br />
          <span className="text-primary">Trading Performance</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          An institutional-grade toolkit designed for the analytical retail
          trader. Master your edge with precision tracking, risk management,
          and local-first data architecture.
        </p>
      </header>

      <FeatureGrid />
    </main>
  );
}
