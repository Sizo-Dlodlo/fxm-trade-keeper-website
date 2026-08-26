"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/guides", label: "Guides" },
  { href: "/reviews", label: "Reviews" },
];

export default function TopNavBar() {
  const pathname = usePathname();

  return (
    <header className="w-full top-0 sticky bg-surface border-b border-surface-stroke/50 z-50">
      <div className="flex justify-between items-center h-20 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display-lg text-headline-md font-bold text-primary">
            FXM Trade Keeper
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`h-full flex items-center font-body-md text-body-md transition-colors duration-200 ${
                pathname === link.href
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
            className="flex items-center gap-2 border border-primary text-primary font-body-md text-body-md font-bold px-5 py-2.5 rounded hover:bg-primary/10 active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            Support Us
          </Link>
          <Link
            href="/download"
            className="bg-primary text-on-primary font-body-md text-body-md font-bold px-6 py-2.5 rounded hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            Download Free
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-on-surface"
          onClick={() => {
            const el = document.getElementById("mobile-nav");
            el?.classList.toggle("hidden");
          }}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            menu
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-nav" className="hidden md:hidden bg-surface border-t border-surface-stroke/50 px-4 py-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block py-3 px-4 rounded font-body-md text-body-md transition-colors ${
              pathname === link.href
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
            className="flex items-center justify-center gap-2 py-3 px-4 rounded border border-primary text-primary font-body-md text-body-md font-bold hover:bg-primary/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            Support the Project
          </Link>
          <Link
            href="/download"
            className="block py-3 px-4 rounded bg-primary text-on-primary text-center font-bold font-body-md text-body-md"
          >
            Download Free
          </Link>
        </div>
      </div>
    </header>
  );
}
