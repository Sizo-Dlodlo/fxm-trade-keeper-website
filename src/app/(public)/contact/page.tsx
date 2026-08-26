"use client";

import { useState } from "react";

const categories = [
  "General",
  "Support",
  "Bug Report",
  "Feature Request",
  "Business",
  "Sponsorship",
  "Affiliate",
  "Press",
];

export default function ContactPage() {
  const [category, setCategory] = useState("General");

  return (
    <>
      {/* Hero */}
      <header className="relative py-24 px-4 md:px-margin-desktop overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(118,219,150,0.1)_0%,rgba(17,19,25,0)_70%)] pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-label-caps bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-6 tracking-widest uppercase">
            Get in Touch
          </span>
          <h1 className="font-display text-display-lg text-on-surface mb-6">
            Contact Us
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
            Have a question, suggestion, or want to collaborate? We&apos;d love to
            hear from you.
          </p>
        </div>
      </header>

      {/* Contact Form */}
      <section className="w-full pb-24 px-4 md:px-margin-desktop max-w-2xl mx-auto">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-8">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full font-mono text-label-mono transition-colors ${
                      category === cat
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-surface border border-surface-stroke text-on-surface-variant hover:border-primary/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-on-primary font-display text-base px-8 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
