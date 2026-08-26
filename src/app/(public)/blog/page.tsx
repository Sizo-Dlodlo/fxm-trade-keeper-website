import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Trading insights, product updates, and educational content from FX Momentum.",
};

const posts = [
  {
    slug: "why-local-first-trading-journal",
    title: "Why a Local-First Trading Journal Matters",
    excerpt:
      "In an era of cloud everything, here's why keeping your trading data local is a competitive advantage.",
    category: "Trading Journaling",
    date: "August 20, 2026",
    readTime: "5 min read",
  },
  {
    slug: "fxm-trade-keeper-v2-release",
    title: "FXM Trade Keeper v2.0 — What's New",
    excerpt:
      "SQLite persistence, portable edition, AI strategy generator, and more. Here's everything in v2.0.",
    category: "Product Updates",
    date: "August 15, 2026",
    readTime: "3 min read",
  },
  {
    slug: "prop-firm-risk-management",
    title: "Risk Management for Prop Firm Traders",
    excerpt:
      "How to use Trade Keeper's risk manager to stay within prop firm rules and maximize your evaluation.",
    category: "Risk Management",
    date: "August 10, 2026",
    readTime: "7 min read",
  },
  {
    slug: "r-multiples-explained",
    title: "R-Multiples Explained: Why They Matter",
    excerpt:
      "Understanding R-multiples is key to evaluating your trading system. Here's how to use them.",
    category: "Trading Analytics",
    date: "August 5, 2026",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          BLOG
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
          Trading Insights &amp; Updates
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Educational content, product updates, and trading wisdom from the
          FXM team.
        </p>
      </header>

      {/* Blog Grid */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-surface-container border border-surface-stroke rounded-xl p-8 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label-mono text-label-mono text-primary">
                  {post.category}
                </span>
                <span className="text-text-dimmed">&middot;</span>
                <span className="font-label-mono text-label-mono text-text-dimmed">
                  {post.date}
                </span>
                <span className="text-text-dimmed">&middot;</span>
                <span className="font-label-mono text-label-mono text-text-dimmed">
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
