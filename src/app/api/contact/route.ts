import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, category, subject, message } = body;

  // TODO: Store in database
  console.log("Contact message:", { name, email, category, subject });

  return NextResponse.json({ success: true, message: "Message received" });
}
