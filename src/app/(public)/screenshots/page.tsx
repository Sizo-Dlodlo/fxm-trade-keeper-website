import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screenshots",
  description:
    "See FXM Trade Keeper in action. Browse screenshots of the Dashboard, Journal, Analytics, Risk Manager, Strategies, and more.",
};

const screenshots = [
  { src: "/screenshots/JOURNAL.png", alt: "Trading Journal", category: "Core" },
  { src: "/screenshots/ANALYTICS.png", alt: "Edge Analytics", category: "Analytics" },
  { src: "/screenshots/RISK MANAGER.png", alt: "Risk Manager", category: "Risk" },
  { src: "/screenshots/STRATEGIES.png", alt: "Strategy Playbook", category: "Strategies" },
  { src: "/screenshots/AI INSIGHTS.png", alt: "AI Insights", category: "AI" },
  { src: "/screenshots/ACCOUNTS.png", alt: "Accounts", category: "Core" },
  { src: "/screenshots/CALENDAR.png", alt: "Calendar View", category: "Core" },
  { src: "/screenshots/PERFORMANCE.png", alt: "Performance", category: "Analytics" },
  { src: "/screenshots/EDGE ANALYTICS.png", alt: "Edge Analytics Detail", category: "Analytics" },
  { src: "/screenshots/IMPORT.png", alt: "Import Trades", category: "Core" },
  { src: "/screenshots/SETTINGS_1.png", alt: "Settings", category: "Settings" },
  { src: "/screenshots/SETTINGS_2.png", alt: "Settings - Backup", category: "Settings" },
  { src: "/screenshots/SETTINGS_AI INTELLIGENCE.png", alt: "AI Settings", category: "AI" },
  { src: "/screenshots/USER MANUAL.png", alt: "User Manual", category: "Help" },
];

export default function ScreenshotsPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Gallery
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            See Trade Keeper in Action
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            A clean, powerful interface designed for serious traders. Browse
            screenshots of every major feature.
          </p>
        </div>
      </header>

      {/* Screenshots Grid */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                    {screenshot.category}
                  </span>
                  <span className="font-display text-lg text-on-surface block">
                    {screenshot.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
