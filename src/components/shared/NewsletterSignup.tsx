"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Failed to subscribe. Please try again.");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-on-primary font-headline-md text-sm px-5 py-2 rounded hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "…" : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="font-body-sm text-body-sm text-data-up sm:absolute sm:bottom-0">
          Subscribed! You&apos;re on the list.
        </p>
      )}
      {status === "error" && (
        <p className="font-body-sm text-body-sm text-data-down sm:absolute sm:bottom-0">
          {error}
        </p>
      )}
    </form>
  );
}
