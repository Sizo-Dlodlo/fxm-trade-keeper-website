import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "FXM Trade Keeper Terms of Use.",
};

export default function TermsPage() {
  return (
    <div className="w-full pb-24 px-4 md:px-margin-desktop max-w-4xl mx-auto py-16">
      <h1 className="font-display text-display-lg text-on-surface mb-8">
        Terms of Use
      </h1>
      <p className="font-mono text-label-mono text-text-dimmed mb-8">
        Effective Date: August 26, 2026
      </p>
      <div className="space-y-8 font-body text-body-md text-on-surface-variant">
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            1. Acceptance
          </h2>
          <p>
            By downloading or using FXM Trade Keeper, you agree to these terms.
            FXM Trade Keeper is provided free of charge for personal and
            commercial use.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            2. Use License
          </h2>
          <p>
            FXM Trade Keeper is free to download and use. You may install it on
            multiple personal computers. You may not redistribute, sell, or
            modify the application for commercial resale.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            3. Disclaimer
          </h2>
          <p>
            FXM Trade Keeper is a journaling and analytics tool. It is not
            financial advice. Trading involves risk of loss. The application does
            not guarantee trading success or profits.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            4. Limitation of Liability
          </h2>
          <p>
            FX Momentum is not liable for any trading losses, data loss, or
            damages arising from the use of FXM Trade Keeper. Users are
            responsible for maintaining their own backups.
          </p>
        </section>
      </div>
    </div>
  );
}
