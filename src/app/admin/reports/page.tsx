import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Reports",
};

export const dynamic = "force-dynamic";

const PRINTABLE = [
  {
    scope: "overview",
    title: "Platform Overview",
    desc: "KPIs, recent download activity, and the latest release details.",
    icon: "dashboard",
  },
  {
    scope: "analytics",
    title: "Analytics",
    desc: "Download totals, the last 30 days of activity, and version adoption.",
    icon: "analytics",
  },
  {
    scope: "telemetry",
    title: "Telemetry",
    desc: "Usage events, active installs, platforms, app versions, and recent events.",
    icon: "monitoring",
  },
];

const DOWNLOADS = [
  { key: "downloads", label: "Downloads", icon: "download" },
  { key: "telemetry", label: "Telemetry", icon: "monitoring" },
  { key: "reviews", label: "Reviews", icon: "star" },
  { key: "comments", label: "Comments", icon: "comment" },
  { key: "leads", label: "Leads", icon: "contact_mail" },
  { key: "messages", label: "Messages", icon: "mail" },
  { key: "releases", label: "Releases", icon: "deployed_code" },
];

export default async function AdminReportsPage() {
  await requireAdmin();

  const [downloads, telemetry, reviews, comments, leadCount, messages, releases] =
    await Promise.all([
      db.downloadEvent.count(),
      db.telemetryEvent.count(),
      db.review.count(),
      db.comment.count(),
      db.newsletterSubscriber.count(),
      db.contactMessage.count(),
      db.release.count(),
    ]);

  const counts: Record<string, number> = {
    downloads,
    telemetry,
    reviews,
    comments,
    leads: leadCount,
    messages,
    releases,
  };

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Reports
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Export site data as printable reports or CSV files
        </p>
      </div>

      {/* Printable reports */}
      <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4">
        Printable Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {PRINTABLE.map((report) => (
          <div
            key={report.scope}
            className="bg-surface-container border border-surface-stroke rounded-xl p-6 flex flex-col hover:border-primary/50 transition-colors"
          >
            <div className="w-10 h-10 bg-surface border border-surface-stroke rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-[20px]">
                {report.icon}
              </span>
            </div>
            <h3 className="font-headline-md text-lg text-on-surface mb-1">
              {report.title}
            </h3>
            <p className="font-body-md text-body-md text-text-dimmed flex-1 mb-5">
              {report.desc}
            </p>
            <a
              href={`/export-report/${report.scope}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-headline-md text-base px-6 py-3 rounded hover:brightness-110 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                picture_as_pdf
              </span>
              Open Report
            </a>
          </div>
        ))}
      </div>

      {/* CSV downloads */}
      <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4">
        Download CSV
      </h2>
      <div className="bg-surface-container border border-surface-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-stroke/50">
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Dataset
                </th>
                <th className="text-right px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Rows
                </th>
                <th className="text-right px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {DOWNLOADS.map(({ key, label, icon }) => (
                <tr
                  key={key}
                  className="border-b border-surface-stroke/30 last:border-0 hover:bg-surface-container-highest/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-primary">
                        {icon}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">
                        {label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-label-mono text-label-mono text-text-dimmed">
                    {counts[key].toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/api/admin/export/${key}`}
                      download
                      className="inline-flex items-center gap-2 text-primary hover:brightness-110 transition-all font-body-md text-body-md font-medium"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        download
                      </span>
                      .csv
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-body-md text-body-md text-text-dimmed mt-6">
        CSV files open in Excel, Numbers, and Google Sheets. Printable reports
        can be saved as PDF with your browser&apos;s Print dialog, then emailed.
      </p>
    </div>
  );
}