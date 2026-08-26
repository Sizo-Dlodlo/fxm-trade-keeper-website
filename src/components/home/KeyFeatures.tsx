const features = [
  {
    icon: "edit_note",
    title: "Fast Trade Entry",
    description: "Log trades in seconds with our streamlined entry form.",
  },
  {
    icon: "query_stats",
    title: "R-Multiple Tracking",
    description: "Track risk-reward ratios and R-multiples for every trade.",
  },
  {
    icon: "auto_stories",
    title: "Strategy Playbook",
    description: "Document and track your trading strategies with AI assistance.",
  },
  {
    icon: "upload_file",
    title: "MT4/MT5 Import",
    description: "Import your trade history directly from MetaTrader platforms.",
  },
  {
    icon: "backup",
    title: ".tkjournal Backups",
    description: "Export and import your complete journal with a single file.",
  },
  {
    icon: "psychology",
    title: "AI Insights",
    description: "Optional AI-powered analysis of your trading patterns.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          Everything You Need
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Professional-grade tools for tracking and improving your trading.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface-container border border-surface-stroke rounded-xl p-8 hover:border-primary/50 transition-colors duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-surface border border-surface-stroke rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary">
                {feature.icon}
              </span>
            </div>
            <h3 className="font-headline-md text-lg text-on-surface mb-3">
              {feature.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
