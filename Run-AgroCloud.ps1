# AgroCloud - Precision Agriculture Platform Launcher (PowerShell)
Write-Host "====================================================================" -ForegroundColor Green
Write-Host "  🌾 AgroCloud - Precision Agriculture Platform Launcher" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Green
Write-Host ""

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$ScriptDir\apps\web"

if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Write-Host "[*] Creating .env.local from example..." -ForegroundColor Cyan
        Copy-Item ".env.example" ".env.local"
    }
}

if (-not (Test-Path "node_modules")) {
    Write-Host "[*] Installing frontend dependencies (first-time only)..." -ForegroundColor Yellow
    npm.cmd install
}

Write-Host "[*] Launching Next.js server on http://localhost:3000 ..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Green
Write-Host "  AgroCloud is running! Keep this terminal open." -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop the server when finished." -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Green
Write-Host ""

npm.cmd run dev

