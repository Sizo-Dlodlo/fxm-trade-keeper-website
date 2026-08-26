import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  // TODO: Store in database
  console.log("Newsletter signup:", { email });

  return NextResponse.json({ success: true, message: "Subscribed successfully" });
}
