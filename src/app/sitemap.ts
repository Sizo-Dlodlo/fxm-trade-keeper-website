import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { posts } from "@/lib/posts";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://fxm-trade-keeper-website.vercel.app";

  try {
    const setting = await db.setting.findUnique({
      where: { key: "site_url" },
    });
    if (setting?.value) baseUrl = setting.value.replace(/\/+$/, "");
  } catch {
    // fall back to env/default if DB is unavailable
  }

  const publicPages = [
    "",
    "/features",
    "/download",
    "/screenshots",
    "/reviews",
    "/community",
    "/guides",
    "/blog",
    "/resources",
    "/releases",
    "/support",
    "/about",
    "/contact",
    "/support-the-project",
    "/privacy",
    "/terms",
    "/cookies",
    "/affiliate-disclosure",
    "/disclaimer",
  ];

  const guidePages = guides.map((g) => `/guides/${g.slug}`);
  const blogPages = posts.map((p) => `/blog/${p.slug}`);

  return [...publicPages, ...guidePages, ...blogPages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));
}

