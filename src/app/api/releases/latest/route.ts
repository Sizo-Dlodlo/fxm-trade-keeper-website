import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const release = await db.release.findFirst({
      orderBy: { releaseDate: "desc" },
    });

    if (!release) {
      return NextResponse.json(
        { error: "No releases found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      version: release.version,
      stable: release.stable,
      releaseDate: release.releaseDate.toISOString(),
      installerUrl: release.installerUrl,
      portableUrl: release.portableUrl,
      installerSize: release.installerSize,
      portableSize: release.portableSize,
      sha256: release.sha256,
      platform: release.platform,
      architecture: release.architecture,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch release" },
      { status: 500 }
    );
  }
}
