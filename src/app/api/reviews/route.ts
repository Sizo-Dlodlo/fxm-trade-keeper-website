import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rating, title, body: reviewBody, displayName, applicationVersion, platform } = body;

    if (!rating || !title || !displayName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        rating: parseInt(rating),
        title,
        body: reviewBody || null,
        displayName,
        applicationVersion: applicationVersion || null,
        platform: platform || null,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted for moderation",
      id: review.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}
