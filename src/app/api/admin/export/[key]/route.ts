import { NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { buildCsv, csvFilename, toLocalDate } from "@/lib/export-csv";

export const dynamic = "force-dynamic";

type BuildFn = () => Promise<
  [string[], (string | number | boolean | null)[][]]
>;

const DATASETS: Record<string, { filename: string; build: BuildFn }> = {
  downloads: {
    filename: "downloads",
    build: async () => {
      const rows = await db.downloadEvent.findMany({
        orderBy: { createdAt: "desc" },
      });
      return [
        ["id", "version", "platform", "source", "created_at"],
        rows.map((r) => [
          r.id,
          r.version,
          r.platform,
          r.source || "",
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
  telemetry: {
    filename: "telemetry",
    build: async () => {
      const rows = await db.telemetryEvent.findMany({
        orderBy: { createdAt: "desc" },
      });
      return [
        [
          "id",
          "install_id",
          "event_type",
          "app_version",
          "platform",
          "view_name",
          "detail",
          "created_at",
        ],
        rows.map((r) => [
          r.id,
          r.installId || "",
          r.eventType,
          r.appVersion || "",
          r.platform || "",
          r.viewName || "",
          JSON.stringify(r.detail),
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
  reviews: {
    filename: "reviews",
    build: async () => {
      const rows = await db.review.findMany({
        orderBy: { createdAt: "desc" },
      });
      return [
        [
          "id",
          "rating",
          "title",
          "body",
          "display_name",
          "application_version",
          "platform",
          "status",
          "featured",
          "created_at",
        ],
        rows.map((r) => [
          r.id,
          r.rating,
          r.title,
          r.body || "",
          r.displayName,
          r.applicationVersion || "",
          r.platform || "",
          r.status,
          r.featured ? "yes" : "no",
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
  comments: {
    filename: "comments",
    build: async () => {
      const rows = await db.comment.findMany({
        orderBy: { createdAt: "desc" },
      });
      return [
        [
          "id",
          "content_type",
          "content_slug",
          "author_name",
          "author_email",
          "body",
          "status",
          "created_at",
        ],
        rows.map((r) => [
          r.id,
          r.contentType,
          r.contentSlug,
          r.authorName,
          r.authorEmail || "",
          r.body,
          r.status,
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
  leads: {
    filename: "leads",
    build: async () => {
      const rows = await db.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
      });
      return [
        ["id", "email", "active", "created_at"],
        rows.map((r) => [
          r.id,
          r.email,
          r.active ? "yes" : "no",
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
  messages: {
    filename: "messages",
    build: async () => {
      const rows = await db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      });
      return [
        [
          "id",
          "name",
          "email",
          "category",
          "subject",
          "message",
          "read",
          "replied",
          "created_at",
        ],
        rows.map((r) => [
          r.id,
          r.name,
          r.email,
          r.category || "",
          r.subject,
          r.message,
          r.read ? "yes" : "no",
          r.replied ? "yes" : "no",
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
  releases: {
    filename: "releases",
    build: async () => {
      const rows = await db.release.findMany({
        orderBy: { releaseDate: "desc" },
      });
      return [
        [
          "id",
          "version",
          "stable",
          "release_date",
          "installer_url",
          "installer_size",
          "installer_sha256",
          "portable_url",
          "portable_size",
          "portable_sha256",
          "mac_url",
          "mac_size",
          "mac_sha256",
          "mac_arm_url",
          "mac_arm_size",
          "mac_arm_sha256",
          "guide_url",
          "pwa_url",
          "platform",
          "architecture",
          "changelog",
          "created_at",
        ],
        rows.map((r) => [
          r.id,
          r.version,
          r.stable ? "yes" : "no",
          toLocalDate(r.releaseDate),
          r.installerUrl || "",
          r.installerSize ?? "",
          r.installerSha512 || "",
          r.portableUrl || "",
          r.portableSize ?? "",
          r.portableSha512 || "",
          r.macUrl || "",
          r.macSize ?? "",
          r.macSha256 || "",
          r.macArmUrl || "",
          r.macArmSize ?? "",
          r.macArmSha256 || "",
          r.guideUrl || "",
          r.pwaUrl || "",
          r.platform,
          r.architecture,
          r.changelog || "",
          toLocalDate(r.createdAt),
        ]),
      ];
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!(await isAdmin(request))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { key } = await params;
  const dataset = DATASETS[key];
  if (!dataset) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const [headers, rows] = await dataset.build();
    const csv = buildCsv(headers, rows);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${csvFilename(
          dataset.filename
        )}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(`Export "${key}" error:`, error);
    return new Response("Export failed", { status: 500 });
  }
}