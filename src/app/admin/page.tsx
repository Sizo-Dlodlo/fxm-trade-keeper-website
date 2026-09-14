import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin Dashboard",
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

export default async function AdminDashboard() {
  await requireAdmin();

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
    db.release.findMany({
      orderBy: { releaseDate: "desc" },
      take: 1,
    }),
  ]);

  const recentEvents = await db.downloadEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const kpis = [
    { label: "Total Downloads", value: downloads.toLocaleString(), icon: "download", positive: true },
    { label: "Pending Reviews", value: String(pendingReviews), icon: "star", positive: pendingReviews === 0 },
    { label: "Pending Comments", value: String(pendingComments), icon: "comment", positive: pendingComments === 0 },
    { label: "Subscribers", value: subscribers.toLocaleString(), icon: "group", positive: true },
  ];

  const activity = [
    ...recentEvents.map((d, i) => ({
      icon: "download",
      color: "text-primary",
      title: `Download · v${d.version}`,
      desc: `${d.platform}${d.source ? ` · ${d.source}` : ""}`,
      time: timeAgo(d.createdAt),
      key: `dl-${i}`,
    })),
    { icon: "star", color: "text-secondary", title: "Reviews", desc: `${reviews} total written`, time: "—", key: "rev" },
    { icon: "forum", color: "text-secondary", title: "Comments", desc: `${comments} total written`, time: "—", key: "cmt" },
    { icon: "mail", color: "text-secondary", title: "Contact Messages", desc: `${messages} received`, time: "—", key: "msg" },
  ];

  if (releases.length) {
    activity.unshift({
      icon: "system_update",
      color: "text-primary",
      title: `Release · v${releases[0].version}`,
      desc: releases[0].stable ? "Stable release published" : "Beta release published",
      time: timeAgo(new Date(releases[0].releaseDate)),
      key: "rel",
    });
  }

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
            Platform Overview
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Live metrics and performance data
          </p>
        </div>
        <Link
          href="/admin/reports"
          className="bg-primary text-on-primary font-headline-md text-base px-6 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">description</span>
          Export Reports
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-surface-container border border-surface-stroke rounded-xl p-6 relative overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-surface border border-surface-stroke rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {kpi.icon}
                </span>
              </div>
              <span
                className={`font-label-mono text-label-mono ${
                  kpi.positive ? "text-data-up" : "text-data-down"
                }`}
              >
                {kpi.positive && kpi.label.includes("Pending") ? "0" : ""}
              </span>
            </div>
            <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
              {kpi.value}
            </div>
            <div className="font-body-md text-body-md text-text-dimmed">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Overview note */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl p-6 mb-8">
        <h2 className="font-headline-md text-lg text-on-surface mb-2">
          Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
              {reviews}
            </div>
            <div className="font-body-md text-body-md text-text-dimmed">Total Reviews</div>
          </div>
          <div>
            <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
              {comments}
            </div>
            <div className="font-body-md text-body-md text-text-dimmed">Total Comments</div>
          </div>
          <div>
            <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
              {messages}
            </div>
            <div className="font-body-md text-body-md text-text-dimmed">Contact Messages</div>
          </div>
        </div>
        <p className="font-body-md text-body-md text-text-dimmed mt-4">
          Visit{" "}
          <a href="/admin/analytics" className="text-primary hover:brightness-110">
            Analytics
          </a>{" "}
          for download trends and version adoption.
        </p>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
        <h2 className="font-headline-md text-lg text-on-surface mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {activity.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-4 pb-4 border-b border-surface-stroke/30 last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 bg-surface border border-surface-stroke rounded-lg flex items-center justify-center flex-shrink-0">
                <span className={`material-symbols-outlined text-[20px] ${item.color}`}>
                  {item.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body-md text-body-md text-on-surface font-medium">
                  {item.title}
                </div>
                <div className="font-body-md text-body-md text-text-dimmed truncate">
                  {item.desc}
                </div>
              </div>
              <div className="font-label-mono text-label-mono text-text-dimmed whitespace-nowrap">
                {item.time}
              </div>
            </div>
          ))}
          {activity.length === 0 && (
            <p className="text-text-dimmed text-center py-6">No activity yet.</p>
          )}
        </div>
      </div>
    </div>
  );
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
