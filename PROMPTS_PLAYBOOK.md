# 🎯 PROMPTS_PLAYBOOK.md — Bộ Câu Lệnh Copy-Paste Phân Việc v3.0
*(Antigravity Điều Phối 25% • Codex Code Chính 65% • Claude Phụ ≤10% + Failsafe đủ 7 trường hợp hết quota)*

Mỗi lần làm tính năng mới cho Game HTML trên **Orca**:
1. Xem **Mục 0** để biết agent nào còn quota → chọn đúng **Chế độ** (0, A–F).
2. Copy & Paste các prompt của chế độ đó theo thứ tự.
3. Nếu một agent hết quota **giữa chừng** → nhảy tới **Mục 9 (Takeover)**.

> Quy tắc chung cho mọi chế độ: trạng thái luôn nằm trong `HANDOFF.md` + Git (không nằm trong trí nhớ agent). Agent nào cũng phải cập nhật `HANDOFF.md` sau mỗi file hoàn thành, commit nhỏ trên nhánh riêng, và chạy `toolbox\scripts\verify-all.cmd` trước khi báo cáo.

---

## MỤC 0: Bảng Chọn Chế Độ & Tỷ Lệ Phân Việc

| Chế độ | Còn quota | Antigravity | Codex | Claude | Ai điều phối |
|---|---|---|---|---|---|
| **0 — Chuẩn** | Cả 3 | 25% | 65% | 10% | Antigravity |
| **A — Thiếu Claude** | AG + Codex | 30% | 70% | 0 | Antigravity |
| **B — Thiếu Antigravity** | Codex + Claude | 0 | 85% | 15% | Bạn + Codex |
| **C — Codex Solo** | Chỉ Codex | 0 | 100% | 0 | Bạn |
| **D — Thiếu Codex** | AG + Claude | 75% | 0 | 25% | Antigravity |
| **E — Antigravity Solo** | Chỉ AG | 100% | 0 | 0 | Antigravity |
| **F — Claude Solo** | Chỉ Claude | 0 | 0 | 100% (thu nhỏ phạm vi) | Bạn |

**Phân vai chi tiết theo chế độ:**
- **0**: AG = brief + `HANDOFF.md` + UI/Canvas + nghiệm thu • Codex = `src/game/` + `tests/` + verify • Claude = `src/types/game.ts` + `GAME_BALANCE_SPEC.md` (1 lượt).
- **A**: AG nhận thêm types + balance (từ template) • Codex soát types qua test, sửa type trước khi viết engine. Ghi `HANDOFF.md`: "types chưa qua Claude review".
- **B**: Codex nhận thêm điều phối + UI/Canvas (tái dùng `toolbox/modules/`) • Claude = 1 lượt brief + types/balance đầu kỳ, 1 lượt nghiệm thu cuối theo checklist `PLAYBOOK.md`. Không code UI.
- **C**: Codex làm tất cả, chia **pha tuần tự**, mỗi pha 1 phiên + 1 commit + verify xanh. Mục cần mắt người → ghi "chờ review".
- **D**: AG code luôn `src/game/` + `tests/` • Claude = types/balance + đúng 1–2 hàm thuật toán khó (merge/combo/RNG) + 1 lượt review diff.
- **E**: AG làm tất cả theo pha như chế độ C.
- **F**: Claude chỉ làm **phạm vi tối thiểu** (1 tính năng nhỏ hoặc sửa lỗi), ưu tiên chờ Codex/AG có quota lại nếu không gấp.

> Tỷ lệ chỉ là định hướng khối lượng. Khi agent hết quota có lại → **chỉ giao phần review các mục "chờ review"**, không làm lại từ đầu, rồi quay về Chế độ 0.

---

## MỤC 1: Chế độ 0 — Chuẩn (cả 3 agent)

### 📋 Prompt 0-1 → Antigravity: Lên kế hoạch & `HANDOFF.md`
```text
Chế độ 0 (Chuẩn — AG 25% / Codex 65% / Claude 10%).
Mình muốn thêm/sửa tính năng Game HTML: [Mô tả ngắn gọn tính năng].
Theo đúng `PLAYBOOK.md`:
1. Chạy `toolbox\scripts\handoff-status.cmd`, cập nhật mục tiêu + Context Brief vào `HANDOFF.md`.
2. Liệt kê rõ phần việc của Claude (chỉ chốt `src/types/game.ts` & `toolbox/templates/GAME_BALANCE_SPEC.md` trong 1 lượt), phần của Codex (`src/game/` + `tests/`) và phần UI/Canvas của bạn (`src/components/ui/`).
3. Ghi "Chế độ: 0" vào `HANDOFF.md`.
```

