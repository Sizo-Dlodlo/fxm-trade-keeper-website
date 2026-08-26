import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { version, platform, source, timestamp } = body;

    if (!version || !platform) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.downloadEvent.create({
      data: {
        version,
        platform,
        source: source || null,
        createdAt: timestamp ? new Date(timestamp) : new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to track download" },
      { status: 500 }
    );
  }
}
