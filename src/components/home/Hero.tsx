import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full relative pt-32 pb-24 px-4 md:px-margin-desktop flex flex-col items-center text-center max-w-container-max mx-auto overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fxm-navy via-background to-background" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl space-y-6">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-primary font-label-mono text-label-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-data-up animate-pulse" />
          V 2.0.0 NOW AVAILABLE
        </div>

        {/* Headline */}
        <h1 className="font-display-lg text-display-lg text-on-surface">
          Your Trading Journal.<br />
          <span className="text-primary">Your Data. Your Edge.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4 mb-8">
          A free professional trading journal designed to help traders record,
          analyze and improve their trading performance without sacrificing
          privacy.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link
            href="/download"
            className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
          >
            <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">
              download
            </span>
            Download for Windows
          </Link>
          <Link
            href="/download#portable"
            className="bg-transparent border border-surface-stroke text-on-surface font-headline-md text-base px-8 py-4 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
          >
            Portable Edition
          </Link>
        </div>

        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-surface-stroke/50 w-full text-on-surface-variant font-label-mono text-label-mono">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              check_circle
            </span>{" "}
            Free
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              check_circle
            </span>{" "}
            Offline
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              check_circle
            </span>{" "}
            Private
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              check_circle
            </span>{" "}
            No subscription required
          </div>
        </div>
      </div>
    </section>
  );
}
