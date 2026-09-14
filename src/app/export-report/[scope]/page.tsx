import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";
import PrintButtons from "../PrintButtons";

export const metadata: Metadata = {
  title: "FXM Trade Keeper Reports",
};

export const dynamic = "force-dynamic";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
);

async function requireAdmin() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) redirect("/admin/login");
  try {
    await jwtVerify(cookie, secret);
  } catch {
    redirect("/admin/login");
  }
}

const DAY_MS = 86400000;
const SCOPE_LABELS: Record<string, string> = {
  overview: "Platform Overview",
  analytics: "Analytics",
  telemetry: "Telemetry",
};
const SCOPES = Object.keys(SCOPE_LABELS);

function humanDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(d);
}

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function ReportTable({
  title,
  caption,
  headers,
  rows,
}: {
  title: string;
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <section className="mb-10">
      <h2 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
        {title}
      </h2>
      {caption && <p className="text-sm text-slate-500 mb-4">{caption}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-3 py-2 border-b-2 border-slate-300 bg-slate-50 font-label-mono text-xs uppercase tracking-wider text-slate-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-3 py-2 border-b border-slate-200 text-sm text-slate-700 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function StatCards({
  stats,
}: {
  stats: { label: string; value: string }[];
}) {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
          >
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ExportReportPage({
  params,
}: {
  params: Promise<{ scope: string }>;
}) {
  await requireAdmin();
  const { scope } = await params;

  if (!SCOPES.includes(scope)) {
    notFound();
  }

  const now = new Date();

  if (scope === "analytics") {
    const [downloads, versionRows, reviewCount, commentCount, newsCount] =
      await Promise.all([
        db.downloadEvent.findMany({
          orderBy: { createdAt: "asc" },
          take: 2000,
        }),
        db.downloadEvent.groupBy({
          by: ["version"],
          _count: { _all: true },
          orderBy: { _count: { version: "desc" } },
          take: 10,
        }),
        db.review.count(),
        db.comment.count(),
        db.newsletterSubscriber.count(),
      ]);

    const byDate = new Map<string, number>();
    for (const d of downloads) {
      const key = d.createdAt.toISOString().slice(0, 10);
      byDate.set(key, (byDate.get(key) || 0) + 1);
    }
    const dateSeries = Array.from(byDate.entries())
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .slice(-30);

    return (
      <ReportShell scope={scope}>
        <StatCards
          stats={[
            { label: "Total Downloads", value: downloads.length.toLocaleString() },
            { label: "Reviews", value: reviewCount.toLocaleString() },
            { label: "Comments", value: commentCount.toLocaleString() },
            { label: "Subscribers", value: newsCount.toLocaleString() },
          ]}
        />
        <ReportTable
          title="Downloads Over Time"
          caption="Daily download events, last 30 days"
          headers={["Date", "Downloads"]}
          rows={dateSeries.map(([date, count]) => [date, count])}
        />
        <ReportTable
          title="Version Adoption"
          caption="Total downloads grouped by app version"
          headers={["Version", "Downloads"]}
          rows={versionRows.map((v) => [v.version, v._count._all])}
        />
      </ReportShell>
    );
  }

  if (scope === "telemetry") {
    const startOfToday = new Date(now.toISOString().slice(0, 10) + "T00:00:00.000Z");
    const since7d = new Date(now.getTime() - 6 * DAY_MS);
    const since30d = new Date(now.getTime() - 29 * DAY_MS);

    const [
      totalEvents,
      eventsToday,
      lifetimeInstalls,
      installs7d,
      eventRows,
      platformRows,
      versionRows,
      recentRows,
      seriesRows,
    ] = await Promise.all([
      db.telemetryEvent.count(),
      db.telemetryEvent.count({ where: { createdAt: { gte: startOfToday } } }),
      db.telemetryEvent.findMany({
        where: { installId: { not: null } },
        distinct: ["installId"],
        select: { installId: true },
      }),
      db.telemetryEvent.findMany({
        where: { installId: { not: null }, createdAt: { gte: since7d } },
        distinct: ["installId"],
        select: { installId: true },
      }),
      db.telemetryEvent.groupBy({
        by: ["eventType"],
        _count: { _all: true },
        orderBy: { _count: { eventType: "desc" } },
        take: 12,
      }),
      db.telemetryEvent.groupBy({
        by: ["platform"],
        _count: { _all: true },
        orderBy: { _count: { platform: "desc" } },
        take: 6,
      }),
      db.telemetryEvent.groupBy({
        by: ["appVersion"],
        _count: { _all: true },
        orderBy: { _count: { appVersion: "desc" } },
        take: 6,
      }),
      db.telemetryEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 25,
      }),
      db.telemetryEvent.findMany({
        where: { createdAt: { gte: since30d } },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
        take: 5000,
      }),
    ]);

    const byDate = new Map<string, number>();
    for (const r of seriesRows) {
      const key = r.createdAt.toISOString().slice(0, 10);
      byDate.set(key, (byDate.get(key) || 0) + 1);
    }
    const dateSeries = Array.from(byDate.entries())
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .slice(-30);

    const short = (id: string | null | undefined) =>
      id ? `${id.slice(0, 10)}…` : "—";

    return (
      <ReportShell scope={scope}>
        <StatCards
          stats={[
            { label: "Total Events", value: totalEvents.toLocaleString() },
            { label: "Events Today", value: eventsToday.toLocaleString() },
            {
              label: "Active Installs (7d)",
              value: installs7d.length.toLocaleString(),
            },
            {
              label: "Lifetime Installs",
              value: lifetimeInstalls.length.toLocaleString(),
            },
          ]}
        />
        <ReportTable
          title="Events Over Time"
          caption="Daily event volume, last 30 days"
          headers={["Date", "Events"]}
          rows={dateSeries.map(([date, count]) => [date, count])}
        />
        <ReportTable
          title="Top Event Types"
          headers={["Event Type", "Count"]}
          rows={eventRows.map((r) => [r.eventType, r._count._all])}
        />
        <ReportTable
          title="Platforms"
          headers={["Platform", "Count"]}
          rows={platformRows.map((r) => [r.platform || "unknown", r._count._all])}
        />
        <ReportTable
          title="App Versions"
          headers={["App Version", "Count"]}
          rows={versionRows.map((r) => [r.appVersion || "unknown", r._count._all])}
        />
        <ReportTable
          title="Recent Events"
          caption="Latest 25 anonymized events"
          headers={[
            "When",
            "Install",
            "Event",
            "View",
            "App Version",
            "Platform",
          ]}
          rows={recentRows.map((r) => [
            humanDate(r.createdAt),
            short(r.installId),
            r.eventType,
            r.viewName || "—",
            r.appVersion || "—",
            r.platform || "—",
          ])}
        />
      </ReportShell>
    );
  }

  const [
    downloads,
    pendingReviews,
    pendingComments,
    reviews,
    comments,
    subscribers,
    messages,
    releases,
  ] = await Promise.all([
    db.downloadEvent.count(),
    db.review.count({ where: { status: "pending" } }),
    db.comment.count({ where: { status: "pending" } }),
    db.review.count(),
    db.comment.count(),
    db.newsletterSubscriber.count(),
    db.contactMessage.count(),
    db.release.findMany({ orderBy: { releaseDate: "desc" }, take: 1 }),
  ]);

  const recentEvents = await db.downloadEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const latest = releases[0];

  return (
    <ReportShell scope={scope}>
      <StatCards
        stats={[
          { label: "Total Downloads", value: downloads.toLocaleString() },
          { label: "Pending Reviews", value: String(pendingReviews) },
          { label: "Pending Comments", value: String(pendingComments) },
          { label: "Subscribers", value: subscribers.toLocaleString() },
          { label: "Total Reviews", value: reviews.toLocaleString() },
          { label: "Total Comments", value: comments.toLocaleString() },
          { label: "Contact Messages", value: messages.toLocaleString() },
          {
            label: "Latest Release",
            value: latest ? `v${latest.version}` : "—",
          },
        ]}
      />
      <ReportTable
        title="Recent Download Activity"
        caption={`Latest ${recentEvents.length} download events`}
        headers={["When", "Version", "Platform", "Source"]}
        rows={recentEvents.map((d) => [
          timeAgo(d.createdAt),
          d.version,
          d.platform,
          d.source || "—",
        ])}
      />
      {latest && (
        <section className="mb-10">
          <h2 className="font-headline-md text-lg font-bold text-slate-900 mb-1">
            Latest Release — v{latest.version}
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            {latest.stable ? "Stable" : "Beta"} · released{" "}
            {new Date(latest.releaseDate).toLocaleDateString()} · Platform:{" "}
            {latest.platform} ({latest.architecture})
          </p>
          <ReportTable
            title="Download Artifacts"
            headers={["Option", "URL"]}
            rows={[
              ...(latest.installerUrl
                ? [["Windows Installer", latest.installerUrl]]
                : []),
              ...(latest.portableUrl
                ? [["Windows Portable", latest.portableUrl]]
                : []),
              ...(latest.macUrl
                ? [["macOS Intel", latest.macUrl]]
                : []),
              ...(latest.macArmUrl
                ? [["macOS Apple Silicon", latest.macArmUrl]]
                : []),
              ...(latest.guideUrl
                ? [["Mac Install Guide (PDF)", latest.guideUrl]]
                : []),
            ]}
          />
          {latest.changelog && (
            <>
              <h3 className="font-headline-md font-semibold text-slate-900 mb-2 mt-6">
                Changelog
              </h3>
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono border border-slate-200 rounded-lg p-4 bg-slate-50">
                {latest.changelog}
              </pre>
            </>
          )}
        </section>
      )}
      <section className="mb-10">
        <h2 className="font-headline-md text-lg font-bold text-slate-900 mb-4">
          Content Summary
        </h2>
        <ReportTable
          title=""
          headers={["Area", "Total"]}
          rows={[
            ["Reviews", reviews],
            ["Comments", comments],
            ["Newsletter Subscribers", subscribers],
            ["Contact Messages", messages],
          ]}
        />
      </section>
    </ReportShell>
  );
}

function ReportShell({
  scope,
  children,
}: {
  scope: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[920px] mx-auto bg-white text-slate-900">
      <header className="border-b-2 border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="font-label-mono text-xs uppercase tracking-wider text-slate-500 mb-1">
            FXM Trade Keeper — Admin Console
          </p>
          <h1 className="font-headline-md text-3xl font-bold text-slate-900">
            Platform Report
          </h1>
          <p className="text-slate-600">
            {SCOPE_LABELS[scope] || scope}
          </p>
        </div>
        <div className="text-sm text-slate-600 md:text-right">
          <div>Generated {humanDate(new Date())}</div>
          <div className="text-slate-400">Scope: {scope}</div>
        </div>
      </header>

      {children}

      <footer className="mt-10 pt-6 border-t border-slate-200 text-xs text-slate-400">
        Generated by the FXM Trade Keeper admin console. This report is for
        internal use.
      </footer>

      <PrintButtons />
    </div>
  );
}