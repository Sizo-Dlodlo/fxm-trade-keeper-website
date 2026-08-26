import type { Metadata } from "next";
import DownloadCards from "@/components/download/DownloadCards";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download FXM Trade Keeper for free. Available as Windows Installer or Portable Edition. No account required.",
};

export default function DownloadPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Free Download
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Download FXM Trade Keeper
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Version 2.0.0 — Free. Offline. Private. No subscription required.
          </p>
        </div>
      </header>

      {/* Download Section */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <DownloadCards />
      </section>
    </>
  );
}
