import Link from "next/link";

const screenshots = [
  { src: "/screenshots/JOURNAL.png", alt: "Trading Journal" },
  { src: "/screenshots/ANALYTICS.png", alt: "Edge Analytics" },
  { src: "/screenshots/RISK MANAGER.png", alt: "Risk Manager" },
  { src: "/screenshots/STRATEGIES.png", alt: "Strategy Playbook" },
];

export default function ScreenshotGallery() {
  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-headline-md text-on-surface mb-2">
          See Trade Keeper in Action
        </h2>
        <p className="font-body text-body-md text-on-surface-variant">
          A clean, powerful interface designed for serious traders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.src}
            className="relative rounded-xl overflow-hidden border border-surface-stroke group hover:border-primary/50 transition-colors"
          >
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="font-display text-lg text-on-surface">
                {screenshot.alt}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/screenshots"
          className="inline-flex items-center gap-2 text-primary font-medium hover:brightness-110 transition-all font-body text-body-md"
        >
          View all screenshots
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
