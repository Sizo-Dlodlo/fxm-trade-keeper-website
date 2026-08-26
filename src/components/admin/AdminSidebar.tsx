"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/releases", label: "Releases", icon: "deployed_code" },
  { href: "/admin/reviews", label: "Reviews", icon: "star" },
  { href: "/admin/analytics", label: "Analytics", icon: "analytics" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-surface border-b border-surface-stroke/50 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
          <span className="font-display text-base text-on-surface font-bold">FXM Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-on-surface"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-surface-stroke/50 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body text-body-md"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-surface-stroke/50 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-surface-stroke/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
            <div>
              <span className="font-display text-base text-on-surface font-bold block">
                FXM Admin
              </span>
              <span className="font-mono text-[10px] text-text-dimmed uppercase tracking-wider">
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
              className="flex items-center gap-3 py-2.5 px-4 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-body text-body-md"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-stroke/50">
          <Link
            href="/"
            className="flex items-center gap-3 py-2.5 px-4 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-body text-body-md"
          >
            <span className="material-symbols-outlined">logout</span>
            View Site
          </Link>
        </div>
      </aside>
    </>
  );
}
