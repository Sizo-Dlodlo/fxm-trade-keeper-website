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
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Changelog
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Release Notes
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Track every update, improvement, and new feature in FXM Trade
            Keeper.
          </p>
        </div>
      </header>

      {/* Releases */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-4xl mx-auto">
        {releases.map((release) => (
          <div
            key={release.version}
            className="bg-surface-container border border-surface-stroke rounded-xl p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-headline-md text-on-surface">
                FXM Trade Keeper v{release.version}
              </h2>
              {release.stable && (
                <span className="font-mono text-label-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
                  STABLE
                </span>
              )}
            </div>
            <p className="font-mono text-label-mono text-text-dimmed mb-6">
              Released {release.date}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-lg text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    new_releases
                  </span>
                  New
                </h3>
                <ul className="space-y-2">
                  {release.new.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-body-md text-on-surface-variant"
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
                <h3 className="font-display text-lg text-on-surface mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    upgrade
                  </span>
                  Improved
                </h3>
                <ul className="space-y-2">
                  {release.improved.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-body-md text-on-surface-variant"
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
                className="bg-primary text-on-primary font-display text-base px-6 py-3 rounded hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                Download v{release.version}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
