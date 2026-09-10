import Link from "next/link";

const features = [
  {
    icon: "book",
    title: "Trading Journal",
    description:
      "Log trades seamlessly with screenshot attachments, custom tags, and rich text notes. Never forget the context of a trade.",
    span: "col-span-1",
  },
  {
    icon: "analytics",
    title: "Edge Analytics",
    description:
      "Discover what works. Filter performance by strategy, session, instrument, or duration. Visualize your equity curve and drawdowns with institutional-grade charts.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: "security",
    title: "Why Local? Complete Privacy",
    description:
      "Your trading data is sensitive. FXM Trade Keeper stores everything locally on your machine. No cloud syncs, no telemetry, no subscription fees. Your data belongs to you.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: "shield",
    title: "Risk Manager",
    description:
      "Track R-multiples and strict risk management metrics to protect your capital.",
    span: "col-span-1",
  },
];

export default function ValueProposition() {
  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop bg-surface-container-lowest border-y border-surface-stroke/30">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">
            Journal. Analyze. Improve.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            The core pillars of professional trading performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`glass-card rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden group ${feature.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-fxm-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-primary mb-2 border border-surface-stroke">
                <span className="material-symbols-outlined text-[24px]">
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface">
                {feature.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-primary font-medium hover:brightness-110 transition-all font-body-md text-body-md"
          >
            Explore all features
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
