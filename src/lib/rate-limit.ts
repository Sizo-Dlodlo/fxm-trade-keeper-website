export interface RateLimitResult {
  blocked: boolean;
  remaining: number;
  resetInMs: number;
}

export type RateLimiterName =
  | "login"
  | "download-track"
  | "comments"
  | "contact"
  | "newsletter"
  | "telemetry";

interface Bucket {
  count: number;
  windowStart: number;
  blockedUntil: number | null;
}

const MAX: Record<RateLimiterName, number> = {
  login: 5,
  "download-track": 30,
  comments: 3,
  contact: 10,
  newsletter: 20,
  telemetry: 120,
};

const WINDOW_MS: Record<RateLimiterName, number> = {
  login: 15 * 60 * 1000,
  "download-track": 60 * 1000,
  comments: 60 * 1000,
  contact: 60 * 60 * 1000,
  newsletter: 60 * 1000,
  telemetry: 60 * 1000,
};

const LOCK_MS: Record<RateLimiterName, number> = {
  login: 15 * 60 * 1000,
  "download-track": 60_000,
  comments: 0,
  contact: 0,
  newsletter: 0,
  telemetry: 60_000,
};

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();
const SWEEP_EVERY_MS = 5 * 60 * 1000;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_EVERY_MS) return;
  lastSweep = now;
  for (const [key, b] of buckets) {
    const oldestWindow = Math.max(WINDOW_MS.login, WINDOW_MS.contact);
    if (now - b.windowStart > oldestWindow && !b.blockedUntil) {
      buckets.delete(key);
    } else if (b.blockedUntil && now - b.blockedUntil > 0) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(
  name: RateLimiterName,
  ip: string
): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const key = `${name}:${ip}`;
  const bucket = buckets.get(key) ?? {
    count: 0,
    windowStart: now,
    blockedUntil: null,
  };

  if (bucket.blockedUntil && now < bucket.blockedUntil) {
    return {
      blocked: true,
      remaining: 0,
      resetInMs: bucket.blockedUntil - now,
    };
  }

  if (now - bucket.windowStart >= WINDOW_MS[name]) {
    bucket.count = 0;
    bucket.windowStart = now;
    bucket.blockedUntil = null;
  }

  if (bucket.count >= MAX[name]) {
    bucket.blockedUntil = now + LOCK_MS[name];
    buckets.set(key, bucket);
    return { blocked: true, remaining: 0, resetInMs: LOCK_MS[name] };
  }

  bucket.count += 1;
  buckets.set(key, bucket);
  return {
    blocked: false,
    remaining: MAX[name] - bucket.count,
    resetInMs: WINDOW_MS[name] - (now - bucket.windowStart),
  };
}

export function resetRateLimit(name: RateLimiterName, ip: string) {
  buckets.delete(`${name}:${ip}`);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
