# FXM Trade Keeper Website v1.0 — Session Development Log

Session date: Saturday 12 September 2026
Agent: opencode (Claude)
Project: C:\FX MOMENTUM\APP DEV OFFICE\FXM Trade Keeper Website v1.0\fxm-trade-keeper-website
App (deployed PWA): C:\FX MOMENTUM\APP DEV OFFICE\PWA FXM Trade Keeper v2.0
Live production: https://fxm-trade-keeper-website.vercel.app

---

## 1. User Request

"Check the website for security vulnerabilities, find and fix them — do
everything for me." This session = a full security audit + hardening pass on
the marketing/download website, followed by a production rebuild + redeploy,
then post-deploy live verification.

Gemini ended hovering on log-file path resolution, so opencode (Claude) picked
up where it left off, verified the actual deploy state, re-ran the audit, and
closed out the loop with live verification.

---

## 2. Audit Findings

### 2a. `npm audit` — 4 HIGH, all developer-toolchain only (NOT shipped)
- The 4 HIGH advisories are all in the **devDependency / Prisma-CLI chain**:
  - `js-yaml` 4.0.0–4.3.1 (HIGH)
  - `deepmerge-ts` <8.0.0 (HIGH)
  - `@prisma/config` (HIGH, via deepmerge-ts)
  - `prisma` 6.13.0-dev.1 – 8.1.0-dev.4 (HIGH, via @prisma/config)
- Verified **not shipped**: grep of the compiled `.next` production chunks
  shows **0 occurrences** of `js-yaml` / `deepmerge-ts` / `@prisma/config` in
  any deployed route bundle. They are CLI-only (used by the `prisma` CLI
  binary), never imported by `@prisma/client` at runtime.
- No stable upstream fix exists yet (only dev prereleases). **Decision: leave
  as-is — dev-toolchain only, zero runtime exposure.** Document; revisit when
  Prisma ships a stable patch.

### 2b. XSS surface — clean
- Grep across all of `src/` for `dangerouslySetInnerHTML` / `innerHTML` /
  markdown→HTML renderers: **zero hits**. All user-generated content
  (comments, reviews, leads, newsletter emails) renders as plain text. No
  stored-XSS / reflective-XSS vector.

### 2c. Confirmed already-good (no action needed)
- Login: bcrypt.compare, generic 401 (no user enumeration), httpOnly/secure 7d
  JWT cookie, strong `AUTH_SECRET` (~54 chars).
- All admin mutating routes (`leads`, `settings`, `releases`, `reviews`,
  `comments/moderate`, etc.) gated by `isAdmin` (`@/lib/admin` jwtVerify on
  the same secret) — UI routes return 302->login, API routes return 401/403.
- Live response headers already included `Strict-Transport-Security`
  (preload), `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy,
  Permissions-Policy.

---

## 3. Gaps Found & Fixed

1. **`/api/auth/login` — no brute-force protection.**
   Wired the shared limiter (`@/lib/rate-limit`'s `checkRateLimit("login", ip)`
   + `getClientIp`) into the login route: **5 attempts / 15-min window** then
   **15-min lockout**, returning **429 + Retry-After** on exceed. Server-side
   only; no new dependencies.

2. **Public, non-authenticated POSTs had no rate limiting** (DB-spam /
   email-bomb / download-spam vectors):
   - `/api/newsletter` → `checkRateLimit("newsletter", ip, 20, 60_000)` (20/60s)
   - `/api/contact`    → `checkRateLimit("contact", ip, 10, 900_000)` (10/15min)
   - `/api/download-track` → `checkRateLimit("download-track", ip, 30, 60_000)`
     (30/60s)
   Each returns 429 when blocked Mandarin (in-memory map keyed by IP).

3. **No Content-Security-Policy header.**
   Added a full CSP in `next.config.ts` headers:
   `default-src 'self'`; `script-src` allows GTM/GA hosts + `unsafe-inline`
   (Next.js RSC bootstrap) + `'unsafe-eval'`-free; `img-src` includes
   `drive.usercontent.google.com` (drive-hosted screenshots on the download
   page); `frame-ancestors 'none'`; `object-src 'none'`; `base-uri 'self'`;
   `form-action 'self'`; `upgrade-insecure-requests`.

4. **Build breaker fixed** — duplicate `const body = await request.json();`
   (identifier redeclare) in `download-track/route.ts`; collapsed to a single
   declaration. Also collapsed a duplicate import in `contact/route.ts`.
   `next build` was green afterward (full route manifest, zero TS errors).

---

## 4. Build + Deploy

- `npm run build` → green (complete route manifest; all public/admin/API
  routes compiled; no type errors).
- Production deploy: `npx vercel deploy --prod --yes`
  - Ready in ~44s
  - Production: `https://fxm-trade-keeper-website-iplnhiwxm-sizodlo-6324.vercel.app`
  - Aliased: `https://fxm-trade-keeper-website.vercel.app`

