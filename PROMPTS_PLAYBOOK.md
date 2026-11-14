# 🎯 PROMPTS_PLAYBOOK.md — Bộ Câu Lệnh Copy-Paste Phân Việc v4.0 (Web)
*(Antigravity Điều Phối 25% • Codex Code Chính 65% • Claude Phụ ≤10% (+5% khi thiết kế UI/UX) + Failsafe đủ 7 trường hợp hết quota)*

Mỗi lần làm tính năng mới cho Web trên **Orca**:
1. Xem **Mục 0** để biết agent nào còn quota → chọn đúng **Chế độ** (0, A–F).
2. Copy & Paste các prompt của chế độ đó theo thứ tự.
3. Nếu một agent hết quota **giữa chừng** → nhảy tới **Mục 9 (Takeover)**.
4. Cần ảnh/asset (icon, pixel art, minh họa, vector, animation) → **Mục 10 (Art, chế độ Art-1…Art-5)**.

> Quy tắc chung cho mọi chế độ: trạng thái luôn nằm trong `HANDOFF.md` + Git (không nằm trong trí nhớ agent). Agent nào cũng phải cập nhật `HANDOFF.md` sau mỗi file hoàn thành, commit nhỏ trên nhánh riêng, và chạy `toolbox\scripts\verify-all.cmd` trước khi báo cáo.

---

## MỤC 0: Bảng Chọn Chế Độ & Tỷ Lệ Phân Việc

| Chế độ | Còn quota | Antigravity | Codex | Claude | Ai điều phối |
|---|---|---|---|---|---|
| **0 — Chuẩn** | Cả 3 | 25% | 65% | 10% | Antigravity |
| **A — Thiếu Claude** | AG + Codex | 30% | 70% | 0 | Antigravity |
| **B — Thiếu Antigravity** | Codex + Claude | 0 | 80% | 20% | **Claude** |
| **C — Codex Solo** | Chỉ Codex | 0 | 100% | 0 | Bạn |
| **D — Thiếu Codex** | AG + Claude | 75% | 0 | 25% | Antigravity |
| **E — Antigravity Solo** | Chỉ AG | 100% | 0 | 0 | Antigravity |
| **F — Claude Solo** | Chỉ Claude | 0 | 0 | 100% (thu nhỏ phạm vi) | Bạn |

**Phân vai chi tiết theo chế độ:**
- **0**: AG = brief + `HANDOFF.md` + UI + nghiệm thu • Codex = `src/server/` + `src/app/api/` + `src/hooks/` + `tests/` + verify • Claude = `src/types/` + spec (`WEB_SPEC.md`) (1 lượt).
- **A**: AG nhận thêm types + spec (từ template) • Codex soát types qua test, sửa type trước khi viết logic. Ghi `HANDOFF.md`: "types/spec chưa qua Claude review".
- **B**: **Claude là Điều phối viên** thay Antigravity: brief + `HANDOFF.md` + types/spec đầu kỳ, soạn sẵn prompt cho từng bước của Codex, kiểm tra ngắn giữa các bước, nghiệm thu cuối theo checklist `PLAYBOOK.md`. Không code. • Codex nhận thêm UI.
- **C**: Codex làm tất cả, chia **pha tuần tự**, mỗi pha 1 phiên + 1 commit + verify xanh. Mục cần mắt người → ghi "chờ review".
- **D**: AG code luôn `src/server/` + `src/app/api/` + `src/hooks/` + `tests/` • Claude = types/spec + đúng 1–2 hàm thuật toán khó (lọc/sắp xếp/tính toán) + 1 lượt review diff.
- **E**: AG làm tất cả theo pha như chế độ C.
- **F**: Claude chỉ làm **phạm vi tối thiểu** (1 tính năng nhỏ hoặc sửa lỗi), ưu tiên chờ Codex/AG có quota lại nếu không gấp.

> Tỷ lệ chỉ là định hướng khối lượng. Khi agent hết quota có lại → **chỉ giao phần review các mục "chờ review"**, không làm lại từ đầu, rồi quay về Chế độ 0.

**Tỷ lệ khi bật Bước Thiết kế UI/UX bằng Claude (Mục 1B):**

| Chế độ | Antigravity | Codex | Claude |
|---|---|---|---|
| 0 + Design | 20% | 65% | 15% |
| B + Design | 0 | 75% | 25% |
| D + Design | 70% | 0 | 30% |
| F | — | — | 100% (bỏ qua Design, chỉ làm việc nhỏ) |
| A / C / E (không có Claude) | Không dùng Design; agent làm UI tự theo `UI_DESIGN_SPEC.md` cũ nếu có, hoặc theo phong cách hiện tại của web | | |

---

## MỤC 1B: 🎨 Thiết kế UI/UX bằng Claude (tùy chọn — trước khi code UI)

