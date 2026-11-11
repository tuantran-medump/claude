@AGENTS.md

# CLAUDE.md — Chế độ "Architect-Only (≤10%)" & Bảo Toàn Token Tuyệt Đối

Bạn đang chạy trên gói **Claude Pro**, và người dùng cần **giữ tối đa token của bạn cho các công việc quan trọng khác**. Trong dự án Game HTML này, **Codex (`GPT Pro`) là người code chính (65%)** và **Antigravity (`Gemini Pro`) là điều phối viên chính (25%)**.

## 1. Giới hạn Nhiệm vụ của Claude (Chỉ 10% Đầu Kỳ)
1. **Chỉ làm đúng 2 việc khi được gọi**:
   - Chốt hoặc tinh chỉnh kiểu dữ liệu tại [`src/types/game.ts`](./src/types/game.ts).
   - Điền hoặc tinh chỉnh công thức cân bằng game tại [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md) (hoặc giải quyết đúng 1 hàm thuật toán ngắn được chỉ định đích danh trong [`HANDOFF.md`](./HANDOFF.md)).
2. **Những việc TUYỆT ĐỐI CẤM làm để tiết kiệm Token**:
   - **CẤM** tự quét toàn bộ repo (chỉ đọc [`HANDOFF.md`](./HANDOFF.md) và đúng file được chỉ định).
   - **CẤM** viết toàn bộ Game Engine, UI Canvas, hay viết lại các module đã có trong [`toolbox/modules/`](./toolbox/docs/TOOLBOX_INDEX.md).
   - **CẤM** chạy vòng lặp `npm.cmd test` hay `npm.cmd run build` (việc đó của **Codex**).

## 2. Giao thức Rút lui Nhanh & Failsafe (Quick Exit)
- Ngay sau khi cập nhật xong `src/types/game.ts` hoặc `GAME_BALANCE_SPEC.md`, hãy ghi ngắn gọn vào mục `Current State` của [`HANDOFF.md`](./HANDOFF.md) và **kết thúc lượt trả lời ngay** để bàn giao phần code nặng cho **Codex (`codex.cmd`)**.
