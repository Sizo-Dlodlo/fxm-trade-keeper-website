import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "contact" | "newsletter"

    if (type === "newsletter") {
      const subscribers = await db.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ subscribers });
    }

    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [], subscribers: [] });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, field, value } = body;
    if (!id || !["read", "replied", "active"].includes(field)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (field === "active") {
      const subscriber = await db.newsletterSubscriber.update({
        where: { id },
        data: { active: Boolean(value) },
      });
      return NextResponse.json({ success: true, subscriber });
    }

    const message = await db.contactMessage.update({
      where: { id },
      data: { [field]: Boolean(value) } as Record<string, boolean>,
    });
    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, type } = body;
    if (!id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (type === "newsletter") {
      await db.newsletterSubscriber.delete({ where: { id } });
    } else {
      await db.contactMessage.delete({ where: { id } });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete lead error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