> **Khi nào dùng:** tính năng có trang/màn hình/form mới hoặc cần làm đẹp lại. Bỏ qua nếu chỉ sửa logic.
> **Chạy lúc nào:** ngay sau Prompt 2 của Claude (types/spec) — có thể gộp chung 1 lượt — và **trước** khi agent làm UI bắt đầu.
> **Tiết kiệm token:** Claude chỉ viết spec dạng chữ, **không viết code, không HTML mock, không gọi skill design** (khung spec đã nằm sẵn trong prompt). Agent làm UI (Antigravity ở chế độ 0/A/D/E, Codex ở chế độ B/C) code theo spec.

### 📋 Prompt 1B-1 → Claude: Viết `UI_DESIGN_SPEC.md`
```text
Bước Design UI/UX (ngoại lệ được phép: tạo/sửa `UI_DESIGN_SPEC.md`).
Đọc `CLAUDE.md`, `HANDOFF.md` và `src/types/`. Không quét repo, không viết code, không chạy test/build.
Viết `UI_DESIGN_SPEC.md` (tối đa ~2 trang) theo đúng khung:
1. Mood & phong cách: 3–5 từ khoá + 1 câu mô tả cảm giác.
2. Design tokens: bảng màu (hex, kèm vai trò: nền/chính/nhấn/cảnh báo/chữ), font + cỡ chữ theo cấp, bo góc, khoảng cách (thang 4/8px), bóng.
3. Layout: sơ đồ ASCII cho từng màn hình (desktop + mobile ≥360px), vị trí điều hướng và hành động chính, vùng chạm tối thiểu 44px.
4. Thành phần: danh sách component, mỗi cái có trạng thái (default/hover/pressed/disabled/selected) và mapping tới field trong `src/types/`.
5. Chuyển động & phản hồi: hành động người dùng → phản hồi (hover, focus, loading, toast, chuyển trang), thời lượng + easing; tôn trọng `prefers-reduced-motion`.
6. Trạng thái màn hình: đang tải, rỗng, có dữ liệu, lỗi (có nút thử lại), đang lưu, không có quyền.
7. Accessibility: độ tương phản ≥4.5:1, hỗ trợ bàn phím, không chỉ dùng màu để truyền thông tin.
8. Ngoài phạm vi: những gì KHÔNG làm lần này.
Xong ghi 1 dòng vào `HANDOFF.md`: "UI spec: `UI_DESIGN_SPEC.md` — agent làm UI phải code theo spec" rồi kết thúc.
```

### 📋 Prompt 1B-2 → Claude: Review UI sau khi code (tùy chọn, 1 lượt ngắn)
```text
Review UI theo `UI_DESIGN_SPEC.md`. Chỉ đọc `git diff --stat` và các file UI trong diff (`src/components/ui/`, `src/app/`).
Liệt kê tối đa 10 điểm lệch spec (file:dòng + cách sửa 1 câu) vào `HANDOFF.md`. Không tự sửa code, không chạy test/build.
```

> Dòng bổ sung khi giao UI cho Antigravity (0-4, D-3, E-1) hoặc Codex (B-3, C-2): **"Nếu có `UI_DESIGN_SPEC.md` thì code đúng theo spec (tokens, layout, trạng thái, chuyển động); chỗ nào spec không khả thi thì ghi lý do vào `HANDOFF.md`, không tự đổi phong cách."**

---

## MỤC 1: Chế độ 0 — Chuẩn (cả 3 agent)

### 📋 Prompt 0-1 → Antigravity: Lên kế hoạch & `HANDOFF.md`
```text
Chế độ 0 (Chuẩn — AG 25% / Codex 65% / Claude 10%).
Mình muốn thêm/sửa tính năng Web: [Mô tả ngắn gọn tính năng].
Theo đúng `PLAYBOOK.md`:
1. Chạy `toolbox\scripts\handoff-status.cmd`, cập nhật mục tiêu + Context Brief vào `HANDOFF.md`.
2. Liệt kê rõ phần việc của Claude (chỉ chốt `src/types/` & spec theo `toolbox/templates/WEB_SPEC.md` trong 1 lượt), phần của Codex (`src/server/` + `src/app/api/` + `src/hooks/` + `tests/`) và phần UI của bạn (`src/components/ui/`).
3. Ghi "Chế độ: 0" vào `HANDOFF.md`.
```

### 📋 Prompt 0-2 → Claude: Chốt Types & Spec (1 lượt)
```text
Đọc `CLAUDE.md` và `HANDOFF.md`.
Chỉ chốt `src/types/` và viết spec `docs/specs/<ngày>-<tính-năng>.md` theo mẫu `toolbox/templates/WEB_SPEC.md`, đúng yêu cầu trong `HANDOFF.md`.
Không quét toàn bộ repo, không chạy test/build. Cập nhật `HANDOFF.md` và kết thúc ngay khi xong 2 file này.
```

