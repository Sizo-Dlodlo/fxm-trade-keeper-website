import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/lib/guides";
import CommentsSection from "@/components/comments/CommentsSection";
import AdUnit from "@/components/ads/AdUnit";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-primary font-body-md text-body-md hover:brightness-110 transition-all mb-8"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Guides
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
            {guide.category}
          </span>
          {guide.popular && (
            <span className="font-label-caps text-[10px] text-on-primary bg-primary px-2 py-0.5 rounded uppercase tracking-wider">
              Popular
            </span>
          )}
        </div>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-4">
          {guide.title}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {guide.excerpt}
        </p>
        <div className="flex gap-6 mt-6 font-label-mono text-label-mono text-text-dimmed">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              schedule
            </span>
            {guide.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              update
            </span>
            {guide.updated}
          </span>
        </div>
      </header>

      <div className="space-y-10 font-body-md text-body-md text-on-surface-variant">
        {guide.sections.map((section, i) => (
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
          Ready to put this into practice?
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl mx-auto">
          Download FXM Trade Keeper for free and start journaling like a
          professional.
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
      <CommentsSection type="guide" slug={guide.slug} />
    </main>
  );
}
