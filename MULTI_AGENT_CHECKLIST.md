# 📋 SỔ TAY GHI NHỚ: Quy trình Chạy Dự án Đa Agent trên Orca
*(Antigravity Gemini Pro + Codex GPT Pro + Claude Code Pro)*

File này là **Checklist bỏ túi** dành cho bạn trước khi bắt đầu một dự án mới hoặc một tính năng lớn với nhiều AI Agent.

---

## PHẦN 1: 5 Bước Bắt buộc Trước khi Bắt đầu Dự án Mới (Setup 5 Phút)

- [ ] **1. Phải có ít nhất 1 Git Commit trên nhánh `main`**
  - Orca dùng `git worktree` để tách mỗi agent ra một thư mục riêng. Nếu repo chưa có commit đầu tiên (`root commit`), Orca sẽ không tạo được worktree.
- [ ] **2. Đặt sẵn Bộ 4 File Điều phối ở Gốc Dự án (`main`)**
  - `AGENTS.md`: Quy ước chung, cấu trúc thư mục, lệnh build/test (Antigravity & Codex tự động đọc).
  - `CLAUDE.md`: Nhúng `@AGENTS.md` + ép Claude tiết kiệm token (không tự quét repo, không chạy loop test).
  - `GEMINI.md`: Hướng dẫn Antigravity gom ngữ cảnh (`Context Brief`) và làm UI/Orchestrator.
  - `HANDOFF.md`: Bảng trạng thái lưu trên ổ cứng để chống mất mạch khi hết token.
- [ ] **3. Chia Cấu trúc Thư mục Tách biệt theo Vai trò (Chống xung đột Merge)**
  - `src/components/ui/` & `src/app/` $\rightarrow$ Địa bàn của **Antigravity** (Giao diện, Pages).
  - `src/server/` & `src/hooks/` $\rightarrow$ Địa bàn của **Claude** (Kiến trúc, Core Logic) & **Codex** (Xử lý dữ liệu nặng).
  - `tests/` $\rightarrow$ Địa bàn của **Codex** (Unit/Integration/E2E Tests).
- [ ] **4. Chốt "Hợp đồng Dữ liệu" (Types/Interfaces) Trước khi Tách Nhánh**
  - Luôn tạo file `src/types/index.ts` định nghĩa trước kiểu dữ liệu (API Request/Response, Props) và commit vào `main`. Khi có chung file `types`, một agent làm Frontend và một agent làm Backend sẽ khớp nhau 100% lúc ghép lại.
- [ ] **5. Kiểm tra Lệnh Chạy trên Terminal**
  - Ghi rõ lệnh chạy thực tế vào `AGENTS.md` (ví dụ trên Windows PowerShell dùng `npm.cmd run build` thay vì `npm run build` nếu bị chặn `.ps1`) để các agent không mất token tự mò lỗi môi trường.

---

## PHẦN 2: Quy tắc Vàng Phân bổ Việc Hàng ngày (Bảo vệ Quota Claude Pro)

| Khi bạn cần làm việc này... | Giao cho ai? | Câu lệnh mẫu (Prompt) |
| :--- | :--- | :--- |
| **1. Tìm hiểu repo / Chuẩn bị làm tính năng mới** | **Antigravity** *(Gemini Pro)* | *"Quét codebase và điền Context Brief + danh sách file cần sửa cho tính năng [Tên] vào `HANDOFF.md`."* |
| **2. Thiết kế kiến trúc khó / Viết Core Logic phức tạp** | **Claude** *(Claude Pro)* | *"Đọc `HANDOFF.md`, chỉ mở các file được liệt kê và viết phần Core Logic cho [Tên]. Cập nhật `HANDOFF.md` khi xong."* |
| **3. Dựng giao diện UI / Ghép API / Chạy trình duyệt** | **Antigravity** *(Gemini Pro)* | *"Dựng giao diện trang [Tên] theo thiết kế, nối với API trong `src/server` và kiểm tra trên trình duyệt."* |
| **4. Chạy Build, Sửa lỗi Type, Viết Test, Review Code** | **Codex** *(GPT Pro)* | *"Chạy typecheck, test và sửa toàn bộ lỗi phát sinh. Sau đó review `git diff main...HEAD` tìm edge cases."* |

---

## PHẦN 3: Cứu hộ Khẩn cấp khi 1 Agent Hết Token Giữa Chừng

Khi **Claude Pro** (hoặc bất kỳ agent nào) báo hết limit giữa chừng trên Orca:

1. **Đừng đóng Worktree đó** (vì code đang sửa dở vẫn nằm nguyên trong ổ cứng của worktree).
2. Mở terminal của **Agent dự phòng** ngay tại thư mục Worktree đó:
   - Nếu đang làm **Backend / Logic / Refactor / Sửa lỗi** $\rightarrow$ Bật **Codex (`codex`)**.
   - Nếu đang làm **Giao diện UI / Ghép trang / Full-stack** $\rightarrow$ Bật **Antigravity (`agy`)**.
3. Paste đúng câu lệnh này:
   ```text
   Tiếp quản công việc đang dở: Hãy đọc HANDOFF.md, chạy git status và git diff để nắm phần code agent trước đang viết dở và hoàn thiện nốt.
   ```

---

## PHẦN 4: Quy trình Kết thúc 1 Tính năng trên Orca

1. Bảo **Codex** chạy kiểm tra lần cuối: `npm.cmd run typecheck` và `npm.cmd test`.
2. Commit gọn gàng trên nhánh worktree.
3. Merge nhánh worktree về `main`, xóa nội dung cũ trong `HANDOFF.md` để chuẩn bị cho tính năng tiếp theo.
