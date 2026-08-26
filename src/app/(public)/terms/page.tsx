import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "FXM Trade Keeper Terms of Use.",
};

export default function TermsPage() {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">
        Terms of Use
      </h1>
      <p className="font-label-mono text-label-mono text-text-dimmed mb-8">
        Effective Date: August 26, 2026
      </p>
      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            1. Acceptance
          </h2>
          <p>
            By downloading or using FXM Trade Keeper, you agree to these terms.
            FXM Trade Keeper is provided free of charge for personal and
            commercial use.
          </p>
        </section>
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            2. Use License
          </h2>
          <p>
            FXM Trade Keeper is free to download and use. You may install it on
            multiple personal computers. You may not redistribute, sell, or
            modify the application for commercial resale.
          </p>
        </section>
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            3. Disclaimer
          </h2>
          <p>
            FXM Trade Keeper is a journaling and analytics tool. It is not
            financial advice. Trading involves risk of loss. The application does
            not guarantee trading success or profits.
          </p>
        </section>
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            4. Limitation of Liability
          </h2>
          <p>
            FX Momentum is not liable for any trading losses, data loss, or
            damages arising from the use of FXM Trade Keeper. Users are
            responsible for maintaining their own backups.
          </p>
        </section>
      </div>
    </main>
  );
}
