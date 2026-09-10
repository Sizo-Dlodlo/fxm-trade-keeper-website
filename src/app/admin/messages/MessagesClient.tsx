"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  category: string | null;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  async function load() {
    const res = await fetch("/api/leads?type=contact");
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    fetch("/api/leads?type=contact")
      .then((r) => r.json())
      .then((data) => {
        if (active) setMessages(data.messages || []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function setField(m: Message, field: "read" | "replied", value: boolean) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, field, value }),
    });
    await load();
  }

  async function remove(m: Message) {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    await fetch("/api/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, type: "contact" }),
    });
    await load();
  }

  const visible = messages.filter((m) =>
    filter === "all" ? true : filter === "unread" ? !m.read : m.read
  );
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Messages
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Contact form submissions from the site
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {messages.length}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">Total Messages</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-up font-bold mb-1">
            {unread}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">Unread</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">
            {messages.filter((m) => m.replied).length}
          </div>
          <div className="font-body-md text-body-md text-text-dimmed">Replied</div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded font-body-md text-body-md font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary text-on-primary"
                : "bg-surface-container border border-surface-stroke text-on-surface-variant hover:border-primary/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-text-dimmed text-center py-8">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="text-text-dimmed text-center py-8">No messages found.</p>
        ) : (
          visible.map((m) => (
            <div
              key={m.id}
              className={`bg-surface-container border rounded-xl p-5 ${
                !m.read ? "border-primary/40" : "border-surface-stroke"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {!m.read && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {m.name}
                </span>
                <span className="font-label-mono text-label-mono text-text-dimmed">
                  {m.email}
                </span>
                {m.category && (
                  <span className="font-label-mono text-label-mono px-3 py-0.5 rounded-full bg-secondary-container/30 text-secondary">
                    {m.category}
                  </span>
                )}
                <span className="font-label-mono text-label-mono text-text-dimmed ml-auto">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="font-body-md text-body-md text-on-surface font-medium mb-2">
                {m.subject}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 whitespace-pre-line">
                {m.message}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setField(m, "read", !m.read)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-surface-stroke text-on-surface-variant font-body-md text-body-md font-medium hover:border-primary/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {m.read ? "mark_email_unread" : "mark_email_read"}
                  </span>
                  {m.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  onClick={() => setField(m, "replied", !m.replied)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-body-md text-body-md font-medium transition-colors ${
                    m.replied
                      ? "bg-primary/10 text-primary"
                      : "bg-surface border border-surface-stroke text-on-surface-variant hover:border-primary/50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">reply</span>
                  {m.replied ? "Replied" : "Mark replied"}
                </button>
                <a
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/10 text-primary font-body-md text-body-md font-medium hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
                  Reply
                </a>
                <button
                  onClick={() => remove(m)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-text-dimmed font-body-md text-body-md hover:text-data-down transition-colors ml-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
