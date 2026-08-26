import Link from "next/link";

const footerLinks = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/download", label: "Download" },
    { href: "/reviews", label: "Reviews" },
    { href: "/screenshots", label: "Screenshots" },
    { href: "/releases", label: "Release Notes" },
  ],
  resources: [
    { href: "/guides", label: "Guides" },
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Trader Resources" },
    { href: "/community", label: "Community" },
    { href: "/support", label: "Support" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/support-the-project", label: "Support the Project" },
    { href: "/affiliate-disclosure", label: "Affiliates" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 bg-surface-container-lowest border-t border-surface-stroke/30">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter px-4 md:px-margin-desktop max-w-container-max mx-auto mb-12">
        {/* Brand Column */}
        <div className="col-span-2 flex flex-col gap-4">
          <span className="font-display-lg-mobile md:font-display-lg text-headline-md font-bold text-primary">
            FXM Trade Keeper
          </span>
          <p className="font-body-md text-body-md text-text-dimmed max-w-xs mt-2">
            Professional, local-first trading journal software built for
            disciplined traders.
          </p>
          <Link
            href="/support-the-project"
            className="mt-4 bg-transparent border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors self-start font-body-md text-body-md font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            Support the Project
          </Link>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline-md text-base text-on-surface mb-2">
            Product
          </h4>
          {footerLinks.product.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-text-dimmed hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline-md text-base text-on-surface mb-2">
            Resources
          </h4>
          {footerLinks.resources.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-text-dimmed hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline-md text-base text-on-surface mb-2">
            Company
          </h4>
          {footerLinks.company.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-text-dimmed hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline-md text-base text-on-surface mb-2">
            Legal
          </h4>
          {footerLinks.legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-text-dimmed hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto border-t border-surface-stroke/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-body-md text-text-dimmed opacity-80">
          &copy; {new Date().getFullYear()} FX Momentum. All rights reserved.
          FXM Trade Keeper is a product of FX Momentum.
        </p>
      </div>
    </footer>
  );
}
