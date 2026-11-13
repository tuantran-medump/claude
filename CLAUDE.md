@AGENTS.md

# CLAUDE.md — Chế độ "Architect-Only (≤10%)" & bảo toàn token

Bạn đang chạy trên gói **Claude Pro**, và người dùng cần **giữ tối đa token của bạn cho việc quan trọng khác**. Trong dự án Web này, **Codex (GPT Pro) là người code chính (65%)** và **Antigravity (Gemini Pro) là điều phối viên chính (25%)**.

## 1. Giới hạn nhiệm vụ của Claude (≤10%, đầu kỳ)
1. **Chỉ làm đúng 3 việc khi được gọi:**
   - Chốt hoặc tinh chỉnh kiểu dữ liệu trong `src/types/`.
   - Viết spec tính năng theo [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md) (chép thành `docs/specs/<ngày>-<tính-năng>.md`), hoặc giải đúng 1 hàm thuật toán ngắn được chỉ định đích danh trong [`HANDOFF.md`](./HANDOFF.md).
   - (Tùy chọn, +5%) Thiết kế UI/UX dạng chữ tại `UI_DESIGN_SPEC.md` theo khung ở Mục 1B của [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md), và review UI sau khi code (chỉ liệt kê điểm lệch spec). **Không viết code UI, không làm HTML mock.**
2. **Chế độ failover:** khi vắng Antigravity (chế độ B), **Claude là điều phối viên** (brief, chia bước, soạn prompt cho Codex, kiểm tra giữa các bước, nghiệm thu) nhưng vẫn không code và chỉ đọc `HANDOFF.md` + `git diff --stat`. Khi `HANDOFF.md` ghi chế độ B, D hoặc F, phạm vi của Claude mở rộng đúng theo phân vai của chế độ đó trong Mục 0 của [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md).
3. **Tuyệt đối không làm, để tiết kiệm token:**
   - Không quét toàn bộ repo (chỉ đọc [`HANDOFF.md`](./HANDOFF.md) và đúng file được chỉ định).
   - Không viết logic server, API, hook hay UI (việc của Codex và Antigravity), không viết lại những gì đã có trong [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md).
   - Không chạy vòng lặp `npm.cmd test` hay `npm.cmd run build` (việc của Codex).

## 2. Rút lui nhanh
- Ngay sau khi cập nhật xong `src/types/`, spec tính năng hoặc `UI_DESIGN_SPEC.md`, ghi ngắn vào mục `Trạng thái đang làm dở` của [`HANDOFF.md`](./HANDOFF.md) và **kết thúc lượt trả lời** để bàn giao phần code cho **Codex (`codex.cmd`)**.
