# 🧰 TOOLBOX_INDEX.md — Danh Mục Công Cụ Tái Sử Dụng (Tiết Kiệm Token)

Mọi Agent (**Antigravity**, **Codex**, **Claude**) **BẮT BUỘC** tra cứu danh mục này trước khi viết code mới. **CẤM viết lại** các tính năng đã có sẵn trong `toolbox/`.

---

## 1. Scripts Tự Động Hóa (`toolbox/scripts/`) — Chỉ dùng `.cmd`, An toàn 100%

| File Script | Cách gọi trên Terminal | Công dụng chính |
| :--- | :--- | :--- |
| [`toolbox/scripts/verify-all.cmd`](../scripts/verify-all.cmd) | `toolbox\scripts\verify-all.cmd` | Chạy kiểm tra 4 bước: Kiểm tra file Playbook $\rightarrow$ `typecheck` $\rightarrow$ `vitest` $\rightarrow$ `build`. Bắt buộc chạy trước khi báo cáo hoàn thành. |
| [`toolbox/scripts/handoff-status.cmd`](../scripts/handoff-status.cmd) | `toolbox\scripts\handoff-status.cmd` | In tóm tắt nhánh Git, danh sách file đang sửa dở (`git diff --stat`) và nội dung `HANDOFF.md` chỉ trong 1 lệnh (Tiết kiệm 80% token khi tiếp quản/Failsafe). |
| [`toolbox/scripts/new-worktree.cmd`](../scripts/new-worktree.cmd) | `toolbox\scripts\new-worktree.cmd <branch>` | Tự động tạo nhánh và Git Worktree mới trong `..\workspaces\<branch>` cho Orca. |

---

## 2. Modules Game Dựng Sẵn (`toolbox/modules/`) — Import trực tiếp vào `src/`

| File Module | Cách Import | Tính năng cung cấp sẵn |
| :--- | :--- | :--- |
| [`toolbox/modules/soundSynth.ts`](../modules/soundSynth.ts) | `import { soundSynth } from "../../toolbox/modules/soundSynth"` | Âm thanh tổng hợp Web Audio API (`card_draw`, `card_place`, `tile_merge`, `attack_hit`, `turn_end`, `victory`, `game_over`) + bật/tắt tiếng (`setMuted`). |
| [`toolbox/modules/storageManager.ts`](../modules/storageManager.ts) | `import { saveRunState, loadRunState, saveHighScore, loadHighScore } from "../../toolbox/modules/storageManager"` | Tự động lưu ván đang chơi dở (`Auto-Save Run`), tải lại ván chơi, lưu kỷ lục điểm cao (`High Score`) vào `localStorage` (an toàn cả trên Node/Vitest). |
| [`toolbox/modules/tweenParticles.ts`](../modules/tweenParticles.ts) | `import { CanvasJuiceManager } from "../../toolbox/modules/tweenParticles"` | Hiệu ứng nổ hạt (`spawnBurst`), chữ điểm/sát thương bay lên (`spawnFloatingText`), và rung màn hình (`triggerShake`) trên HTML5 Canvas 60 FPS. |

---

## 3. Templates Thiết Kế & Cân Bằng (`toolbox/templates/`)

| File Template | Người dùng chính | Mục đích |
| :--- | :--- | :--- |
| [`toolbox/templates/GAME_BALANCE_SPEC.md`](../templates/GAME_BALANCE_SPEC.md) | **Claude (10%)** hoặc **Codex (Failsafe)** | Khung công thức toán học cho Grid 4x4, Merge Multiplier, Card Cost và Enemy Wave Scaling. |
