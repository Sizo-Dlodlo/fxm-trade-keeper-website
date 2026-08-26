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
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          LEARN
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
          Guides &amp; Tutorials
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
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
              className="w-full bg-surface-container border border-surface-stroke text-on-surface rounded-xl pl-12 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      {/* Guides Grid */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="bg-surface-container border border-surface-stroke rounded-xl p-6 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              {guide.popular && (
                <span className="inline-block font-label-caps text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded mb-3 uppercase tracking-wider">
                  Popular
                </span>
              )}
              <span className="block font-label-mono text-label-mono text-text-dimmed mb-2">
                {guide.category}
              </span>
              <h3 className="font-headline-md text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {guide.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