### 📋 Prompt 0-2 → Claude: Chốt Types & Balance (1 lượt)
```text
Đọc `CLAUDE.md` và `HANDOFF.md`.
Chỉ cập nhật `src/types/game.ts` và công thức cân bằng tại `toolbox/templates/GAME_BALANCE_SPEC.md` theo yêu cầu trong `HANDOFF.md`.
Không quét toàn bộ repo, không chạy test/build. Cập nhật `HANDOFF.md` và kết thúc ngay khi xong 2 file này.
```

### 📋 Prompt 0-3 → Codex: Core Logic & Unit Tests
```text
Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
Bạn là Main Coder. Hãy:
1. Triển khai logic game tại `src/game/` theo đúng `src/types/game.ts`, tái sử dụng `toolbox/modules/` (như `storageManager.ts`).
2. Viết đầy đủ Unit Test trong `tests/` cho toàn bộ luật chơi và edge cases.
3. Chạy `toolbox\scripts\verify-all.cmd`, sửa đến khi pass 100%, rồi cập nhật `HANDOFF.md` sau mỗi file hoàn thành.
```

### 📋 Prompt 0-4 → Antigravity: UI/Canvas & Nghiệm thu
```text
Đọc `PLAYBOOK.md` và `HANDOFF.md`.
1. Kết nối logic của Codex trong `src/game/` vào Canvas/HUD (`src/components/ui/`), gắn âm thanh từ `toolbox/modules/soundSynth.ts` và hiệu ứng từ `toolbox/modules/tweenParticles.ts`.
2. Chạy `toolbox\scripts\verify-all.cmd` và tự kiểm tra với toàn bộ Checklist Nghiệm thu của `PLAYBOOK.md` trước khi báo cáo.
```

> Codex (0-3) và Antigravity (0-4) có thể chạy song song ở 2 worktree riêng (`toolbox\scripts\new-worktree.cmd`), vì không sửa chung file.

---

## MỤC 2: Chế độ A — Thiếu Claude (AG 30% / Codex 70%)

### 📋 Prompt A-1 → Antigravity: Kế hoạch + tự chốt Types & Balance
```text
Chế độ A (Thiếu Claude — AG 30% / Codex 70%). Không gọi Claude.
Mình muốn làm tính năng Game HTML: [Mô tả ngắn gọn tính năng].
Theo `PLAYBOOK.md`:
1. Chạy `toolbox\scripts\handoff-status.cmd`, điền mục tiêu + Context Brief vào `HANDOFF.md`, ghi "Chế độ: A".
2. Tự chốt `src/types/game.ts` và thông số trong `toolbox/templates/GAME_BALANCE_SPEC.md` dựa trên template.
3. Ghi vào `HANDOFF.md` dòng "types/balance chưa qua Claude review".
4. Đưa câu lệnh để mình giao cho Codex.
```

### 📋 Prompt A-2 → Codex: Soát Types + Core Logic
```text
Chế độ A. Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
1. Trước khi code, soát `src/types/game.ts`: chỗ nào khó viết test hoặc mâu thuẫn với luật chơi thì sửa type trước và ghi lý do vào `HANDOFF.md`.
2. Triển khai `src/game/` + Unit Test trong `tests/`, tái sử dụng `toolbox/modules/`.
3. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass 100%, cập nhật `HANDOFF.md`.
```

→ Sau đó dùng **Prompt 0-4** cho Antigravity.

---

## MỤC 3: Chế độ B — Thiếu Antigravity (Codex 85% / Claude 15%)

> **Bạn** là điều phối viên: chạy `toolbox\scripts\handoff-status.cmd` giữa các bước để xem trạng thái.

### 📋 Prompt B-1 → Claude: Brief + Types & Balance (1 lượt)
```text
Chế độ B (Thiếu Antigravity — Codex 85% / Claude 15%). Ngoại lệ được phép: viết brief vào `HANDOFF.md`.
Đọc `CLAUDE.md` và `HANDOFF.md`. Tính năng: [Mô tả ngắn gọn tính năng].
1. Viết Context Brief ngắn (≤15 dòng) vào `HANDOFF.md`: mục tiêu, luật chơi, phạm vi file, điều kiện hoàn thành. Ghi "Chế độ: B".
2. Chốt `src/types/game.ts` và `toolbox/templates/GAME_BALANCE_SPEC.md`.
Không quét repo, không chạy test/build. Kết thúc ngay khi xong.
```

### 📋 Prompt B-2 → Codex: Core Logic + Tests
Dùng **Prompt 0-3**.

