"use client";

type RecentEvent = {
  id: string;
  eventType: string;
  viewName: string | null;
  installId: string | null;
  appVersion: string | null;
  platform: string | null;
  detail: Record<string, unknown> | null;
  createdAt: string;
};

type Props = {
  totalEvents: number;
  eventsToday: number;
  activeInstalls: number;
  activeInstalls7d: number;
  dateSeries: [string, number][];
  byEvent: { eventType: string; count: number }[];
  byPlatform: { platform: string; count: number }[];
  byVersion: { appVersion: string; count: number }[];
  recent: RecentEvent[];
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EVENT_COLORS = [
  "#76DB96",
  "#A78BFA",
  "#FBBF24",
  "#38BDF8",
  "#F472B6",
  "#F87171",
  "#34D399",
  "#C084FC",
  "#FDE047",
  "#22D3EE",
  "#FB923C",
  "#94A3B8",
];

function prettify(eventType: string): string {
  return eventType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function shortId(id: string | null): string {
  if (!id) return "—";
  if (id.length <= 12) return id;
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TelemetryClient({
  totalEvents,
  eventsToday,
  activeInstalls,
  activeInstalls7d,
  dateSeries,
  byEvent,
  byPlatform,
  byVersion,
  recent,
}: Props) {
  const maxCount = Math.max(1, ...dateSeries.map(([, c]) => c));
  const totalCount = dateSeries.reduce((s, [, c]) => s + c, 0);
  const maxEvent = Math.max(1, ...byEvent.map((e) => e.count));
  const maxPlatform = Math.max(1, ...byPlatform.map((p) => p.count));
  const maxVersion = Math.max(1, ...byVersion.map((v) => v.count));

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Telemetry
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Anonymous usage data from the FXM Trade Keeper web app
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {totalEvents.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Total Events
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {eventsToday.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Events Today
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {activeInstalls7d.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Active Installs (7d)
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {activeInstalls.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Installs (Lifetime)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events over time */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-2">
            Events Over Time
          </h2>
          <p className="font-label-mono text-label-mono text-text-dimmed mb-6">
            Last {dateSeries.length} days · {totalCount.toLocaleString()} total
          </p>
          {dateSeries.length === 0 ? (
            <p className="text-text-dimmed text-center py-8">
              No telemetry events collected yet.
            </p>
          ) : (
            <>
              <div className="flex items-end gap-1 h-48">
                {dateSeries.map(([date, count]) => {
                  const d = new Date(date + "T00:00:00");
                  return (
                    <div
                      key={date}
                      className="flex-1 bg-primary/30 rounded-t hover:bg-primary/50 transition-colors relative group"
                      style={{ height: `${Math.max(4, (count / maxCount) * 100)}%` }}
                      title={`${MONTHS[d.getMonth()]} ${d.getDate()}: ${count}`}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-label-mono text-[10px] text-text-dimmed opacity-0 group-hover:opacity-100 transition-opacity">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 font-label-mono text-[10px] text-text-dimmed">
                {dateSeries.map(([date]) => {
                  const d = new Date(date + "T00:00:00");
                  return (
                    <span key={date}>
                      {MONTHS[d.getMonth()]} {d.getDate()}
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Top event types */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Top Event Types
          </h2>
          {byEvent.length === 0 ? (
            <p className="text-text-dimmed text-center py-8">
              No telemetry events collected yet.
            </p>
          ) : (
            <div className="space-y-3">
              {byEvent.map((e, i) => (
                <div key={e.eventType} className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{
                      backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
                    }}
                  />
                  <span className="font-label-mono text-label-mono text-on-surface w-40 truncate">
                    {prettify(e.eventType)}
                  </span>
                  <div className="flex-1 h-3 bg-surface-stroke/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(e.count / maxEvent) * 100}%`,
                        backgroundColor: EVENT_COLORS[i % EVENT_COLORS.length],
                      }}
                    />
                  </div>
                  <span className="font-label-mono text-label-mono text-text-dimmed w-14 text-right">
                    {e.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Platform + Version */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Platform
          </h2>
          {byPlatform.length === 0 ? (
            <p className="text-text-dimmed text-center py-8">
              No platform data yet.
            </p>
          ) : (
            <div className="space-y-3">
              {byPlatform.map((p) => (
                <div key={p.platform} className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono text-on-surface w-24">
                    {p.platform}
                  </span>
                  <div className="flex-1 h-3 bg-surface-stroke/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(p.count / maxPlatform) * 100}%` }}
                    />
                  </div>
                  <span className="font-label-mono text-label-mono text-text-dimmed w-14 text-right">
                    {p.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            App Version
          </h2>
          {byVersion.length === 0 ? (
            <p className="text-text-dimmed text-center py-8">
              No version data yet.
            </p>
          ) : (
            <div className="space-y-3">
              {byVersion.map((v) => (
                <div key={v.appVersion} className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono text-on-surface w-20">
                    {v.appVersion}
                  </span>
                  <div className="flex-1 h-3 bg-surface-stroke/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full"
                      style={{ width: `${(v.count / maxVersion) * 100}%` }}
                    />
                  </div>
                  <span className="font-label-mono text-label-mono text-text-dimmed w-14 text-right">
                    {v.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent events */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl p-6 mt-6">
        <h2 className="font-headline-md text-lg text-on-surface mb-6">
          Recent Events
        </h2>
        {recent.length === 0 ? (
          <p className="text-text-dimmed text-center py-8">
            No telemetry events collected yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-md">
              <thead>
                <tr className="border-b border-surface-stroke/30">
                  <th className="font-label-mono text-label-mono text-text-dimmed uppercase text-xs pb-3 px-2">
                    Event
                  </th>
                  <th className="font-label-mono text-label-mono text-text-dimmed uppercase text-xs pb-3 px-2">
                    View
                  </th>
                  <th className="font-label-mono text-label-mono text-text-dimmed uppercase text-xs pb-3 px-2">
                    Install ID
                  </th>
                  <th className="font-label-mono text-label-mono text-text-dimmed uppercase text-xs pb-3 px-2">
                    Version
                  </th>
                  <th className="font-label-mono text-label-mono text-text-dimmed uppercase text-xs pb-3 px-2">
                    Detail
                  </th>
                  <th className="font-label-mono text-label-mono text-text-dimmed uppercase text-xs pb-3 px-2">
                    When
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-surface-stroke/20 last:border-0"
                  >
                    <td className="py-3 px-2 text-on-surface font-medium">
                      {prettify(r.eventType)}
                    </td>
                    <td className="py-3 px-2 text-text-dimmed">
                      {r.viewName || "—"}
                    </td>
                    <td className="py-3 px-2 font-label-mono text-label-mono text-text-dimmed">
                      {shortId(r.installId)}
                    </td>
                    <td className="py-3 px-2 text-text-dimmed">
                      {r.appVersion || "—"}
                    </td>
                    <td className="py-3 px-2 text-text-dimmed">
                      {r.detail
                        ? Object.entries(r.detail)
                            .slice(0, 3)
                            .map(([k, val]) => `${k}:${String(val)}`)
                            .join(" · ")
                        : "—"}
                    </td>
                    <td className="py-3 px-2 text-text-dimmed whitespace-nowrap">
                      {timeAgo(r.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}