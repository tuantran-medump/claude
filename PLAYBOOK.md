# PLAYBOOK.md — Quy chuẩn phát triển Web đa agent (v3.0)
*(Antigravity điều phối chính • Codex code chính • Claude Architect ≤10% + Failsafe)*

Đây là Playbook trung tâm. Mọi agent (**Antigravity**, **Codex**, **Claude**) phải theo mục tiêu, quy trình, quy định Toolbox và Checklist nghiệm thu dưới đây trước khi bàn giao kết quả cho người dùng.

---

## 1. Mục tiêu & phân vai

### A. Định hướng sản phẩm Web
- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript `strict` + Tailwind CSS 4 + Vitest.
- **Cấu trúc thư mục (tránh xung đột khi chạy song song trên Orca):**

| Thư mục | Nội dung | Phụ trách |
|---|---|---|
| `src/types/` | Hợp đồng kiểu dữ liệu dùng chung client/server | Claude (≤10%) hoặc Antigravity/Codex khi Failsafe |
| `src/server/` | Logic nghiệp vụ, truy cập dữ liệu | **Codex** |
| `src/app/api/` | Route API, chỉ kiểm tra đầu vào rồi gọi `src/server/` | **Codex** |
| `src/hooks/` | Hook tải/ghi dữ liệu phía client | **Codex** |
| `src/components/ui/`, `src/app/` (trang) | Giao diện, layout, trạng thái màn hình | **Antigravity** |
| `tests/` | Unit test cho logic, API và hook | **Codex** |
| `toolbox/` | Script, template dùng chung | **Antigravity** |
| `docs/specs/` | Spec từng tính năng (chép từ `toolbox/templates/WEB_SPEC.md`) | Claude hoặc Antigravity |

### B. Phân bổ tải & vai trò

