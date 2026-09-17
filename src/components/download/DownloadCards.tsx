"use client";

import { useState } from "react";
import WebAppCard from "./WebAppCard";
import SecurityNotes from "./SecurityNotes";

export default function DownloadCards() {
  const [copiedInstaller, setCopiedInstaller] = useState(false);
  const [copiedPortable, setCopiedPortable] = useState(false);
  const [copiedMacIntel, setCopiedMacIntel] = useState(false);
  const [copiedMacArm, setCopiedMacArm] = useState(false);

  const installerSha =
    "avxsTnINq37gPc5TYXGJwx9o0/86Mb8SgnyPfSPVddE=";
  const portableSha =
    "v3Z3kgDnJHKiy7g/m/2x2TY/w7UGTiCcYz2Sdfetc4Q=";
  const macIntelSha =
    "7mvWVG7Oe8P1f4yNiPucmloPPexruF/15019v4IFqXc=";
  const macArmSha =
    "0HQzcyOzpQ7c+XdSeKife3Q4Cb6POLd5FX048k/38Gw=";

  const copyToClipboard = (
    text: string,
    type: "installer" | "portable" | "macIntel" | "macArm"
  ) => {
    navigator.clipboard.writeText(text);
    if (type === "installer") {
      setCopiedInstaller(true);
      setTimeout(() => setCopiedInstaller(false), 2000);
    } else if (type === "portable") {
      setCopiedPortable(true);
      setTimeout(() => setCopiedPortable(false), 2000);
    } else if (type === "macIntel") {
      setCopiedMacIntel(true);
      setTimeout(() => setCopiedMacIntel(false), 2000);
    } else {
      setCopiedMacArm(true);
      setTimeout(() => setCopiedMacArm(false), 2000);
    }
  };

  const trackDownload = (platform: string) => {
    void fetch("/api/download-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: "2.0.0",
        platform,
        source:
          typeof window !== "undefined"
            ? window.location.pathname
            : "unknown",
      }),
    }).catch(() => {});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Web App (PWA) — primary install path */}
      <WebAppCard />
      <SecurityNotes />

      {/* Desktop downloads — secondary */}
      <div className="lg:col-span-12">
        <div className="flex items-center gap-3 mb-1">
          <span className="material-symbols-outlined text-text-dimmed text-[22px]">
            desktop_windows
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Prefer a standalone desktop app?
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          The classic download options below install a native application to
          your computer. They work perfectly, but Windows and macOS will show
          a one-time security warning — see the Security &amp; Trust Notes
          above.
        </p>
      </div>

      {/* Download Cards */}
      <div className="lg:col-span-8 flex flex-col gap-gutter">
        {/* Windows Installer */}
        <div className="bg-surface border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-fxm-navy/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  windows
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Windows Installer
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                Standard Windows installation. Recommended for most users.
              </p>
              <div className="flex flex-wrap gap-4 font-label-mono text-label-mono text-text-dimmed">
                <span>FXM-TradeKeeper-Setup-2.0.0.exe</span>
                <span>~76.2 MB</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                  RECOMMENDED
                </span>
              </div>
            </div>
            <a
              href="/downloads/FXM-TradeKeeper-Setup-2.0.0.exe"
              download
              onClick={() => trackDownload("Windows-x64-Installer")}
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap relative z-10"
            >
              <span className="material-symbols-outlined">download</span>
              Download Installer
            </a>
          </div>
        </div>

        {/* Portable Version */}
        <div
          id="portable"
          className="bg-surface border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fxm-navy/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  folder_zip
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Portable Edition
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                No installation required. Extract and run from any location.
              </p>
              <div className="flex flex-wrap gap-4 font-label-mono text-label-mono text-text-dimmed">
                <span>FXM-TradeKeeper-2.0.0-Portable.exe</span>
                <span>~76.0 MB</span>
              </div>
            </div>
            <a
              href="/downloads/FXM-TradeKeeper-2.0.0-Portable.exe"
              download
              onClick={() => trackDownload("Windows-x64-Portable")}
              className="bg-transparent border border-surface-stroke text-on-surface font-headline-md text-base px-8 py-4 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2 whitespace-nowrap relative z-10"
            >
              <span className="material-symbols-outlined">download</span>
              Download Portable
            </a>
          </div>
        </div>

        {/* Mac Installer — Intel */}
        <div
          id="mac"
          className="bg-surface border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fxm-navy/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  desktop_mac
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  macOS Installer — Intel
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                For Intel Macs. Runs on Apple Silicon via Rosetta too.
              </p>
              <div className="flex flex-wrap gap-4 font-label-mono text-label-mono text-text-dimmed">
                <span>FXM-TradeKeeper-2.0.0-Mac-x64.zip</span>
                <span>~99.7 MB</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                  INTEL
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-3">
                Unzip, drag “FXM Trade Keeper” to Applications, then on first
                launch right-click the app and choose “Open”.
              </p>
            </div>
            <a
              href="https://drive.usercontent.google.com/download?id=1qn2AVBbc-osvtR4meZJInjjBnr09SAKS&export=download&confirm=t&uuid=1qn2AVBbc-osvtR4meZJInjjBnr09SAKS"
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => trackDownload("macOS-x64-ZIP")}
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap relative z-10"
            >
              <span className="material-symbols-outlined">download</span>
              Download for Mac (Intel)
            </a>
          </div>
        </div>

        {/* Mac Installer — Apple Silicon */}
        <div
          id="mac-arm"
          className="bg-surface border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fxm-navy/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  memory
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  macOS Installer — Apple Silicon
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                Native build for M-series (M1/M2/M3 and newer) Macs.
              </p>
              <div className="flex flex-wrap gap-4 font-label-mono text-label-mono text-text-dimmed">
                <span>FXM-TradeKeeper-2.0.0-Mac-arm64.zip</span>
                <span>~95.1 MB</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                  NEW
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-3">
                Unzip, drag “FXM Trade Keeper” to Applications, then on first
                launch right-click the app and choose “Open”.
              </p>
            </div>
            <a
              href="https://drive.usercontent.google.com/download?id=1NJx20e5NZaJy3Wff1jftFZH9x-HLzaaj&export=download&confirm=t&uuid=1NJx20e5NZaJy3Wff1jftFZH9x-HLzaaj"
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => trackDownload("macOS-arm64-ZIP")}
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap relative z-10"
            >
              <span className="material-symbols-outlined">download</span>
              Download for Mac (M-series)
            </a>
          </div>
        </div>

        {/* Mac Install Guide */}
        <div className="bg-surface border border-surface-stroke rounded-xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-fxm-navy/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  menu_book
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Mac Setup Guide (PDF)
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                Simple, non-technical steps to install and open FXM Trade
                Keeper on your Mac, including the “unidentified developer”
                step.
              </p>
              <div className="flex flex-wrap gap-4 font-label-mono text-label-mono text-text-dimmed">
                <span>FXM-Trade-Keeper-Mac-Install-Guide.pdf</span>
                <span>PDF</span>
              </div>
            </div>
            <a
              href="/downloads/FXM-Trade-Keeper-Mac-Install-Guide.pdf"
              download
              className="bg-transparent border border-surface-stroke text-on-surface font-headline-md text-base px-8 py-4 rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2 whitespace-nowrap relative z-10"
            >
              <span className="material-symbols-outlined">download</span>
              Download Guide
            </a>
          </div>
        </div>
      </div>

      {/* Release Info Sidebar */}
      <div className="lg:col-span-4 flex flex-col gap-gutter">
        {/* Release Info */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h4 className="font-headline-md text-base text-on-surface mb-4">
            Release Information
          </h4>
          <div className="space-y-3">
            {[
              { label: "Version", value: "2.0.0" },
              { label: "Release Date", value: "August 26, 2026" },
              { label: "Platform", value: "Windows · macOS · Android · iPhone" },
              { label: "Windows Arch", value: "x64" },
              { label: "Mac Arch", value: "Intel x64 + Apple Silicon (M-series)" },
              { label: "Price", value: "Free" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <span className="font-body-md text-body-md text-text-dimmed">
                  {item.label}
                </span>
                <span className="font-label-mono text-label-mono text-on-surface">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SHA-256 Checksums */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h4 className="font-headline-md text-base text-on-surface mb-4">
            SHA-256 Checksums
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-body-md text-body-md text-text-dimmed">
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
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-body-md text-body-md text-text-dimmed">
                  Portable
                </span>
                <button
                  onClick={() => copyToClipboard(portableSha, "portable")}
                  className="text-primary hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedPortable ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
              <code className="font-mono text-[11px] text-text-dimmed break-all block">
                {portableSha}
              </code>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-body-md text-body-md text-text-dimmed">
                  Mac (Intel, ZIP)
                </span>
                <button
                  onClick={() => copyToClipboard(macIntelSha, "macIntel")}
                  className="text-primary hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedMacIntel ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
              <code className="font-mono text-[11px] text-text-dimmed break-all block">
                {macIntelSha}
              </code>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-body-md text-body-md text-text-dimmed">
                  Mac (Apple Silicon, ZIP)
                </span>
                <button
                  onClick={() => copyToClipboard(macArmSha, "macArm")}
                  className="text-primary hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedMacArm ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
              <code className="font-mono text-[11px] text-text-dimmed break-all block">
                {macArmSha}
              </code>
            </div>
          </div>
        </div>

        {/* Quick Setup */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h4 className="font-headline-md text-base text-on-surface mb-4">
            Quick Setup
          </h4>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Open",
                desc: "Web app — nothing to download",
              },
              {
                step: "2",
                title: "Install",
                desc: "One click to pin to your device",
              },
              {
                step: "3",
                title: "Journal",
                desc: "Start tracking instantly, even offline",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-label-mono text-label-mono flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-body-md text-body-md text-on-surface font-medium">
                    {item.title}
                  </div>
                  <div className="font-body-md text-body-md text-text-dimmed text-sm">
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
