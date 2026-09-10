import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import CommentsSection from "@/components/comments/CommentsSection";
import AdUnit from "@/components/ads/AdUnit";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-primary font-body-md text-body-md hover:brightness-110 transition-all mb-8"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Blog
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
            {post.category}
          </span>
          <span className="font-label-mono text-label-mono text-text-dimmed">
            {post.date}
          </span>
          <span className="text-text-dimmed">&middot;</span>
          <span className="font-label-mono text-label-mono text-text-dimmed">
            {post.readTime}
          </span>
        </div>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-4">
          {post.title}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {post.excerpt}
        </p>
      </header>

      <div className="space-y-10 font-body-md text-body-md text-on-surface-variant">
        {post.sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
              {section.heading}
            </h2>
            {section.body.map((paragraph, j) => (
              <p key={j} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-16 glass-card rounded-xl p-8 text-center">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
          Put these insights into practice
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl mx-auto">
          FXM Trade Keeper is free to download and built for disciplined
          traders.
        </p>
        <Link
          href="/download"
          className="inline-flex items-center gap-2 bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined">download</span>
          Download Free
        </Link>
      </div>

      <AdUnit format="horizontal" />
      <CommentsSection type="blog" slug={post.slug} />
    </main>
  );
}
