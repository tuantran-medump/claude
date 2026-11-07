# HANDOFF.md — Bảng Trạng thái & Chuyển giao Công việc (State-on-Disk)

> **Hướng dẫn sử dụng nhanh khi 1 Agent hết token trên Orca:**
> Mở Agent dự phòng (Codex hoặc Antigravity) ngay trong cùng Worktree và nhập:
> `"Tiếp quản công việc đang dở: Đọc HANDOFF.md, chạy git status và git diff để nắm phần code đang sửa và làm tiếp."`

---

## 1. Nhiệm vụ Hiện tại (Active Task)
- **Tên tính năng / Task**: `Đã hoàn tất bộ tài liệu điều phối, Playbook câu lệnh & khung Web App (Sẵn sàng cho tính năng mới)`
- **Nhánh / Worktree**: `main`
- **Agent phụ trách chính**: `Antigravity (Gemini Pro)`
- **Agent dự phòng (Backup)**: `Codex (GPT Pro) | Antigravity (Gemini Pro)`

---

## 2. Tóm tắt Ngữ cảnh (Context Brief — Do Antigravity chuẩn bị cho Claude/Codex)
- **Bộ file điều phối & sổ tay cho người dùng**:
  - `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `HANDOFF.md`: Bộ quy tắc tự động nạp cho 3 Agent.
  - `PROMPTS_PLAYBOOK.md`: Bộ câu lệnh Copy-Paste giao việc cho Antigravity, Claude và Codex theo từng bước.
  - `FEATURE_SPEC_TEMPLATE.md`: Khung mẫu mô tả tính năng & chia việc 3 Agent.
  - `MULTI_AGENT_CHECKLIST.md`: Sổ tay ghi nhớ quy trình phối hợp 3 Agent trên Orca.
- **Các file code chính của Web App**:
  - `src/types/index.ts`: Định nghĩa kiểu dữ liệu dùng chung (`AgentTask`, `AgentName`, `TaskStatus`).
  - `src/server/taskService.ts` & `src/app/api/tasks/route.ts`: Tầng Backend/Service.
  - `src/hooks/useAgentTasks.ts`: Tầng State/Hooks.
  - `src/components/ui/AgentDashboard.tsx` & `src/app/page.tsx`: Tầng Giao diện (UI).
  - `tests/taskService.test.ts`: Bộ Unit Test Vitest.
- **Ràng buộc / Thiết kế cần tuân thủ**:
  - Trên Windows PowerShell, luôn dùng `npm.cmd`, `npx.cmd`, `claude.cmd`, `codex.cmd` (không chạy `.ps1`).
  - TypeScript `strict: true`.

---

## 3. Tiến độ Chi tiết (Checklist)
- [x] Bước 1: Thiết kế cấu trúc / Chuẩn bị ngữ cảnh (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `HANDOFF.md`)
- [x] Bước 2: Soạn sổ tay `MULTI_AGENT_CHECKLIST.md`, bộ câu lệnh `PROMPTS_PLAYBOOK.md` & mẫu `FEATURE_SPEC_TEMPLATE.md`
- [x] Bước 3: Khởi tạo khung Web App phân tầng (`src/app`, `src/components/ui`, `src/hooks`, `src/server`, `tests`)
- [x] Bước 4: Kiểm tra `typecheck` + `test` (3/3 passed), commit và push lên GitHub `origin/main`

---

## 4. Trạng thái Đang làm dở (Current State / In-Progress)
- **File vừa hoàn thành**: `PROMPTS_PLAYBOOK.md`, `FEATURE_SPEC_TEMPLATE.md`
- **File đang sửa dở**: `Không có`
- **Ghi chú bàn giao cho Agent kế tiếp**:
  - Đã sẵn sàng 100% để bắt đầu tính năng mới. Mở `PROMPTS_PLAYBOOK.md` và copy câu lệnh Bước 1 để khởi động tính năng tiếp theo.
