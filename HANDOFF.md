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
- [x] Task dọn game đã xong: xóa engine/component/types/test/modules cũ, giữ Next.js và dashboard task.
- [x] Đã đổi nhãn sang Server/API/Hooks và spec web; badge v3.0.
- [x] Grep rỗng, verify-all in [SUCCESS], git diff --check sạch.

---

## 4. Trạng thái đang làm dở
- **File vừa hoàn thành:** xóa `src/game/engine.ts` (toàn bộ `src/game/`), `src/types/game.ts`, `src/components/ui/TacticalGridGame.tsx`, `tests/gameEngine.test.ts`, `toolbox/modules/soundSynth.ts`, `toolbox/modules/storageManager.ts`, `toolbox/modules/tweenParticles.ts` (toàn bộ `toolbox/modules/`); sửa trang chủ, danh mục Toolbox và nhãn dashboard/task.
- **File đang sửa dở:** không có.
- **Bước tiếp theo:** chờ Claude review.

## 5. Cần quyết / chờ review
Không có.

## 6. Kết quả dọn code cũ — chờ Claude review

- Nhánh `codex/remove-game` tạo trực tiếp từ `docs/web-kit`; không từ main.
- Đã sửa: `src/app/page.tsx` bỏ import/render game, đổi tiêu đề/mô tả sang web; `toolbox/docs/TOOLBOX_INDEX.md` bỏ mục 3. `src/app/layout.tsx` không có chữ game và `src/types/index.ts` không re-export game nên giữ nguyên.
- Kiểm tra: `toolbox\scripts\verify-all.cmd` PASS typecheck, 3/3 test taskService, Next.js production build; in `[SUCCESS] All Playbook Verification Checks Passed (0 Errors)!`. `git diff --check` sạch.
- Đối chiếu Checklist PLAYBOOK: file điều phối giữ nguyên; HANDOFF phản ánh đúng nhánh/chế độ/task; task dashboard/API/hook và test nghiệp vụ giữ nguyên, typecheck/test/build xanh. Đây là cleanup, không tạo spec tính năng mới hay mở rộng nghiệm thu giao diện/accessibility của dashboard.
- Việc lệch plan: dùng `git switch -c codex/remove-game docs/web-kit` thay `new-worktree.cmd` vì script hard-code main, trái nhánh gốc người dùng chỉ định. Verifier tạo file phụ `All` do dấu `>` trong echo; đã xóa artifact này, không sửa script. `debug.log` đã có sẵn, không đọc/sửa/commit.

## 7. Hoàn tất nhãn web v3.0
- Sửa nhãn Codex, hai tiêu đề task và badge theo yêu cầu. tests/taskService.test.ts không so sánh các chuỗi này nên giữ nguyên.
- `git grep -niE "game|GAME_BALANCE" -- src tests toolbox`: không có kết quả (exit 1 đúng nghĩa không khớp).
- `toolbox\scripts\verify-all.cmd`: typecheck PASS, 3/3 test PASS, production build PASS; in `[SUCCESS] All Playbook Verification Checks Passed (0 Errors)!`.
- `git diff --check`: sạch. Việc lệch plan: không. Chỉ dọn file All do verifier tạo, giữ nguyên debug.log có sẵn. Không push/merge. Chờ Claude review.
