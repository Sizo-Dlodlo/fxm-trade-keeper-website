"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/releases", label: "Releases", icon: "deployed_code" },
  { href: "/admin/reviews", label: "Reviews", icon: "star" },
  { href: "/admin/analytics", label: "Analytics", icon: "analytics" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-surface border-b border-surface-stroke/50 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            admin_panel_settings
          </span>
          <span className="font-headline-md text-base text-on-surface font-bold">
            FXM Admin
          </span>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById("admin-mobile-nav");
            el?.classList.toggle("hidden");
          }}
          className="text-on-surface"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            menu
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="admin-mobile-nav"
        className="hidden md:hidden bg-surface border-b border-surface-stroke/50 px-4 py-4 space-y-2"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 py-3 px-4 rounded font-body-md text-body-md ${
              pathname === item.href
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 py-3 px-4 rounded font-body-md text-body-md text-data-down hover:bg-data-down/10 w-full"
        >
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-surface-stroke/50 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-surface-stroke/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              admin_panel_settings
            </span>
            <div>
              <span className="font-headline-md text-base text-on-surface font-bold block">
                FXM Admin
              </span>
              <span className="font-label-mono text-[10px] text-text-dimmed uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 py-2.5 px-4 rounded transition-colors font-body-md text-body-md ${
                pathname === item.href
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-stroke/50 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 py-2.5 px-4 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">visibility</span>
            View Site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 py-2.5 px-4 rounded text-data-down hover:bg-data-down/10 transition-colors font-body-md text-body-md w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
