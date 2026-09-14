import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";
import TelemetryClient from "./TelemetryClient";

export const metadata: Metadata = {
  title: "Telemetry",
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

export default async function AdminTelemetryPage() {
  await requireAdmin();

  const now = new Date();
  const since30d = new Date(now.getTime() - 29 * DAY_MS);
  const startOfToday = new Date(now.toISOString().slice(0, 10) + "T00:00:00.000Z");
  const since7d = new Date(now.getTime() - 6 * DAY_MS);

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

  const byEvent = eventRows.map((r) => ({
    eventType: r.eventType,
    count: r._count._all,
  }));
  const byPlatform = platformRows.map((r) => ({
    platform: r.platform || "unknown",
    count: r._count._all,
  }));
  const byVersion = versionRows.map((r) => ({
    appVersion: r.appVersion || "unknown",
    count: r._count._all,
  }));

  const recent = recentRows.map((r) => ({
    id: r.id,
    eventType: r.eventType,
    viewName: r.viewName,
    installId: r.installId,
    appVersion: r.appVersion,
    platform: r.platform,
    detail: r.detail as Record<string, unknown> | null,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <TelemetryClient
      totalEvents={totalEvents}
      eventsToday={eventsToday}
      activeInstalls={lifetimeInstalls.length}
      activeInstalls7d={installs7d.length}
      dateSeries={dateSeries}
      byEvent={byEvent}
      byPlatform={byPlatform}
      byVersion={byVersion}
      recent={recent}
    />
  );
}