import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "FXM Trade Keeper Privacy Policy. Learn how we protect your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
        Privacy Policy
      </h1>
      <p className="font-label-mono text-label-mono text-text-dimmed mb-8">
        Effective Date: August 26, 2026
      </p>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            1. Introduction
          </h2>
          <p className="mb-4">
            FXM Trade Keeper is a local-first trading journal application. This
            privacy policy explains how we handle data for both the website and
            the desktop application.
          </p>
          <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
            <p className="text-on-surface font-medium">
              Core Principle: Your trade data never leaves your device. FXM Trade
              Keeper stores all journal data locally on your computer. We have
              no access to your trades, notes, screenshots, or any other journal
              content.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            2. Data Ownership
          </h2>
          <p className="mb-4">
            You own all data created within FXM Trade Keeper. We do not:
          </p>
          <ul className="list-none space-y-2">
            {[
              "Access your journal database",
              "Read your trade records",
              "View your screenshots or notes",
              "Sync your data to our servers",
              "Sell or share your trading data",
              "Aggregate identifiable user profiles",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-data-down text-[18px]">
                  close
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            3. Local Storage Architecture
          </h2>
          <p className="mb-4">
            FXM Trade Keeper uses a local SQLite database stored on your
            computer. All data processing happens locally. The application can
            function entirely offline with no internet connection required.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            4. Website Analytics
          </h2>
          <p className="mb-4">
            The FXM Trade Keeper website may collect anonymous, aggregated
            analytics data to help us understand how the website is used. This
            data does not identify individual users and is used solely for
            improving the website experience.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            5. Optional Telemetry
          </h2>
          <p className="mb-4">
            The desktop application may offer optional anonymous telemetry to
            help improve the product. This is entirely opt-in and never includes
            journal content. You can disable telemetry at any time.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            6. Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please contact us
            through our{" "}
            <a href="/contact" className="text-primary hover:brightness-110">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