| Agent | Tỷ trọng | Vai trò | Nhiệm vụ cụ thể |
| :--- | :---: | :--- | :--- |
| **Codex** *(GPT Pro)* | **65%** | Main Coder & QA | Viết `src/server/`, `src/app/api/`, `src/hooks/`, toàn bộ test trong `tests/` và chạy vòng kiểm tra lỗi. |
| **Antigravity** *(Gemini Pro)* | **25%** | Điều phối & UI | Phỏng vấn yêu cầu, cập nhật [`HANDOFF.md`](./HANDOFF.md), quản lý [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md), dựng UI (`src/components/ui/`, `src/app/`) và nghiệm thu theo Checklist Mục 4. |
| **Claude** *(Claude Pro)* | **≤10%** | Architect-Only | Chỉ chốt kiểu dữ liệu trong `src/types/` và spec tính năng theo [`WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md) ở bước đầu (tùy chọn thêm `UI_DESIGN_SPEC.md`), sau đó rút lui. |

---

## 2. Quy trình 5 bước

1. **Khởi tạo & gom ngữ cảnh (Antigravity):**
   - Chạy [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd).
   - Ghi mục tiêu tính năng, danh sách file cần sửa và điều kiện hoàn thành vào [`HANDOFF.md`](./HANDOFF.md).
2. **Chốt kiến trúc (Claude ≤10% hoặc Failsafe Antigravity/Codex):**
   - Chép [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md) thành `docs/specs/<ngày>-<tính-năng>.md` và điền: dữ liệu, API, luật nghiệp vụ, màn hình, bảo mật, test.
   - Chốt kiểu dữ liệu trong `src/types/`. Xong thì ngắt phiên Claude ngay.
3. **Code logic, API & test (Codex):**
   - Đọc `HANDOFF.md`, spec và `src/types/`. Viết `src/server/`, `src/app/api/`, `src/hooks/` theo TDD, test trong `tests/`.
4. **Dựng UI (Antigravity):**
   - Nối hook/API của Codex vào trang và component. Làm đủ trạng thái tải/rỗng/lỗi, responsive 360px và 1280px, sáng và tối. Nếu có `UI_DESIGN_SPEC.md` thì code đúng theo spec.
5. **Nghiệm thu (Codex + Antigravity):**
   - Chạy [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và đối chiếu từng mục ở Mục 4 trước khi báo cáo.

---

## 3. Quy định thực hiện, Toolbox & Failsafe

### A. Bắt buộc dùng Toolbox (không viết lại)
- Xem trạng thái bàn giao: [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd), không gõ rời nhiều lệnh git.
- Kiểm tra typecheck/test/build: [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd).
- Tạo nhánh và worktree trên Orca: [`toolbox/scripts/new-worktree.cmd`](./toolbox/scripts/new-worktree.cmd).
- Spec tính năng: [`toolbox/templates/WEB_SPEC.md`](./toolbox/templates/WEB_SPEC.md).

### B. Failsafe 3 lớp
1. **Zero-Claude:** nếu người dùng không mở Claude ở Bước 2, Antigravity tự điền spec theo `WEB_SPEC.md`, chốt `src/types/`, ghi "spec chưa qua Claude review" vào `HANDOFF.md` rồi giao Codex.
2. **Hết quota giữa chừng:** mọi tiến độ ghi vào `HANDOFF.md` sau mỗi file. Agent còn lại mở cùng worktree, chạy `handoff-status.cmd` và làm tiếp từ chỗ dở. Chi tiết ở Mục 9 của [`PROMPTS_PLAYBOOK.md`](./PROMPTS_PLAYBOOK.md).
3. **Cổng kiểm tra:** không agent nào được báo "Hoàn thành" nếu `verify-all.cmd` chưa in `[SUCCESS] All Playbook Verification Checks Passed (0 Errors)!`.

### C. Bảo mật
- Không chạy `Set-ExecutionPolicy`, không chạy `.ps1`. Luôn gọi `npm.cmd`, `npx.cmd`, `claude.cmd`, `codex.cmd` và `toolbox\scripts\*.cmd`.
- Không đưa secret vào code, commit, log, URL hay bundle client. Secret chỉ ở `.env.local`.
- Không tự deploy, push hay merge khi người dùng chưa đồng ý.

---

## 4. Checklist nghiệm thu (Definition of Done)

> Antigravity và Codex phải tự kiểm và đánh dấu `[x]` đủ các mục dưới đây trước khi trình bày cho người dùng. Mục chưa đạt thì ghi lý do vào `HANDOFF.md`.

### Nhóm A: Bộ kit đa agent
- [ ] **1.** Đủ file điều phối: `PLAYBOOK.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `HANDOFF.md`, `PROMPTS_PLAYBOOK.md`.
- [ ] **2.** `HANDOFF.md` ghi đúng chế độ, nhánh, task hiện tại, file đang dở và bước tiếp theo.
- [ ] **3.** Có spec của tính năng trong `docs/specs/` và kiểu dữ liệu trong `src/types/`.

### Nhóm B: Sản phẩm Web
- [ ] **4.** Chức năng chạy đúng điều kiện hoàn thành trong spec.
- [ ] **5.** Mọi màn hình có đủ trạng thái: đang tải, rỗng, có dữ liệu, lỗi có nút thử lại.
- [ ] **6.** Responsive không cuộn ngang ở 360px và 1280px; giao diện sáng và tối đều đọc được.
- [ ] **7.** Accessibility: tương phản ≥ 4.5:1, dùng được bằng bàn phím, vùng chạm ≥ 44px, không chỉ dùng màu để truyền thông tin.
- [ ] **8.** API kiểm tra đầu vào ở server; không lộ secret hay stack trace trong response, log và bundle client.

### Nhóm C: Kiểm thử tự động
- [ ] **9.** `npm.cmd run typecheck` 0 lỗi và `npm.cmd test` pass 100%, có test cho luật nghiệp vụ và ca biên trong spec.
- [ ] **10.** `toolbox\scripts\verify-all.cmd` chạy thành công từ đầu đến cuối, gồm cả `npm.cmd run build`.
