import type { Metadata } from "next";
import Script from "next/script";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { db } from "@/lib/db";
import "./globals.css";

const envGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const envAdsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const adsenseVerification = process.env.NEXT_PUBLIC_ADSENSE_VERIFICATION;

export const dynamic = "force-dynamic";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "FXM Trade Keeper - Free Professional Trading Journal",
    template: "%s | FXM Trade Keeper",
  },
  description:
    "A free professional trading journal designed to help traders record, analyze and improve their trading performance. Your data stays local. No subscription required.",
  keywords: [
    "trading journal",
    "forex journal",
    "trade tracker",
    "MT5 journal",
    "MT4 journal",
    "prop firm journal",
    "trading analytics",
    "risk management",
    "free trading journal",
  ],
  authors: [{ name: "FX Momentum" }],
  creator: "FX Momentum",
  metadataBase: new URL("https://fxm-trade-keeper-website.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FXM Trade Keeper",
    title: "FXM Trade Keeper - Free Professional Trading Journal",
    description:
      "Journal. Analyze. Improve. A free professional trading journal for serious traders.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FXM Trade Keeper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FXM Trade Keeper - Free Professional Trading Journal",
    description:
      "Journal. Analyze. Improve. A free professional trading journal for serious traders.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let dbGaId = "";
  let dbAdsenseClient = "";
  let advertise = true;
  try {
    const rows = await db.setting.findMany();
    const settings: Record<string, string> = {};
    for (const row of rows) settings[row.key] = row.value;
    dbGaId = settings["ga_measurement_id"] ?? "";
    dbAdsenseClient = settings["adsense_client_id"] ?? "";
    advertise = settings["advertising_enabled"] === "true";
  } catch {
    // fall back to env vars if DB is unavailable
  }

  const gaId = dbGaId || envGaId;
  const adsenseClient = advertise && (dbAdsenseClient || envAdsenseClient);

  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="4XDFh01SnGiaiyRjqmrDtj4WOiLrLKCLv9Qh90Sx48s"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {adsenseClient && (
          <meta
            name="google-adsense-account"
            content={adsenseClient}
          />
        )}
        {adsenseVerification && (
          <meta
            name="google-site-verification"
            content={adsenseVerification}
          />
        )}
      </head>
      <body className="bg-background text-on-surface font-body antialiased overflow-x-hidden min-h-screen flex flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {adsenseClient && (
          <Script
            id="adsense-init"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
        {children}
      </body>
    </html>
  );
}