### 📋 Prompt 0-3 → Codex: Core Logic & Unit Tests
```text
Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
Bạn là Main Coder. Hãy:
1. Triển khai logic tại `src/server/`, `src/app/api/`, `src/hooks/` theo đúng `src/types/`; spec tại `docs/specs/` (theo `toolbox/templates/WEB_SPEC.md`).
2. Viết đầy đủ Unit Test trong `tests/` cho toàn bộ luật nghiệp vụ và edge cases.
3. Chạy `toolbox\scripts\verify-all.cmd`, sửa đến khi pass 100%, rồi cập nhật `HANDOFF.md` sau mỗi file hoàn thành.
```

### 📋 Prompt 0-4 → Antigravity: UI & Nghiệm thu
```text
Đọc `PLAYBOOK.md` và `HANDOFF.md`.
0. Nếu có `UI_DESIGN_SPEC.md` thì code đúng theo spec; chỗ không khả thi ghi lý do vào `HANDOFF.md`.
1. Kết nối hook/API của Codex (`src/hooks/`, `src/app/api/`) vào giao diện (`src/components/ui/`), đủ trạng thái tải/rỗng/lỗi, responsive 360px và 1280px, sáng và tối.
2. Chạy `toolbox\scripts\verify-all.cmd` và tự kiểm tra với toàn bộ Checklist Nghiệm thu của `PLAYBOOK.md` trước khi báo cáo.
```

> Codex (0-3) và Antigravity (0-4) có thể chạy song song ở 2 worktree riêng (`toolbox\scripts\new-worktree.cmd`), vì không sửa chung file.

---

## MỤC 2: Chế độ A — Thiếu Claude (AG 30% / Codex 70%)

### 📋 Prompt A-1 → Antigravity: Kế hoạch + tự chốt Types & Spec
```text
Chế độ A (Thiếu Claude — AG 30% / Codex 70%). Không gọi Claude.
Mình muốn làm tính năng Web: [Mô tả ngắn gọn tính năng].
Theo `PLAYBOOK.md`:
1. Chạy `toolbox\scripts\handoff-status.cmd`, điền mục tiêu + Context Brief vào `HANDOFF.md`, ghi "Chế độ: A".
2. Tự chốt `src/types/` và viết spec `docs/specs/<ngày>-<tính-năng>.md` theo mẫu `toolbox/templates/WEB_SPEC.md`.
3. Ghi vào `HANDOFF.md` dòng "types/spec chưa qua Claude review".
4. Đưa câu lệnh để mình giao cho Codex.
```

### 📋 Prompt A-2 → Codex: Soát Types + Core Logic
```text
Chế độ A. Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
1. Trước khi code, soát `src/types/`: chỗ nào khó viết test hoặc mâu thuẫn với luật nghiệp vụ thì sửa type trước và ghi lý do vào `HANDOFF.md`.
2. Triển khai `src/server/`, `src/app/api/`, `src/hooks/` + Unit Test trong `tests/`.
3. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass 100%, cập nhật `HANDOFF.md`.
```

→ Sau đó dùng **Prompt 0-4** cho Antigravity.

---

## MỤC 3: Chế độ B — Thiếu Antigravity → Claude Điều phối (Codex 80% / Claude 20%)

> **Claude là Điều phối viên.** Bạn chỉ chuyển prompt Claude soạn sẵn sang Codex, rồi quay lại gọi Claude kiểm tra.
> **Giữ token Claude:** mỗi lượt Claude chỉ đọc `HANDOFF.md` + `git diff --stat` (+ output `verify-all` nếu cần), không đọc toàn bộ code, không tự sửa code, không chạy vòng test/build.

### 📋 Prompt B-1 → Claude: Khởi động điều phối (1 lượt)
```text
Chế độ B (Thiếu Antigravity — Claude điều phối 20% / Codex 80%).
Đọc `CLAUDE.md`, `PROMPTS_PLAYBOOK.md` Mục 0 và `HANDOFF.md`. Tính năng: [Mô tả ngắn gọn tính năng].
1. Chạy `toolbox\scripts\handoff-status.cmd`.
2. Viết Context Brief (≤15 dòng) vào `HANDOFF.md`: mục tiêu, luật nghiệp vụ, phạm vi file, điều kiện hoàn thành. Ghi "Chế độ: B — Điều phối: Claude".
3. Chia việc thành các bước cho Codex (Logic+API+Tests → UI → ...), ghi danh sách bước vào `HANDOFF.md`.
4. Chốt `src/types/` và spec theo `toolbox/templates/WEB_SPEC.md` (nếu có màn hình mới, viết luôn `UI_DESIGN_SPEC.md` theo Mục 1B).
5. In ra prompt hoàn chỉnh cho bước 1 của Codex để mình copy.
Không quét repo, không chạy test/build.
```

### 📋 Prompt B-2 → Codex: Core Logic + Tests
Dùng prompt Claude vừa soạn (hoặc **Prompt 0-3**).

