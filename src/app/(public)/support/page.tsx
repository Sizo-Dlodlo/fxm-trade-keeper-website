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
      "Initial Setup & Workspace Configuration",
      "Connecting your first Broker Account",
      "Quick Start Video Walkthrough",
    ],
  },
  {
    icon: "download",
    title: "Installation",
    articles: [
      "Windows Installer Guide",
      "Portable Edition Setup",
      "System Requirements",
    ],
  },
  {
    icon: "upload_file",
    title: "Import & Export",
    articles: [
      "MT5 Trade Import",
      "MT4 Trade Import",
      "CSV/XLSX Import",
      ".tkjournal Backup & Transfer",
    ],
  },
  {
    icon: "psychology",
    title: "AI Features",
    articles: [
      "AI Strategy Generator",
      "Per-Strategy AI Analysis",
      "AI Settings Configuration",
    ],
  },
  {
    icon: "bug_report",
    title: "Troubleshooting",
    articles: [
      "Common Errors",
      "Database Recovery",
      "Performance Issues",
    ],
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Help Center
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            How Can We Help You?
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mb-8">
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
                className="w-full bg-surface-container border border-surface-stroke text-on-surface rounded-xl pl-12 pr-4 py-3 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Support Sections */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
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
              <h3 className="font-display text-headline-md text-on-surface mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.articles.map((article) => (
                  <li key={article}>
                    <Link
                      href="#"
                      className="flex items-center gap-2 font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm text-primary">
                        chevron_right
                      </span>
                      {article}
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
            <h3 className="font-display text-lg text-on-surface mb-2">
              Need More Help?
            </h3>
            <p className="font-body text-body-md text-on-surface-variant mb-4">
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
            <Link
              href="/contact"
              className="bg-primary text-on-primary font-display text-base px-6 py-3 rounded hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
