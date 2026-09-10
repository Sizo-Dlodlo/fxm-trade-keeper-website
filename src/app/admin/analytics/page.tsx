import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";
import AnalyticsClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics",
};

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

export default async function AdminAnalyticsPage() {
  await requireAdmin();

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

  const byVersion = versionRows.map((v) => ({
    version: v.version,
    count: v._count._all,
  }));

  // Per-version daily download series (last 30 days), aligned to dateSeries keys
  const versionDateSeriesMap = new Map<
    string,
    Array<[string, number]>
  >();
  for (const d of downloads) {
    const key = d.createdAt.toISOString().slice(0, 10);
    const buckets = versionDateSeriesMap.get(d.version) || [];
    buckets.push([key, 1]);
    versionDateSeriesMap.set(d.version, buckets);
  }
  const versionsByDate = new Map<string, Map<string, number>>();
  for (const [version, buckets] of versionDateSeriesMap.entries()) {
    const map = new Map<string, number>();
    for (const [key, count] of buckets) {
      map.set(key, (map.get(key) || 0) + count);
    }
    versionsByDate.set(version, map);
  }
  const versionSeries = Array.from(versionsByDate.entries())
    .sort((a, b) => {
      const ac = a[1];
      const bc = b[1];
      const aTotal = [...ac.values()].reduce((s, v) => s + v, 0);
      const bTotal = [...bc.values()].reduce((s, v) => s + v, 0);
      return bTotal - aTotal;
    })
    .slice(0, 6)
    .map(([version, map]) => ({
      version,
      data: dateSeries.map(([date]) => map.get(date) || 0),
    }));

  return (
    <AnalyticsClient
      totalDownloads={downloads.length}
      reviewCount={reviewCount}
      commentCount={commentCount}
      newsCount={newsCount}
      dateSeries={dateSeries}
      byVersion={byVersion}
      versionSeries={versionSeries}
    />
  );
}
