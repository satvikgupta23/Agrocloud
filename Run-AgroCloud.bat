@echo off
title AgroCloud - Precision Agriculture & Field Intelligence
echo ====================================================================
echo   🌾 AgroCloud - Precision Agriculture Platform Launcher
echo ====================================================================
echo.

cd /d "%~dp0apps\web"

if not exist ".env.local" (
    if exist ".env.example" (
        echo [*] Initializing environment configuration (.env.local)...
        copy ".env.example" ".env.local" >nul
    )
)

if not exist "node_modules\" (
    echo [*] Installing dependencies (first run only, please wait)...
    call npm.cmd install
    if errorlevel 1 (
        echo [!] npm.cmd install encountered an issue. Trying npm...
        call npm install
    )
)

echo [*] Starting Next.js Web Application on http://localhost:3000 ...
echo [*] Opening your browser...
start http://localhost:3000

echo.
echo ====================================================================
echo   AgroCloud is running! Keep this window open.
echo   Press Ctrl+C to stop the server when finished.
echo ====================================================================
echo.

call npm.cmd run dev
if errorlevel 1 (
    call npm run dev
)

pause

