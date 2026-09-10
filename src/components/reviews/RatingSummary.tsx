"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  rating: number;
};

export default function RatingSummary() {
  const [average, setAverage] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        const revs = (data.reviews || []) as Review[];
        if (!active) return;
        setCount(revs.length);
        if (revs.length === 0) return;
        const sum = revs.reduce((acc: number, r: Review) => acc + r.rating, 0);
        setAverage(Math.round((sum / revs.length) * 10) / 10);
      })
      .catch(() => {
        if (active) setAverage(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`material-symbols-outlined text-[20px] ${
              average !== null && star <= Math.round(average)
                ? "text-primary fill"
                : "text-surface-stroke"
            }`}
          >
            star
          </span>
        ))}
      </div>
      <span className="font-headline-md text-lg text-on-surface font-bold">
        {average !== null ? average : "—"}
      </span>
      <span className="font-body-md text-body-md text-text-dimmed">
        {average !== null && count > 0
          ? `${count} review${count === 1 ? "" : "s"}`
          : "no reviews yet"}
      </span>
    </div>
  );
}
