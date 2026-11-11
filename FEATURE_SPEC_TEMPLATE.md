# 📝 FEATURE_SPEC_TEMPLATE.md — Mẫu Đặc Tả Tính Năng Game HTML (v2.0)

> **Cách dùng**: Điền nhanh hoặc bảo **Antigravity (Điều phối viên chính)** điền mẫu này vào `HANDOFF.md` trước khi giao việc cho **Codex (Code chính)**.

---

## 1. Thông tin Tính năng Game
- **Tên tính năng / Cơ chế mới**: `[Ví dụ: Thẻ bài Bom Nổ Lan 3x3 & Ô Bẫy trên Lưới]`
- **Chế độ sử dụng Claude**: `[ ] Có gọi Claude chốt Types (10%)` | `[x] Bật Zero-Claude Failsafe (Chỉ dùng Antigravity + Codex)`
- **Modules trong `toolbox/` cần tái sử dụng**:
  - [`toolbox/modules/soundSynth.ts`](./toolbox/modules/soundSynth.ts)
  - [`toolbox/modules/storageManager.ts`](./toolbox/modules/storageManager.ts)
  - [`toolbox/modules/tweenParticles.ts`](./toolbox/modules/tweenParticles.ts)

---

## 2. Phân việc Cụ thể theo Đúng Tỷ Trọng Mới

### A. Claude Code (`≤10%` — Hoặc Antigravity làm thay nếu bật Failsafe)
- [ ] Cập nhật kiểu dữ liệu trong `src/types/game.ts`.
- [ ] Cập nhật công thức cân bằng trong `toolbox/templates/GAME_BALANCE_SPEC.md`.

### B. Codex (`65%` — Main Coder & QA)
- [ ] Viết toàn bộ hàm xử lý logic trong `src/game/engine.ts`.
- [ ] Viết Unit Tests kiểm tra mọi trường hợp (bao gồm biên lưới, hết năng lượng, Undo) trong `tests/`.
- [ ] Chạy `toolbox\scripts\verify-all.cmd` đảm bảo 0 lỗi.

### C. Antigravity (`25%` — Main Orchestrator & UI/Canvas)
- [ ] Vẽ hiệu ứng hiển thị lên HTML5 Canvas & HUD trong `src/components/ui/`.
- [ ] Kích hoạt âm thanh `soundSynth` + hạt `CanvasJuiceManager`.
- [ ] Đối chiếu toàn bộ 10 mục trong Checklist của `PLAYBOOK.md` trước khi báo cáo.
