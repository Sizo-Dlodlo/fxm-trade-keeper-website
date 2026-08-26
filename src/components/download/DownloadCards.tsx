"use client";

import { useState } from "react";

export default function DownloadCards() {
  const [copiedInstaller, setCopiedInstaller] = useState(false);
  const [copiedPortable, setCopiedPortable] = useState(false);

  const installerSha =
    "UX5u7/m7YmYTz340ur+GjkwrNGyFl+cBOLYsNqtqtBn/8FAh6mL0983S+vFA/Fz4MCVvmvz2SmLuhZig3X/lww==";

  const copyToClipboard = (text: string, type: "installer" | "portable") => {
    navigator.clipboard.writeText(text);
    if (type === "installer") {
      setCopiedInstaller(true);
      setTimeout(() => setCopiedInstaller(false), 2000);
    } else {
      setCopiedPortable(true);
      setTimeout(() => setCopiedPortable(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Download Cards */}
      <div className="lg:col-span-8 space-y-6">
        {/* Windows Installer */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  windows
                </span>
                <h3 className="font-display text-headline-md text-on-surface">
                  Windows Installer
                </h3>
              </div>
              <p className="font-body text-body-md text-on-surface-variant mb-2">
                Standard Windows installation. Recommended for most users.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-label-mono text-text-dimmed">
                <span>FXM-TradeKeeper-Setup-2.0.0.exe</span>
                <span>~83.6 MB</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                  RECOMMENDED
                </span>
              </div>
            </div>
            <a
              href="/downloads/FXM-TradeKeeper-Setup-2.0.0.exe"
              download
              className="bg-primary text-on-primary font-display text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span className="material-symbols-outlined">download</span>
              Download Installer
            </a>
          </div>
        </div>

        {/* Portable Version */}
        <div
          id="portable"
          className="bg-surface-container border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  folder_zip
                </span>
                <h3 className="font-display text-headline-md text-on-surface">
                  Portable Edition
                </h3>
              </div>
              <p className="font-body text-body-md text-on-surface-variant mb-2">
                No installation required. Extract and run from any location.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-label-mono text-text-dimmed">
                <span>FXM-TradeKeeper-2.0.0-Portable.exe</span>
                <span>~83.3 MB</span>
              </div>
            </div>
            <a
              href="/downloads/FXM-TradeKeeper-2.0.0-Portable.exe"
              download
              className="bg-transparent border border-surface-stroke text-on-surface font-display text-base px-8 py-4 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span className="material-symbols-outlined">download</span>
              Download Portable
            </a>
          </div>
        </div>
      </div>

      {/* Release Info Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        {/* Release Info */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h4 className="font-display text-base text-on-surface mb-4">
            Release Information
          </h4>
          <div className="space-y-3">
            {[
              { label: "Version", value: "2.0.0" },
              { label: "Release Date", value: "August 26, 2026" },
              { label: "Platform", value: "Windows 10/11" },
              { label: "Architecture", value: "x64" },
              { label: "Price", value: "Free" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <span className="font-body text-body-md text-text-dimmed">
                  {item.label}
                </span>
                <span className="font-mono text-label-mono text-on-surface">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SHA-256 Checksums */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h4 className="font-display text-base text-on-surface mb-4">
            SHA-256 Checksums
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-body text-body-md text-text-dimmed">
                  Installer
                </span>
                <button
                  onClick={() => copyToClipboard(installerSha, "installer")}
                  className="text-primary hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedInstaller ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
              <code className="font-mono text-[11px] text-text-dimmed break-all block">
                {installerSha}
              </code>
            </div>
          </div>
        </div>

        {/* Quick Setup */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h4 className="font-display text-base text-on-surface mb-4">
            Quick Setup
          </h4>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Download",
                desc: "Choose Installer or Portable",
              },
              {
                step: "2",
                title: "Verify",
                desc: "Optional: verify SHA-256 checksum",
              },
              {
                step: "3",
                title: "Run",
                desc: "Launch and start journaling",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-label-mono flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-body text-body-md text-on-surface font-medium">
                    {item.title}
                  </div>
                  <div className="font-body text-body-md text-text-dimmed text-sm">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
