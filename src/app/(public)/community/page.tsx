import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the FXM Trade Keeper community. Feature requests, bug reports, trading tips, and product discussions.",
};

const featureRequests = [
  { title: "Native Mobile App (iOS/Android)", votes: 412, status: "In Progress" },
  { title: "Cloud Backup & Sync", votes: 285, status: "Planned" },
  { title: "TradingView Integration", votes: 176, status: "Under Review" },
  { title: "Advanced AI Analysis", votes: 151, status: "Planned" },
  { title: "Mac Version", votes: 132, status: "Under Review" },
];

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Community Hub
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Shape the Future of Trade Keeper
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Your feedback drives development. Request features, report bugs, and
            connect with other traders.
          </p>
        </div>
      </header>

      {/* Community Hub */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
          {/* Feature Requests */}
          <Link
            href="#features"
            className="glass-card rounded-xl p-8 hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-primary mb-4 border border-surface-stroke">
              <span className="material-symbols-outlined text-[24px]">
                lightbulb
              </span>
            </div>
            <h3 className="font-display text-lg text-on-surface mb-2">
              Feature Requests
            </h3>
            <p className="font-body text-body-md text-on-surface-variant">
              Suggest and vote on new features for Trade Keeper.
            </p>
          </Link>

          {/* Bug Reports */}
          <Link
            href="/support"
            className="glass-card rounded-xl p-8 hover:border-data-down/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-data-down mb-4 border border-surface-stroke">
              <span className="material-symbols-outlined text-[24px]">
                bug_report
              </span>
            </div>
            <h3 className="font-display text-lg text-on-surface mb-2">
              Bug Reports
            </h3>
            <p className="font-body text-body-md text-on-surface-variant">
              Found an issue? Report it here and we&apos;ll investigate.
            </p>
          </Link>

          {/* Trading Tips */}
          <div className="glass-card rounded-xl p-8 hover:border-secondary/50 transition-colors group">
            <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-secondary mb-4 border border-surface-stroke">
              <span className="material-symbols-outlined text-[24px]">
                tips_and_updates
              </span>
            </div>
            <h3 className="font-display text-lg text-on-surface mb-2">
              Trading Tips
            </h3>
            <p className="font-body text-body-md text-on-surface-variant">
              Share and discover journaling best practices.
            </p>
          </div>
        </div>

        {/* Feature Roadmap */}
        <div id="features">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-headline-md text-on-surface">
              Feature Roadmap
            </h2>
            <Link
              href="/contact"
              className="text-primary font-medium hover:brightness-110 transition-all font-body text-body-md flex items-center gap-1"
            >
              Submit Request
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="space-y-4">
            {featureRequests.map((request) => (
              <div
                key={request.title}
                className="bg-surface-container border border-surface-stroke rounded-xl p-6 flex items-center justify-between hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button className="flex flex-col items-center gap-1 text-primary hover:brightness-110 transition-all">
                    <span className="material-symbols-outlined">expand_less</span>
                    <span className="font-mono text-label-mono">{request.votes}</span>
                  </button>
                  <div>
                    <h3 className="font-display text-lg text-on-surface">
                      {request.title}
                    </h3>
                  </div>
                </div>
                <span
                  className={`font-mono text-label-mono px-3 py-1 rounded-full ${
                    request.status === "In Progress"
                      ? "bg-primary/10 text-primary"
                      : request.status === "Planned"
                      ? "bg-secondary-container/30 text-secondary"
                      : "bg-surface-stroke/50 text-text-dimmed"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
