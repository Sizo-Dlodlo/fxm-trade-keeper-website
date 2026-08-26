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
    <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 flex flex-col gap-gutter">
      {/* Hero */}
      <header className="flex flex-col items-center text-center max-w-3xl gap-6 z-10">
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
          GET IN TOUCH
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
          Contact Us
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Have a question, suggestion, or want to collaborate? We&apos;d love to
          hear from you.
        </p>
      </header>

      {/* Contact Form */}
      <section className="w-full max-w-2xl mx-auto">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-8">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full font-label-mono text-label-mono transition-colors ${
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
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
