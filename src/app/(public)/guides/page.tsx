import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Learn how to use FXM Trade Keeper with our comprehensive guides. Trading journal tips, MT4/MT5 import tutorials, and more.",
};

const guides = [
  {
    slug: "how-to-journal-forex-trades",
    title: "How to Journal Forex Trades Effectively",
    excerpt:
      "A complete guide to building a trading journal that actually improves your performance.",
    category: "Trading Journaling",
    popular: true,
  },
  {
    slug: "import-mt5-trades",
    title: "How to Import MT5 Trades into FXM Trade Keeper",
    excerpt:
      "Step-by-step guide to importing your MetaTrader 5 trade history.",
    category: "MT5 Import",
    popular: true,
  },
  {
    slug: "import-mt4-trades",
    title: "How to Import MT4 Trades",
    excerpt:
      "Learn how to export and import your MetaTrader 4 trading history.",
    category: "MT4 Import",
    popular: false,
  },
  {
    slug: "risk-manager-guide",
    title: "How to Use the FXM Risk Manager",
    excerpt:
      "Master position sizing, drawdown tracking, and prop-firm rule compliance.",
    category: "Risk Management",
    popular: false,
  },
  {
    slug: "edge-analytics-guide",
    title: "How to Read Edge Analytics",
    excerpt:
      "Understand R-multiples, expectancy, and performance metrics that matter.",
    category: "Analytics",
    popular: false,
  },
  {
    slug: "strategy-tracking",
    title: "How to Track Trading Strategies",
    excerpt:
      "Document, test, and refine your trading strategies with the Strategy Playbook.",
    category: "Strategies",
    popular: false,
  },
  {
    slug: "backup-journal",
    title: "How to Back Up Your Trading Journal",
    excerpt:
      "Protect your data with .tkjournal exports and automatic backups.",
    category: "Data Management",
    popular: false,
  },
  {
    slug: "transfer-to-new-pc",
    title: "How to Transfer Trade Keeper to Another PC",
    excerpt:
      "Move your journal to a new computer without losing any data.",
    category: "Data Management",
    popular: false,
  },
];

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Learn
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Guides &amp; Tutorials
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-8">
            Learn how to get the most out of FXM Trade Keeper with our
            comprehensive guides.
          </p>

          {/* Search */}
          <div className="w-full max-w-xl search-glow rounded-xl">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-dimmed">
                search
              </span>
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full bg-surface-container border border-surface-stroke text-on-surface rounded-xl pl-12 pr-4 py-3 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Guides Grid */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="bg-surface-container border border-surface-stroke rounded-xl p-6 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              {guide.popular && (
                <span className="inline-block font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                  Popular
                </span>
              )}
              <span className="block font-mono text-label-mono text-text-dimmed mb-2">
                {guide.category}
              </span>
              <h3 className="font-display text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant">
                {guide.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
