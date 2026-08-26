"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [gaId, setGaId] = useState("");
  const [adsenseId, setAdsenseId] = useState("");

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-headline-md text-on-surface mb-1">
          Settings
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Configure website settings and integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics Settings */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-display text-lg text-on-surface mb-6">
            Analytics
          </h2>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Google Analytics Measurement ID
              </label>
              <input
                type="text"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Google AdSense Publisher ID
              </label>
              <input
                type="text"
                value={adsenseId}
                onChange={(e) => setAdsenseId(e.target.value)}
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="pub-XXXXXXXXXXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <h2 className="font-display text-lg text-on-surface mb-6">
            Site Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Site URL
              </label>
              <input
                type="url"
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://fxmtradekeeper.com"
              />
            </div>
            <div>
              <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                Support Email
              </label>
              <input
                type="email"
                className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="support@fxmtradekeeper.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-body-md text-on-surface">
                  Enable Advertising
                </div>
                <div className="font-body text-body-md text-text-dimmed text-sm">
                  Show AdSense ads on content pages
                </div>
              </div>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-body-md text-on-surface">
                  Enable Comments
                </div>
                <div className="font-body text-body-md text-text-dimmed text-sm">
                  Allow comments on guides and blog posts
                </div>
              </div>
              <button className="w-12 h-6 bg-surface-stroke rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-primary text-on-primary font-display text-base px-8 py-3 rounded hover:brightness-110 transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
}
