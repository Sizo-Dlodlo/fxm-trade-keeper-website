# Chat History — 2026-09-11: Windows Download 404 Fix

## Session

**Model/Agent:** opencode (big-pickle)
**Repo:** FXM Trade Keeper Website v1.0 (`fxm-trade-keeper-website/`)
**Result:** Windows download 404 fixed, deployed, incident documented.

---

## 1. User request

> "There is an error when I click to download buttons for the Windows and Mac
> apps including the installation instructions."

## 2. Investigation

1. Mapped download-related code with an explore agent. Key files found:
   - `src/components/download/DownloadCards.tsx` (all download buttons)
   - `src/app/(public)/download/page.tsx` (download page)
   - `src/app/api/download-track/route.ts` (click tracking API)
   - `src/app/api/releases/latest/route.ts` (DB-backed release metadata)
2. Read `DownloadCards.tsx`: Windows buttons point to local
   `/downloads/*.exe`; Mac buttons point to Google Drive; PDF guide is local.
3. Checked `git ls-files public/downloads/` → only the PDF was tracked.
4. Read `.gitignore` → `public/downloads/*.exe` was ignored.
5. HEAD requests against production:
   - Both Windows EXEs → **404**
   - Mac Google Drive links → 200
   - Mac Setup Guide PDF → 200
   - `/download` page → 200; `/api/download-track` POST → 200
6. Queried `/api/releases/latest` → DB `Release` record also pointed at the
   same 404 local URLs for Windows; its `macUrl` pointed at a nonexistent
   `.dmg` (page doesn't use it — buttons hardcode URLs).
7. Checked Vercel limits (Hobby "Static file uploads: 100 MB") and GitHub's
   50 MB recommendation / 100 MB hard file limit.
8. Verified the PDF (5.5 KB) was valid ReportLab output (not corrupted).

## 3. Clarifying questions → user answers

Q: How should I host the Windows EXEs?
- Answer: **"Commit EXEs to git"**

Q: What does the Mac/guide error show?
- Answer: **"I was wrong they work as expected"**

So the only real defect was the Windows EXE 404s; Mac + PDF were confirmed
working.

## 4. Fix applied

1. `.gitignore` — replaced the exe ignore rules with a comment noting the
   installers are committed so Vercel can serve them.
2. Staged the binaries explicitly:
   ```bash
   git add -f public/downloads/FXM-TradeKeeper-Setup-2.0.0.exe
   git add -f public/downloads/FXM-TradeKeeper-2.0.0-Portable.exe
   ```
3. Commit message: "Fix Windows app downloads: commit EXE installers so
   Vercel serves them. Previously gitignored, causing 404 on the setup and
   portable download buttons."
4. Pushed to `master` → `6fcfdfe`.
5. Polled Vercel until deployment propagated; both EXEs returned 200.

## 5. Verification

- `/downloads/FXM-TradeKeeper-Setup-2.0.0.exe` → 200, 80077734 bytes
- `/downloads/FXM-TradeKeeper-2.0.0-Portable.exe` → 200, 79876069 bytes

Both match the DB `Release.installerSize` / `Release.portableSize`.

## 6. Notes / future considerations

- GitHub warned about >50 MB files (accepted, under 100 MB hard limit).
- Repo grew ~160 MB; every deploy carries the binaries.
- If size becomes an issue: move Windows EXEs to Google Drive like the Mac
  builds (the original .gitignore intent), and/or read release metadata from
  the `Release` table instead of hardcoding in `DownloadCards.tsx`.
- `DownloadCards.tsx` hardcodes sizes/hashes — must be updated per new build.

## 7. Deliverables

- `docs/2026-09-11-windows-download-404-incident.md` (incident report)
- This chat history file