"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ScreenshotLightbox from "@/components/screenshots/ScreenshotLightbox";

const screenshots = [
  { src: "/screenshots/JOURNAL.png", alt: "Trading Journal", category: "Core" },
  { src: "/screenshots/ANALYTICS.png", alt: "Edge Analytics", category: "Analytics" },
  { src: "/screenshots/RISK MANAGER.png", alt: "Risk Manager", category: "Risk" },
  { src: "/screenshots/STRATEGIES.png", alt: "Strategy Playbook", category: "Strategies" },
];

const SLIDE_DURATION = 5000;

export default function ScreenshotGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % screenshots.length);
  }, []);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, []);

  useEffect(() => {
    if (paused || lightbox !== null) return;
    const timer = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, lightbox, goNext]);

  return (
    <section className="w-full py-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded inline-block mb-4">
          GALLERY
        </span>
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
          See Trade Keeper in Action
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          A clean, powerful interface designed for serious traders. Watch the
          app come to life.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative rounded-2xl overflow-hidden border border-surface-stroke shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/10] md:aspect-[16/9] w-full bg-surface-container-lowest">
          {screenshots.map((shot, i) => (
            <button
              key={shot.src}
              onClick={() => setLightbox(i)}
              aria-label={`View ${shot.alt}`}
              className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className={`w-full h-full object-cover transition-transform duration-[2500ms] ${
                  i === active ? "scale-100" : "scale-105"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              <div
                className={`absolute bottom-0 left-0 p-6 md:p-8 text-left flex flex-col items-start gap-1 transition-all duration-700 animate-fade-in-up ${
                  i === active ? "translate-y-0 opacity-100" : "opacity-0"
                }`}
              >
                <span className="font-label-caps text-[12px] text-primary uppercase tracking-wider">
                  {shot.category}
                </span>
                <span className="font-headline-md text-2xl md:text-3xl text-on-surface">
                  {shot.alt}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="pointer-events-auto w-11 h-11 rounded-full glass-overlay flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="pointer-events-auto w-11 h-11 rounded-full glass-overlay flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-4 right-6 flex gap-2">
          {screenshots.map((shot, i) => (
            <button
              key={shot.src}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-primary"
                  : "w-2 bg-on-surface/40 hover:bg-on-surface/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/screenshots"
          className="inline-flex items-center gap-2 text-primary font-medium hover:brightness-110 transition-all font-body-md text-body-md"
        >
          Browse the full gallery
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </div>

      {lightbox !== null && (
        <ScreenshotLightbox
          screenshots={screenshots}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </section>
  );
}
