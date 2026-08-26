import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const kpis = [
  {
    label: "Unique Visitors",
    value: "14,295",
    change: "+12.5%",
    positive: true,
    icon: "visibility",
  },
  {
    label: "Total Downloads",
    value: "6,892",
    change: "+8.2%",
    positive: true,
    icon: "download",
  },
  {
    label: "Active Users (DAU)",
    value: "4,821",
    change: "-1.4%",
    positive: false,
    icon: "group",
  },
  {
    label: "Est. Revenue",
    value: "$512",
    change: "+24.0%",
    positive: true,
    icon: "attach_money",
  },
];

const activity = [
  { icon: "download", color: "text-primary", title: "New Download", desc: "Windows x64 Installer", time: "2 min ago" },
  { icon: "star", color: "text-primary", title: "New 5-Star Review", desc: "Trade Keeper has completely changed...", time: "15 min ago" },
  { icon: "system_update", color: "text-secondary", title: "System Update", desc: "v1.4.2 deployed successfully", time: "1 hour ago" },
  { icon: "error", color: "text-data-down", title: "API Error", desc: "Binance Node sync failed", time: "3 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-container-max mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Platform Overview
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Live metrics and performance data
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-surface-container border border-surface-stroke rounded-xl p-6 relative overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10" />
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
                {kpi.change}
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

      {/* Traffic Chart */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-md text-lg text-on-surface">
            Traffic &amp; Downloads
          </h2>
          <div className="flex gap-2">
            {["7D", "30D", "1Y"].map((period) => (
              <button
                key={period}
                className={`px-3 py-1 rounded font-label-mono text-label-mono transition-colors ${
                  period === "30D"
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-surface border border-surface-stroke text-text-dimmed hover:text-on-surface"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        {/* Faux Bar Chart */}
        <div className="flex items-end gap-2 h-48">
          {[30, 45, 60, 75, 90, 65, 80].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/30 rounded-t hover:bg-primary/50 transition-colors relative group"
              style={{ height: `${height}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-label-mono text-[10px] text-text-dimmed opacity-0 group-hover:opacity-100 transition-opacity">
                {Math.round(height * 14)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 font-label-mono text-[10px] text-text-dimmed">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
        <h2 className="font-headline-md text-lg text-on-surface mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {activity.map((item, i) => (
            <div
              key={i}
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
        </div>
      </div>
    </div>
  );
}
