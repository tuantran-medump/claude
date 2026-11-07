# AGENTS.md — Quy chuẩn Điều phối & Phối hợp Đa Agent (Orca Workspace)

Dự án Web App này được vận hành song song bởi 3 AI Agent trên **Orca**:
1. **Antigravity (`Gemini Pro`)** — *Orchestrator, Context Scout, UI/Frontend & Integration (50% khối lượng)*
2. **Codex (`GPT Pro`)** — *Heavy Backend Logic, Build/Test Loop, Debugging & Code Review (35% khối lượng)*
3. **Claude Code (`Claude Pro`)** — *System Architect & Complex Refactoring/UI Polish (15% khối lượng — Ưu tiên tiết kiệm token)*

---

## 1. Giao thức Chuyển giao & Backup khi Hết Token (Failover Protocol)

Mọi Agent làm việc trên bất kỳ worktree nào trong Orca **BẮT BUỘC** tuân thủ quy tắc lưu trạng thái trên đĩa (`State-on-Disk`) để Agent khác có thể tiếp quản tức thì nếu hết quota/token giữa chừng:

### A. Trước và Trong khi làm việc (Mọi Agent)
1. **Đọc `HANDOFF.md`** đầu tiên để nắm mục tiêu, danh sách file liên quan và trạng thái hiện tại.
2. **Cập nhật `HANDOFF.md` theo từng bước nhỏ**:
   - Đánh dấu `[x]` vào mục vừa hoàn thành.
   - Ghi rõ file đang sửa dở tại mục `Current State / In-Progress`.
   - Không giữ kế hoạch chỉ trong bộ nhớ phiên chat.

### B. Khi nhận lệnh "Tiếp quản" (Takeover Mode)
Khi người dùng yêu cầu tiếp quản công việc từ Agent trước (do hết token hoặc chuyển vai):
1. Đọc ngay `HANDOFF.md`.
2. Chạy `git status --short` và `git diff` để kiểm tra chính xác những dòng code mà Agent trước đang viết dở.
3. Không viết lại từ đầu những phần đã đúng; tiếp tục hoàn thiện phần việc đang dở (`[ ]` hoặc `[-]`) và cập nhật lại `HANDOFF.md`.

---

## 2. Phân công Nhiệm vụ cho từng Agent

### Với Codex (GPT Pro)
- Đảm nhận phần **Backend phức tạp, xử lý dữ liệu, thuật toán và viết Tests (Unit/Integration/E2E)**.
- Chịu trách nhiệm chính cho vòng lặp tốn nhiều token: **Chạy Build $\rightarrow$ Chạy Test $\rightarrow$ Phân tích lỗi $\rightarrow$ Sửa lỗi**.
- Khi được yêu cầu Review: Dùng `git diff main...HEAD` để tìm lỗi bảo mật, race conditions, edge cases và thiếu sót về kiểu dữ liệu (TypeScript types).
- Là **Agent Backup số 1** khi Claude Pro hết token ở các tác vụ logic, API, state management, hoặc refactoring.

### Với Antigravity (Gemini Pro)
- Đảm nhận khảo sát codebase, gom ngữ cảnh vào `HANDOFF.md`, dựng UI/UX, ghép nối Frontend-Backend và kiểm thử trên Browser.
- Là **Agent Backup số 1** khi Claude Pro hết token ở các tác vụ giao diện, bố cục trang, routing và tích hợp full-stack.

### Với Claude Code (Claude Pro)
- Tập trung vào thiết kế kiến trúc, giải quyết bài toán khó và tinh chỉnh code chất lượng cao.
- Tuân thủ nghiêm ngặt quy tắc tiết kiệm token trong `CLAUDE.md`.

---

## 3. Quy chuẩn Code chung cho Web App
- **Ngôn ngữ & Kiểu dữ liệu**: Ưu tiên TypeScript chặt chẽ (`strict: true`), hạn chế tối đa `any`.
- **Cấu trúc Component & Module**: Tách biệt rõ tầng giao diện (`UI/Presentation`), tầng trạng thái/hooks (`State/Hooks`) và tầng dữ liệu/API (`Services/Server`).
- **Git & Orca Worktrees**:
  - Mỗi tính năng/nhiệm vụ chạy trên một nhánh/worktree riêng của Orca.
  - Commit nhỏ, rõ nghĩa khi hoàn thành từng mốc ổn định.