---

## 5. Post-Deploy Live Verification (curl against production)

- `/download` → **200**, CSP header present: `frame-ancestors 'none'`,
  `img-src` allowlist incl. drive hosts, `script-src` GA allowlist. ✅
- **Newsletter abuse test**: 24 rapid POSTs → **429s kicked in** (rate limit
  live). ✅
- **Login brute-force test**: 9 rapid wrong passwords → **429 before the 5th
  attempt** (lockout live). ✅
- No over-blocking: `/`, `/download`, `/admin/login` all 200. ✅

---

## 6. Chat History (condensed)

1. User: security-check the website, find + fix vulns, "do everything".
2. Agent inventoried all API routes + middleware; ran `npm audit` (4 HIGH,
   all Prisma-CLI devDeps, proving not shipped); grepped for XSS (clean);
   checked live headers; confirmed login + comments already rate-limited.
3. Wired rate limiting into the 3 unguarded public routes (newsletter,
   contact, download-track); added CSP to `next.config.ts`; collapsed
   duplicate `body` in download-track + dup import in contact.
4. `npm run build` green; deployed to production; verified live: CSP header,
   429s on newsletter + login brute-force, admin pages reachable.
5. Delivered final security report — site is hardened + live; remaining 4 HIGH
   are dev-CLI-only (not shipped, no stable fix), CSP + rate limits are the
   real live mitigations.

---

## 7. Next Steps / Notes

- Rate limiter is **in-memory** (per-serverless-instance). Fine at this scale;
  for cross-region global limits later, move to Upstash/Vercel KV or a
  Prisma-backed counter.
- The 4 HIGH npm findings stay until Prisma ships a stable fix; re-run
  `npm audit` to track.
- Optional future hardening: nonce-based CSP (needs `SrcNonce` refactor of
  inline scripts), stricter `permissions-policy`, Redis-backed login lockout
  across instances.

---

# Session 2 — Download page: replace Windows (Installer + Portable) builds

