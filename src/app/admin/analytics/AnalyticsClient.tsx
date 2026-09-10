"use client";

type Props = {
  totalDownloads: number;
  reviewCount: number;
  commentCount: number;
  newsCount: number;
  dateSeries: [string, number][];
  byVersion: { version: string; count: number }[];
  versionSeries: { version: string; data: number[] }[];
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const VERSION_COLORS = [
  "#76DB96",
  "#A78BFA",
  "#FBBF24",
  "#38BDF8",
  "#F472B6",
  "#F87171",
];

export default function AnalyticsClient({
  totalDownloads,
  reviewCount,
  commentCount,
  newsCount,
  dateSeries,
  byVersion,
  versionSeries,
}: Props) {
  const maxCount = Math.max(1, ...dateSeries.map(([, c]) => c));
  const totalCount = dateSeries.reduce((s, [, c]) => s + c, 0);
  const maxVersion = Math.max(1, ...byVersion.map((v) => v.count));
  const maxSeries = Math.max(
    1,
    ...dateSeries.map((_, i) =>
      versionSeries.reduce((s, v) => s + (v.data[i] || 0), 0)
    )
  );

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Analytics
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Website downloads, engagement, and acquisition data
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {totalDownloads.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Total Downloads
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {reviewCount.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Reviews
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {commentCount.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Comments
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {newsCount.toLocaleString()}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Subscribers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Downloads over time */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-2">
            Downloads Over Time
          </h2>
          <p className="font-label-mono text-label-mono text-text-dimmed mb-6">
            Last {dateSeries.length} days · {totalCount.toLocaleString()} total
          </p>
          {dateSeries.length === 0 ? (
            <p className="text-text-dimmed text-center py-8">
              No download events tracked yet.
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

        {/* Version Adoption */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Version Adoption
          </h2>
          {byVersion.length === 0 ? (
            <p className="text-text-dimmed text-center py-8">
              No download events tracked yet.
            </p>
          ) : (
            <div className="space-y-3">
              {byVersion.map((v) => (
                <div key={v.version} className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono text-on-surface w-24">
                    v{v.version}
                  </span>
                  <div className="flex-1 h-3 bg-surface-stroke/30 rounded-full overflow-hidden bg-surface/stroke">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(v.count / maxVersion) * 100}%` }}
                    />
                  </div>
                  <span className="font-label-mono text-label-mono text-text-dimmed w-14 text-right">
                    {v.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Downloads by Version over time */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl p-6 mt-6">
        <h2 className="font-headline-md text-lg text-on-surface mb-2">
          Downloads by Version — Last {dateSeries.length} Days
        </h2>
        <p className="font-label-mono text-label-mono text-text-dimmed mb-6">
          Stacked daily downloads per version
        </p>
        {versionSeries.every((v) => v.data.every((c) => c === 0)) ? (
          <p className="text-text-dimmed text-center py-8">
            Not enough version-tagged download data yet.
          </p>
        ) : (
          <>
            <div className="flex items-end gap-1 h-48">
              {dateSeries.map(([date], i) => {
                let hadAny = false;
                return (
                  <div
                    key={date}
                    className="flex-1 flex flex-col-reverse items-stretch gap-px relative group"
                    title={`${date}: ${versionSeries
                      .map((v) => `v${v.version} ${v.data[i] || 0}`)
                      .join(", ")}`}
                  >
                    {versionSeries.map((v, vi) => {
                      const count = v.data[i] || 0;
                      if (count === 0) return null;
                      hadAny = true;
                      return (
                        <div
                          key={v.version}
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${(count / maxSeries) * 100}%`,
                            backgroundColor:
                              VERSION_COLORS[vi % VERSION_COLORS.length],
                          }}
                        />
                      );
                    })}
                    {!hadAny && <div className="flex-1" />}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {versionSeries.map((v, vi) => (
                <span
                  key={v.version}
                  className="flex items-center gap-2 font-label-mono text-label-mono text-text-dimmed"
                >
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: VERSION_COLORS[vi % VERSION_COLORS.length],
                    }}
                  />
                  v{v.version}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
