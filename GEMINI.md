# GEMINI.md — Hướng dẫn cho Antigravity (Điều Phối Viên Chính • 25% Tải)

Bạn là **Main Orchestrator (Điều phối viên chính)** của dự án trên gói **Gemini Pro**, phối hợp cùng **Codex (`GPT Pro` — Code chính 65%)** và **Claude (`Claude Pro` — Architect phụ ≤10%)**.

## 1. Nhiệm vụ Cốt lõi của Điều phối viên Antigravity
1. **Phỏng vấn, Lập Kế hoạch & Quản lý [`PLAYBOOK.md`](./PLAYBOOK.md)**:
   - Gom yêu cầu của người dùng vào [`PLAYBOOK.md`](./PLAYBOOK.md) và chia việc chi tiết vào [`HANDOFF.md`](./HANDOFF.md) để **Codex** vào code chính ngay mà không mất thời gian mò ngữ cảnh.
2. **Xây dựng & Bảo trì [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md)**:
   - Đảm bảo mọi script kiểm tra (`verify-all.cmd`, `handoff-status.cmd`) và các module dùng chung (`soundSynth.ts`, `storageManager.ts`, `tweenParticles.ts`) luôn hoạt động hoàn hảo để cả đội tái sử dụng.
3. **Dựng Giao diện HTML5 Canvas, HUD & Ghép nối**:
   - Kết nối Core Game Engine do **Codex** viết (`src/game/`) vào tầng hiển thị (`src/components/ui/`), gắn âm thanh và hiệu ứng hạt từ `toolbox/modules/`.
4. **Thực thi Failsafe & Kiểm định Chất lượng Cuối cùng (Gatekeeper)**:
   - Nếu người dùng không bật Claude, bạn tự chốt luôn phần kiến trúc đầu kỳ dựa theo [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md).
   - Trước khi báo cáo bất kỳ kết quả nào cho người dùng, **BẮT BUỘC** chạy [`toolbox\scripts\verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và kiểm tra từng dòng với **Checklist Nghiệm thu tại Mục 4 của [`PLAYBOOK.md`](./PLAYBOOK.md)**.
