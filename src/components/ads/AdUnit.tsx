"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

type AdUnitProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
};

export default function AdUnit({
  slot,
  format = "auto",
  className = "",
}: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsenseClient || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not fully loaded yet; ignore.
    }
  }, []);

  if (!adsenseClient) return null;

  return (
    <div
      className={`w-full flex justify-center my-6 overflow-hidden ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot || ""}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
