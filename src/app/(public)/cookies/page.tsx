import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "FXM Trade Keeper Cookie Policy.",
};

export default function CookiesPage() {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
        Cookie Policy
      </h1>
      <p className="font-label-mono text-label-mono text-text-dimmed mb-8">
        Effective Date: August 26, 2026
      </p>
      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            What Are Cookies
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit
            our website. They help us provide a better experience.
          </p>
        </section>
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Types of Cookies We Use
          </h2>
          <ul className="list-none space-y-3">
            <li>
              <strong className="text-on-surface">Necessary:</strong> Required
              for the website to function properly.
            </li>
            <li>
              <strong className="text-on-surface">Analytics:</strong> Help us
              understand how visitors use the website (opt-in only).
            </li>
            <li>
              <strong className="text-on-surface">Advertising:</strong> Used to
              deliver relevant advertisements (opt-in only).
            </li>
          </ul>
        </section>
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Managing Cookies
          </h2>
          <p>
            You can manage your cookie preferences through the privacy settings
            in your browser or through our cookie consent banner.
          </p>
        </section>
      </div>
    </main>
  );
}
