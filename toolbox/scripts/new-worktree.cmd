@echo off
REM ============================================================================
REM TOOLBOX SCRIPT: new-worktree.cmd
REM Muc dich: Tao nhanh Git Worktree chuan cho Orca ma khong can go lenh dai.
REM Cach dung: toolbox\scripts\new-worktree.cmd <ten-nhanh>
REM Vi du:     toolbox\scripts\new-worktree.cmd feat-card-combat
REM ============================================================================

if "%~1"=="" (
  echo Usage: toolbox\scripts\new-worktree.cmd ^<branch-name^>
  exit /b 1
)

set BRANCH_NAME=%~1
set WORKTREE_PATH=..\workspaces\%BRANCH_NAME%

echo Creating Orca worktree at %WORKTREE_PATH% on branch %BRANCH_NAME%...
git worktree add -b %BRANCH_NAME% "%WORKTREE_PATH%" main
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Could not create worktree. Check if branch already exists.
  exit /b %ERRORLEVEL%
)

echo [SUCCESS] Worktree ready at %WORKTREE_PATH%
exit /b 0
