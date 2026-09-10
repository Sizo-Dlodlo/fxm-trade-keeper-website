import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Trading insights, product updates, and educational content from FX Momentum.",
};

export default function BlogPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          BLOG
        </span>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-2">
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
