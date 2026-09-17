import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const noCache = [
      { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
      { key: "Pragma", value: "no-cache" },
      { key: "Expires", value: "0" },
      { key: "Surrogate-Control", value: "no-store" },
    ];
    return [
        {
          source: "/admin/:path*",
          headers: noCache,
        },
        {
          source: "/api/(leads|reviews|comments|releases|telemetry|settings|notifications)(/:path*)?",
          headers: noCache,
        },
        {
          source: "/(.*)",
          headers: [
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Referrer-Policy", value: "origin-when-cross-origin" },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()",
            },
            {
              key: "Content-Security-Policy",
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "img-src 'self' data: blob: https://drive.usercontent.google.com https://www.google-analytics.com",
                "font-src 'self' data: https://fonts.gstatic.com",
                "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
                "frame-ancestors 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "object-src 'none'",
                "upgrade-insecure-requests",
              ].join("; "),
            },
          ],
        },
    ];
  },
};

export default nextConfig;
