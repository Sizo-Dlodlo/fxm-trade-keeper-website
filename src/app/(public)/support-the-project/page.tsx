"use client";

import { useState } from "react";

export default function SupportTheProjectPage() {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [
    { value: 5, label: "$5", subtitle: "Coffee" },
    { value: 10, label: "$10", subtitle: "Server Fund" },
    { value: 25, label: "$25", subtitle: "Pro Supporter" },
    { value: 0, label: "Custom", subtitle: "Your choice" },
  ];

  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Support Development
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Keep FXM Independent
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            FXM Trade Keeper is free and will stay free. Your support helps us
            maintain and improve the application. Your data never touches our
            servers.
          </p>
        </div>
      </header>

      {/* Support Section */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Donation Card */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container border border-surface-stroke rounded-xl p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10" />
              <h2 className="font-display text-headline-md text-on-surface mb-6">
                One-Time Support
              </h2>

              {/* Amount Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {amounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => setSelectedAmount(amount.value)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      selectedAmount === amount.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-surface-stroke bg-surface hover:border-primary/50 text-on-surface"
                    }`}
                  >
                    <div className="font-display text-xl font-bold">
                      {amount.label}
                    </div>
                    <div className="font-mono text-label-mono text-text-dimmed">
                      {amount.subtitle}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              {selectedAmount === 0 && (
                <div className="mb-8">
                  <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                    Custom Amount (USD)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary glow-effect"
                    placeholder="Enter amount"
                  />
                </div>
              )}

              {/* Payment Methods */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-on-primary font-display text-base px-8 py-4 rounded shadow-[0_0_20px_rgba(118,219,150,0.2)] hover:shadow-[0_0_30px_rgba(118,219,150,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 flex-1">
                  <span className="material-symbols-outlined">credit_card</span>
                  Pay with Card
                </button>
                <button className="bg-[#0070BA] text-white font-display text-base px-8 py-4 rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 flex-1">
                  PayPal
                </button>
              </div>
            </div>
          </div>

          {/* Sponsorship Card */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container border border-surface-stroke rounded-xl p-8 relative overflow-hidden h-full">
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-primary/5 rounded-tl-full -z-10" />
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <span className="material-symbols-outlined text-primary text-sm mr-2">
                  business
                </span>
                <span className="font-mono text-label-caps text-primary uppercase tracking-wider">
                  Corporate
                </span>
              </div>
              <h2 className="font-display text-headline-md text-on-surface mb-4">
                Sponsorship
              </h2>
              <p className="font-body text-body-md text-on-surface-variant mb-6">
                For prop firms, brokerages, and trading companies looking to
                support independent trading tools.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Logo placement on the website",
                  "Dedicated 'Supported By' link",
                  "Priority support channel",
                  "Newsletter sponsorship",
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 font-body text-body-md text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      check_circle
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-transparent border border-primary text-primary font-display text-base px-6 py-3 rounded hover:bg-primary/10 transition-colors">
                Contact for Tiers
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
