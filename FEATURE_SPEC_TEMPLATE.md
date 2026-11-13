# FEATURE_SPEC_TEMPLATE.md — Phiếu giao việc tính năng Web (v3.0)

> **Cách dùng:** điền nhanh phiếu này (hoặc bảo Antigravity điền) vào `HANDOFF.md` trước khi giao cho Codex. Spec kỹ thuật chi tiết viết theo [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md).

---

## 1. Thông tin tính năng
- **Tên tính năng:** `[Ví dụ: Trang danh sách việc có lọc theo trạng thái và tìm kiếm]`
- **Chế độ:** `[0 / A / B / C / D / E / F]` (xem Mục 0 của `PROMPTS_PLAYBOOK.md`)
- **Dùng Claude:** `[ ] Có, Claude chốt types + spec (≤10%)` | `[ ] Zero-Claude (Antigravity + Codex tự chốt)`
- **Spec:** `docs/specs/<ngày>-<tính-năng>.md`
- **File được sửa / không được sửa:** `[...]`
- **Điều kiện hoàn thành:** `[...]`

---

## 2. Phân việc

### A. Claude (≤10%, hoặc Antigravity khi Zero-Claude)
- [ ] Chốt kiểu dữ liệu trong `src/types/`.
- [ ] Viết spec theo `WEB_SPEC.md` (dữ liệu, API, luật, màn hình, bảo mật, test).
- [ ] (Tùy chọn) `UI_DESIGN_SPEC.md` nếu có màn hình mới.

### B. Codex (65% — Main Coder & QA)
- [ ] Logic trong `src/server/`, route trong `src/app/api/`, hook trong `src/hooks/`.
- [ ] Unit test trong `tests/` cho luật nghiệp vụ và ca biên (rỗng, vượt giới hạn, dữ liệu sai, lỗi mạng).
- [ ] Chạy `toolbox\scripts\verify-all.cmd` đến khi 0 lỗi.

### C. Antigravity (25% — Điều phối & UI)
- [ ] Trang và component trong `src/app/`, `src/components/ui/`, đủ trạng thái tải/rỗng/lỗi.
- [ ] Responsive 360px và 1280px, sáng và tối, dùng được bằng bàn phím.
- [ ] Đối chiếu 10 mục Checklist trong `PLAYBOOK.md` trước khi báo cáo.
