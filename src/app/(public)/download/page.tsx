import type { Metadata } from "next";
import DownloadCards from "@/components/download/DownloadCards";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download FXM Trade Keeper for free. Available as Windows Installer or Portable Edition. No account required.",
};

export default function DownloadPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="mb-8">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
          Secure your setup.<br />
          <span className="text-primary">Download Version 2.0.0</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Choose the installation method that best fits your trading environment.
          Built for Windows with institutional-grade security in mind.
        </p>
      </header>

      {/* Download Section */}
      <section className="w-full">
        <DownloadCards />
      </section>
    </main>
  );
}
