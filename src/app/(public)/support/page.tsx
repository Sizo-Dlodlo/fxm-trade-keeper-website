import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with FXM Trade Keeper. Installation guides, troubleshooting, MT4/MT5 import help, and contact support.",
};

const sections = [
  {
    icon: "rocket_launch",
    title: "Getting Started",
    articles: [
      { title: "Initial Setup & Workspace Configuration", href: "/guides/how-to-journal-forex-trades" },
      { title: "Connecting your first Broker Account", href: "/guides" },
      { title: "Quick Start Video Walkthrough", href: "/download" },
    ],
  },
  {
    icon: "download",
    title: "Installation",
    articles: [
      { title: "Windows Installer Guide", href: "/download" },
      { title: "Portable Edition Setup", href: "/download#portable" },
      { title: "macOS Installer Guide", href: "/download#mac" },
      { title: "System Requirements", href: "/download" },
    ],
  },
  {
    icon: "upload_file",
    title: "Import & Export",
    articles: [
      { title: "MT5 Trade Import", href: "/guides/import-mt5-trades" },
      { title: "MT4 Trade Import", href: "/guides/import-mt4-trades" },
      { title: "CSV/XLSX Import", href: "/guides" },
      { title: ".tkjournal Backup & Transfer", href: "/guides/backup-journal" },
    ],
  },
  {
    icon: "psychology",
    title: "AI Features",
    articles: [
      { title: "AI Strategy Generator", href: "/guides/strategy-tracking" },
      { title: "Per-Strategy AI Analysis", href: "/guides/edge-analytics-guide" },
      { title: "AI Settings Configuration", href: "/blog/fxm-trade-keeper-v2-release" },
    ],
  },
  {
    icon: "bug_report",
    title: "Troubleshooting",
    articles: [
      { title: "Common Errors", href: "/support" },
      { title: "Database Recovery", href: "/guides/backup-journal" },
      { title: "Performance Issues", href: "/support" },
    ],
  },
];

export default function SupportPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          HELP CENTER
        </span>
        <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-2">
          How Can We Help You?
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Find answers to common questions or contact our support team.
        </p>

        {/* Search */}
        <div className="w-full max-w-xl search-glow rounded-xl">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-dimmed">
              search
            </span>
            <input
              type="text"
              placeholder="Search guides and articles..."
              className="w-full bg-surface-container border border-surface-stroke text-on-surface rounded-xl pl-12 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      {/* Support Sections */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-surface-container border border-surface-stroke rounded-xl p-8 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-surface border border-surface-stroke rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">
                  {section.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.articles.map((article) => (
                  <li key={article.title}>
                    <Link
                      href={article.href}
                      className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm text-primary">
                        chevron_right
                      </span>
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-surface-container border border-surface-stroke rounded-xl p-8">
            <h3 className="font-headline-md text-lg text-on-surface mb-2">
              Need More Help?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
            <Link
              href="/contact"
              className="bg-primary text-on-primary font-headline-md text-base px-6 py-3 rounded hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
