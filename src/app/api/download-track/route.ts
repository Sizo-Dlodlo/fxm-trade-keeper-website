import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { version, platform, source, timestamp } = body;

  // TODO: Store in database
  console.log("Download tracked:", { version, platform, source, timestamp });

  return NextResponse.json({ success: true });
}
