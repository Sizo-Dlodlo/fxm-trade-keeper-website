import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FX Momentum and the story behind FXM Trade Keeper. Built by traders, engineered for precision.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            About FX Momentum
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Built by Traders, Engineered for Precision
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            FX Momentum was founded with a simple mission: give retail traders
            the same analytical tools that institutional desks take for granted.
          </p>
        </div>
      </header>

      {/* Mission */}
      <section className="w-full py-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-headline-md text-on-surface mb-6">
            Our Mission
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-6">
            Professional journaling should be accessible to every trader,
            regardless of account size. FXM Trade Keeper was born out of
            frustration with existing solutions that were either overpriced,
            cloud-dependent, or lacked the analytical depth serious traders
            need.
          </p>
          <p className="font-body text-body-lg text-on-surface-variant mb-6">
            We believe your trading data is your most valuable asset. That&apos;s why
            Trade Keeper is built as a local-first application — your journal
            stays on your machine, under your control, always.
          </p>
        </div>

        {/* Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-16">
          {[
            {
              icon: "shield",
              title: "Private",
              description:
                "Your trading data never leaves your device. No cloud sync, no telemetry, no data harvesting. Your edge stays yours.",
            },
            {
              icon: "computer",
              title: "Local",
              description:
                "Everything runs on your machine. SQLite database, local backups, offline-first architecture. Works without internet.",
            },
            {
              icon: "person",
              title: "User-Owned",
              description:
                "No mandatory accounts, no subscriptions for core features. You own your journal, your data, and your trading records.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="bg-surface-container border border-surface-stroke rounded-xl p-8 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  {pillar.icon}
                </span>
              </div>
              <h3 className="font-display text-headline-md text-on-surface mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <Link
            href="/download"
            className="bg-primary text-on-primary font-display text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined">download</span>
            Download Free
          </Link>
        </div>
      </section>
    </>
  );
}
