"use client";

import { useEffect, useState } from "react";

const DEFAULTS: Record<string, string> = {
  site_url: "https://fxmtradekeeper.com",
  support_email: "support@fxmtradekeeper.com",
  advertising_enabled: "false",
  comments_enabled: "false",
  ga_measurement_id: "",
  adsense_client_id: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Record<string, string>>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const saved = data.settings || {};
        setForm({ ...DEFAULTS, ...saved });
      })
      .finally(() => setLoading(false));
  }, []);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save settings.");
        return;
      }
      setNotice("Settings saved.");
      setTimeout(() => setNotice(""), 2500);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Configure website settings and integrations
        </p>
      </div>

      {notice && (
        <div className="bg-data-up/10 border border-data-up/30 text-data-up rounded-lg px-4 py-3 font-body-md text-body-md mb-6">
          {notice}
        </div>
      )}
      {error && (
        <div className="bg-data-down/10 border border-data-down/30 text-data-down rounded-lg px-4 py-3 font-body-md text-body-md mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-text-dimmed text-center py-8">Loading…</p>
      ) : (
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analytics Settings */}
            <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
              <h2 className="font-headline-md text-lg text-on-surface mb-6">
                Analytics
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                    Google Analytics Measurement ID
                  </label>
                  <input
                    type="text"
                    value={form.ga_measurement_id}
                    onChange={(e) => set("ga_measurement_id", e.target.value)}
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                    Google AdSense Publisher ID
                  </label>
                  <input
                    type="text"
                    value={form.adsense_client_id}
                    onChange={(e) => set("adsense_client_id", e.target.value)}
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="pub-XXXXXXXXXXXXXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Site Settings */}
            <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
              <h2 className="font-headline-md text-lg text-on-surface mb-6">
                Site Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={form.site_url}
                    onChange={(e) => set("site_url", e.target.value)}
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="https://fxmtradekeeper.com"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={form.support_email}
                    onChange={(e) => set("support_email", e.target.value)}
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="fxmomentum2@gmail.com"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body-md text-body-md text-on-surface">
                      Enable Advertising
                    </div>
                    <div className="font-body-md text-body-md text-text-dimmed text-sm">
                      Show AdSense ads on content pages
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "advertising_enabled",
                        form.advertising_enabled === "true" ? "false" : "true"
                      )
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      form.advertising_enabled === "true"
                        ? "bg-primary"
                        : "bg-surface-stroke"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                        form.advertising_enabled === "true"
                          ? "right-0.5"
                          : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body-md text-body-md text-on-surface">
                      Enable Comments
                    </div>
                    <div className="font-body-md text-body-md text-text-dimmed text-sm">
                      Allow comments on guides and blog posts
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "comments_enabled",
                        form.comments_enabled === "true" ? "false" : "true"
                      )
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      form.comments_enabled === "true"
                        ? "bg-primary"
                        : "bg-surface-stroke"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                        form.comments_enabled === "true"
                          ? "right-0.5"
                          : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary font-headline-md text-base px-8 py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  Saving…
                </>
              ) : (
                "Save Settings"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