### 📋 Prompt B-3 → Codex: UI/Canvas (phiên mới, sau khi B-2 xanh)
```text
Chế độ B. Đọc `PLAYBOOK.md` và `HANDOFF.md`.
Bạn kiêm phần UI vì Antigravity hết quota:
1. Kết nối `src/game/` vào Canvas/HUD (`src/components/ui/`, `src/app/`). Bắt buộc dùng `toolbox/modules/soundSynth.ts`, `tweenParticles.ts`, `storageManager.ts` — không viết lại.
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

### 📋 Prompt C-1 → Codex: Pha 1 — Brief + Types + Engine + Tests
```text
Chế độ C (Codex Solo — 100%). Claude và Antigravity đều hết quota.
Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`. Tính năng: [Mô tả ngắn gọn tính năng].
1. Chạy `toolbox\scripts\handoff-status.cmd`. Viết Context Brief + "Chế độ: C" + danh sách pha vào `HANDOFF.md`.
2. Chốt `src/types/game.ts` từ `toolbox/templates/GAME_BALANCE_SPEC.md`.
3. Triển khai `src/game/` + Unit Test trong `tests/`.
4. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass, cập nhật `HANDOFF.md`, dừng lại báo cáo (không làm pha 2).
```

### 📋 Prompt C-2 → Codex: Pha 2 — UI/Canvas + Hiệu ứng
Dùng **Prompt B-3** (thay "Chế độ B" bằng "Chế độ C").

### 📋 Prompt C-3 → Codex: Pha 3 — Tự nghiệm thu
```text
Chế độ C — Nghiệm thu. Chạy `toolbox\scripts\verify-all.cmd`, đối chiếu Checklist Mục 4 của `PLAYBOOK.md`.
Ghi Đạt/Không đạt vào `HANDOFF.md`. Mục cần mắt người (cảm giác chơi, độ khó, thẩm mỹ) → đánh dấu "chờ review" để Claude/Antigravity xem khi có quota lại.
```

---

## MỤC 5: Chế độ D — Thiếu Codex (AG 75% / Claude 25%)

### 📋 Prompt D-1 → Antigravity: Kế hoạch
```text
Chế độ D (Thiếu Codex — AG 75% / Claude 25%).
Mình muốn làm tính năng Game HTML: [Mô tả ngắn gọn tính năng].
1. Chạy `toolbox\scripts\handoff-status.cmd`, điền Context Brief + "Chế độ: D" vào `HANDOFF.md`.
2. Đánh dấu rõ 1–2 hàm thuật toán khó nhất (merge/combo/RNG/scoring) để giao riêng cho Claude, phần còn lại bạn tự code.
```

### 📋 Prompt D-2 → Claude: Types + Balance + Hàm khó (1 lượt)
```text
Chế độ D. Đọc `CLAUDE.md` và `HANDOFF.md`.
1. Chốt `src/types/game.ts` và `toolbox/templates/GAME_BALANCE_SPEC.md`.
2. Viết đúng các hàm được chỉ định đích danh trong `HANDOFF.md` (kèm test ngắn cho chính hàm đó).
Không quét repo, không chạy toàn bộ test/build. Cập nhật `HANDOFF.md` và kết thúc.
```

### 📋 Prompt D-3 → Antigravity: Engine + Tests + UI
```text
Chế độ D. Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
Bạn kiêm phần code của Codex:
1. Triển khai phần còn lại của `src/game/` + Unit Test trong `tests/` (dùng lại hàm Claude đã viết, không viết lại).
2. Làm UI/Canvas như Prompt 0-4.
3. Chạy `toolbox\scripts\verify-all.cmd` đến khi pass, nghiệm thu theo Checklist `PLAYBOOK.md`, cập nhật `HANDOFF.md`.
```

---

## MỤC 6: Chế độ E — Antigravity Solo (AG 100%)

### 📋 Prompt E-1 → Antigravity: Làm theo pha
```text
Chế độ E (Antigravity Solo — 100%). Codex và Claude đều hết quota.
Tính năng: [Mô tả ngắn gọn tính năng]. Đọc `PLAYBOOK.md`, `AGENTS.md`, `HANDOFF.md`.
Làm tuần tự, mỗi pha 1 commit + `toolbox\scripts\verify-all.cmd` xanh:
Pha 1: Brief + "Chế độ: E" + types/balance từ template → Pha 2: `src/game/` + `tests/` → Pha 3: UI/Canvas với `toolbox/modules/` → Pha 4: Nghiệm thu Checklist.
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
| Claude | AG + Codex | Antigravity (types/balance) | A |
| Antigravity | Codex + Claude | Codex (UI + điều phối) | B |
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
