import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "FXM Trade Keeper Disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <div className="w-full pb-24 px-4 md:px-margin-desktop max-w-4xl mx-auto py-16">
      <h1 className="font-display text-display-lg text-on-surface mb-8">
        Disclaimer
      </h1>
      <p className="font-mono text-label-mono text-text-dimmed mb-8">
        Effective Date: August 26, 2026
      </p>
      <div className="space-y-8 font-body text-body-md text-on-surface-variant">
        <section className="glass-card rounded-xl p-6 border-l-4 border-data-down">
          <p className="text-on-surface font-medium">
            FXM Trade Keeper is a journaling, analytics, and decision-support
            tool. It is not financial advice. Trading foreign exchange, stocks,
            commodities, or any financial instrument involves risk of loss and
            is not suitable for all investors.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            No Financial Advice
          </h2>
          <p>
            The information provided through FXM Trade Keeper, including
            analytics, AI insights, and strategy tracking, is for educational
            and informational purposes only. It should not be construed as
            financial advice, investment advice, or trading advice.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            No Guarantee of Results
          </h2>
          <p>
            Past performance does not guarantee future results. The use of FXM
            Trade Keeper does not guarantee trading success, profit, or
            prevention of losses. Users are solely responsible for their trading
            decisions.
          </p>
        </section>
        <section>
          <h2 className="font-display text-headline-md text-on-surface mb-4">
            Risk Warning
          </h2>
          <p>
            Trading leveraged products such as forex and CFDs carries a high
            level of risk and may not be suitable for all investors. You could
            lose more than your initial investment. Always trade with capital you
            can afford to lose.
          </p>
        </section>
      </div>
    </div>
  );
}
