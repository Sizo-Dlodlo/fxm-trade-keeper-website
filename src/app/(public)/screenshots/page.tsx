"use client";

import { useMemo, useState } from "react";
import ScreenshotLightbox from "@/components/screenshots/ScreenshotLightbox";

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

const categories = ["All", "Core", "Analytics", "Risk", "Strategies", "AI", "Settings", "Help"];

export default function ScreenshotsPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? screenshots
        : screenshots.filter((s) => s.category === filter),
    [filter]
  );

  // When filter changes or lightbox opens on a filtered index, keep index valid
  const lightboxItem = lightbox !== null ? filtered[lightbox] : null;

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          GALLERY
        </span>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-2">
          See Trade Keeper in Action
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          A clean, powerful interface designed for serious traders. Browse
          screenshots of every major feature.
        </p>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setLightbox(null);
            }}
            className={`px-4 py-2 rounded-full font-label-mono text-label-mono transition-all border ${
              filter === cat
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container text-on-surface-variant border-surface-stroke hover:border-primary/50 hover:text-on-surface"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Screenshots Grid */}
      <section className="w-full">
        {filtered.length === 0 ? (
          <p className="text-center font-body-md text-body-md text-text-dimmed py-16">
            No screenshots in this category yet.
          </p>
        ) : (
          <div key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filtered.map((screenshot, i) => (
              <button
                key={screenshot.src}
                onClick={() => setLightbox(i)}
                className="relative rounded-xl overflow-hidden border border-surface-stroke group hover:border-primary/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all cursor-zoom-in text-left animate-fade-in-up"
                aria-label={`View ${screenshot.alt}`}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <span className="font-label-caps text-[10px] text-primary uppercase tracking-wider">
                      {screenshot.category}
                    </span>
                    <span className="font-headline-md text-lg text-on-surface block">
                      {screenshot.alt}
                    </span>
                  </div>
                </div>
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full glass-overlay flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    zoom_in
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {lightboxItem && lightbox !== null && (
        <ScreenshotLightbox
          screenshots={filtered}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </main>
  );
}
