import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { rating, title, body: reviewBody, displayName, applicationVersion, platform } = body;

  // TODO: Store in database with moderation status
  console.log("Review submitted:", { rating, title, displayName });

  return NextResponse.json({ success: true, message: "Review submitted for moderation" });
}

export async function GET() {
  // TODO: Fetch approved reviews from database
  return NextResponse.json({ reviews: [] });
}
