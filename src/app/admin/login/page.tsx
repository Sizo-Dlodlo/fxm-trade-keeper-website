"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">
              admin_panel_settings
            </span>
          </div>
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-2">
            Admin Login
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            FXM Trade Keeper Admin Console
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-xl p-8 space-y-6"
        >
          {error && (
            <div className="bg-data-down/10 border border-data-down/30 text-data-down rounded-lg px-4 py-3 font-body-md text-body-md">
              {error}
            </div>
          )}

          <div>
            <label className="font-label-mono text-label-caps text-on-surface-variant uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="admin@fxmtradekeeper.com"
            />
          </div>

          <div>
            <label className="font-label-mono text-label-caps text-on-surface-variant uppercase block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-headline-md text-headline-md py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                Signing in...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">
                  login
                </span>
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 font-body-md text-body-md text-text-dimmed">
          <Link href="/" className="text-primary hover:brightness-110">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
