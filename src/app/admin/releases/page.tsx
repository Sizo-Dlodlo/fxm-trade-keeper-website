"use client";

import { useState } from "react";

const releases = [
  { version: "2.0.0", status: "STABLE", date: "Aug 26, 2026", downloads: "6,892" },
  { version: "1.5.0", status: "STABLE", date: "Jul 15, 2026", downloads: "3,241" },
  { version: "1.4.2", status: "STABLE", date: "Jun 20, 2026", downloads: "1,892" },
];

export default function AdminReleasesPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-container-max mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-headline-md text-on-surface mb-1">
            Release Management
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Manage application releases and distribution
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-on-primary font-display text-base px-6 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Create Release
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-display text-2xl text-on-surface font-bold mb-1">3</div>
          <div className="font-body text-body-md text-text-dimmed">Total Releases</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-display text-2xl text-on-surface font-bold mb-1">v2.0.0</div>
          <div className="font-body text-body-md text-text-dimmed">Latest Stable</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-display text-2xl text-on-surface font-bold mb-1">12,025</div>
          <div className="font-body text-body-md text-text-dimmed">Total Downloads</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-stroke/50">
                <th className="text-left px-6 py-4 font-mono text-label-caps text-on-surface-variant uppercase">Version</th>
                <th className="text-left px-6 py-4 font-mono text-label-caps text-on-surface-variant uppercase">Status</th>
                <th className="text-left px-6 py-4 font-mono text-label-caps text-on-surface-variant uppercase">Date</th>
                <th className="text-left px-6 py-4 font-mono text-label-caps text-on-surface-variant uppercase">Downloads</th>
                <th className="text-right px-6 py-4 font-mono text-label-caps text-on-surface-variant uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {releases.map((release) => (
                <tr
                  key={release.version}
                  className="border-b border-surface-stroke/30 hover:bg-surface-container-highest/10 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-label-mono text-on-surface">
                    v{release.version}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-mono text-label-mono px-3 py-1 rounded-full ${
                        release.status === "STABLE"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary-container/30 text-secondary"
                      }`}
                    >
                      {release.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-body-md text-on-surface-variant">
                    {release.date}
                  </td>
                  <td className="px-6 py-4 font-mono text-label-mono text-on-surface">
                    {release.downloads}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="modal-backdrop absolute inset-0"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-surface-container border border-surface-stroke rounded-xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-headline-md text-on-surface">
                Create New Release
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-dimmed hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-5">
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Version Number
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="e.g. v2.1.0"
                />
              </div>
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Release Type
                </label>
                <select className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-body text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Stable</option>
                  <option>Beta</option>
                  <option>Alpha (Internal)</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-label-caps text-on-surface-variant uppercase block mb-2">
                  Changelog
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="## What's new..."
                />
                <span className="font-mono text-label-mono text-text-dimmed text-xs">
                  Markdown supported
                </span>
              </div>
              <div className="border border-surface-stroke rounded-xl p-4">
                <h3 className="font-mono text-label-caps text-on-surface-variant uppercase mb-4">
                  Binary Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-body-md text-on-surface-variant block mb-1">
                      Windows Installer URL
                    </label>
                    <input
                      type="url"
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="https://dl.fxm.com/win/..."
                    />
                  </div>
                  <div>
                    <label className="font-body text-body-md text-on-surface-variant block mb-1">
                      SHA-256 Checksum
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded px-3 py-2 font-mono text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter SHA-256 hash"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded border border-surface-stroke text-on-surface-variant hover:bg-surface-container transition-colors font-body text-body-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-6 py-3 rounded hover:brightness-110 transition-all font-body text-body-md font-medium"
                >
                  Publish Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
