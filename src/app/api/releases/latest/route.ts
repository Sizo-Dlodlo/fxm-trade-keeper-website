import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: "2.0.0",
    stable: true,
    releaseDate: "2026-08-26T04:58:15.948Z",
    installerUrl: "/downloads/FXM-TradeKeeper-Setup-2.0.0.exe",
    portableUrl: "/downloads/FXM-TradeKeeper-2.0.0-Portable.exe",
    installerSize: 87621791,
    portableSize: 87391382,
    sha256: {
      installer: "UX5u7/m7YmYTz340ur+GjkwrNGyFl+cBOLYsNqtqtBn/8FAh6mL0983S+vFA/Fz4MCVvmvz2SmLuhZig3X/lww==",
      portable: "",
    },
    platform: "Windows",
    architecture: "x64",
  });
}
