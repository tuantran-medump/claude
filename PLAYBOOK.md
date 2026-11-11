# 🎮 PLAYBOOK.md — Quy Chuẩn Phát Triển Game HTML Đa Agent (v2.0)
*(Antigravity Điều Phối Chính • Codex Code Chính • Claude Architect 10% + Failsafe)*

Tài liệu này là **Playbook trung tâm** được tổng hợp từ kết quả phỏng vấn yêu cầu dự án. Mọi Agent (**Antigravity**, **Codex**, **Claude**) phải tuân thủ tuyệt đối các mục tiêu, quy trình, quy định Toolbox và Checklist nghiệm thu dưới đây trước khi bàn giao bất kỳ kết quả nào cho người dùng.

---

## 1. MỤC TIÊU DỰ ÁN & PHÂN VAI CHIẾN LƯỢC (OBJECTIVES)

### A. Định hướng Sản phẩm Game HTML
- **Công nghệ (Tech Stack)**: **Vite + TypeScript (`strict: true`) + HTML5 Canvas 2D** (hỗ trợ chạy trên trình duyệt mượt 60 FPS và xuất bản build tĩnh).
- **Thể loại (Genre Mix)**: **2D Grid/Board Puzzle + Merge kết hợp Card/Deckbuilder Roguelike theo lượt**:
  - Người chơi rút bài theo lượt (Turn/Energy system), đặt thẻ bài (Chiến binh / Khiên / Phép) lên bảng lưới chiến thuật `4x4`.
  - Đặt 2 thẻ cùng loại và cùng cấp lên cùng 1 ô sẽ **Hợp nhất (Merge)** lên cấp cao hơn với sức mạnh nhân bội và điểm thưởng Combo.
  - Cuối mỗi lượt, các ô trên bảng lưới tự động kích hoạt tấn công/phòng thủ chống lại đợt kẻ địch (Wave Roguelike), có tính năng **Đi lại 1 bước (Undo)** và **Tự động lưu ván chơi (`localStorage` Auto-Save)**.

### B. Phân bổ Tải & Vai trò 3 Agent (Bảo vệ tối đa Token Claude Pro)

| Agent | Tỷ trọng | Vai trò Cốt lõi | Nhiệm vụ Cụ thể |
| :--- | :---: | :--- | :--- |
| **Codex** *(`GPT Pro`)* | **65%** | **Main Coder (Code Chính & QA)** | Viết toàn bộ Core Game Engine (`src/game/engine.ts`), logic bảng lưới 4x4, rút bài/đánh bài, hợp nhất (Merge), tính sát thương theo lượt, Undo history, và bộ Unit Test (`tests/`). |
| **Antigravity** *(`Gemini Pro`)* | **25%** | **Main Orchestrator (Điều Phối & UI)** | Phỏng vấn yêu cầu, cập nhật [`HANDOFF.md`](./HANDOFF.md), xây dựng [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md), dựng giao diện HTML5 Canvas Renderer + HUD (`src/components/ui/`), ghép âm thanh/hiệu ứng và **kiểm tra nghiệm thu với Checklist Playbook**. |
| **Claude** *(`Claude Pro`)* | **≤10%** | **Architect-Only (Chỉ chốt khung đầu)** | Chỉ tham gia ở bước đầu tiên để chốt `src/types/game.ts` và công thức cân bằng trong [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md), sau đó **rút lui hoàn toàn** để dành token cho việc quan trọng khác của người dùng. |

---

## 2. CÁC BƯỚC THỰC HIỆN CHUẨN (5-STEP EXECUTION WORKFLOW)

1. **Bước 1 — Khởi tạo & Gom Ngữ cảnh (`Antigravity` — Điều phối viên)**:
   - Chạy [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) để kiểm tra trạng thái repo.
   - Ghi rõ mục tiêu tính năng, danh sách file cần sửa và thông số vào [`HANDOFF.md`](./HANDOFF.md).
2. **Bước 2 — Chốt Kiến trúc & Cân bằng Game (`Claude 10%` hoặc `Failsafe Antigravity/Codex`)**:
   - Điền công thức cân bằng vào [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md) và chốt Interfaces trong [`src/types/game.ts`](./src/types/game.ts).
   - Ngay sau khi chốt xong 2 file này, **ngắt phiên Claude ngay lập tức** để bảo toàn token.
