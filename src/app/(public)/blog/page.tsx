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
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Blog
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Trading Insights &amp; Updates
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Educational content, product updates, and trading wisdom from the
            FXM team.
          </p>
        </div>
      </header>

      {/* Blog Grid */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-surface-container border border-surface-stroke rounded-xl p-8 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-label-mono text-primary">
                  {post.category}
                </span>
                <span className="text-text-dimmed">&middot;</span>
                <span className="font-mono text-label-mono text-text-dimmed">
                  {post.date}
                </span>
                <span className="text-text-dimmed">&middot;</span>
                <span className="font-mono text-label-mono text-text-dimmed">
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-display text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
