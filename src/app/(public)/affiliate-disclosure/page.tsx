import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "FXM Trade Keeper Affiliate Disclosure.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="w-full pb-24 px-4 md:px-margin-desktop max-w-4xl mx-auto py-16">
      <h1 className="font-display text-display-lg text-on-surface mb-8">
        Affiliate Disclosure
      </h1>
      <p className="font-mono text-label-mono text-text-dimmed mb-8">
        Effective Date: August 26, 2026
      </p>
      <div className="space-y-8 font-body text-body-md text-on-surface-variant">
        <section>
          <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
            <p className="text-on-surface font-medium">
              Some links on this website may be affiliate links. If you purchase
              through them, FXM may receive a commission at no additional cost
              to you.
            </p>
          </div>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            What Are Affiliate Links
          </h2>
          <p>
            Affiliate links are special URLs that contain a tracking code. When
            you click on these links and make a purchase, we may receive a small
            commission from the seller.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            Our Commitment
          </h2>
          <p>
            We only recommend products and services that we genuinely believe
            provide value to traders. Affiliate relationships do not influence
            our content or recommendations.
          </p>
        </section>
      </div>
    </div>
  );
}
