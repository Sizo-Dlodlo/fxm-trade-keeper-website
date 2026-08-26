import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trader Resources",
  description:
    "Curated trading resources, tools, and educational materials for serious traders.",
};

const resources = [
  {
    category: "Charting & Analysis",
    items: [
      { name: "TradingView", description: "Advanced charting and technical analysis platform", url: "#" },
      { name: "MetaTrader 5", description: "Popular forex trading platform with advanced charting", url: "#" },
      { name: "MetaTrader 4", description: "Classic forex trading platform", url: "#" },
    ],
  },
  {
    category: "Education",
    items: [
      { name: "Babypips", description: "Free forex education for beginners", url: "#" },
      { name: "Investopedia", description: "Financial education and market news", url: "#" },
    ],
  },
  {
    category: "Trading Tools",
    items: [
      { name: "Myfxbook", description: "Forex trading analytics and social network", url: "#" },
      { name: "FXBlue", description: "Trading account analysis and reporting", url: "#" },
    ],
  },
  {
    category: "Community",
    items: [
      { name: "Forex Factory", description: "Forex trading forum and economic calendar", url: "#" },
      { name: "Reddit r/Forex", description: "Active forex trading community", url: "#" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Resources
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Trader Resources
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Curated tools and resources to help you become a better trader.
          </p>
        </div>
      </header>

      {/* Resources Grid */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {resources.map((category) => (
            <div
              key={category.category}
              className="bg-surface-container border border-surface-stroke rounded-xl p-8"
            >
              <h2 className="font-display text-headline-md text-on-surface mb-6">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    className="flex items-center justify-between p-4 rounded-lg border border-surface-stroke hover:border-primary/50 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <h3 className="font-display text-lg text-on-surface group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-body text-body-md text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-text-dimmed group-hover:text-primary transition-colors">
                      open_in_new
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
