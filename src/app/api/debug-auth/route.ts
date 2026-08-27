import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await db.user.findUnique({
      where: { email: "admin@fxmtradekeeper.com" },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare("FxM@dm1n2026!", user.password);

    return NextResponse.json({
      userFound: true,
      email: user.email,
      role: user.role,
      passwordValid: valid,
      hashPrefix: user.password.substring(0, 7),
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
