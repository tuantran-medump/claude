# HANDOFF.md — Bảng Trạng thái & Chuyển giao Công việc (State-on-Disk v2.0)

> **Hướng dẫn Failsafe nhanh khi 1 Agent hết token trên Orca:**
> Mở Agent dự phòng (**Codex** hoặc **Antigravity**) ngay trong cùng Worktree và chạy:
> `"Chế độ Failsafe Takeover: Hãy chạy toolbox\scripts\handoff-status.cmd để đọc trạng thái Git diff và HANDOFF.md hiện tại, sau đó hoàn thiện nốt và kiểm tra bằng toolbox\scripts\verify-all.cmd."`

---

## 1. Nhiệm vụ Hiện tại (Active Task)
- **Tên tính năng / Task**: `Hoàn thiện Multi-Agent Starter Kit v2.0 (Codex Code Chính 65% • Antigravity Điều Phối 25% • Claude Phụ ≤10% + Failsafe), Toolbox tái sử dụng & Game HTML 2D Grid/Merge + Card Roguelike`
- **Nhánh / Worktree**: `main`
- **Agent điều phối chính**: `Antigravity (Gemini Pro — 25%)`
- **Agent code chính**: `Codex (GPT Pro — 65%)`
- **Agent phụ (Architect đầu kỳ)**: `Claude (Claude Pro — ≤10% + Zero-Claude Failsafe)`

---

## 2. Tóm tắt Ngữ cảnh (Context Brief)
- **Playbook & Bộ Kit Điều phối v2.0**:
  - [`PLAYBOOK.md`](./PLAYBOOK.md): Mục tiêu, quy trình 5 bước, quy định bắt buộc dùng Toolbox, Failsafe 3 lớp và Checklist Nghiệm thu 10 tiêu chuẩn.
  - [`AGENTS.md`](./AGENTS.md), [`CLAUDE.md`](./CLAUDE.md), [`GEMINI.md`](./GEMINI.md), [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md), [`FEATURE_SPEC_TEMPLATE.md`](./FEATURE_SPEC_TEMPLATE.md), [`MULTI_AGENT_CHECKLIST.md`](./MULTI_AGENT_CHECKLIST.md).
- **Toolbox Tái sử dụng (`toolbox/`)**:
  - Danh mục: [`toolbox/docs/TOOLBOX_INDEX.md`](./toolbox/docs/TOOLBOX_INDEX.md)
  - Scripts: [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd), [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd), [`toolbox/scripts/new-worktree.cmd`](./toolbox/scripts/new-worktree.cmd)
  - Modules: [`toolbox/modules/soundSynth.ts`](./toolbox/modules/soundSynth.ts), [`toolbox/modules/storageManager.ts`](./toolbox/modules/storageManager.ts), [`toolbox/modules/tweenParticles.ts`](./toolbox/modules/tweenParticles.ts)
  - Templates: [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md)
- **Code Game HTML 2D (Grid/Merge + Card Deckbuilder Roguelike)**:
  - Types: [`src/types/game.ts`](./src/types/game.ts)
  - Core Engine: [`src/game/engine.ts`](./src/game/engine.ts)
  - Canvas UI: [`src/components/ui/TacticalGridGame.tsx`](./src/components/ui/TacticalGridGame.tsx)
  - Unit Tests: [`tests/gameEngine.test.ts`](./tests/gameEngine.test.ts) & [`tests/taskService.test.ts`](./tests/taskService.test.ts)

---

## 3. Tiến độ Chi tiết theo Playbook (Checklist)
- [x] Bước 1: Phỏng vấn người dùng & tổng hợp đầy đủ vào `PLAYBOOK.md`
- [x] Bước 2: Xây dựng `toolbox/` (scripts, reusable game modules, templates, index) và gắn link quy định vào `PLAYBOOK.md`
- [x] Bước 3: Triển khai Game HTML 2D Grid/Merge + Card Roguelike và đối chiếu 10/10 tiêu chuẩn trong Checklist của `PLAYBOOK.md`
- [x] Bước 4: Đóng gói bản Portable Starter Kit v2.0 ra `C:\Users\Admin\orca\multi-agent-starter-kit` & `.zip`

---

## 4. Trạng thái Đang làm dở (Current State / In-Progress)
- **File vừa hoàn thành**: Toàn bộ `PLAYBOOK.md`, `toolbox/*`, `src/game/engine.ts`, `src/components/ui/TacticalGridGame.tsx`, `tests/gameEngine.test.ts`
- **File đang sửa dở**: `Không có`
- **Ghi chú bàn giao cho Agent kế tiếp**:
  - Sẵn sàng mở rộng thêm thẻ bài mới, hiệu ứng Boss đặc biệt, hoặc bản đồ Roguelike theo nhánh.