3. **Bước 3 — Triển khai Code Chính & Unit Tests (`Codex 65%` — Main Coder)**:
   - Codex đọc [`HANDOFF.md`](./HANDOFF.md) và [`src/types/game.ts`](./src/types/game.ts), viết toàn bộ logic xử lý game trong `src/game/` và viết test đầy đủ trong `tests/`.
   - Codex tái sử dụng trực tiếp [`toolbox/modules/storageManager.ts`](./toolbox/modules/storageManager.ts) để lưu trạng thái ván chơi và High Score.
4. **Bước 4 — Dựng Canvas UI, Âm thanh & Hiệu ứng (`Antigravity 25%`)**:
   - Antigravity kết nối Engine của Codex vào HTML5 Canvas (`src/components/ui/GameCanvas.tsx`), tích hợp sẵn âm thanh từ [`toolbox/modules/soundSynth.ts`](./toolbox/modules/soundSynth.ts) và hiệu ứng hạt/rung màn hình từ [`toolbox/modules/tweenParticles.ts`](./toolbox/modules/tweenParticles.ts).
5. **Bước 5 — Nghiệm thu Tự động theo Playbook (`Codex` + `Antigravity`)**:
   - Chạy [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd) và đối chiếu từng mục trong **Mục 4 (Checklist Sản phẩm Hoàn thiện)** trước khi báo cáo cho người dùng.

---

## 3. QUY ĐỊNH THỰC HIỆN, TOOLBOX & CƠ CHẾ FAILSAFE (EXECUTION RULES)

### A. Quy định Bắt buộc về Sử dụng Toolbox (Cấm viết lại code đã duyệt)
Để tiết kiệm token và tránh làm lại tác vụ cũ, mọi Agent **BẮT BUỘC** sử dụng các file trong [`toolbox/`](./toolbox/docs/TOOLBOX_INDEX.md):
- **Kiểm tra trạng thái bàn giao**: Phải gọi [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) thay vì gõ rời rạc nhiều lệnh git.
- **Kiểm tra chất lượng code (Build/Type/Test)**: Phải gọi [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd).
- **Tạo nhánh Worktree mới trên Orca**: Phải gọi [`toolbox/scripts/new-worktree.cmd`](./toolbox/scripts/new-worktree.cmd).
- **Âm thanh Game (SFX)**: Phải import [`toolbox/modules/soundSynth.ts`](./toolbox/modules/soundSynth.ts) — **CẤM** viết lại hàm `AudioContext` mới trong component.
- **Lưu trữ `localStorage` (High Score & Auto-Save)**: Phải import [`toolbox/modules/storageManager.ts`](./toolbox/modules/storageManager.ts).
- **Hiệu ứng Hạt, Chữ bay & Rung màn hình Canvas**: Phải import [`toolbox/modules/tweenParticles.ts`](./toolbox/modules/tweenParticles.ts).
- **Bảng công thức cân bằng Game**: Phải đọc/cập nhật tại [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md).

### B. Cơ chế Failsafe 3 Lớp (Chống đứt gãy khi hết Token hoặc lỗi giữa chừng)
1. **Lớp 1 — Zero-Claude Failsafe (Khi bạn giữ token Claude cho việc khác)**:
   - Nếu người dùng không mở Claude ở Bước 2, **Antigravity** tự động kích hoạt chế độ *Architect Fallback*: dùng công thức chuẩn trong [`toolbox/templates/GAME_BALANCE_SPEC.md`](./toolbox/templates/GAME_BALANCE_SPEC.md) để chốt luôn [`src/types/game.ts`](./src/types/game.ts) và chuyển thẳng cho **Codex** code chính mà không cần chờ Claude.
2. **Lớp 2 — Mid-Task Token Failover (Khi Codex hoặc Antigravity hết quota giữa chừng)**:
   - Mọi tiến độ đều được ghi xuống đĩa tại [`HANDOFF.md`](./HANDOFF.md) sau mỗi file.
   - Mở Agent còn lại trong cùng Worktree, chạy [`toolbox/scripts/handoff-status.cmd`](./toolbox/scripts/handoff-status.cmd) để đọc `git diff` + `HANDOFF.md` và làm tiếp ngay từ dòng đang dở.
3. **Lớp 3 — Verification Gate Failsafe (Chặn báo cáo sản phẩm lỗi)**:
   - Không Agent nào được phép tuyên bố "Hoàn thành" nếu chưa chạy [`toolbox/scripts/verify-all.cmd`](./toolbox/scripts/verify-all.cmd) đạt kết quả `[SUCCESS] All Playbook Verification Checks Passed (0 Errors)!`.

