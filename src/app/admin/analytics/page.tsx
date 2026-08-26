import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};

const countries = [
  { name: "USA", pct: 31 },
  { name: "UK", pct: 15 },
  { name: "South Africa", pct: 11 },
  { name: "Nigeria", pct: 7 },
  { name: "Australia", pct: 6 },
  { name: "Canada", pct: 5 },
  { name: "Botswana", pct: 3 },
  { name: "Other", pct: 22 },
];

const sources = [
  { name: "Google Search", pct: 41 },
  { name: "YouTube", pct: 23 },
  { name: "Facebook", pct: 13 },
  { name: "Reddit", pct: 8 },
  { name: "Direct", pct: 10 },
  { name: "Other", pct: 5 },
];

const versions = [
  { version: "v2.0.0", pct: 72 },
  { version: "v1.x", pct: 18 },
  { version: "Older", pct: 10 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Analytics
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Website traffic, downloads, and user acquisition data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Top Countries
          </h2>
          <div className="space-y-3">
            {countries.map((country) => (
              <div key={country.name} className="flex items-center gap-3">
                <span className="font-body-md text-body-md text-on-surface w-32">
                  {country.name}
                </span>
                <div className="flex-1 h-2 bg-surface-stroke/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${country.pct}%` }}
                  />
                </div>
                <span className="font-label-mono text-label-mono text-text-dimmed w-10 text-right">
                  {country.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Sources */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Acquisition Sources
          </h2>
          <div className="space-y-3">
            {sources.map((source) => (
              <div key={source.name} className="flex items-center gap-3">
                <span className="font-body-md text-body-md text-on-surface w-32">
                  {source.name}
                </span>
                <div className="flex-1 h-2 bg-surface-stroke/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${source.pct}%` }}
                  />
                </div>
                <span className="font-label-mono text-label-mono text-text-dimmed w-10 text-right">
                  {source.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Version Adoption */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Version Adoption
          </h2>
          <div className="space-y-3">
            {versions.map((version) => (
              <div key={version.version} className="flex items-center gap-3">
                <span className="font-label-mono text-label-mono text-on-surface w-32">
                  {version.version}
                </span>
                <div className="flex-1 h-2 bg-surface-stroke/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${version.pct}%` }}
                  />
                </div>
                <span className="font-label-mono text-label-mono text-text-dimmed w-10 text-right">
                  {version.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Download Funnel */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-headline-md text-lg text-on-surface mb-6">
            Download Funnel
          </h2>
          <div className="space-y-4">
            {[
              { label: "Page Views", value: "14,295", width: "100%" },
              { label: "Download Clicks", value: "6,892", width: "48%" },
              { label: "Installer Downloads", value: "4,218", width: "29%" },
              { label: "Portable Downloads", value: "2,674", width: "19%" },
              { label: "First Launch (est.)", value: "4,821", width: "34%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="font-body-md text-body-md text-on-surface w-40">
                  {item.label}
                </span>
                <div className="flex-1 h-2 bg-surface-stroke/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: item.width }}
                  />
                </div>
                <span className="font-label-mono text-label-mono text-on-surface w-16 text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
