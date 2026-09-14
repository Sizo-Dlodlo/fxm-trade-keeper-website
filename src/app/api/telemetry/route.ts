import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

type TelemetryPayload = {
  installId?: string;
  eventType: string;
  appVersion?: string;
  platform?: string;
  viewName?: string;
  detail?: Record<string, unknown>;
};

const DEFAULT_ALLOWED_ORIGINS = [
  "https://app.fxmtradekeeper.com",
  "https://www.fxmtradekeeper.com",
  "https://fxm-trade-keeper-app.vercel.app",
  "https://fxm-trade-keeper-app-sizodlo-6324.vercel.app",
];

function allowedOrigins(): string[] {
  const fromEnv = process.env.TELEMETRY_ALLOWED_ORIGINS;
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return DEFAULT_ALLOWED_ORIGINS;
}

function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get("origin");
  const allowed = allowedOrigins();
  return {
    "Access-Control-Allow-Origin": origin && allowed.includes(origin) ? origin : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

function sanitizeDetail(detail: unknown): Record<string, unknown> | undefined {
  if (!detail || typeof detail !== "object") return undefined;
  return detail as Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit("telemetry", ip);
    if (limit.blocked) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: corsHeaders(request) }
      );
    }

    const body = await request.json();
    const events: TelemetryPayload[] = Array.isArray(body)
      ? body
      : Array.isArray(body?.events)
        ? body.events
        : [body];

    if (!events.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders(request) }
      );
    }

    const rows = events
      .filter((e) => e && typeof e.eventType === "string" && e.eventType)
      .map((e) => ({
        installId: typeof e.installId === "string" ? e.installId.slice(0, 200) : null,
        eventType: e.eventType.slice(0, 100),
        appVersion: typeof e.appVersion === "string" ? e.appVersion.slice(0, 50) : null,
        platform: typeof e.platform === "string" ? e.platform.slice(0, 50) : null,
        viewName: typeof e.viewName === "string" ? e.viewName.slice(0, 100) : null,
        detail: sanitizeDetail(e.detail) as Prisma.InputJsonValue | undefined,
      }));

    if (!rows.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders(request) }
      );
    }

    await db.telemetryEvent.createMany({ data: rows });

    return NextResponse.json(
      { success: true, count: rows.length },
      { headers: corsHeaders(request) }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to track telemetry" },
      { status: 500, headers: corsHeaders(request) }
    );
  }
}