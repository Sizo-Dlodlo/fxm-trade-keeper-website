import type { Metadata } from "next";
import DownloadCards from "@/components/download/DownloadCards";

export const metadata: Metadata = {
  title: "Download FXM Trade Keeper — Free",
  description:
    "Install FXM Trade Keeper for free — no downloads, no security warnings. Works on Windows, macOS, Android and iPhone, fully offline. Native desktop installers also available.",
};

export default function DownloadPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="mb-8">
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-4">
          Install in one click.<br />
          <span className="text-primary">No downloads. No warnings.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          The recommended option is the free web app: it installs directly
          from this site like a normal application — with an icon, its own
          window and full offline access — on Windows, macOS, Android and
          iPhone. Native desktop downloads remain available below for
          advanced users.
        </p>
      </header>

      {/* Download Section */}
      <section className="w-full">
        <DownloadCards />
      </section>
    </main>
  );
}
