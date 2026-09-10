@echo off
title FXM Trade Keeper - Deploy
echo ============================================
echo   FXM Trade Keeper - Deploy to Production
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Staging all changes...
git add -A
echo.

echo [2/3] Committing...
set /p MSG="Enter commit message (or press Enter for default): "
if "%MSG%"=="" (
    set MSG=Update website - %date% %time%
)
git commit -m "%MSG%"
echo.

echo [3/3] Pushing to GitHub (triggers Vercel auto-deploy)...
git push origin master
echo.

echo ============================================
echo   Deploy complete! Vercel is building now.
echo   Check: https://fxm-trade-keeper-website.vercel.app
echo ============================================
pause
