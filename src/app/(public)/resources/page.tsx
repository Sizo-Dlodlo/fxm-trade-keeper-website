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
      { name: "TradingView", description: "Advanced charting and technical analysis platform", url: "https://www.tradingview.com" },
      { name: "MetaTrader 5", description: "Popular forex trading platform with advanced charting", url: "https://www.metatrader5.com" },
      { name: "MetaTrader 4", description: "Classic forex trading platform", url: "https://www.metatrader4.com" },
      { name: "TradingView Screeners", description: "Stock, forex, and crypto screeners", url: "https://www.tradingview.com/screener/" },
    ],
  },
  {
    category: "Education",
    items: [
      { name: "Babypips", description: "Free forex education for beginners", url: "https://www.babypips.com" },
      { name: "Investopedia", description: "Financial education and market news", url: "https://www.investopedia.com" },
      { name: "Forex Factory", description: "Forex trading forum and economic calendar", url: "https://www.forexfactory.com" },
      { name: "BabyPips School of Pipsology", description: "Comprehensive free forex course", url: "https://www.babypips.com/learn/forex" },
    ],
  },
  {
    category: "Trading Tools",
    items: [
      { name: "Myfxbook", description: "Forex trading analytics and social network", url: "https://www.myfxbook.com" },
      { name: "FXBlue", description: "Trading account analysis and reporting", url: "https://www.fxblue.com" },
      { name: "MetaTrader Supreme Edition", description: "Advanced MT4/MT5 plugin by ADMK Studio", url: "https://www.mql5.com/en/market/product/21790" },
    ],
  },
  {
    category: "Community",
    items: [
      { name: "Reddit r/Forex", description: "Active forex trading community", url: "https://www.reddit.com/r/Forex/" },
      { name: "Reddit r/Daytrading", description: "Day trading discussions and strategies", url: "https://www.reddit.com/r/Daytrading/" },
      { name: "Elite Trader", description: "Professional trading forum", url: "https://www.elitetrader.com" },
    ],
  },
  {
    category: "Economic Calendars",
    items: [
      { name: "Forex Factory Calendar", description: "Real-time economic events and impact ratings", url: "https://www.forexfactory.com/calendar" },
      { name: "Investing.com Economic Calendar", description: "Global economic events and forecasts", url: "https://www.investing.com/economic-calendar/" },
      { name: "TradingView Economic Calendar", description: "Economic events with market impact analysis", url: "https://www.tradingview.com/economic-calendar/" },
    ],
  },
  {
    category: "Risk Management",
    items: [
      { name: "Position Size Calculator (Myfxbook)", description: "Calculate optimal position sizes based on risk", url: "https://www.myfxbook.com/forex-calculators/position-size" },
      { name: "Forex Compound Calculator", description: "Project growth with compound interest", url: "https://www.myfxbook.com/forex-calculators/compound-interest" },
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
          <h1 className="font-display text-display-xl-mobile md:text-display-xl text-on-surface mb-6">
            Trader Resources
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Curated tools and resources to help you become a better trader.
          </p>
        </div>
      </header>

      {/* Resources Grid */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
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
