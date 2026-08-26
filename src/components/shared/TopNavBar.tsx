"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/guides", label: "Guides" },
  { href: "/reviews", label: "Reviews" },
  { href: "/community", label: "Community" },
  { href: "/resources", label: "Resources" },
];

export default function TopNavBar({ activePage }: { activePage?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full top-0 sticky bg-surface border-b border-surface-stroke/50 z-50">
      <div className="flex justify-between items-center h-20 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-headline-md font-bold text-primary">
            FXM Trade Keeper
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`h-full flex items-center font-body text-body-md transition-colors duration-200 ${
                activePage === link.href
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/support-the-project"
            className="text-on-surface-variant hover:text-primary font-medium transition-colors duration-200 font-body text-body-md"
          >
            Support
          </Link>
          <Link
            href="/download"
            className="bg-primary text-on-primary px-6 py-2.5 rounded hover:brightness-110 font-medium active:scale-95 transition-all font-body text-body-md"
          >
            Download Free
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-surface-stroke/50 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 rounded font-body text-body-md transition-colors ${
                activePage === link.href
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-surface-stroke/50 pt-4 mt-4 space-y-2">
            <Link
              href="/support-the-project"
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body text-body-md"
            >
              Support
            </Link>
            <Link
              href="/download"
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded bg-primary text-on-primary text-center font-medium font-body text-body-md"
            >
              Download Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
