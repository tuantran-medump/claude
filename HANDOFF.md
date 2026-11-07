# HANDOFF.md — Bảng Trạng thái & Chuyển giao Công việc (State-on-Disk)

> **Hướng dẫn sử dụng nhanh khi 1 Agent hết token trên Orca:**
> Mở Agent dự phòng (Codex hoặc Antigravity) ngay trong cùng Worktree và nhập:
> `"Tiếp quản công việc đang dở: Đọc HANDOFF.md, chạy git status và git diff để nắm phần code đang sửa và làm tiếp."`

---

## 1. Nhiệm vụ Hiện tại (Active Task)
- **Tên tính năng / Task**: `Đã hoàn tất khởi tạo khung Web App & Sổ tay Đa Agent (Sẵn sàng cho tính năng mới)`
- **Nhánh / Worktree**: `main`
- **Agent phụ trách chính**: `Antigravity (Gemini Pro)`
- **Agent dự phòng (Backup)**: `Codex (GPT Pro) | Antigravity (Gemini Pro)`

---

## 2. Tóm tắt Ngữ cảnh (Context Brief — Do Antigravity chuẩn bị cho Claude/Codex)
- **Các file liên quan chính**:
  - `MULTI_AGENT_CHECKLIST.md`: Sổ tay ghi nhớ quy trình phối hợp 3 Agent.
  - `src/types/index.ts`: Định nghĩa kiểu dữ liệu dùng chung (`AgentTask`, `AgentName`, `TaskStatus`).
  - `src/server/taskService.ts` & `src/app/api/tasks/route.ts`: Tầng Backend/Service.
  - `src/hooks/useAgentTasks.ts`: Tầng State/Hooks.
  - `src/components/ui/AgentDashboard.tsx` & `src/app/page.tsx`: Tầng Giao diện (UI).
  - `tests/taskService.test.ts`: Bộ Unit Test Vitest.
- **Ràng buộc / Thiết kế cần tuân thủ**:
  - Trên Windows PowerShell hiện tại, dùng `npm.cmd` và `npx.cmd` thay vì `npm`/`npx`.
  - TypeScript `strict: true`.

---

## 3. Tiến độ Chi tiết (Checklist)
- [x] Bước 1: Thiết kế cấu trúc / Chuẩn bị ngữ cảnh (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `HANDOFF.md`)
- [x] Bước 2: Soạn sổ tay ghi nhớ `MULTI_AGENT_CHECKLIST.md` cho người dùng
- [x] Bước 3: Khởi tạo khung Web App phân tầng (`src/app`, `src/components/ui`, `src/hooks`, `src/server`, `tests`)
- [x] Bước 4: Cài đặt dependencies, kiểm tra `typecheck` + `test` (3/3 passed) và commit lên `main`

---

## 4. Trạng thái Đang làm dở (Current State / In-Progress)
- **File vừa hoàn thành**: Toàn bộ bộ khung dự án Web App & `MULTI_AGENT_CHECKLIST.md`
- **File đang sửa dở**: `Không có`
- **Ghi chú bàn giao cho Agent kế tiếp**:
  - Dự án đã pass `npm.cmd run typecheck` và `npm.cmd test`. Sẵn sàng tách worktree trên Orca cho tính năng tiếp theo.
