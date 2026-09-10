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
      installerSha512: release.installerSha512,
      portableSha512: release.portableSha512,
      macUrl: release.macUrl,
      macSize: release.macSize,
      macSha256: release.macSha256,
      changelog: release.changelog,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch release" },
      { status: 500 }
    );
  }
}
