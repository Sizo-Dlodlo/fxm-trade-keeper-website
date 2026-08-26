const features = [
  {
    icon: "edit_note",
    title: "Trading Journal",
    description:
      "Log trades with unprecedented speed. Attach rich notes, chart screenshots, and track nuanced risk variables to understand the 'why' behind every execution.",
    items: ["Fast Entry Forms", "Rich Text Notes", "Deep Risk Tracking"],
    span: "",
  },
  {
    icon: "shield",
    title: "Risk Manager",
    description:
      "Protect your capital with institutional rigor. Real-time position sizing calculators and drawdown awareness alerts keep you within your predefined risk parameters.",
    items: ["Dynamic Sizing", "Drawdown Alerts", "Prop-Firm Rules"],
    span: "",
  },
  {
    icon: "query_stats",
    title: "Edge Analytics",
    description:
      "Quantify your methodology. Break down performance by symbol, time of day, or setup to uncover statistically significant R-multiples and system expectancy.",
    items: ["Symbol Statistics", "R-Multiple Tracking", "Expectancy Engine"],
    span: "",
  },
  {
    icon: "auto_stories",
    title: "Strategy Playbook",
    description:
      "Centralize your trading hypotheses. Document setups, rules, and conditions. Utilize AI generation to flesh out vague concepts into testable, rigid trading plans.",
    items: ["Strategy CRUD", "Performance Tracking", "JSON/PDF Export"],
    span: "md:col-span-2",
  },
  {
    icon: "psychology",
    title: "AI Insights",
    description:
      "Opt-in for advanced pattern recognition. The local AI engine analyzes your journal entries to highlight psychological blind spots and data-driven performance optimizations.",
    items: ["Optional AI Analysis", "Pattern Recognition", "Local Processing"],
    span: "",
  },
  {
    icon: "upload_file",
    title: "Import & Export",
    description:
      "Import trades from MT4, MT5, CSV, and XLSX files. Export your complete journal with .tkjournal files for backup and transfer.",
    items: ["MT4/MT5 Import", "CSV/XLSX Import", ".tkjournal Export"],
    span: "",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative z-10">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`bg-surface-container border border-surface-stroke rounded-xl p-8 hover:border-primary/50 transition-colors duration-300 group relative overflow-hidden ${feature.span}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div className="w-12 h-12 bg-surface border border-surface-stroke rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                {feature.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                {feature.description}
              </p>
              {feature.items.length > 0 && (
                <ul className="space-y-2 mt-auto">
                  {feature.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center font-label-mono text-label-mono text-text-dimmed"
                    >
                      <span className="material-symbols-outlined text-data-up text-sm mr-2">
                        check
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Data Ownership Banner */}
        <div className="mt-8 bg-surface-container-low border border-surface-stroke rounded-xl p-8 lg:col-span-3 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 rounded-tl-full -z-10" />
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="material-symbols-outlined text-primary text-sm mr-2">
                database
              </span>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                Privacy First
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
              Total Data Ownership
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Your edge is proprietary. FXM Trade Keeper operates via a local
              SQLite database. No mandatory cloud syncing, no data harvesting.
              Absolute security for your trading records.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="glass-card rounded-xl p-6 flex items-center space-x-4">
              <span className="material-symbols-outlined text-4xl text-primary">
                lock
              </span>
              <div>
                <div className="font-label-mono text-label-mono text-on-surface">
                  local.db
                </div>
                <div className="font-body-md text-body-md text-text-dimmed">
                  Encrypted &amp; Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
