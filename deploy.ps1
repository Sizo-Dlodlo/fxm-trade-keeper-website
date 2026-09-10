Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  FXM Trade Keeper - Deploy to Production" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

Write-Host "[1/3] Staging all changes..." -ForegroundColor Yellow
git add -A

Write-Host "[2/3] Committing..." -ForegroundColor Yellow
$msg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($msg)) {
    $msg = "Update website - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}
git commit -m $msg

Write-Host "[3/3] Pushing to GitHub (triggers Vercel auto-deploy)..." -ForegroundColor Yellow
git push origin master

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Deploy complete! Vercel is building now." -ForegroundColor Green
Write-Host "  Check: https://fxm-trade-keeper-website.vercel.app" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
