"use client";

import { useSyncExternalStore } from "react";
import { APP_URL } from "@/lib/site";

type DeviceKey = "windows" | "macos" | "android" | "ios";

type Device = {
  key: DeviceKey;
  label: string;
  icon: string;
};

type InstallStep = {
  text: string;
};

function detectDevice(): Device | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/ipad|iphone|ipod/i.test(ua))
    return { key: "ios", label: "iPhone / iPad (iOS)", icon: "phone_iphone" };
  if (/android/i.test(ua))
    return { key: "android", label: "Android", icon: "android" };
  if (/windows/i.test(ua))
    return { key: "windows", label: "Windows", icon: "window" };
  if (/mac os/i.test(ua))
    return { key: "macos", label: "macOS", icon: "laptop_mac" };
  return null;
}

const INSTALL_STEPS: Record<DeviceKey, InstallStep[]> = {
  windows: [
    {
      text: `Open the app below in Google Chrome or Microsoft Edge.`,
    },
    {
      text: `Click the install icon at the right end of the address bar, then choose "Install".`,
    },
    {
      text: `A shortcut appears in your Start menu and taskbar — open it like any app, even offline.`,
    },
  ],
  macos: [
    {
      text: `Open the app below in Safari, Chrome or Edge.`,
    },
    {
      text: `Safari: click the Share button and choose "Add to Dock". Chrome/Edge: click the install icon in the address bar.`,
    },
    {
      text: `The app launches in its own window with an icon on your Dock — even when offline.`,
    },
  ],
  android: [
    {
      text: `Open the app below in Chrome on your phone or tablet.`,
    },
    {
      text: `Tap the ⋮ menu (top-right) and choose "Install app" (or "Add to Home screen").`,
    },
    {
      text: `The app is installed with an icon on your home screen — no Google Play needed, and it works offline.`,
    },
  ],
  ios: [
    {
      text: `Open the app below in Safari on your iPhone or iPad.`,
    },
    {
      text: `Tap the Share button (square with an up arrow) and choose "Add to Home Screen", then "Add".`,
    },
    {
      text: `The app appears on your Home Screen like a normal app — no App Store needed, works offline.`,
    },
  ],
};

const PLATFORMS = [
  { icon: "window", label: "Windows" },
  { icon: "laptop_mac", label: "macOS" },
  { icon: "android", label: "Android" },
  { icon: "phone_iphone", label: "iPhone" },
];

const emptySubscribe = () => () => {};

let deviceCache: Device | null = null;
let deviceCached = false;

function getClientSnapshot(): Device | null {
  if (!deviceCached) {
    deviceCached = true;
    if (typeof navigator !== "undefined") deviceCache = detectDevice();
  }
  return deviceCache;
}

function getServerSnapshot(): null {
  return null;
}

function useDeviceDetect(): Device | null {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
}

export default function WebAppCard() {
  const device = useDeviceDetect();

  const steps =
    INSTALL_STEPS[device?.key ?? "windows"] ?? INSTALL_STEPS.windows;

  const platform =
    device?.key === "android" || device?.key === "ios"
      ? "PWA-Android"
      : "PWA-WebApp";

  const trackOpen = () => {
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
    <div className="lg:col-span-12 bg-surface border border-primary/30 rounded-xl p-8 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: install steps */}
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="material-symbols-outlined text-primary text-[28px]">
              install_desktop
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Install for Free — No Downloads, No Warnings
            </h3>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-label-caps uppercase">
              Recommended
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            The web app installs directly from the internet like a normal
            application with an icon, its own window, and full offline access.
            No files to download, no security warnings, no account required.
            Your data stays on your device.
          </p>

          <div
            className={`flex items-center gap-2 font-label-mono text-label-mono mb-5 ${
              device
                ? "text-on-surface"
                : "text-text-dimmed"
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-primary">
              {device ? device.icon : "devices"}
            </span>
            {device
              ? `Optimized for your device: ${device.label}`
              : "Detecting your device…"}
          </div>

          <ol className="space-y-3 mb-6">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-label-mono text-label-mono flex-shrink-0">
                  {i + 1}
                </div>
                <div className="font-body-md text-body-md text-on-surface-variant">
                  {step.text}
                </div>
              </li>
            ))}
          </ol>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackOpen}
            className="inline-flex bg-primary text-on-primary font-headline-md text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            Open the Free Web App
          </a>
          <p className="font-label-mono text-label-mono text-text-dimmed text-xs mt-3">
            {APP_URL}
          </p>
        </div>

        {/* Right: platform matrix */}
        <div className="flex flex-col lg:justify-center">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-3">
            Works on every device
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {PLATFORMS.map((p) => (
              <div
                key={p.label}
                className="bg-surface-container border border-surface-stroke rounded-lg px-4 py-3 flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-primary text-[22px]">
                  {p.icon}
                </span>
                <div className="flex-1">
                  <div className="font-body-md text-body-md text-on-surface">
                    {p.label}
                  </div>
                  <div className="flex items-center gap-1 text-data-up font-label-mono text-label-mono text-xs">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Free + offline
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body-md text-body-md text-text-dimmed text-sm mt-4">
            Works offline. Backups, export and a data journal are built in as
            standard — no account, no cloud, no subscriptions.
          </p>
        </div>
      </div>
    </div>
  );
}