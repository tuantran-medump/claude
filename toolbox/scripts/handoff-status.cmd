@echo off
REM ============================================================================
REM TOOLBOX SCRIPT: handoff-status.cmd
REM Muc dich: Gom nhanh trang thai Git va HANDOFF.md trong 1 lenh de tiet kiem
REM           token cho Codex / Claude / Antigravity khi bat dau hoac tiep quan.
REM ============================================================================

echo === [1] GIT BRANCH ^& WORKTREE STATUS ===
git branch --show-current
git status --short

echo.
echo === [2] RECENT COMMITS (LAST 3) ===
git log -n 3 --oneline

echo.
echo === [3] MODIFIED FILES DIFF STAT ===
git diff --stat

echo.
echo === [4] CURRENT HANDOFF.md SUMMARY ===
type HANDOFF.md
