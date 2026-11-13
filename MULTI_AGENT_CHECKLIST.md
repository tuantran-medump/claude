# MULTI_AGENT_CHECKLIST.md — Sổ tay trước khi chạy dự án Web đa agent (v3.0)
*(Codex code chính 65% • Antigravity điều phối 25% • Claude ≤10% + Failsafe)*

---

## 1. 5 bước khởi động cho dự án mới

- [ ] **Bước 1:** chép bộ kit từ `C:\Users\Admin\orca\multi-agent-starter-kit` vào thư mục gốc repo mới:
  ```powershell
  Copy-Item -Path "C:\Users\Admin\orca\multi-agent-starter-kit\*" -Destination . -Recurse -Force
  ```
- [ ] **Bước 2:** repo phải có ít nhất 1 commit trên `main` để Orca tách được worktree.
- [ ] **Bước 3:** mở [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md), chọn chế độ ở Mục 0 rồi gửi prompt đầu tiên của chế độ đó (0-1 cho Antigravity, hoặc B-1 cho Claude nếu vắng Antigravity).
- [ ] **Bước 4:** giao phần logic, API, hook và test cho **Codex (`codex.cmd`)** bằng prompt của chế độ đã chọn.
- [ ] **Bước 5:** cuối mỗi tính năng, chạy [`toolbox\scripts\verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và đối chiếu Checklist trong [`PLAYBOOK.md`](./PLAYBOOK.md).

---

## 2. Lệnh `.cmd` chuẩn (không chạy `.ps1`)

| Mục đích | Lệnh trên terminal Orca |
| :--- | :--- |
| Nghiệm thu theo Playbook | `toolbox\scripts\verify-all.cmd` |
| Xem trạng thái bàn giao / Failsafe | `toolbox\scripts\handoff-status.cmd` |
| Tạo nhánh + worktree mới | `toolbox\scripts\new-worktree.cmd <tên-nhánh>` |
| Chạy web ở chế độ dev | `npm.cmd run dev` |
| Mở Codex (code chính) | `codex.cmd` |
| Mở Claude Code (chỉ khi thật cần) | `claude.cmd` |
