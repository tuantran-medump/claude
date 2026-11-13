# HANDOFF.md — Bảng trạng thái & chuyển giao công việc (State-on-Disk v3.0)

> **Failsafe nhanh khi một agent hết token trên Orca:** mở agent dự phòng (Codex hoặc Antigravity) trong cùng worktree và gửi:
> `"Chế độ Failsafe Takeover: chạy toolbox\scripts\handoff-status.cmd để đọc git diff và HANDOFF.md, hoàn thiện phần đang dở rồi kiểm tra bằng toolbox\scripts\verify-all.cmd."`

---

## 1. Nhiệm vụ hiện tại
- **Chế độ:** `B` (xem Mục 0 của `PROMPTS_PLAYBOOK.md`)
- **Tính năng / Task:** `Bỏ code game, giữ Next.js và dashboard task`
- **Spec:** `docs/specs/<ngày>-<tính-năng>.md` (chép từ `toolbox/templates/WEB_SPEC.md`)
- **Nhánh / Worktree:** `codex/remove-game` (từ `docs/web-kit`)
- **Điều phối:** `Claude — chế độ B`
- **Code chính:** `Codex (GPT Pro — 65%)`
- **Architect:** `Claude (Claude Pro — ≤10%)`

---

## 2. Tóm tắt ngữ cảnh
- **Bộ kit:** [`PLAYBOOK.md`](./PLAYBOOK.md), [`AGENTS.md`](./AGENTS.md), [`CLAUDE.md`](./CLAUDE.md), [`GEMINI.md`](./GEMINI.md), [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md), [`FEATURE_SPEC_TEMPLATE.md`](./FEATURE_SPEC_TEMPLATE.md), [`MULTI_AGENT_CHECKLIST.md`](./MULTI_AGENT_CHECKLIST.md).
- **Toolbox:** [`toolbox/docs/TOOLBOX_INDEX.md`](./toolbox/docs/TOOLBOX_INDEX.md) — scripts `verify-all.cmd`, `handoff-status.cmd`, `new-worktree.cmd`; template [`WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md).
- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind 4 + Vitest.
- **Code web hiện có:** `src/types/index.ts`, `src/server/taskService.ts`, `src/app/api/tasks/route.ts`, `src/hooks/useAgentTasks.ts`, `src/components/ui/AgentDashboard.tsx`, `tests/taskService.test.ts`.

---

## 3. Tiến độ (Checklist theo Playbook)
- [ ] Bước 1: Antigravity gom yêu cầu, ghi mục tiêu + file cần sửa vào đây
- [ ] Bước 2: Claude (hoặc Failsafe) viết spec + chốt `src/types/`
- [ ] Bước 3: Codex code `src/server/`, `src/app/api/`, `src/hooks/` + `tests/`
- [ ] Bước 4: Antigravity dựng UI `src/app/`, `src/components/ui/`
- [ ] Bước 5: `verify-all.cmd` xanh + đối chiếu Checklist Mục 4 `PLAYBOOK.md`

---

## 4. Trạng thái đang làm dở
- **File vừa hoàn thành:** xóa code game và sửa trang web.
- **File đang sửa dở:** không có.
- **Bước tiếp theo:** chờ Claude review.

## 5. Cần quyết / chờ review
- Chờ Claude review nhánh codex/remove-game.
- Removed: src/game
- Removed: src/types/game.ts
- Removed: src/components/ui/TacticalGridGame.tsx
- Removed: tests/gameEngine.test.ts
- Removed: toolbox/modules

- Tiến độ: src/app/page.tsx đã bỏ component game và đổi nội dung sang web.
- Tiến độ: TOOLBOX_INDEX.md đã bỏ mục 3.

## 6. Kết quả dọn code cũ — chờ Claude review

- Nhánh `codex/remove-game` tạo trực tiếp từ `docs/web-kit`; không từ main.
- Đã xóa: `src/game/engine.ts` (toàn bộ `src/game/`), `src/types/game.ts`, `src/components/ui/TacticalGridGame.tsx`, `tests/gameEngine.test.ts`, `toolbox/modules/soundSynth.ts`, `toolbox/modules/storageManager.ts`, `toolbox/modules/tweenParticles.ts` (toàn bộ `toolbox/modules/`).
- Đã sửa: `src/app/page.tsx` bỏ import/render game, đổi tiêu đề/mô tả sang web; `toolbox/docs/TOOLBOX_INDEX.md` bỏ mục 3. `src/app/layout.tsx` không có chữ game và `src/types/index.ts` không re-export game nên giữ nguyên.
- Trước khi xóa đã chạy `rg -n 'game|Game|soundSynth|storageManager|tweenParticles|TacticalGrid' src/ tests/ toolbox/`. Rà lại sau xóa: không còn import game/module bị xóa; chỉ còn nhãn tĩnh trong `src/server/taskService.ts` và `src/components/ui/AgentDashboard.tsx`. Không sửa hai file này vì ngoài phạm vi; taskService không import code game.
- Kiểm tra: `toolbox\scripts\verify-all.cmd` PASS typecheck, 3/3 test taskService, Next.js production build; in `[SUCCESS] All Playbook Verification Checks Passed (0 Errors)!`. `git diff --check` sạch.
- Đối chiếu Checklist PLAYBOOK: file điều phối giữ nguyên; HANDOFF phản ánh đúng nhánh/chế độ/task; task dashboard/API/hook và test nghiệp vụ giữ nguyên, typecheck/test/build xanh. Đây là cleanup, không tạo spec tính năng mới hay mở rộng nghiệm thu giao diện/accessibility của dashboard.
- Việc lệch plan: dùng `git switch -c codex/remove-game docs/web-kit` thay `new-worktree.cmd` vì script hard-code main, trái nhánh gốc người dùng chỉ định. Verifier tạo file phụ `All` do dấu `>` trong echo; đã xóa artifact này, không sửa script. `debug.log` đã có sẵn, không đọc/sửa/commit.
- Không sửa các tài liệu/quy trình, scripts/templates và server/API/hooks được bảo vệ. Không push/merge/deploy. Bước tiếp theo: chờ Claude review.
