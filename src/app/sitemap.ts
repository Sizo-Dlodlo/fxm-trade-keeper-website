import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fxmtradekeeper.com";

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

  return publicPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));
}