### 📋 Prompt B-2b → Claude: Kiểm tra giữa các bước & giao bước tiếp (lặp lại sau mỗi bước của Codex)
```text
Chế độ B — Điều phối. Chạy `toolbox\scripts\handoff-status.cmd`.
Chỉ đọc `HANDOFF.md` và `git diff --stat` (đọc file cụ thể chỉ khi thật cần).
1. Bước vừa xong có đạt điều kiện hoàn thành không? `verify-all` đã xanh chưa (theo `HANDOFF.md`)?
2. Nếu chưa đạt: soạn prompt sửa lỗi ngắn cho Codex.
3. Nếu đạt: đánh dấu xong trong `HANDOFF.md` và soạn prompt hoàn chỉnh cho bước tiếp theo của Codex.
In prompt ra để mình copy. Không sửa code.
```

### 📋 Prompt B-3 → Codex: UI (phiên mới, sau khi B-2 xanh)
```text
Chế độ B. Đọc `PLAYBOOK.md` và `HANDOFF.md`.
Bạn kiêm phần UI vì Antigravity hết quota:
0. Nếu có `UI_DESIGN_SPEC.md` thì code đúng theo spec (tokens, layout, trạng thái, chuyển động); chỗ không khả thi ghi lý do vào `HANDOFF.md`, không tự đổi phong cách.
1. Nối `src/hooks/` và `src/app/api/` vào giao diện (`src/components/ui/`, `src/app/`). Làm đủ trạng thái tải/rỗng/lỗi, responsive 360px và 1280px, sáng và tối.
2. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass, cập nhật `HANDOFF.md`.
```

### 📋 Prompt B-4 → Claude: Nghiệm thu cuối (1 lượt, tùy chọn)
```text
Chế độ B — Nghiệm thu. Đọc `HANDOFF.md` và Checklist Mục 4 của `PLAYBOOK.md`.
Xem `git diff --stat` và chỉ đọc các file trong diff. Đối chiếu từng mục checklist, ghi kết quả Đạt/Không đạt + lý do ngắn vào `HANDOFF.md`. Không sửa code, không chạy test/build.
```

---

## MỤC 4: Chế độ C — Codex Solo (Codex 100%)

> Chia **pha tuần tự**. Mỗi pha = 1 phiên Codex mới + 1 commit + `verify-all` xanh mới sang pha sau.

