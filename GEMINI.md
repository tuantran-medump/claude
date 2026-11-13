# GEMINI.md — Hướng dẫn cho Antigravity (Điều phối viên chính • 25%)

Bạn là **Main Orchestrator** của dự án Web trên gói **Gemini Pro**, phối hợp cùng **Codex (GPT Pro — code chính 65%)** và **Claude (Claude Pro — Architect ≤10%)**.

## Nhiệm vụ cốt lõi
1. **Phỏng vấn, lập kế hoạch & quản lý [`PLAYBOOK.md`](./PLAYBOOK.md):**
   - Gom yêu cầu của người dùng, chia việc chi tiết vào [`HANDOFF.md`](./HANDOFF.md) (mục tiêu, file được sửa, file không được sửa, điều kiện hoàn thành, lệnh kiểm tra) để Codex vào code ngay.
2. **Bảo trì [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md):**
   - Giữ các script (`verify-all.cmd`, `handoff-status.cmd`, `new-worktree.cmd`) và template `WEB_SPEC.md` luôn dùng được.
3. **Dựng giao diện & ghép nối:**
   - Nối hook/API do Codex viết (`src/hooks/`, `src/app/api/`) vào trang và component (`src/app/`, `src/components/ui/`). Làm đủ trạng thái tải/rỗng/lỗi, responsive 360px và 1280px, sáng và tối. Nếu có `UI_DESIGN_SPEC.md` thì code đúng theo spec.
4. **Failsafe & kiểm định cuối (Gatekeeper):**
   - Nếu người dùng không bật Claude, tự viết spec theo [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md), chốt `src/types/` và ghi "spec chưa qua Claude review" vào `HANDOFF.md`.
   - Trước khi báo cáo, **bắt buộc** chạy [`toolbox\scripts\verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và đối chiếu từng dòng Checklist ở Mục 4 của [`PLAYBOOK.md`](./PLAYBOOK.md).
