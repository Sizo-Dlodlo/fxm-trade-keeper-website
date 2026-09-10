import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["guide", "blog"];

function normalize(input: string): string {
  return input.trim().replace(/[\r\n]+/g, " ").replace(/\s+/g, " ");
}

function isLikelySpam(body: string): boolean {
  if (/https?:\/\/|www\./i.test(body)) return true;
  if (body.split(/\s+/).length > 300) return true;
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get("type");
    const contentSlug = searchParams.get("slug");

    if (!contentType || !contentSlug || !ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ comments: [] });
    }

    const comments = await db.comment.findMany({
      where: { contentType, contentSlug, status: "approved" },
      orderBy: { createdAt: "asc" },
      take: 200,
      select: {
        id: true,
        contentType: true,
        contentSlug: true,
        authorName: true,
        body: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentType, contentSlug, authorName, authorEmail, commentBody } = body;

    if (!contentType || !ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: "Invalid comment type" }, { status: 400 });
    }
    if (!contentSlug || !authorName || !commentBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const name = normalize(String(authorName)).slice(0, 80);
    const text = normalize(String(commentBody));
    const email = String(authorEmail || "").trim().slice(0, 254);
    const slug = String(contentSlug).trim().slice(0, 200);

    if (!name || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (text.length > 2000) {
      return NextResponse.json({ error: "Comment is too long" }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (isLikelySpam(text)) {
      // Silently reject obviously-spam submissions.
      return NextResponse.json({ success: true, moderated: true });
    }

    // Basic rate limiting: block repeat spam from the same identity.
    const recent = await db.comment.count({
      where: {
        authorEmail: email || undefined,
        authorName: name,
        createdAt: { gte: new Date(Date.now() - 60_000) },
      },
    });

    if (recent >= 3) {
      return NextResponse.json(
        { error: "You are commenting too quickly. Please slow down." },
        { status: 429 }
      );
    }

    const comment = await db.comment.create({
      data: {
        contentType,
        contentSlug: slug,
        authorName: name,
        authorEmail: email || null,
        body: text,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your comment has been submitted for moderation.",
      id: comment.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