### 📋 Prompt C-1 → Codex: Pha 1 — Brief + Types + Logic + Tests
```text
Chế độ C (Codex Solo — 100%). Claude và Antigravity đều hết quota.
Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`. Tính năng: [Mô tả ngắn gọn tính năng].
1. Chạy `toolbox\scripts\handoff-status.cmd`. Viết Context Brief + "Chế độ: C" + danh sách pha vào `HANDOFF.md`.
2. Viết spec `docs/specs/<ngày>-<tính-năng>.md` theo mẫu `toolbox/templates/WEB_SPEC.md` và chốt `src/types/`.
3. Triển khai `src/server/`, `src/app/api/`, `src/hooks/` + Unit Test trong `tests/`.
4. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass, cập nhật `HANDOFF.md`, dừng lại báo cáo (không làm pha 2).
```

### 📋 Prompt C-2 → Codex: Pha 2 — UI + Hiệu ứng
Dùng **Prompt B-3** (thay "Chế độ B" bằng "Chế độ C").

### 📋 Prompt C-3 → Codex: Pha 3 — Tự nghiệm thu
```text
Chế độ C — Nghiệm thu. Chạy `toolbox\scripts\verify-all.cmd`, đối chiếu Checklist Mục 4 của `PLAYBOOK.md`.
Ghi Đạt/Không đạt vào `HANDOFF.md`. Mục cần mắt người (trải nghiệm, thẩm mỹ, nội dung) → đánh dấu "chờ review" để Claude/Antigravity xem khi có quota lại.
```

---

## MỤC 5: Chế độ D — Thiếu Codex (AG 75% / Claude 25%)

### 📋 Prompt D-1 → Antigravity: Kế hoạch
```text
Chế độ D (Thiếu Codex — AG 75% / Claude 25%).
Mình muốn làm tính năng Web: [Mô tả ngắn gọn tính năng].
1. Chạy `toolbox\scripts\handoff-status.cmd`, điền Context Brief + "Chế độ: D" vào `HANDOFF.md`.
2. Đánh dấu rõ 1–2 hàm thuật toán khó nhất (lọc/sắp xếp/tính toán/phân quyền) để giao riêng cho Claude, phần còn lại bạn tự code.
```

### 📋 Prompt D-2 → Claude: Types + Spec + Hàm khó (1 lượt)
```text
Chế độ D. Đọc `CLAUDE.md` và `HANDOFF.md`.
1. Chốt `src/types/` và spec theo `toolbox/templates/WEB_SPEC.md`.
2. Viết đúng các hàm được chỉ định đích danh trong `HANDOFF.md` (kèm test ngắn cho chính hàm đó).
Không quét repo, không chạy toàn bộ test/build. Cập nhật `HANDOFF.md` và kết thúc.
```

### 📋 Prompt D-3 → Antigravity: Logic + Tests + UI
```text
Chế độ D. Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
Bạn kiêm phần code của Codex:
1. Triển khai phần còn lại của `src/server/`, `src/app/api/`, `src/hooks/` + Unit Test trong `tests/` (dùng lại hàm Claude đã viết, không viết lại).
2. Làm UI như Prompt 0-4.
3. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass, nghiệm thu theo Checklist `PLAYBOOK.md`, cập nhật `HANDOFF.md`.
```

---

## MỤC 6: Chế độ E — Antigravity Solo (AG 100%)

### 📋 Prompt E-1 → Antigravity: Làm theo pha
```text
Chế độ E (Antigravity Solo — 100%). Codex và Claude đều hết quota.
Tính năng: [Mô tả ngắn gọn tính năng]. Đọc `PLAYBOOK.md`, `AGENTS.md`, `HANDOFF.md`.
Làm tuần tự, mỗi pha 1 commit + `toolbox\scripts\verify-all.cmd` xanh:
Pha 1: Brief + "Chế độ: E" + types/spec từ template → Pha 2: `src/server/` + `src/app/api/` + `src/hooks/` + `tests/` → Pha 3: UI → Pha 4: Nghiệm thu Checklist.
Cập nhật `HANDOFF.md` sau mỗi pha, đánh dấu "chờ review" cho logic khó để Codex/Claude xem lại sau. Dừng báo cáo sau mỗi pha.
```

---

## MỤC 7: Chế độ F — Claude Solo (Claude 100%, phạm vi tối thiểu)

> Chỉ dùng khi **gấp**. Nếu không gấp → chờ Codex/Antigravity có quota lại. Claude Pro có giới hạn chặt, vì vậy chỉ làm 1 việc nhỏ mỗi lần.

### 📋 Prompt F-1 → Claude
```text
Chế độ F (Claude Solo — ngoại lệ toàn phần, phạm vi tối thiểu). Codex và Antigravity đều hết quota.
Đọc `HANDOFF.md`. Việc cần làm: [1 tính năng nhỏ hoặc 1 lỗi cụ thể].
Chỉ đọc file liên quan trực tiếp, không quét repo. Sửa xong chạy `toolbox\scripts\verify-all.cmd` một lần.
Cập nhật `HANDOFF.md` (đã làm gì, mục "chờ review" cho Codex) rồi kết thúc.
```

---

## MỤC 8: Khi agent có quota lại — Quay về Chế độ 0

### 📋 Prompt R-1 → Agent vừa có quota lại (review phần "chờ review")
```text
Chế độ Review-Back. Đọc `HANDOFF.md`, chạy `toolbox\scripts\handoff-status.cmd`.
Chỉ xem các mục đánh dấu "chờ review" / "chưa qua Claude review" trong phạm vi vai trò của bạn theo `AGENTS.md`. Sửa nếu cần, chạy `toolbox\scripts\verify-all.cmd`, xoá dấu "chờ review" đã xử lý và ghi "Chế độ: 0" vào `HANDOFF.md`.
```

---

## MỤC 9: 🚑 TAKEOVER — Agent hết quota GIỮA CHỪNG

**Bước 1 — Trước khi chuyển (nếu agent cũ còn trả lời được):**
```text
Sắp hết quota. Dừng ngay việc đang làm, ghi vào `HANDOFF.md`: đã xong gì, file đang dở, bước tiếp theo chính xác. Commit phần đang có (WIP) rồi kết thúc.
```

**Bước 2 — Chọn agent tiếp quản theo bảng:**

| Agent hết quota giữa chừng | Còn lại | Ai tiếp quản | Chuyển sang chế độ |
|---|---|---|---|
| Claude | AG + Codex | Antigravity (types/spec) | A |
| Antigravity | Codex + Claude | Claude (điều phối), Codex (UI) | B |
| Codex | AG + Claude | Antigravity (code), Claude (hàm khó) | D |
| Claude + AG | Codex | Codex | C |
| Codex + Claude | AG | Antigravity | E |
| Codex + AG | Claude | Claude (phạm vi tối thiểu) | F |

**Bước 3 — Paste cho agent tiếp quản:**
```text
Chế độ Failsafe Takeover → chuyển sang Chế độ [A/B/C/D/E/F] theo `PROMPTS_PLAYBOOK.md` Mục 0.
1. Chạy `toolbox\scripts\handoff-status.cmd`, đọc `git diff --stat` và `HANDOFF.md`.
2. Cập nhật "Chế độ: [X]" trong `HANDOFF.md`, nhận thêm phần việc của agent đã hết quota theo phân vai chế độ mới.
3. Làm tiếp đúng mục "bước tiếp theo", không viết lại phần đã đúng.
4. Chạy `toolbox\scripts\verify-all.cmd`, cập nhật `HANDOFF.md` rồi báo cáo.
```

---

## MỤC 10: 🖼️ Quy trình làm Art / Asset (5 chế độ)

Dùng khi web/game cần ảnh: icon, pixel art, minh họa, vector, animation. Chọn chế độ theo agent còn quota, giống Mục 0.

| Chế độ art | Còn quota | Ý tưởng + phác thảo + điều phối | Vẽ raster (pixel, minh họa, sprite) | Vẽ vector / vector động (mã SVG) | Nhập, chuẩn hóa, tích hợp vào web |
|---|---|---|---|---|---|
| **Art-1 — Chuẩn** | Cả 3 | **Claude** | Antigravity | Codex | Codex |
| **Art-2 — Thiếu Antigravity** | Codex + Claude | **Claude** | **Bạn** vẽ trong ChatGPT/Gemini bằng prompt Claude soạn (hoặc Codex nếu có công cụ tạo ảnh) | Codex | Codex |
| **Art-3 — Thiếu Codex** | AG + Claude | **Claude** | Antigravity | Antigravity | Antigravity |
| **Art-4 — Vắng Claude** | AG + Codex | **Antigravity** (ghi "brief chưa qua Claude") | Antigravity | Codex | Codex |
| **Art-5 — Chỉ Claude** | Chỉ Claude | **Claude** | **Bạn** vẽ trong chat bằng prompt Claude soạn | **Claude** viết SVG trực tiếp | Bạn chạy lệnh nhập; Claude chỉ review |

### 10.0 Luật chung cho mọi chế độ art

- **Một bản brief duy nhất:** `docs/art/ART_BRIEF.md`, gồm phong cách, chuẩn kỹ thuật và bảng asset. Các bộ asset ghi trong `docs/art/<set>.json` dạng `[{ "id", "label", "kind", "subject", "status": "todo|generated|approved" }]`. Ảnh đặt ở `public/art/<set>/<id>.(webp|svg)`.
- **Có 5 loại `kind`:**
  - `pixel`: 16–128px, nền trong suốt, ≤ 24 màu, hiển thị với CSS `image-rendering: pixelated`.
  - `illustration`: tối đa 1024px, WebP.
  - `vector`: SVG đã làm sạch.
  - `vector-anim`: SVG có CSS `@keyframes`, chỉ animate `transform`, `opacity`, `fill`, `stroke`; cấm SMIL; phải có `prefers-reduced-motion`.
  - `sprite`: dải khung ngang.
- **Giữ cùng phong cách:** vẽ **cả bộ trong một ảnh lưới** (pixel 4×4, minh họa 2×2) rồi cắt ra. Mỗi ô phải lớn ít nhất gấp đôi kích thước ảnh cuối. Lô sau phải đính kèm tấm ghép các ảnh đã duyệt.
- **Animation nhân vật:** ưu tiên làm `vector-anim` rồi chụp ra `sprite` (bake). Chỉ vẽ sprite thẳng bằng AI khi chuyển động vượt mức rối giấy.
- **Viết `subject` cụ thể:** ghi rõ thời đại, trang phục và chi tiết nhận diện; cấm những thứ hay vẽ sai ("no modern clothing, no guns"); không có chữ trong ảnh.
- **Trạng thái:** game chỉ hiện ảnh có status `approved`. Chỉ **Bạn** được duyệt; agent dừng ở `generated`.
- **Cấm vẽ tay bù khi hết quota công cụ tạo ảnh.** Gặp 429 thì dừng, commit phần đã có, báo id còn thiếu, rồi chuyển chế độ theo bảng 10.6.
- **SVG từ AI phải làm sạch:** bỏ `script`, `on*`, `foreignObject`, `<image>`, link ngoài, `javascript:`; chỉ cho `href="#…"` nội bộ. Hiển thị qua `<img src>`, không chèn SVG thẳng vào DOM.
- **Duyệt bằng tấm ghép:** phóng to 3×, có id dưới mỗi ô. Dự án có bộ công cụ `art:*` thì dùng `art:prompt` / `art:import` / `art:sheet` / `art:bake` / `art:check`. Không có thì agent chuẩn hóa bằng `sharp` theo đúng chuẩn trong brief.
- **Vẫn giữ quy tắc chung:** worktree và nhánh riêng (`agy/<set>-art`, `codex/<set>-art`); không push/merge/deploy khi Bạn chưa đồng ý; không đưa key vào code, log hay chat.

### 📋 Prompt ART-BRIEF → agent điều phối: Viết `docs/art/ART_BRIEF.md` (dùng ở mọi chế độ)
```text
Viết `docs/art/ART_BRIEF.md` cho [web/game]: [mô tả ngắn, đối tượng chơi, cảm giác muốn có].
Gồm:
1. Phong cách: 1 câu "style" tiếng Anh dùng chung cho mọi prompt (góc nhìn, nét, bảng màu, ánh sáng); 3 điều cấm (vd. đồ hiện đại khi chủ đề cổ).
2. Bảng asset: id | tên | kind | kích thước | subject (tiếng Anh, cụ thể, có chi tiết nhận diện) | ghi chú animation.
3. Chuẩn kỹ thuật theo kind (Mục 10.0) + dung lượng tối đa mỗi file.
4. Phác thảo: với 3–5 asset quan trọng nhất, mô tả bố cục bằng chữ (hoặc khung ASCII); với vector-anim, liệt kê bộ phận chuyển động và chuyển động của từng bộ phận.
5. Chia lô: lô nào vẽ trong lưới nào, ai vẽ (theo chế độ art hiện tại).
Ghi `docs/art/<set>.json` (status "todo"). Cập nhật `HANDOFF.md` mục "Art: chế độ [Art-x], brief xong". Hỏi tôi duyệt brief trước khi giao vẽ.
```

### 📋 Prompt ART-CHAT → dán vào ChatGPT/Gemini (raster) hoặc Claude/ChatGPT (SVG)

**Lưới raster:**
```text
Create ONE square image: a [R]×[C] grid of equal square cells, thin light-gray grid lines, plain white background.
Each cell contains exactly one subject, centered, filling about 80% of the cell. No text, no letters, no numbers, no watermark.
Style for every cell: [style trong brief]. All cells share the same style, scale, lighting and viewpoint.
Cells, left to right, top to bottom:
1. [subject]
2. [subject]
```
Sửa một ô: `Redraw only cell [n]: [góp ý]. Keep every other cell exactly the same.` · Lô sau: đính kèm tấm ghép đã duyệt + `Match the exact style of the attached sheet.`

**Dải sprite:**
```text
Create ONE image: a horizontal strip of [N] equal frames, plain white background, no grid lines.
The same character in every frame ([subject]), same size, feet on the same ground line, [chuyển động]. Style: [style]. No text.
```

**SVG / SVG động:**
```text
Write SVG code. For each icon put a line <!-- id: [id] --> then one <svg viewBox="0 0 [W] [H]">.
Flat shapes, at most [8] colors, bold shapes (must read at 48px). No text, no <image>, no script, no external links.
[Chỉ vector-anim:] Animate with CSS @keyframes in one <style>: transform, opacity, fill, stroke only. Each moving part is a <g id="…"> with transform-box: fill-box and transform-origin. Seamless loop ≤ [1–4]s. No SMIL. Include @media (prefers-reduced-motion: reduce) { * { animation: none !important } }.
Put everything in ONE code block.
- [id]: [subject + chuyển động]
```

### 10.1 Art-1 — Chuẩn (Claude ý tưởng + điều phối • Antigravity vẽ raster • Codex vẽ vector + nhập + tích hợp)

1. **→ Claude:** Prompt ART-BRIEF. Bạn duyệt brief.
2. **→ Antigravity** (raster):
```text
Chế độ Art-1. Đọc `docs/art/ART_BRIEF.md` và `docs/art/<set>.json`. Làm trong worktree + nhánh `agy/<set>-art`.
Vẽ các asset kind pixel/illustration/sprite bằng công cụ tạo ảnh của bạn, theo lưới và lô ghi trong brief, đúng câu style chung. KHÔNG vẽ tay bù, KHÔNG gọi API key.
Ảnh hiện đồ hiện đại khi chủ đề cổ, có chữ, hoặc không nhận ra → vẽ lại trước khi lưu.
Lưu ảnh lưới gốc vào `.art/raw/` (không commit). Để Codex cắt/chuẩn hóa, hoặc tự chạy lệnh `art:import` nếu dự án có.
Hết quota: dừng, commit phần đã có, ghi id còn thiếu vào `HANDOFF.md`.
Không sửa `src/**`. Không push/merge/deploy. Báo cáo kết bằng "chờ review".
```
3. **→ Codex** (vector + nhập + tích hợp, chạy song song với bước 2, khác file):
```text
Chế độ Art-1. Đọc `docs/art/ART_BRIEF.md`, `docs/art/<set>.json`, `HANDOFF.md`. Nhánh `codex/<set>-art`.
1. Viết SVG cho asset kind vector/vector-anim theo brief (mỗi bộ phận chuyển động là một <g id>, CSS @keyframes, có prefers-reduced-motion, không SMIL). Làm sạch SVG theo Mục 10.0.
2. Nhập ảnh lưới Antigravity để trong `.art/raw/`: cắt ô (chừa lề 6%), bỏ nền trắng, chuẩn hóa theo kind, ghi `public/art/<set>/<id>.*`, status "generated". Sprite: neo giữa-đáy, cùng bảng màu cho mọi khung. vector-anim cần sprite thì bake bằng trình duyệt chạy ngầm.
3. Xuất tấm ghép `.art/sheet-<set>.png` (+ `.art/preview-<set>.html` cho animation).
4. Tích hợp: component hiển thị chỉ dùng asset "approved", có fallback; precache nếu web có service worker; test kiểm kích thước, dung lượng, SVG sạch.
Chạy `toolbox\scripts\verify-all.cmd`. Không push/merge/deploy. Báo "chờ review".
```
4. **→ Claude:** `Review tấm ghép .art/sheet-<set>.png theo brief: liệt kê id lệch phong cách, sai chủ đề, không nhận ra; viết lại subject cho các id đó.` Vòng lặp bước 2–4 chỉ với các id được nêu.
5. **Bạn** duyệt → đổi status sang `approved` → merge → deploy.

### 10.2 Art-2 — Thiếu Antigravity (Claude điều phối • Bạn vẽ raster trong chat • Codex vector + nhập + tích hợp)

1. **→ Claude:** Prompt ART-BRIEF, thêm dòng: `Soạn luôn các prompt ART-CHAT cho từng lô raster để tôi dán vào ChatGPT/Gemini.`
2. **Bạn:** dán từng prompt vào ChatGPT hoặc Gemini, góp ý ngay trong chat tới khi ưng, tải ảnh lưới về `.art/raw/<set>-batch-<n>.png`.
3. **→ Codex:** dùng prompt của bước 3 trong Art-1, đổi dòng đầu thành "Chế độ Art-2" và bỏ phần chờ Antigravity. Nếu Codex có công cụ tạo ảnh thì có thể vẽ raster thay Bạn (cùng luật như Antigravity).
4. Review và duyệt: giống bước 4–5 của Art-1.

### 10.3 Art-3 — Thiếu Codex (Claude điều phối • Antigravity vẽ cả raster lẫn vector, nhập, tích hợp)

1. **→ Claude:** Prompt ART-BRIEF.
2. **→ Antigravity:** dùng prompt của bước 2 trong Art-1, đổi thành "Chế độ Art-3" và thêm phần việc 1–4 của Codex ở Art-1 (vector, nhập, tấm ghép, tích hợp). Chia thành 2 commit: `feat: <set> art` và `feat: integrate <set> art`.
3. **→ Claude:** review tấm ghép, và thêm 1 lượt review diff phần tích hợp (chỉ đọc `git diff --stat` và file component).
4. Bạn duyệt → merge → deploy.

### 10.4 Art-4 — Vắng Claude (Antigravity ý tưởng + điều phối • Antigravity vẽ raster • Codex vector + nhập + tích hợp)

1. **→ Antigravity:** Prompt ART-BRIEF, thêm: `Ghi "brief chưa qua Claude review" vào HANDOFF.md.`
2. **→ Antigravity** (raster) và **→ Codex** (vector, nhập, tích hợp): dùng prompt của bước 2 và 3 trong Art-1, đổi thành "Chế độ Art-4".
3. **Review chéo thay Claude:** Codex xem tấm ghép raster, Antigravity xem SVG và animation (mở `.art/preview-<set>.html`). Mỗi bên ghi id cần sửa vào `HANDOFF.md`.
4. Bạn duyệt → merge → deploy. Khi Claude có quota lại: Prompt R-1, chỉ review brief và tấm ghép.

### 10.5 Art-5 — Chỉ Claude (phạm vi tối thiểu)

```text
Chế độ Art-5 (chỉ Claude, phạm vi tối thiểu). Viết `docs/art/ART_BRIEF.md` + `docs/art/<set>.json` gọn (tối đa [N] asset).
1. Vector / vector-anim: tự viết SVG trực tiếp vào `public/art/<set>/<id>.svg` theo luật Mục 10.0, status "generated".
2. Raster: soạn prompt ART-CHAT theo lô để tôi tự vẽ trong ChatGPT/Gemini. Nếu dự án có `art:import` thì đưa tôi lệnh nhập; nếu không, ghi rõ bước chuẩn hóa còn lại vào `HANDOFF.md` cho Codex/Antigravity làm sau.
3. Không viết code tích hợp. Ghi "Art-5: còn tích hợp + nhập raster" vào `HANDOFF.md` rồi dừng.
```
Khi tôi gửi tấm ghép, chỉ review và viết lại subject cho các id hỏng.

### 10.6 Hết quota giữa chừng khi đang làm art

| Hết quota | Chuyển sang | Ghi chú |
|---|---|---|
| Công cụ tạo ảnh của Antigravity | Art-2 (Bạn vẽ phần raster còn lại trong chat) | Dùng tấm ghép đã duyệt làm ảnh mẫu để giữ phong cách |
| Antigravity | Art-2 | |
| Codex | Art-3 | Antigravity nhận phần nhập và tích hợp |
| Claude | Art-4 | Ghi "brief chưa qua Claude" |
| Codex + Antigravity | Art-5 | |

Paste cho agent tiếp quản: dùng Bước 3 của Mục 9, thay "Chế độ [A–F]" bằng "Chế độ [Art-x] theo Mục 10".