### C. Quy định Bảo mật Windows PowerShell
- Giữ nguyên khóa `.ps1` (`Restricted`) của hệ thống. **CẤM** chạy `Set-ExecutionPolicy`.
- Mọi lệnh gọi qua đuôi `.cmd`: `npm.cmd`, `npx.cmd`, `claude.cmd`, `codex.cmd` và các script `.cmd` trong `toolbox/scripts/`.

---

## 4. CHECKLIST NGHIỆM THU SẢN PHẨM HOÀN THIỆN (DEFINITION OF DONE)

> **Quy tắc bắt buộc cho Antigravity & Codex**: Trước khi trình bày sản phẩm cho người dùng, phải tự kiểm tra và đánh dấu `[x]` toàn bộ 10 tiêu chuẩn dưới đây:

### Nhóm A: Tiêu chuẩn Bộ Kit Đa Agent & Toolbox
- [x] **1. Đầy đủ 5 file điều phối gốc**: [`PLAYBOOK.md`](./PLAYBOOK.md), [`AGENTS.md`](./AGENTS.md), [`CLAUDE.md`](./CLAUDE.md), [`GEMINI.md`](./GEMINI.md), [`HANDOFF.md`](./HANDOFF.md) đã cập nhật phân vai mới (*Codex Code Chính 65% • Antigravity Điều Phối 25% • Claude Architect 10% + Failsafe*).
- [x] **2. Đầy đủ Toolbox tái sử dụng**: Có đủ 3 script (`.cmd`), 3 module game TypeScript (`soundSynth.ts`, `storageManager.ts`, `tweenParticles.ts`), 1 template cân bằng (`GAME_BALANCE_SPEC.md`) và danh mục [`toolbox/docs/TOOLBOX_INDEX.md`](./toolbox/docs/TOOLBOX_INDEX.md).
- [x] **3. Đóng gói bản Portable Starter Kit**: Đã xuất bản sạch ra thư mục `C:\Users\Admin\orca\multi-agent-starter-kit` và nén thành `C:\Users\Admin\orca\multi-agent-starter-kit.zip` để chép sang bất kỳ Git repo nào.

### Nhóm B: Tiêu chuẩn Sản phẩm Game HTML (2D Grid/Merge + Card Roguelike)
- [x] **4. Vòng lặp trạng thái Game hoàn chỉnh**: Có đủ trạng thái `menu` (Màn hình mở đầu) $\rightarrow$ `playing` (Đang chơi có HUD Máu, Năng lượng, Wave, Điểm, Kỷ lục) $\rightarrow$ `paused` (Tạm dừng) $\rightarrow$ `victory` / `game_over` (Chiến thắng đợt / Thua cuộc + Chơi lại).
- [x] **5. Cơ chế Gameplay kết hợp Grid Puzzle/Merge + Card/Deckbuilder**:
  - Rút bài mỗi lượt, tiêu hao Năng lượng (`Energy`) để đặt bài lên lưới `4x4`.
  - Đặt thẻ cùng loại & cùng cấp lên ô đã có sẽ **Merge nâng cấp (`Level + 1`)**, tăng chỉ số và cộng điểm Combo.
  - Kết thúc lượt (`End Turn`): các đơn vị trên lưới tấn công Kẻ địch, Khiên chặn sát thương phản đòn của Kẻ địch.
- [x] **6. Hỗ trợ tính năng tiện ích người chơi**: Có nút **Đi lại 1 nước (`Undo`)**, nút **Bật/Tắt âm thanh (`Mute`)**, và **Tự động lưu ván đang chơi + High Score (`localStorage`)** qua `toolbox/modules/storageManager.ts`.
- [x] **7. Tương tác đa thiết bị & Hiệu ứng Juice 60 FPS**:
  - Hỗ trợ cả **Click chuột (PC)** lẫn **Chạm màn hình (Touch/Mobile)** trực tiếp trên HTML5 Canvas.
  - Có âm thanh Web Audio (`soundSynth.ts`) và hiệu ứng nổ hạt + chữ bay + rung màn hình (`tweenParticles.ts`).

### Nhóm C: Kiểm thử Tự động (Verification Gate)
- [x] **8. Pass 100% TypeScript Strict Check**: Chạy `npm.cmd run typecheck` đạt `0 errors`.
- [x] **9. Pass 100% Unit Tests**: Bộ test trong `tests/` kiểm tra đầy đủ logic Đặt bài, Merge nâng cấp, Tính sát thương qua lượt, Undo và Failsafe đạt `100% passed`.
- [x] **10. Pass Script Nghiệm thu Tổng (`toolbox\scripts\verify-all.cmd`)**: Chạy thành công từ đầu đến cuối bao gồm cả `npm.cmd run build`.
