"use client";

import { useEffect, useState } from "react";

type Release = {
  id: string;
  version: string;
  stable: boolean;
  releaseDate: string;
  installerUrl: string | null;
  portableUrl: string | null;
  installerSize: number | null;
  portableSize: number | null;
  installerSha512: string | null;
  portableSha512: string | null;
  macUrl: string | null;
  macSize: number | null;
  macSha256: string | null;
  changelog: string | null;
};

const EMPTY_FORM = {
  version: "",
  stable: true,
  releaseDate: "",
  installerUrl: "",
  portableUrl: "",
  installerSize: "",
  portableSize: "",
  installerSha512: "",
  portableSha512: "",
  macUrl: "",
  macSize: "",
  macSha256: "",
  changelog: "",
};

type FormState = typeof EMPTY_FORM;

export default function AdminReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Release | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/releases");
      const data = await res.json();
      setReleases(data.releases || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    fetch("/api/releases")
      .then((r) => r.json())
      .then((data) => {
        if (active) setReleases(data.releases || []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  }

  function openCreate() {
    setEditing(null);
    setForm({
      ...EMPTY_FORM,
      releaseDate: new Date().toISOString().slice(0, 10),
    });
    setError("");
    setShowModal(true);
  }

  function openEdit(r: Release) {
    setEditing(r);
    setForm({
      version: r.version,
      stable: r.stable,
      releaseDate: r.releaseDate ? r.releaseDate.slice(0, 10) : "",
      installerUrl: r.installerUrl || "",
      portableUrl: r.portableUrl || "",
      installerSize: r.installerSize ? String(r.installerSize) : "",
      portableSize: r.portableSize ? String(r.portableSize) : "",
      installerSha512: r.installerSha512 || "",
      portableSha512: r.portableSha512 || "",
      macUrl: r.macUrl || "",
      macSize: r.macSize ? String(r.macSize) : "",
      macSha256: r.macSha256 || "",
      changelog: r.changelog || "",
    });
    setError("");
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const url = editing ? "/api/releases" : "/api/releases";
      const method = editing ? "PATCH" : "POST";
      const payload: Record<string, unknown> = editing
        ? { id: editing.id, ...form }
        : { ...form };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save release");
        return;
      }
      setShowModal(false);
      flash(editing ? "Release updated." : "Release published.");
      await load();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(r: Release) {
    if (!confirm(`Delete release v${r.version}?`)) return;
    await fetch("/api/releases", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id }),
    });
    flash("Release deleted.");
    await load();
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="max-w-container-max mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
            Release Management
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage application releases and distribution
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-primary text-on-primary font-headline-md text-base px-6 py-3 rounded hover:brightness-110 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Create Release
        </button>
      </div>

      {notice && (
        <div className="bg-data-up/10 border border-data-up/30 text-data-up rounded-lg px-4 py-3 font-body-md text-body-md mb-6">
          {notice}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {releases.length}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Total Releases
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            v
            {releases.find((r) => r.stable)?.version ||
              "—"}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Latest Stable
          </div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {releases.filter((r) => r.stable).length}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">
            Stable Releases
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-stroke/50">
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Version</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Date</th>
                <th className="text-right px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-dimmed">
                    Loading…
                  </td>
                </tr>
              ) : releases.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-dimmed">
                    No releases yet. Create your first release.
                  </td>
                </tr>
              ) : (
                releases.map((release) => (
                  <tr
                    key={release.id}
                    className="border-b border-surface-stroke/30 hover:bg-surface-container-highest/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-label-mono text-label-mono text-on-surface">
                      v{release.version}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-label-mono text-label-mono px-3 py-1 rounded-full ${
                          release.stable
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary-container/30 text-secondary"
                        }`}
                      >
                        {release.stable ? "STABLE" : "BETA"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">
                      {new Date(release.releaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(release)}
                        title="Edit"
                        className="text-primary hover:brightness-110 transition-all mr-3"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => remove(release)}
                        title="Delete"
                        className="text-text-dimmed hover:text-data-down transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {editing ? "Edit Release" : "Create New Release"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-dimmed hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {error && (
              <div className="bg-data-down/10 border border-data-down/30 text-data-down rounded-lg px-4 py-3 font-body-md text-body-md mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                    Version Number
                  </label>
                  <input
                    type="text"
                    value={form.version}
                    onChange={(e) => set("version", e.target.value)}
                    required
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. 2.1.0"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                    Release Date
                  </label>
                  <input
                    type="date"
                    value={form.releaseDate}
                    onChange={(e) => set("releaseDate", e.target.value)}
                    className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 font-body-md text-body-md text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.stable}
                    onChange={(e) => set("stable", e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  Stable release
                </label>
              </div>

              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block mb-2">
                  Changelog
                </label>
                <textarea
                  rows={5}
                  value={form.changelog}
                  onChange={(e) => set("changelog", e.target.value)}
                  className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  placeholder="## What's new..."
                />
                <span className="font-label-mono text-label-mono text-text-dimmed text-xs">
                  Markdown supported
                </span>
              </div>

              <div className="border border-surface-stroke rounded-xl p-4">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4">
                  Binary Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      Installer URL
                    </label>
                    <input
                      type="url"
                      value={form.installerUrl}
                      onChange={(e) => set("installerUrl", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="https://dl.fxm.com/win/..."
                    />
                  </div>
                  <div>
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      Portable URL
                    </label>
                    <input
                      type="url"
                      value={form.portableUrl}
                      onChange={(e) => set("portableUrl", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="https://dl.fxm.com/portable/..."
                    />
                  </div>
                  <div>
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      Installer SHA-256
                    </label>
                    <input
                      type="text"
                      value={form.installerSha512}
                      onChange={(e) => set("installerSha512", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter SHA-256 hash"
                    />
                  </div>
                  <div>
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      Portable SHA-256
                    </label>
                    <input
                      type="text"
                      value={form.portableSha512}
                      onChange={(e) => set("portableSha512", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter SHA-256 hash"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-surface-stroke pt-4">
                <h4 className="font-label-caps text-label-caps text-primary uppercase mb-4">
                  macOS Binary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      macOS DMG URL
                    </label>
                    <input
                      type="url"
                      value={form.macUrl}
                      onChange={(e) => set("macUrl", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="https://dl.fxm.com/mac/..."
                    />
                  </div>
                  <div>
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      macOS DMG Size (bytes)
                    </label>
                    <input
                      type="number"
                      value={form.macSize}
                      onChange={(e) => set("macSize", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="e.g. 104279804"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-body-md text-body-md text-on-surface-variant block mb-1">
                      macOS DMG SHA-256
                    </label>
                    <input
                      type="text"
                      value={form.macSha256}
                      onChange={(e) => set("macSha256", e.target.value)}
                      className="w-full bg-surface-dim border border-surface-stroke text-on-surface rounded-lg px-4 py-3 font-label-mono text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter SHA-256 hash"
                    />
                  </div>
                </div>
              </div>

            <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-lg border border-surface-stroke text-on-surface-variant hover:bg-surface-container transition-colors font-body-md text-body-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-on-primary px-6 py-3 rounded-lg hover:brightness-110 transition-all font-body-md text-body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">
                        progress_activity
                      </span>
                      Saving…
                    </>
                  ) : editing ? (
                    "Save Changes"
                  ) : (
                    "Publish Release"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
