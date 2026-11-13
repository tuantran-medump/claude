# HANDOFF.md — Bảng trạng thái & chuyển giao công việc (State-on-Disk v3.0)

> **Failsafe nhanh khi một agent hết token trên Orca:** mở agent dự phòng (Codex hoặc Antigravity) trong cùng worktree và gửi:
> `"Chế độ Failsafe Takeover: chạy toolbox\scripts\handoff-status.cmd để đọc git diff và HANDOFF.md, hoàn thiện phần đang dở rồi kiểm tra bằng toolbox\scripts\verify-all.cmd."`

---

## 1. Nhiệm vụ hiện tại
- **Chế độ:** `0` (xem Mục 0 của `PROMPTS_PLAYBOOK.md`)
- **Tính năng / Task:** `Chưa có — chờ người dùng giao tính năng web mới`
- **Spec:** `docs/specs/<ngày>-<tính-năng>.md` (chép từ `toolbox/templates/WEB_SPEC.md`)
- **Nhánh / Worktree:** `main`
- **Điều phối:** `Antigravity (Gemini Pro — 25%)`
- **Code chính:** `Codex (GPT Pro — 65%)`
- **Architect:** `Claude (Claude Pro — ≤10%)`

---

## 2. Tóm tắt ngữ cảnh
- **Bộ kit:** [`PLAYBOOK.md`](./PLAYBOOK.md), [`AGENTS.md`](./AGENTS.md), [`CLAUDE.md`](./CLAUDE.md), [`GEMINI.md`](./GEMINI.md), [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md), [`FEATURE_SPEC_TEMPLATE.md`](./FEATURE_SPEC_TEMPLATE.md), [`MULTI_AGENT_CHECKLIST.md`](./MULTI_AGENT_CHECKLIST.md).
- **Toolbox:** [`toolbox/docs/TOOLBOX_INDEX.md`](./toolbox/docs/TOOLBOX_INDEX.md) — scripts `verify-all.cmd`, `handoff-status.cmd`, `new-worktree.cmd`; template [`WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md).
- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind 4 + Vitest.
- **Code web hiện có:** `src/types/index.ts`, `src/server/taskService.ts`, `src/app/api/tasks/route.ts`, `src/hooks/useAgentTasks.ts`, `src/components/ui/AgentDashboard.tsx`, `tests/taskService.test.ts`.
- **Di sản game (chờ dọn, chưa xóa):** `src/game/`, `src/types/game.ts`, `src/components/ui/TacticalGridGame.tsx` (đang được `src/app/page.tsx` import), `tests/gameEngine.test.ts`, `toolbox/modules/` (soundSynth, storageManager, tweenParticles). Việc dọn là một task riêng cho Codex, phải giữ `verify-all` xanh.

---

## 3. Tiến độ (Checklist theo Playbook)
- [ ] Bước 1: Antigravity gom yêu cầu, ghi mục tiêu + file cần sửa vào đây
- [ ] Bước 2: Claude (hoặc Failsafe) viết spec + chốt `src/types/`
- [ ] Bước 3: Codex code `src/server/`, `src/app/api/`, `src/hooks/` + `tests/`
- [ ] Bước 4: Antigravity dựng UI `src/app/`, `src/components/ui/`
- [ ] Bước 5: `verify-all.cmd` xanh + đối chiếu Checklist Mục 4 `PLAYBOOK.md`

---

## 4. Trạng thái đang làm dở
- **File vừa hoàn thành:** bộ tài liệu đã chuyển từ game sang web (v3.0).
- **File đang sửa dở:** không có.
- **Bước tiếp theo:** người dùng giao tính năng web đầu tiên → dùng Prompt 0-1 (hoặc B-1 nếu vắng Antigravity) trong `PROMPTS_PLAYBOOK.md`.

## 5. Cần quyết / chờ review
- Không có.
