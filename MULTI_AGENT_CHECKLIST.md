# 📋 MULTI_AGENT_CHECKLIST.md — Sổ Tay Ghi Nhớ Trước Khi Chạy Dự Án Đa Agent (v2.0)
*(Codex Code Chính 65% • Antigravity Điều Phối 25% • Claude Phụ ≤10% + Failsafe)*

---

## 1. 5 Bước Khởi Động Nhanh Cho Mọi Dự Án Mới (5 Phút)

- [ ] **Bước 1**: Chép toàn bộ bộ kit từ `C:\Users\Admin\orca\multi-agent-starter-kit` vào thư mục gốc của repo mới:
  ```powershell
  Copy-Item -Path "C:\Users\Admin\orca\multi-agent-starter-kit\*" -Destination . -Recurse -Force
  ```
- [ ] **Bước 2**: Đảm bảo repo đã có ít nhất 1 commit trên nhánh `main` để Orca tách được Git Worktree.
- [ ] **Bước 3**: Mở [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md) và gửi **Prompt 1A** (nếu dùng Claude 10%) hoặc **Prompt 1B** (nếu bật *Zero-Claude Failsafe* để giữ 100% token Claude cho việc khác) cho **Antigravity**.
- [ ] **Bước 4**: Giao toàn bộ việc code logic nặng và viết test cho **Codex (`codex.cmd`)** bằng **Prompt 3A**.
- [ ] **Bước 5**: Cuối mỗi tính năng, luôn yêu cầu chạy [`toolbox\scripts\verify-all.cmd`](./toolbox/scripts/verify-all.cmd) để kiểm tra với Checklist trong [`PLAYBOOK.md`](./PLAYBOOK.md).

---

## 2. Bảng Lệnh `.cmd` Chuẩn Bảo Mật (Không Chạy `.ps1`)

| Mục đích | Lệnh chạy trên Terminal Orca |
| :--- | :--- |
| **Nghiệm thu toàn diện theo Playbook** | `toolbox\scripts\verify-all.cmd` |
| **Xem nhanh trạng thái Bàn giao / Failsafe** | `toolbox\scripts\handoff-status.cmd` |
| **Tạo nhánh Worktree mới trên Orca** | `toolbox\scripts\new-worktree.cmd <tên-nhánh>` |
| **Chạy Dev Server xem Game** | `npm.cmd run dev` |
| **Mở OpenAI Codex (Code chính)** | `codex.cmd` |
| **Mở Claude Code (Chỉ khi thật cần)** | `claude.cmd` |
