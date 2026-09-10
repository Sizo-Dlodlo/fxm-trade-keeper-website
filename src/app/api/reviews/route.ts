import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
);

async function isAdmin(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get("session")?.value;
  if (!cookie) return false;
  try {
    await jwtVerify(cookie, secret);
    return true;
  } catch {
    return false;
  }
}

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const isAdminRequest = await isAdmin(request);

    const reviews = await db.review.findMany({
      where:
        !isAdminRequest || !status
          ? { status: "approved" }
          : status === "all"
          ? undefined
          : { status },
      orderBy: { createdAt: "desc" },
      take: isAdminRequest ? 500 : 50,
    });

    if (isAdminRequest && (status === "all" || status)) {
      return NextResponse.json({ reviews });
    }

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await request.json();
  if (!id || !["approved", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const review = await db.review.update({ where: { id }, data: { status } });
  return NextResponse.json({ success: true, review });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  await db.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
