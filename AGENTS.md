# AGENTS.md — Quy chuẩn điều phối đa agent v3.0 (Orca Web Workspace)

> **Tài liệu gốc bắt buộc đọc:** mục tiêu, quy trình, Toolbox và Checklist nghiệm thu nằm trong [**`PLAYBOOK.md`**](./PLAYBOOK.md). Prompt copy-paste theo từng chế độ nằm trong [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md).

Dự án chạy trên **Orca** với phân vai tối ưu cho Codex code chính và giữ tối đa token Claude Pro:
1. **Codex (GPT Pro — 65%)** — Main Coder & QA: viết logic nghiệp vụ (`src/server/`), route API (`src/app/api/`), hook client (`src/hooks/`), unit test (`tests/`) và chạy vòng kiểm tra lỗi.
2. **Antigravity (Gemini Pro — 25%)** — Điều phối viên chính & UI: phỏng vấn người dùng, chuẩn bị `HANDOFF.md`, quản lý `toolbox/`, dựng giao diện (`src/components/ui/`, `src/app/`) và nghiệm thu theo `PLAYBOOK.md`.
3. **Claude Code (Claude Pro — ≤10%)** — Architect-Only: chỉ chốt kiểu dữ liệu trong `src/types/` và spec tính năng theo `toolbox/templates/WEB_SPEC.md` ở bước đầu, sau đó rút lui. Khi vắng Antigravity (chế độ B), Claude làm điều phối viên nhưng không code.

---

## 1. Failsafe 3 lớp & bàn giao trạng thái (State-on-Disk)

### A. Lớp 1 — Zero-Claude
- Nếu người dùng muốn giữ 100% token Claude, **Antigravity** và **Codex** tự chốt `src/types/` và spec theo [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md), ghi "spec chưa qua Claude review" vào `HANDOFF.md`.

### B. Lớp 2 — Hết token giữa chừng
1. **Mọi agent** cập nhật tiến độ vào [`HANDOFF.md`](./HANDOFF.md) ngay sau mỗi file hoàn thành.
2. **Khi nhận lệnh "Tiếp quản":**
   - Chạy [`toolbox\scripts\handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) để xem nhánh, `git diff --stat` và `HANDOFF.md`.
   - Làm tiếp phần đang dở, không viết lại phần đã đúng.

### C. Lớp 3 — Cổng kiểm tra trước khi báo cáo
- Trước khi báo hoàn thành, agent **bắt buộc** chạy [`toolbox\scripts\verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và đối chiếu Checklist ở Mục 4 của [`PLAYBOOK.md`](./PLAYBOOK.md).

---

## 2. Bắt buộc dùng `toolbox/`

Danh mục đầy đủ: [`toolbox/docs/TOOLBOX_INDEX.md`](./toolbox/docs/TOOLBOX_INDEX.md). **Không viết lại** những gì đã có:
- [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd) — kiểm tra file điều phối + `typecheck` + `test` + `build`.
- [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) — tóm tắt nhanh Git và `HANDOFF.md`.
- [`toolbox/scripts/new-worktree.cmd`](./toolbox/scripts/new-worktree.cmd) — tạo nhánh và worktree mới trên Orca.
- [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md) — mẫu spec tính năng web.

---

## 3. Cấu trúc thư mục & quy tắc bảo mật

- **Phân tầng tránh xung đột khi chạy song song:**
  - `src/types/` — hợp đồng kiểu dữ liệu (Claude ≤10% hoặc Antigravity/Codex chốt trước).
  - `src/server/`, `src/app/api/`, `src/hooks/` — logic, API, hook (**Codex**).
  - `src/components/ui/`, `src/app/` (trang, layout) — giao diện (**Antigravity**).
  - `tests/` — unit test (**Codex**).
  - `toolbox/` — script và template dùng chung (**Antigravity**).
  - `docs/specs/` — spec từng tính năng.
- Hai agent không sửa cùng một file trong cùng thời điểm; mỗi agent làm trên nhánh/worktree riêng.
- **Bảo mật PowerShell:** không chạy `Set-ExecutionPolicy`, không chạy `.ps1`. Luôn gọi `npm.cmd`, `npx.cmd`, `claude.cmd`, `codex.cmd` và `toolbox\scripts\*.cmd`.
- **Bảo mật dữ liệu:** không ghi secret vào code, commit, log, URL hay bundle client. Không tự deploy, push hay merge khi người dùng chưa đồng ý.
