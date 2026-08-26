import type { Metadata } from "next";
import FeatureGrid from "@/components/features/FeatureGrid";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the full feature set of FXM Trade Keeper: Trading Journal, Risk Manager, Edge Analytics, Strategy Playbook, AI Insights, and more.",
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Platform Capabilities
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6 max-w-3xl">
            Total Control Over Your Trading Performance
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-10">
            An institutional-grade toolkit designed for the analytical retail
            trader. Master your edge with precision tracking, risk management,
            and local-first data architecture.
          </p>
        </div>
      </header>

      <FeatureGrid />
    </>
  );
}
