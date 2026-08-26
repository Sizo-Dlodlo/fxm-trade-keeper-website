import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://fxmtradekeeper.com"),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased overflow-x-hidden min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
