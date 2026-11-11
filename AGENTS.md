# AGENTS.md — Quy chuẩn Điều phối Đa Agent v2.0 (Orca HTML Game & Web Workspace)

> **Tài liệu gốc bắt buộc đọc**: Xem chi tiết mục tiêu, quy trình, đường dẫn Toolbox và Checklist nghiệm thu tại [**`PLAYBOOK.md`**](./PLAYBOOK.md).

Dự án này được vận hành trên **Orca** với cơ chế phân vai mới (tối ưu cho **Codex làm Code chính** và **bảo toàn tối đa token của Claude Pro**):
1. **Codex (`GPT Pro` — 65% khối lượng)** — **Main Coder (Code Chính & QA)**: Viết toàn bộ Core Game Engine, Logic Bảng lưới/Thẻ bài/Merge, State Machine, Unit Tests và chạy vòng lặp kiểm tra lỗi.
2. **Antigravity (`Gemini Pro` — 25% khối lượng)** — **Main Orchestrator (Điều Phối Viên Chính & UI/Canvas)**: Phỏng vấn người dùng, chuẩn bị `HANDOFF.md`, quản lý `toolbox/`, dựng giao diện HTML5 Canvas/HUD, ghép nối âm thanh/hiệu ứng và nghiệm thu sản phẩm theo `PLAYBOOK.md`.
3. **Claude Code (`Claude Pro` — ≤10% khối lượng)** — **Architect-Only (Phụ phần nhỏ / Tư vấn đầu kỳ)**: Chỉ chốt `src/types/game.ts` và công thức cân bằng game trong `toolbox/templates/GAME_BALANCE_SPEC.md` ở bước đầu, sau đó **rút lui hoàn toàn** để dành token cho công việc quan trọng khác của người dùng.

---

## 1. Giao thức Failsafe 3 Lớp & Bàn giao Trạng thái (`State-on-Disk`)

### A. Lớp 1 — Zero-Claude Failsafe (Khi người dùng không bật Claude)
- Nếu người dùng muốn tiết kiệm 100% token Claude cho việc khác, **Antigravity** và **Codex** tự động đảm nhận luôn phần thiết kế `src/types/game.ts` dựa trên mẫu có sẵn tại [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md) mà không làm gián đoạn luồng việc.

### B. Lớp 2 — Mid-Task Token Failover (Khi bất kỳ Agent nào hết Token giữa chừng)
1. **Mọi Agent đang làm việc** phải cập nhật tiến độ vào [`HANDOFF.md`](./HANDOFF.md) ngay sau mỗi file hoàn thành.
2. **Khi nhận lệnh "Tiếp quản" (Takeover Mode)**:
   - Chạy ngay script [`toolbox\scripts\handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) để xem đồng thời nhánh Git, danh sách file đang sửa dở (`git diff --stat`) và nội dung `HANDOFF.md`.
   - Tiếp tục hoàn thiện phần code đang dở mà không viết lại từ đầu những phần đã đúng.

### C. Lớp 3 — Verification Gate (Cổng Kiểm tra Bắt buộc trước khi báo cáo)
- Trước khi báo cáo hoàn thành nhiệm vụ, Agent **BẮT BUỘC** chạy [`toolbox\scripts\verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và đối chiếu với Checklist tại Mục 4 của [`PLAYBOOK.md`](./PLAYBOOK.md).

---

## 2. Quy định Bắt buộc Sử dụng `toolbox/` (Tránh làm lại tác vụ & Tiết kiệm Token)

Tất cả các module và script đã duyệt nằm trong [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md). **CẤM viết lại** các logic đã có trong Toolbox:
- **Scripts kiểm tra & bàn giao**:
  - [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd) — Kiểm tra đủ file Playbook + `typecheck` + `test` + `build`.
  - [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) — Tóm tắt nhanh trạng thái Git & `HANDOFF.md`.
  - [`toolbox/scripts/new-worktree.cmd`](./toolbox/scripts/new-worktree.cmd) — Tạo nhánh & Git Worktree mới trên Orca.
- **Modules Game HTML dựng sẵn**:
  - [`toolbox/modules/soundSynth.ts`](./toolbox/modules/soundSynth.ts) — Bộ tổng hợp âm thanh Web Audio API.
  - [`toolbox/modules/storageManager.ts`](./toolbox/modules/storageManager.ts) — Lưu/tải tự động `localStorage` (High Score & Auto-Save Run State).
  - [`toolbox/modules/tweenParticles.ts`](./toolbox/modules/tweenParticles.ts) — Hiệu ứng nổ hạt, chữ nổi và rung màn hình HTML5 Canvas.
- **Templates**:
  - [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md) — Mẫu thông số cân bằng Game.

---

## 3. Cấu trúc Thư mục Phân tầng & Quy tắc Bảo mật PowerShell

- **Cấu trúc phân tầng tránh xung đột khi chạy song song trên Orca**:
  - `src/types/game.ts` — Hợp đồng kiểu dữ liệu Game (Claude 10% hoặc Antigravity/Codex chốt trước).
  - `src/game/` — Core Game Engine, Grid/Merge/Card State Machine (**Codex — Code chính** phụ trách).
  - `src/components/ui/` & `src/app/` — HTML5 Canvas Renderer, HUD & Trang chính (**Antigravity — Điều phối viên** phụ trách).
  - `toolbox/` — Thư viện tái sử dụng & Scripts kiểm tra (**Antigravity** quản lý).
  - `tests/` — Unit Tests kiểm증 toàn bộ luật chơi (**Codex** phụ trách).
- **Quy tắc Bảo mật PowerShell (BẮT BUỘC dùng `.cmd`, CẤM chạy `.ps1`)**:
  - Tuyệt đối không chạy `Set-ExecutionPolicy`.
  - Luôn gọi `npm.cmd`, `npx.cmd`, `claude.cmd`, `codex.cmd` và `toolbox\scripts\*.cmd`.
