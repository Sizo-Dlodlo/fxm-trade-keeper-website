import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Release Notes",
  description:
    "View the full changelog and release history for FXM Trade Keeper.",
};

const releases = [
  {
    version: "2.0.0",
    date: "August 26, 2026",
    stable: true,
    new: [
      "Portable Edition — run without installation",
      "SQLite persistence for reliable data storage",
      ".tkjournal export/import for backups and transfers",
      "Automatic local backups",
      "AI Strategy Generator",
      "Per-strategy AI analysis",
      "JSON/PDF strategy export",
    ],
    improved: [
      "Offline-first architecture",
      "Crash and error logging",
      "Performance optimizations",
    ],
  },
];

export default function ReleasesPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          CHANGELOG
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
          Release Notes
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Track every update, improvement, and new feature in FXM Trade
          Keeper.
        </p>
      </header>

      {/* Releases */}
      <section className="w-full max-w-4xl mx-auto">
        {releases.map((release) => (
          <div
            key={release.version}
            className="bg-surface-container border border-surface-stroke rounded-xl p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                FXM Trade Keeper v{release.version}
              </h2>
              {release.stable && (
                <span className="font-label-mono text-label-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
                  STABLE
                </span>
              )}
            </div>
            <p className="font-label-mono text-label-mono text-text-dimmed mb-6">
              Released {release.date}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-headline-md text-lg text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    new_releases
                  </span>
                  New
                </h3>
                <ul className="space-y-2">
                  {release.new.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-data-up text-[18px] mt-0.5">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    upgrade
                  </span>
                  Improved
                </h3>
                <ul className="space-y-2">
                  {release.improved.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-surface-stroke/50">
              <Link
                href="/download"
                className="bg-primary text-on-primary font-headline-md text-base px-6 py-3 rounded hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Download v{release.version}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
