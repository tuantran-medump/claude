# HANDOFF.md — Bảng Trạng thái & Chuyển giao Công việc (State-on-Disk)

> **Hướng dẫn sử dụng nhanh khi 1 Agent hết token trên Orca:**
> Mở Agent dự phòng (Codex hoặc Antigravity) ngay trong cùng Worktree và nhập:
> `"Tiếp quản công việc đang dở: Đọc HANDOFF.md, chạy git status và git diff để nắm phần code đang sửa và làm tiếp."`

---

## 1. Nhiệm vụ Hiện tại (Active Task)
- **Tên tính năng / Task**: `[Chưa có task đang chạy — Hãy ghi mục tiêu tính năng vào đây]`
- **Nhánh / Worktree**: `main`
- **Agent phụ trách chính**: `Antigravity / Claude / Codex`
- **Agent dự phòng (Backup)**: `Codex (Backend/Test) | Antigravity (UI/Full-stack)`

---

## 2. Tóm tắt Ngữ cảnh (Context Brief — Do Antigravity chuẩn bị cho Claude/Codex)
- **Các file liên quan chính**:
  - `(Ví dụ: src/app/page.tsx, src/lib/api.ts)`
- **Ràng buộc / Thiết kế cần tuân thủ**:
  - `(Ghi ngắn gọn API schema, props hoặc logic chính tại đây để Agent sau không phải quét lại cả repo)`

---

## 3. Tiến độ Chi tiết (Checklist)
- [ ] Bước 1: Thiết kế cấu trúc / Chuẩn bị ngữ cảnh
- [ ] Bước 2: Triển khai Core Logic / API
- [ ] Bước 3: Xây dựng Giao diện (UI Components) & Ghép nối
- [ ] Bước 4: Chạy Build, Viết Test & Review (Giao cho Codex / Antigravity)

---

## 4. Trạng thái Đang làm dở (Current State / In-Progress)
- **File vừa hoàn thành**: `Không có`
- **File đang sửa dở**: `Không có`
- **Ghi chú bàn giao cho Agent kế tiếp**:
  - `Sẵn sàng nhận nhiệm vụ mới.`
