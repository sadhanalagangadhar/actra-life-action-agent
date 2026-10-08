@echo off
setlocal
cd /d "%~dp0"
if not exist backend\.env copy backend\.env.example backend\.env >nul
if not exist frontend\.env copy frontend\.env.example frontend\.env >nul
start "ACTRA Backend" cmd /k "cd /d %~dp0backend && npm install && npm run dev"
start "ACTRA Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"
echo ACTRA startup windows opened.
pause
