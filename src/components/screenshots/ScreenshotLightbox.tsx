"use client";

import { useCallback, useEffect } from "react";

type Screenshot = {
  src: string;
  alt: string;
  category?: string;
};

type ScreenshotLightboxProps = {
  screenshots: Screenshot[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export default function ScreenshotLightbox({
  screenshots,
  index,
  onClose,
  onNavigate,
}: ScreenshotLightboxProps) {
  const current = screenshots[index];

  const goNext = useCallback(() => {
    onNavigate((index + 1) % screenshots.length);
  }, [index, screenshots.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + screenshots.length) % screenshots.length);
  }, [index, screenshots.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center modal-backdrop p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full glass-card flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 transition-colors"
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      {/* Prev / Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous screenshot"
        className="absolute left-3 md:left-6 z-20 w-11 h-11 rounded-full glass-card flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 transition-colors"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next screenshot"
        className="absolute right-3 md:right-6 z-20 w-11 h-11 rounded-full glass-card flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 transition-colors"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full rounded-xl overflow-hidden border border-surface-stroke shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-surface-container-lowest">
          <img
            key={current.src + index}
            src={current.src}
            alt={current.alt}
            className="w-full h-auto max-h-[72vh] object-contain animate-scale-in"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-center justify-between w-full px-1">
          <div className="flex flex-col">
            {current.category && (
              <span className="font-label-caps text-[11px] text-primary uppercase tracking-wider">
                {current.category}
              </span>
            )}
            <span className="font-headline-md text-xl text-on-surface">
              {current.alt}
            </span>
          </div>
          <span className="font-label-mono text-label-mono text-text-dimmed">
            {index + 1} / {screenshots.length}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-6 w-full flex gap-2 overflow-x-auto hide-scrollbar justify-center">
          {screenshots.map((shot, i) => (
            <button
              key={shot.src}
              onClick={() => onNavigate(i)}
              aria-label={shot.alt}
              className={`relative shrink-0 w-16 h-12 rounded-md overflow-hidden border transition-all ${
                i === index
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-surface-stroke opacity-50 hover:opacity-90"
              }`}
            >
              <img
                src={shot.src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
