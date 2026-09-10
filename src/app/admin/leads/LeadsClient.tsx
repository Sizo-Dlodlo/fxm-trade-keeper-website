"use client";

import { useEffect, useState } from "react";

type Subscriber = {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
};

export default function AdminLeadsPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/leads?type=newsletter");
    const data = await res.json();
    setSubscribers(data.subscribers || []);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    fetch("/api/leads?type=newsletter")
      .then((r) => r.json())
      .then((data) => {
        if (active) setSubscribers(data.subscribers || []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function toggleActive(s: Subscriber) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, field: "active", value: !s.active }),
    });
    await load();
  }

  async function remove(s: Subscriber) {
    if (!confirm(`Remove subscriber ${s.email}?`)) return;
    await fetch("/api/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, type: "newsletter" }),
    });
    await load();
  }

  const active = subscribers.filter((s) => s.active).length;

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Leads
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Newsletter subscribers and email leads
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {subscribers.length}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">All Subscribers</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-primary font-bold mb-1">
            {active}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">Active</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-down font-bold mb-1">
            {subscribers.length - active}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">Inactive</div>
        </div>
      </div>

      <div className="bg-surface-container border border-surface-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-stroke/50">
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Email</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Subscribed</th>
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
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-dimmed">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-surface-stroke/30 hover:bg-surface-container-highest/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-body-md text-body-md text-on-surface">
                      {s.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-label-mono text-label-mono px-3 py-1 rounded-full ${
                          s.active ? "bg-primary/10 text-primary" : "bg-surface-stroke/50 text-text-dimmed"
                        }`}
                      >
                        {s.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-label-mono text-label-mono text-text-dimmed">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(s)}
                        title={s.active ? "Deactivate" : "Activate"}
                        className="text-primary hover:brightness-110 transition-all mr-3"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {s.active ? "toggle_off" : "toggle_on"}
                        </span>
                      </button>
                      <button
                        onClick={() => remove(s)}
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
    </div>
  );
}
