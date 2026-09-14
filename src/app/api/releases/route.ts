import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = await isAdmin(request);
    const latest = searchParams.get("latest");

    if (latest === "true") {
      const release = await db.release.findFirst({
        orderBy: { releaseDate: "desc" },
      });
      if (!release) {
        return NextResponse.json(
          { error: "No releases found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ release });
    }

    if (!admin) {
      return NextResponse.json({ releases: [] });
    }

    const releases = await db.release.findMany({
      orderBy: { releaseDate: "desc" },
      take: 200,
    });
    return NextResponse.json({ releases });
  } catch {
    return NextResponse.json({ releases: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      version,
      stable,
      releaseDate,
      installerUrl,
      portableUrl,
      installerSize,
      portableSize,
      installerSha512,
      portableSha512,
      macUrl,
      macSize,
      macSha256,
      macArmUrl,
      macArmSize,
      macArmSha256,
      guideUrl,
      pwaUrl,
      changelog,
    } = body;

    if (!version) {
      return NextResponse.json(
        { error: "Version is required" },
        { status: 400 }
      );
    }

    const release = await db.release.create({
      data: {
        version: String(version).replace(/^v/i, ""),
        stable: Boolean(stable),
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        installerUrl: installerUrl || null,
        portableUrl: portableUrl || null,
        installerSize: installerSize ? parseInt(installerSize) : null,
        portableSize: portableSize ? parseInt(portableSize) : null,
        installerSha512: installerSha512 || null,
        portableSha512: portableSha512 || null,
        macUrl: macUrl || null,
        macSize: macSize ? parseInt(macSize) : null,
        macSha256: macSha256 || null,
        macArmUrl: macArmUrl || null,
        macArmSize: macArmSize ? parseInt(macArmSize) : null,
        macArmSha256: macArmSha256 || null,
        guideUrl: guideUrl || null,
        pwaUrl: pwaUrl || null,
        changelog: changelog || null,
      },
    });

    return NextResponse.json({ success: true, release });
  } catch (error) {
    console.error("Create release error:", error);
    return NextResponse.json(
      { error: "Failed to create release" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const patch: Record<string, unknown> = {};
    if (data.version !== undefined)
      patch.version = String(data.version).replace(/^v/i, "");
    if (data.stable !== undefined) patch.stable = Boolean(data.stable);
    if (data.releaseDate !== undefined)
      patch.releaseDate = new Date(data.releaseDate);
    if (data.installerUrl !== undefined) patch.installerUrl = data.installerUrl;
    if (data.portableUrl !== undefined) patch.portableUrl = data.portableUrl;
    if (data.installerSize !== undefined)
      patch.installerSize = data.installerSize ? parseInt(data.installerSize) : null;
    if (data.portableSize !== undefined)
      patch.portableSize = data.portableSize ? parseInt(data.portableSize) : null;
    if (data.installerSha512 !== undefined)
      patch.installerSha512 = data.installerSha512;
    if (data.portableSha512 !== undefined)
      patch.portableSha512 = data.portableSha512;
    if (data.macUrl !== undefined) patch.macUrl = data.macUrl;
    if (data.macSize !== undefined)
      patch.macSize = data.macSize ? parseInt(data.macSize) : null;
    if (data.macSha256 !== undefined) patch.macSha256 = data.macSha256;
    if (data.macArmUrl !== undefined) patch.macArmUrl = data.macArmUrl;
    if (data.macArmSize !== undefined)
      patch.macArmSize = data.macArmSize
        ? parseInt(data.macArmSize)
        : null;
    if (data.macArmSha256 !== undefined) patch.macArmSha256 = data.macArmSha256;
    if (data.guideUrl !== undefined) patch.guideUrl = data.guideUrl;
    if (data.pwaUrl !== undefined) patch.pwaUrl = data.pwaUrl;
    if (data.changelog !== undefined) patch.changelog = data.changelog;

    const release = await db.release.update({ where: { id }, data: patch });
    return NextResponse.json({ success: true, release });
  } catch (error) {
    console.error("Update release error:", error);
    return NextResponse.json(
      { error: "Failed to update release" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    await db.release.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete release error:", error);
    return NextResponse.json(
      { error: "Failed to delete release" },
      { status: 500 }
    );
  }
}
