import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [unreadMessages, pendingReviews, pendingComments] =
      await Promise.all([
        db.contactMessage.count({ where: { read: false } }),
        db.review.count({ where: { status: "pending" } }),
        db.comment.count({ where: { status: "pending" } }),
      ]);

    return NextResponse.json({ unreadMessages, pendingReviews, pendingComments });
  } catch {
    return NextResponse.json({
      unreadMessages: 0,
      pendingReviews: 0,
      pendingComments: 0,
    });
  }
}
