import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom =
  process.env.RESEND_FROM_EMAIL || "FXM Trade Keeper <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limit = checkRateLimit("contact", ip);
    if (limit.blocked) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, category, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const record = await db.contactMessage.create({
      data: {
        name,
        email,
        category: category || null,
        subject,
        message,
      },
    });

    // Notify the site owner by email (best-effort; never fails the request)
    let toEmail = "";
    try {
      const setting = await db.setting.findUnique({
        where: { key: "support_email" },
      });
      toEmail = setting?.value || "";
    } catch {
      toEmail = "";
    }

    if (resendApiKey && toEmail) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: resendFrom,
          to: [toEmail],
          subject: `[FXM Contact] ${subject}`,
          html: `
            <h2>New contact message â€” ${category || "General"}</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Category:</strong> ${escapeHtml(category || "General")}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          `,
          replyTo: record.email,
        });
      } catch (emailError) {
        console.error("Contact email notification failed:", emailError);
      }
    }

    return NextResponse.json({ success: true, message: "Message received" });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
