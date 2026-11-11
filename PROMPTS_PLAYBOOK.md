# 🎯 PROMPTS_PLAYBOOK.md — Bộ Câu Lệnh Copy-Paste Phân Việc v2.0
*(Antigravity Điều Phối 25% • Codex Code Chính 65% • Claude Phụ ≤10% + Failsafe)*

Mỗi lần làm tính năng mới cho Game HTML trên **Orca**, bạn chỉ cần Copy & Paste đúng câu lệnh dưới đây:

---

## BƯỚC 1: Giao cho Antigravity (Điều phối viên chính) — Lên kế hoạch & Chuẩn bị `HANDOFF.md`

### 📋 Prompt 1A — Chuẩn bị tính năng mới (Dùng kèm Claude 10%)
```text
Mình muốn thêm/sửa tính năng Game HTML: [Mô tả ngắn gọn tính năng].
Theo đúng `PLAYBOOK.md`:
1. Hãy chạy `toolbox\scripts\handoff-status.cmd` và cập nhật mục tiêu + Context Brief vào `HANDOFF.md`.
2. Liệt kê rõ phần việc của Claude (chỉ chốt `src/types/game.ts` & `toolbox/templates/GAME_BALANCE_SPEC.md` trong 1 lượt), phần Code chính của Codex (`src/game/` + `tests/`), và phần UI/Canvas của bạn (`src/components/ui/`).
```

### 📋 Prompt 1B — Chế độ "Zero-Claude Failsafe" (Tiết kiệm 100% token Claude cho việc khác)
```text
Mình muốn làm tính năng Game HTML: [Mô tả ngắn gọn tính năng] ở chế độ Zero-Claude Failsafe (không gọi Claude để tiết kiệm token).
Theo `PLAYBOOK.md`, bạn hãy tự chốt luôn `src/types/game.ts` và thông số cân bằng trong `toolbox/templates/GAME_BALANCE_SPEC.md`, điền `HANDOFF.md` và đưa ngay câu lệnh để mình giao cho Codex vào code chính.
```

---

## BƯỚC 2: (Tùy chọn) Giao cho Claude Code (`claude.cmd` — Chỉ 10% Architect đầu kỳ)
> **Lưu ý**: Bỏ qua bước này nếu bạn dùng **Prompt 1B (Zero-Claude Failsafe)** ở trên.

### 📋 Prompt 2A — Chốt Types & Công thức cân bằng trong 1 lượt duy nhất
```text
Đọc `CLAUDE.md` và `HANDOFF.md`.
Chỉ cập nhật `src/types/game.ts` và công thức cân bằng tại `toolbox/templates/GAME_BALANCE_SPEC.md` theo yêu cầu trong `HANDOFF.md`.
Tuyệt đối không quét toàn bộ repo và không chạy test/build. Cập nhật `HANDOFF.md` và kết thúc ngay khi xong 2 file này.
```

---

## BƯỚC 3: Giao cho OpenAI Codex (`codex.cmd` — Code Chính 65% & QA)
> **Mục đích**: Giao toàn bộ phần code nặng nhất (Game Engine, Grid/Merge/Card logic, State Machine, Unit Tests) cho Codex.

### 📋 Prompt 3A — Giao Codex viết toàn bộ Core Game Logic & Unit Tests
```text
Đọc `PLAYBOOK.md`, `AGENTS.md` và `HANDOFF.md`.
Bạn là Main Coder (Code chính). Hãy:
1. Triển khai toàn bộ logic game được giao tại `src/game/` theo đúng `src/types/game.ts` và tái sử dụng các module có sẵn trong `toolbox/modules/` (như `storageManager.ts`).
2. Viết đầy đủ Unit Test trong `tests/` cho toàn bộ luật chơi và edge cases.
3. Chạy `toolbox\scripts\verify-all.cmd` và sửa cho đến khi pass 100%, sau đó cập nhật `HANDOFF.md`.
```

---

## BƯỚC 4: Giao cho Antigravity — Ghép UI Canvas, Hiệu ứng Toolbox & Nghiệm thu Playbook

### 📋 Prompt 4A — Hoàn thiện UI/Canvas & Chạy Checklist Nghiệm thu
```text
Đọc `PLAYBOOK.md` và `HANDOFF.md`.
1. Hãy kết nối logic mới của Codex trong `src/game/` vào giao diện Canvas/HUD (`src/components/ui/`), gắn âm thanh từ `toolbox/modules/soundSynth.ts` và hiệu ứng từ `toolbox/modules/tweenParticles.ts`.
2. Chạy `toolbox\scripts\verify-all.cmd` và tự kiểm tra sản phẩm với toàn bộ 10 mục trong Checklist Nghiệm thu của `PLAYBOOK.md` trước khi báo cáo cho mình.
```

---

## 🚑 CỨU HỘ KHẨN CẤP (FAILSAFE): Khi bất kỳ Agent nào hết Token hoặc đứt quãng giữa chừng

Mở ngay **Codex (`codex.cmd`)** hoặc **Antigravity** trong cùng Worktree và paste:

```text
Chế độ Failsafe Takeover: Hãy chạy `toolbox\scripts\handoff-status.cmd` để đọc trạng thái Git diff và `HANDOFF.md` hiện tại, sau đó tiếp tục hoàn thiện nốt các mục đang dở và kiểm tra bằng `toolbox\scripts\verify-all.cmd`.
```