Session date: Sunday 13 September 2026
Agent: opencode (Claude)
Same project as Session 1 (fxm-trade-keeper-website). Related ongoing work:
the PWA mobile shell session documented separately in the PWA
`SESSION-LOG.md` (the site/app share a Vercel org and were redeployed in the
same working window as the Mac-link change in Session 1's follow-up).

## 8. User Request

"Please replace the Windows Builds in the website for the portable build and
the Installer build with the ones from the 'dist' folder." The download page's
two Windows cards (Installer + Portable) pointed at the self-hosted files in
`public/downloads/`, which were stale (dated 9/1). The fresh desktop build
lives in the Electron app's `dist` output.

## 9. What Was Found

- `C:\FX MOMENTUM\APP DEV OFFICE\Trade Keeper v2.0\dist` (build output) held
  the **9/11** binaries: `FXM-TradeKeeper-2.0.0-Portable.exe` (79,649,944 B
  = 75.96 MB) and `FXM-TradeKeeper-Setup-2.0.0.exe` (79,855,802 B =
  76.16 MB). Dist also had an 11:49 AM `.blockmap` + `latest.yml` for the
  Setup.
- Note: `latest.yml` referenced a Setup exe of 79,856,356 B whose SHA512
  (`MLlAiAeTo0YXcoM8...`) matched a copy in the temp working folder, **not**
  the 8:46 AM Setup still in `dist` (which is 554 B smaller). The active
  decision (user-specified) was to publish the `dist` Setup exe as-is and
  display **its** accurate SHA-256; the page will therefore not match the
  `latest.yml` checksum for that one file.
- The website previously hosted 9/1 files: Setup 76.4 MB and Portable
  76.2 MB, with hardcoded SHA-256 strings in `DownloadCards.tsx`.

## 10. Changes Made

- Copied both new 9/11 EXEs over the stale 9/1 copies in
  `public/downloads/` (Setup 76.16 MB, Portable 75.96 MB; both dated
  9/11/2026).
- `src/components/download/DownloadCards.tsx`:
  - `installerSha` → `LxsAYAshcm05qeV3xDS4qMN5tgnwyzzkr6cqmvgUl4I=`
  - `portableSha` → `v3Z3kgDnJHKiy7g/m/2x2TY/w7UGTiCcYz2Sdfetc4Q=`
  - Installer card file-size label `~76.4 MB` → `~76.2 MB`
  - Portable card file-size label `~76.2 MB` → `~76.0 MB`
  - No filename, href, trackDownload, or Mac card changes (Windows file names
    are unchanged).
- Verified by hashing the copied `public/downloads/` files — their SHA-256
  base64 matches the new displayed strings exactly.

## 11. Build + Deploy + Live Verification

- `npm run build` → green (full 44-route manifest, zero TS errors; the
  pre-existing harmless `@next/swc-win32-x64-msvc is not a valid Win32
  application` fallback-to-WASM warning is unchanged).
- Production deploy: `npx vercel deploy --prod --yes`
  - Uploaded 152.1 MB (the two 76 MB EXEs dominate).
  - Production: `https://fxm-trade-keeper-website-bflipfzf6-sizodlo-6324.vercel.app`
  - Aliased: `https://fxm-trade-keeper-website.vercel.app`
  - Ready in ~4m; build cache reused.
- Live checks against production:
  - `/download` renders both new SHAs and the new size labels (`~76.2 MB` /
    `~76.0 MB`); the two old SHA strings are gone.
  - Both EXEs downloadable from `/downloads/...`, and their served SHA-256
    matches the checksums displayed on the page exactly (Setup
    `LxsAYAshcm05...`, Portable `v3Z3kgDnJHKiy7g...`).
- User confirmed: "It is perfect."

## 12. Chat History (condensed)

1. User: replace the Windows (Portable + Installer) builds on the website
   with the ones from the `dist` folder.
2. Agent searched for the fresh builds; found the 9/11 Portable + Setup in
   `Trade Keeper v2.0\dist`, plus a stale 8/26–9/7 set in the Website
   `dist`, the live 9/1 set in `public/downloads`, and a temp paste folder.
3. Flagged that the `dist` Setup exe (8:46 AM) differs by 554 B from the
   `latest.yml`-referenced copy (11:49 AM, matched in the temp folder). User
   explicitly chose: publish the `dist` Setup exe as-is.
4. Copied both new EXEs into `public/downloads/`; updated `installerSha`,
   `portableSha`, and the two size labels in `DownloadCards.tsx`; confirmed
   copied files hash to the displayed SHAs.
5. `npm run build` green → deployed to prod → live-verified new SHAs/sizes
   render, old SHAs gone, and served downloads hash-match the page.

## 13. Next Steps / Notes

- Reminder for future download-page edits: always recompute SHA-256 base64
   from the exact file that will be served, and keep the displayed size in
   MB rounded the same way (`[Math]::Round(len/1MB, 2)` → ~X.X MB).
- Mac cards were refreshed in a follow-up to Session 1 (new Google Drive
   IDs, `macIntelSha`/`macArmSha` unchanged) and are untouched by this
   session.

---

# Session 2.b — Installer correction: publish the latest.yml-matched Setup

Session date: Sunday 13 September 2026
Agent: opencode (Claude)

Immediate follow-up to Session 2 after user review. The user reversed the
earlier "dist Setup as-is" decision and asked to publish the 11:49 AM Setup
that matches `latest.yml` instead.

## 14. User Request

"I made a mistake please replace the website installer build with the
Temp\opencode\tk-website\...\FXM-TradeKeeper-Setup-2.0.0.exe (11:49 AM)
79,856,356 MLlAiAeTo0YXcoM8PJn7."

## 15. Change Made

- Overwrote `public/downloads/FXM-TradeKeeper-Setup-2.0.0.exe` with the
  temp `tk-website` copy (11:49 AM, 79,856,356 B = 76.16 MB). Verified:
  - SHA-256 (base64) = `avxsTnINq37gPc5TYXGJwx9o0/86Mb8SgnyPfSPVddE=`
  - SHA-512 (base64) = `MLlAiAeTo0YXcoM8PJn7sVk2rPugNfW77NNKh9KWue+HV+KCmgOKs7mJPficJ7D0+thuZMfG9s6Dsxtf4pHJ3g==`
    → **exact match to `latest.yml`.** The checksum gap from Session 2 is now
    closed.
- `src/components/download/DownloadCards.tsx`: `installerSha` →
  `avxsTnINq37gPc5TYXGJwx9o0/86Mb8SgnyPfSPVddE=`. File-size label stays
  `~76.2 MB` (76.16 MB, unchanged). Portable untouched.

## 16. Build + Deploy + Live Verification

- `npm run build` → green (full route manifest, zero TS errors; the usual
  harmless `@next/swc-win32-x64-msvc` WASM-fallback warning unchanged).
- Production deploy: `npx vercel deploy --prod --yes`
  - Uploaded 76.2 MB (only the changed Setup re-uploaded; cache effective).
  - Production: `https://fxm-trade-keeper-website-4pwi2d18i-sizodlo-6324.vercel.app`
  - Aliased: `https://fxm-trade-keeper-website.vercel.app`
  - Ready in ~3m.
- Live checks: served Setup (76.16 MB) hashes to the displayed SHA-256
  `avxsTnINq37gPc5TYXGJwx9o0/86Mb8SgnyPfSPVddE=`; page shows the new SHA and no
  longer shows `LxsAYAsh...`. (First fetch hit a stale edge response — the
  cache-corrected re-verification passed.)

## 17. Chat History (condensed)

1. User: "I made a mistake" — replace the website installer with the temp
   `tk-website` Setup (11:49 AM, 79,856,356, `MLlAiAeTo...`).
2. Agent copied the temp Setup over `public/downloads/`, verified SHA-256 =
   `avxsTnINq37...` and SHA-512 = `MLlAiAeTo...` (latest.yml match), updated
   `installerSha`.
3. Built green → deployed to prod → live-verified served file + page SHA
   match, old SHA gone (after clearing a stale edge cache hit).
4. User: document in the log (this entry).

---

# Session 3 — Admin analytics pipeline: telemetry + Reports exports + complete Release record

Session date: Monday 14 September 2026
Agent: opencode (Claude)
Same project (fxm-trade-keeper-website). Companion PWA-side session
(telemetry client, settings nav fix) is logged in the PWA `SESSION-LOG.md`.

## 18. User Requests (this session)

1. (immediately-prior exchange, same working day) Add anonymous usage
   telemetry from the PWA + an admin telemetry dashboard; fix Settings nav
   overflow on mobile. — delivered before this session's main work.
2. "In the Admin Dashboard please create an option to export reports into
   supported files that can be printed and emailed."
3. "update that page [Release Management] with the necessary Releases that
   are already available on the website for users to download."
4. "Please update the Admin Manual as we have new updates on the Admin page."
5. "Please document this progress and Chat history." (this entry)

## 19. Telemetry (shipped earlier on 2026-09-14 — site commit `0b2b652`)

- Prisma `TelemetryEvent` model (`installId, eventType, appVersion, platform,
  viewName, detail Json, createdAt` + indexes) → `npx prisma db push` (Neon).
- `src/app/api/telemetry/route.ts`: POST (JSON + text/plain batch
  `{events:[...]}`) + OPTIONS; CORS allowlist; rate limit
  `checkRateLimit("telemetry", ip, 120, 60_000)` (120/min).
- `/admin/telemetry` page + `TelemetryClient.tsx`: totals, events-today,
  active installs (7d/lifetime), 30-day series, top event types, platforms,
  app versions, recent 25. Sidebar item + Manual section added.
- PWA client shipped separately (see PWA log): `lib/telemetry.js`, hooks in
  app.js/router.js/store.js, Settings → Preferences "Usage Analytics"
  toggle, `index.html` asset v2.0.2, sw.js cache `fkq-pwa-v6`.
- Live verified; test telemetry rows deleted. Site commit `0b2b652`.

## 20. Settings mobile nav fix (associated — PWA commit `6ef0472`)

- `settings.js` nav row now `flex flex-nowrap overflow-x-auto` →
  `lg:overflow-visible lg:flex-nowrap`; sw.js cache bumped to `v5`
  (v6 followed with telemetry). PWA-side; logged in the PWA SESSION-LOG.

## 21. Decision prompts (Reports + Releases scope)

Confirmations: **CSV + printable report** (no new deps; browser
Print/Save-as-PDF covers PDFs); **dedicated Reports page**
(sidebar item + Overview button); **populate admin Release records only**
(all 5 live artifacts; public download page stays hardcoded).

Research findings that shaped implementation:
- Public download page is fully hardcoded in `DownloadCards.tsx`; DB had a
  seeded v2.0.0 Release row with **no URLs**. Release model had only ONE
  `macUrl/macSize/macSha256` slot (no Apple Silicon variant, no guide).
- No export/PDF/CSV code existed; CSP favours server-side file responses +
  `window.print()`, not blob paths.
- Verified locally: the two published EXEs' SHA-256 base64 digests
  (`avxsTnINq37gPc5T…`, `v3Z3kgDnJHKiy7g…`) byte-match the site's displayed
  checksums, so the exact published values were stored in the DB.
- Next.js 16.3.3 → dynamic route/`params` are async Promises.

## 22. Feature 1 — Admin Reports (CSV exports + printable PDF)

New files:
- `src/lib/export-csv.ts` — RFC-4180 `csvCell` (quote/escape), `buildCsv`
  (LF/CRLF + UTF-8 BOM so Excel opens it), `toLocalDate`, `csvFilename`.
- `src/app/api/admin/export/[key]/route.ts` — GET, `isAdmin`-gated (401);
  dataset map for **downloads, telemetry, reviews, comments, leads,
  messages, releases**; uncapped Prisma reads; `Content-Disposition:
  attachment; filename=<base>-<date>.csv`; `Cache-Control: no-store`;
  large text fields (message/comment body, telemetry `detail` JSON) escaped.
- `src/app/admin/reports/page.tsx` — server component, `requireAdmin`;
  **Printable Reports** cards (Overview / Analytics / Telemetry each open
  `/export-report/<scope>`) and a **Download CSV** table with live row
  counts per dataset.
- `src/app/export-report/layout.tsx` + `[scope]/page.tsx` +
  `PrintButtons.tsx` — print view lives OUTSIDE the admin layout so it
  prints clean (no sidebar). Cookie-guarded (`requireAdmin` local pattern);
  `notFound()` on invalid scope; scopes: overview (KPIs + recent downloads +
  latest release artifacts/changelog), analytics (totals, 30-day series,
  version adoption), telemetry (totals, series, event/platform/version
  tables, recent 25). Light slate theme (print-safe, independent of the
  dark admin theme); fixed "Print / Save as PDF" button + `Command/Ctrl+P`.

Modified:
- `src/app/globals.css` — `@media print { @page { size:A4; margin:12mm } }
  .no-print { display:none !important }`.
- `src/components/admin/AdminSidebar.tsx` — added
  `{ href:"/admin/reports", label:"Reports", icon:"description" }`.
- `src/app/admin/page.tsx` (Overview) — header now has an **Export
  Reports** button linking to `/admin/reports` (without breaking the layout:
  wrapped in a flex row).

## 23. Feature 2 — Release Management populated

- Schema: added `macArmUrl String?`, `macArmSize Int?`, `macArmSha256
  String?`, `guideUrl String?` to `Release` → `npx prisma db push` + client
  regen (live Neon, nullable columns, no data loss).
- `src/app/api/releases/route.ts`: POST create + PATCH whitelist extended
  for the 4 new fields.
- `src/app/admin/releases/ReleasesClient.tsx`: `Release` type + `EMPTY_FORM`
  + `openEdit` extended; macOS form section rebuilt into **two variant
  groups** (Intel + Apple Silicon) each with URL/size/SHA-256, plus a
  **Mac Install Guide URL** field. SHA-256 labels now match the download
  page's reality (these fields are stored base64 digests, as published).
- Populated the v2.0.0 record via throwaway script (copy-in → node →
  removed): installer/portable URLs + exact byte sizes; the published
  checksums (verified against local EXE hashes); both Drive URLs + sizes
  (Intel ~99.6 MB, ARM ~95.0 MB); `guideUrl`; `pwaUrl
  =https://app.fxmtradekeeper.com`; stable; release date 2026-08-26;
  changelog (seed's). Upsert-by-version preserved `id`/createdAt.

## 24. Admin Manual update (commit `d0ec02b`)

- Overview section: added the new "Export Reports" button note.
- Reports section: entry points (sidebar "Reports" + Overview button),
  printable scopes, Print/Save-as-PDF, full CSV dataset list.
- Getting Started: sidebar area list now includes Reports.
- Release section already updated in the prior commit (removed the outdated
  "the download page will show whatever you enter here" claim; two Mac
  variants + guide + PWA URL steps).

## 25. QA + Deploy + Live Verification

- `node --check`/lint: `npm run lint` → 0 errors (5 pre-existing warnings
  only, none in new files). `npm run build` → green (all routes incl.
  `/admin/reports`, `/api/admin/export/[key]`, `/export-report/[scope]`).
- Deployments (prod alias always https://fxm-trade-keeper-website.vercel.app):
  - `085e795` build → deploy (Reports + Release population).
  - `d0ec02b` manual → deploy.
- Live checks (curl prod):
  - `/api/releases?latest=true` → full v2.0.0 record with all 5 artifacts,
    sizes, checksums, changelog. ✅
  - `/api/admin/export/downloads` → **401** unauthenticated. ✅
  - `/export-report/overview` → **307** redirect to `/admin/login`
    unauthenticated. ✅

## 26. Chat History (chronological)

| # | Who | Exchange | Action taken |
|---|---|---|---|
| 1 | User | "What did we do so far?" | Agent recapped telemetry + settings-nav session and delivered a full state summary (repo identities, Vercel projects, telemetry stack, open tasks). |
| 2 | User | Two new asks: (a) Admin export of reports into files that can be printed and emailed; (b) update Release Management with the releases already on the download site. | Plan-mode research: explored admin dataset shapes, releases API/model, download page source of truth; found no existing export code and the seeded row missing URLs. |
| 3 | User | Decisions: CSV + printable report; dedicated Reports page; populate admin only. | Plan locked and presented. |
| 4 | User | "go ahead" → (build mode) | Implemented Feature 1 (export lib, export API, printable `/export-report/[scope]`, `/admin/reports` page, print CSS, sidebar item, Overview button) and Feature 2 (schema macArm*/guideUrl, db push, releases API, ReleasesClient two-Mac UI, population script, manual update). Build + lint green. |
| 5 | Agent | Deployed + live-verified (release record complete; export 401; print 307), committed `085e795`. | Commit 1: "Add admin Reports (CSV exports + printable PDF) and complete Release 2.0.0 record". |
| 6 | User | "Please update the Admin Manual as we have new updates on the Admin page." | Added Overview Export Reports step, expanded Reports section, Getting Started sidebar list. |
| 7 | Agent | Built green, deployed, committed `d0ec02b`. | Commit 2: "Update Admin Manual for Reports page and Export Reports button". |
| 8 | User | "Please document this progress and Chat history." | This entry (Session 3) appended. |

## 27. Deployment / live state (2026-09-14)

| Commit | Work | Deploy |
|---|---|---|
| `0b2b652` | Telemetry intake + admin dashboard | Prod, verified |
| `085e795` | Reports (CSV + printable) + Release 2.0.0 populated | Prod, verified |
| `d0ec02b` | Admin Manual updates | Prod, verified |

- Live: `/admin/reports`, `/api/admin/export/[key]`, `/export-report/[scope]`,
  populated `/api/releases`, `/admin/releases` two-Mac form.
- PWA companion: telemetry client live (sw fkq-pwa-v6), Settings nav fix live
  (companion log).
- Repo note: the website repo has many unrelated pre-existing uncommitted
  changes (site.ts, WebAppCard/SecurityNotes download components from the
  PWA-first session, modified EXEs, etc.); per each session's user policy
  only this session's intended files were staged/committed.

### Open follow-ups
- Manual real-device install/offline QA for the PWA (Windows/macOS/Android/iOS);
  verify `/api/download-track` rows land as `PWA-WebApp` / `PWA-Android`.
- The two released Windows EXEs remain tracked + committed; future binary
  swaps must keep SHA-256 base64 + MB labels in sync (see Session 2 notes).
- Optional: wire the public DownloadCards page to the Release DB so admin
  edits drive the live downloads (deliberately deferred — "populate admin
  only" scope).

---

# Session 4 — PWA FXM Trade Keeper v2.0 Release: Web app as primary install option

Session date: Thursday 17 September 2026
Agent: opencode (Claude)
Same project (fxm-trade-keeper-website). Companion PWA app is the `FXM Trade Keeper v2.0 App` at `https://app.fxmtradekeeper.com`.

## 28. User Request

"The live hosted website is now showing old web information not the New version with the PWA FXM Trade Keeper v2.0 app: https://fxm-trade-keeper-website.vercel.app/download"

The website's `/download` page was still showing the old content (native downloads as primary). The new PWA-first version had been developed locally but never committed/pushed, so Vercel was serving the old committed version.

## 29. Root Cause

Per AGENTS.md: "Vercel deploys from GitHub commits only. Local file changes are invisible to Vercel."

The working directory had 10 modified + 3 untracked files with the new PWA v2.0 download page, but none were in Git history. The last commit was `7599135` (admin dashboard cache headers fix).

## 30. Local Changes Staged

**Modified files (10):**
- `.env.example` — updated env vars
- `.gitignore` — updated ignores
- `src/app/(public)/download/page.tsx` — new PWA-first download page
- `src/app/api/auth/login/route.ts` — auth updates
- `src/app/api/contact/route.ts` — contact form updates
- `src/app/api/download-track/route.ts` — download tracking for PWA
- `src/app/api/newsletter/route.ts` — newsletter updates
- `src/app/api/releases/latest/route.ts` — latest release API
- `src/components/download/DownloadCards.tsx` — new PWA card + desktop cards
- `src/components/home/DownloadCTA.tsx` — updated CTA for PWA

**New files (4):**
- `SESSION-LOG.md` — this log
- `src/components/download/SecurityNotes.tsx` — security/trust notes
- `src/components/download/WebAppCard.tsx` — PWA install card (device-detecting, platform-specific install steps)
- `src/lib/site.ts` — APP_URL / SITE_URL constants (`https://app.fxmtradekeeper.com`)

## 31. Key Features in New Download Page

- **Web App (PWA) as primary install path** — "Install in one click. No downloads. No warnings."
- Device-detecting `WebAppCard` shows platform-specific install steps:
  - Windows: Chrome/Edge address bar install icon
  - macOS: Safari Share→Add to Dock, Chrome/Edge install icon
  - Android: Chrome ⋮ menu → "Install app"
  - iOS: Safari Share → "Add to Home Screen"
- Works offline, no Google Play/App Store, no account, data stays on device
- Native desktop downloads (Windows Installer, Portable, Mac Intel, Mac ARM) as secondary options
- SHA-256 checksums for all artifacts
- Release info sidebar with Quick Setup (3 steps: Open → Install → Journal)

## 32. Deploy Actions

1. `git add -A` — staged all 14 files
2. `git commit -m "Release PWA FXM Trade Keeper v2.0 — Web app as primary install option with offline support, native downloads as secondary"`
3. `git push origin master` — triggered Vercel auto-deploy

## 33. Verification

- Vercel build triggered automatically on push
- Expected live in ~1-2 minutes at https://fxm-trade-keeper-website.vercel.app/download
- User confirmed: "Its now ok."

## 34. Chat History (condensed)

| # | Who | Exchange | Action |
|---|---|---|---|
| 1 | User | "The website is now showing old web information not the New version with the PWA FXM Trade Keeper v2.0 app" | Agent checked git status — found 14 uncommitted files with PWA v2.0 changes |
| 2 | Agent | Explained root cause: Vercel deploys from GitHub only; local changes invisible | Proposed deploy via commit + push |
| 3 | User | "Please do everything for me. I am a none technical person" | Agent executed full deploy: add, commit, push |
| 4 | User | "Its now ok. Please document this progress and chat history" | This entry appended |

## 35. Deployment State (2026-09-17)

| Commit | Work | Deploy |
|---|---|---|
| `a036eef` | Release PWA FXM Trade Keeper v2.0 — Web app primary, native secondary | Prod, verified |

- Live: `/download` now shows PWA web app as recommended install option
- PWA URL: `https://app.fxmtradekeeper.com` (from `src/lib/site.ts`)
- All download tracking routes updated for PWA platforms (`PWA-WebApp`, `PWA-Android`)
- Admin dashboard cache headers fix from `7599135` included

---

# Session 5 — Vercel deployment storage limit (10 GB) hit: move Windows exes off the deploy

Session date: Friday 18 September 2026
Agent: opencode (Claude)
Same project (fxm-trade-keeper-website).

## 36. User Request

User forwarded Vercel's usage email and asked what it meant for the website,
then asked to (1) check what's using deployment storage and (2) clean up old
deployments:

> "Your site is growing! Your free team sizodlo-6324 has used 100% of the
> included free tier usage for Deployment Storage (10 GB). Upgrade to Pro."

Confirmed scope choices: **delete old deployments keeping only the current
live one**, and **host the Windows installers on GitHub Releases**.

## 37. Root Cause

The two Windows installer binaries lived in `public/downloads/` and were
copied into **every** Vercel deployment:

- `public/downloads/FXM-TradeKeeper-Setup-2.0.0.exe` — **76.16 MB**
- `public/downloads/FXM-TradeKeeper-2.0.0-Portable.exe` — **75.96 MB**
- Everything else (app + screenshots) — ~2 MB

`.vercelignore` even carried an explicit keep-note: *"public/downloads/*.exe
must NOT be ignored — they are served on the site."* With **57 deployments**
accumulated (daily deploys since the site launched), ~152 MB × ~60 ≈ **9+ GB**
blew through the 10 GB free limit.

The two macOS zips were already hosted externally (Google Drive links);
only the Windows exes were self-hosted.

## 38. Part 1 — Vercel cleanup (keep only current live)

1. Re-authenticated the Vercel CLI (`npx vercel login` — browser device flow).
2. Identified the current live production deployment via
   `npx vercel inspect https://fxm-trade-keeper-website.vercel.app --json`
   → `dpl_5D7KFDUXdnXqSgM8A7rVeS2hDcYP`
   (`...-3znnu4qy8-...`) — the one to keep.
3. Built the delete list from `npx vercel ls --limit 100 --json`
   (57 deployments total → 56 to remove), sanity-checked keep-vs-delete,
   then `npx vercel remove <urls> --yes` → **"Success! Removed 56"**.
4. Only the live deployment remained; site verified **200**.
5. After the small post-fix deploy (below), removed the old pre-fix
   deployment too (`3znnu4qy8`, ~152 MB of exes) — hallway check:
   `vercel inspect fxm-trade-keeper-website.vercel.app` confirmed the new
   deployment was aliased first.

## 39. Part 2 — Host exes on GitHub Releases (prevent recurrence)

1. Created release **`v2.0.0-desktop-exes`** on
   `Sizo-Dlodlo/fxm-trade-keeper-website` and uploaded both exes
   (verified: Portable 76.0 MB, Setup 76.2 MB).
2. `src/components/download/DownloadCards.tsx` — both Windows
   `href`s changed from `/downloads/...exe` to the GitHub asset URLs
   (with `target="_blank" rel="noopener noreferrer"`, mirroring the Mac
   card pattern). `onClick` tracking unchanged.
3. Deleted both exes from `public/downloads/` (only the tiny Mac guide PDF
   remains). `public/` dropped **154 MB → 2 MB**.
4. Updated the stale `.vercelignore` comment to document the change.
5. `npm run build` → green.

## 40. Commit + Deploy + Live Verification

- Commit **`10983a3`** "Host Windows exe downloads on GitHub Releases to fix
  Vercel deployment storage limit" (4 files: `.vercelignore`, DownloadCards,
  2 exe deletions; pre-existing `SESSION-LOG.md` uncommitted edits left out
  of this commit) → pushed `master` → Vercel auto-deploy.
- Production deploy **`83ut4o508`** (Ready ~56s), now the live alias.
- Live checks:
  - `https://fxm-trade-keeper-website.vercel.app` → **200** ✅
  - `/download` → **200**, page contains the new GitHub release links ✅
  - `https://github.com/.../v2.0.0-desktop-exes/FXM-TradeKeeper-Setup-2.0.0.exe`
    → **200**, Content-Length 79,856,356 B (~76 MB) ✅
- Storage math: ~155 MB/deployment → **~2–4 MB/deployment** →
  the 10 GB free allowance now lasts ~75× longer.

## 41. Admin Release DB records synced (follow-up)

- Found one Release row (`v2.0.0`, id `cmtcl8yol0005v818tttia47w`) still
  pointing at the old local paths:
  - `installerUrl: /downloads/FXM-TradeKeeper-Setup-2.0.0.exe`
  - `portableUrl: /downloads/FXM-TradeKeeper-2.0.0-Portable.exe`
- Updated both to the `v2.0.0-desktop-exes` GitHub asset URLs via a
  throwaway Prisma script (copy-in → run → removed). Direct
  `DATABASE_URL_UNPOOLED` connection used per AGENTS.md; added
  `connect_timeout=20` to survive Neon free-tier scale-to-zero cold starts.
- Mac (Google Drive) URLs unchanged — already external.
- DB-only change → no commit/deploy required.

## 42. Chat History (condensed)

| # | Who | Exchange | Action |
|---|---|---|---|
| 1 | Vercel | Usage email: 100% of 10 GB deployment storage used | Explained: free tier limit, current site unaffected, new deploys blocked until space freed or upgrade |
| 2 | User | "Check the Vercel project + help clean up old deployments" | Diagnosed root cause (152 MB exes in every deploy); audited public/ + .next sizes; found 57 deployments |
| 3 | User | Choices: keep only current live; GitHub Releases hosting | Deleted 56 old deployments (kept live, kept `3znnu4qy8` until new deploy), re-authed CLI |
| 4 | User | "go ahead" | Created `v2.0.0-desktop-exes` release, uploaded exes, updated DownloadCards hrefs, removed exes from public/, fixed .vercelignore, committed `10983a3`, pushed → deploys `83ut4o508` |
| 5 | Agent | Live verification passed; user asked to sync admin release records | Updated DB `installerUrl`/`portableUrl` to GitHub URLs via throwaway script |
| 6 | User | "Please document this progress and save chat history" | This entry (Session 5) appended |

## 43. Deployment / live state (2026-09-18)

| Commit | Work | Deploy |
|---|---|---|
| `10983a3` | Windows exes → GitHub Releases; Vercel storage freed | Prod `83ut4o508`, verified |

- Live: only **1 deployment** on the project; site + `/download` 200; Windows
  downloads served from GitHub release `v2.0.0-desktop-exes`.
- Admin → Releases v2.0.0 record windows URLs point at GitHub.
- Free storage should read well under 10 GB in the Vercel dashboard
  (Usage → Storage) once the meter refreshes.

## 44. Next Steps / Notes

- **Do NOT re-add installer binaries to `public/`** — that is what filled
  deployment storage. Future binary swaps = update the GitHub release
  assets, re-verify SHA-256 base64 + MB labels in `DownloadCards.tsx`.
- Optional: wire the public DownloadCards page to the Release DB (deferred
  earlier) so admin edits drive the live downloads — revisit if download
  URLs change again.
- Vercel CLI re-auth note: `vercel login` stored credentials anew; the old
  token had expired silently (the CLI reported "Logged out" until re-login).
