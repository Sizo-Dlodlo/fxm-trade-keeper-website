# Incident Report: Windows Download Buttons Returned 404

**Date:** 2026-09-11
**Reported by:** Deploy / production user report
**Severity:** High (live downloads broken for all Windows users)
**Status:** Resolved + deployed

## Summary

The **Windows Installer** and **Portable Edition** download buttons on the
`/download` page returned **404 "This page could not be found"** in
production. Clicking either button navigated the user to a Next.js 404 page
instead of downloading the app.

The **macOS buttons** (hosted on Google Drive) and the **Mac Setup Guide PDF**
were confirmed working and are unaffected.

## Root Cause

The Windows installers were excluded from version control:

```
# .gitignore (before fix)
public/downloads/*.exe
public/downloads/*.blockmap
```

Vercel deploys from GitHub commits only, and the two `.exe` files
(`FXM-TradeKeeper-Setup-2.0.0.exe`, `FXM-TradeKeeper-2.0.0-Portable.exe`)
were never committed. The files existed only on the local machine under
`public/downloads/`, so production never had them. The download buttons
pointed at `/downloads/*.exe`, which 404'd.

This mirrored the pattern from the 2026-09-10 incident documented in
`AGENTS.md` (local file changes not committed → Vercel serves stale/outdated
content), but for **ignored** files that could never be committed.

## Evidence

Verified against production before the fix:

| URL | Status | Note |
|-----|--------|------|
| `/downloads/FXM-TradeKeeper-Setup-2.0.0.exe` | 404 | Missing on Vercel |
| `/downloads/FXM-TradeKeeper-2.0.0-Portable.exe` | 404 | Missing on Vercel |
| `/downloads/FXM-Trade-Keeper-Mac-Install-Guide.pdf` | 200 | OK (committed) |
| Google Drive Mac x64 link | 200 | OK (external) |
| Google Drive Mac arm64 link | 200 | OK (external) |
| `/download` page | 200 | Page rendered fine |
| `/api/download-track` | 200 | Tracking worked |

## Fix

1. Removed the ignore rules for the installer binaries from `.gitignore`:
   ```gitignore
   # Windows app installers are committed so Vercel can serve them
   # public/downloads/*.blockmap
   ```
2. Force-added both EXEs to git (they had no pre-existing tracking history):
   ```bash
   git add -f public/downloads/FXM-TradeKeeper-Setup-2.0.0.exe
   git add -f public/downloads/FXM-TradeKeeper-2.0.0-Portable.exe
   ```
3. Committed and pushed to `master` (`6fcfdfe`), which triggered the Vercel
   auto-deploy.

## Verification (post-deploy)

| URL | Status | Content-Length |
|-----|--------|----------------|
| `/downloads/FXM-TradeKeeper-Setup-2.0.0.exe` | 200 | 80077734 |
| `/downloads/FXM-TradeKeeper-2.0.0-Portable.exe` | 200 | 79876069 |

Both lengths match the `installerSize` / `portableSize` values in the
`Release` record in the database.

## Design Notes / Future Considerations

- GitHub accepted the ~76 MB files (they are under the 100 MB hard limit) but
  printed a warning that they exceed GitHub's recommended 50 MB size. The
  repository grew by roughly 160 MB.
- Each future release adds ~160 MB of binaries to the repo and every Vercel
  build clones/uploads them. If this becomes a problem:
  - Host the Windows EXEs on Google Drive like the macOS builds (the pattern
    the original `.gitignore` comment intended), or
  - Use an object storage service (e.g. Neon Object Storage / S3) for release
    binaries and store URLs in the `Release` table (the admin Releases UI
    already supports custom installer/portable URLs).
- The hardcoded file sizes / SHA-256 hashes in
  `src/components/download/DownloadCards.tsx` must be updated whenever a new
  build is published; the live page does not read them from the database yet.

## Files Changed

- `.gitignore` — removed `public/downloads/*.exe` ignore rules
- `public/downloads/FXM-TradeKeeper-Setup-2.0.0.exe` — now committed
- `public/downloads/FXM-TradeKeeper-2.0.0-Portable.exe` — now committed

## Related

- `AGENTS.md` → CRITICAL: Deploy Workflow (Vercel deploys from Git only)
- `src/components/download/DownloadCards.tsx` → download button URLs + hashes
- `prisma/schema.prisma` → `Release` / `DownloadEvent` models