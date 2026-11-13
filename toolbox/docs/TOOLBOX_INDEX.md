# TOOLBOX_INDEX.md — Danh mục công cụ tái sử dụng

Mọi agent (**Antigravity**, **Codex**, **Claude**) phải tra danh mục này trước khi viết code mới. **Không viết lại** những gì đã có trong `toolbox/`.

---

## 1. Scripts (`toolbox/scripts/`) — chỉ dùng `.cmd`

| Script | Cách gọi | Công dụng |
| :--- | :--- | :--- |
| [`verify-all.cmd`](../scripts/verify-all.cmd) | `toolbox\scripts\verify-all.cmd` | Kiểm tra 4 bước: file điều phối → `typecheck` → `test` → `build`. Bắt buộc chạy trước khi báo hoàn thành. |
| [`handoff-status.cmd`](../scripts/handoff-status.cmd) | `toolbox\scripts\handoff-status.cmd` | In nhánh Git, file đang sửa (`git diff --stat`) và `HANDOFF.md` trong 1 lệnh, dùng khi bắt đầu hoặc tiếp quản. |
| [`new-worktree.cmd`](../scripts/new-worktree.cmd) | `toolbox\scripts\new-worktree.cmd <branch>` | Tạo nhánh và worktree mới trong `..\workspaces\<branch>` cho Orca. |

---

## 2. Templates (`toolbox/templates/`)

| Template | Người dùng chính | Mục đích |
| :--- | :--- | :--- |
| [`WEB_SPEC.md`](../templates/WEB_SPEC.md) | Claude (≤10%) hoặc Antigravity/Codex khi Zero-Claude | Mẫu spec tính năng web: mục tiêu, dữ liệu, API, luật nghiệp vụ, màn hình & trạng thái, bảo mật, test. Chép thành `docs/specs/<ngày>-<tính-năng>.md`. |
