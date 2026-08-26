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
    <main className="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-24 gap-16 md:gap-24 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          USER-OWNED. PRIVACY-FIRST.
        </span>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface">
          Keep FXM Independent.
        </h1>
        <p className="font-body-lg text-body-lg text-text-dimmed">
          FXM Trade Keeper is and always will be free, open, and strictly on your device. Your data never touches our servers. If this tool brings value to your trading routine, consider chipping in to keep the servers (for the website, not your data) running and development active.
        </p>
      </section>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full">
        {/* Individual Donation Card (Spans 8 cols on desktop) */}
        <div className="premium-card rounded-xl p-6 md:p-8 col-span-1 md:col-span-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              One-Time Support
            </h2>
            <p className="font-body-md text-body-md text-text-dimmed">
              Choose an amount to help fund the next update.
            </p>
          </div>

          {/* Donation Tiers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {amounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => setSelectedAmount(amount.value)}
                className={`py-4 rounded-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                  amount.value === 0
                    ? "glow-effect bg-surface border border-surface-stroke"
                    : selectedAmount === amount.value
                    ? "bg-surface-container-high border-2 border-primary text-on-surface relative overflow-hidden"
                    : "bg-surface-container-high border border-surface-stroke hover:border-primary/50 text-on-surface group"
                }`}
              >
                {selectedAmount === amount.value && amount.value !== 0 && (
                  <div className="absolute inset-0 bg-primary/5" />
                )}
                <span className="font-headline-md text-headline-md text-primary">
                  {amount.label}
                </span>
                <span className={`font-label-caps text-label-caps ${
                  selectedAmount === amount.value ? "text-on-surface" : "text-text-dimmed group-hover:text-on-surface-variant"
                } transition-colors`}>
                  {amount.subtitle.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          {selectedAmount === 0 && (
            <div className="glow-effect bg-surface border border-surface-stroke rounded-lg flex items-center px-4 transition-all">
              <span className="text-text-dimmed font-headline-md text-headline-md mr-2">$</span>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-transparent w-full text-on-surface font-headline-md text-headline-md border-none p-0 focus:ring-0 placeholder-surface-variant"
                placeholder="Custom"
              />
            </div>
          )}

          {/* Payment Methods */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4 border-t border-surface-stroke/50">
            <button className="flex-1 bg-surface-container-highest hover:bg-surface-variant text-on-surface font-body-md text-body-md font-medium py-3 px-4 rounded border border-surface-stroke flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                credit_card
              </span>
              Credit Card / Stripe
            </button>
            <button className="flex-1 bg-[#003087] hover:bg-[#00205e] text-white font-body-md text-body-md font-medium py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance_wallet
              </span>
              PayPal
            </button>
          </div>
        </div>

        {/* Corporate Sponsorship Card (Spans 4 cols on desktop) */}
        <div className="bg-surface-container-low border border-surface-stroke rounded-xl p-6 md:p-8 col-span-1 md:col-span-4 flex flex-col gap-6 relative overflow-hidden">
          {/* Subtle gradient slash */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rotate-45 blur-2xl pointer-events-none" />
          <div className="flex flex-col gap-2">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-text-dimmed">
                handshake
              </span>
              Sponsorship
            </h2>
            <p className="font-body-md text-body-md text-text-dimmed">
              Represent a proprietary trading firm, brokerage, or prop-firm evaluation company?
            </p>
          </div>
          <ul className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant flex-grow">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-sm mt-1">check</span>
              <span>Logo placement on repo &amp; site</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-sm mt-1">check</span>
              <span>Dedicated &apos;Supported By&apos; link</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-sm mt-1">check</span>
              <span>Priority support channel</span>
            </li>
          </ul>
          <button className="w-full bg-transparent border border-primary text-primary hover:bg-primary/5 font-body-md text-body-md font-bold py-3 px-4 rounded transition-colors mt-auto">
            Contact for Tiers
          </button>
        </div>
      </div>
    </main>
  );
}
