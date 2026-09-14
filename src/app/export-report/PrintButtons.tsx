"use client";

export default function PrintButtons() {
  return (
    <div className="no-print fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">print</span>
        Print / Save as PDF
      </button>
      <span className="text-xs text-slate-500 bg-white/90 rounded px-2 py-1 shadow">
        Command/Ctrl + P also works
      </span>
    </div>
  );
}