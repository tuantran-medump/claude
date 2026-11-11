@echo off
REM ============================================================================
REM TOOLBOX SCRIPT: verify-all.cmd
REM Muc dich: Kiem tra toan dien TypeScript, Unit Tests va Build truoc khi ban giao.
REM An toan 100%: Chi goi .cmd, KHONG dung .ps1 (Tuan thu quy tac bao mat).
REM ============================================================================

echo [1/4] Checking mandatory Multi-Agent Kit and Playbook files...
if not exist "PLAYBOOK.md" (
  echo [ERROR] Missing PLAYBOOK.md!
  exit /b 1
)
if not exist "AGENTS.md" (
  echo [ERROR] Missing AGENTS.md!
  exit /b 1
)
if not exist "CLAUDE.md" (
  echo [ERROR] Missing CLAUDE.md!
  exit /b 1
)
if not exist "GEMINI.md" (
  echo [ERROR] Missing GEMINI.md!
  exit /b 1
)
if not exist "HANDOFF.md" (
  echo [ERROR] Missing HANDOFF.md!
  exit /b 1
)
echo       -> All orchestration files present.

echo [2/4] Running TypeScript strict typecheck (npm.cmd run typecheck)...
call npm.cmd run typecheck
if %ERRORLEVEL% neq 0 (
  echo [ERROR] TypeScript typecheck failed!
  exit /b %ERRORLEVEL%
)

echo [3/4] Running Unit and Game Logic Tests (npm.cmd test)...
call npm.cmd test
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Unit tests failed!
  exit /b %ERRORLEVEL%
)

echo [4/4] Running Production Bundle Check (npm.cmd run build)...
call npm.cmd run build
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Production build failed!
  exit /b %ERRORLEVEL%
)

echo ============================================================================
echo [SUCCESS] All Playbook Verification Checks Passed (0 Errors)!
echo ============================================================================
exit /b 0
