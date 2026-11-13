# WEB_SPEC.md — Mẫu đặc tả kỹ thuật cho tính năng Web

> **Ai điền:** Claude (Architect ≤10%) ở đầu mỗi tính năng, cùng lúc chốt kiểu dữ liệu trong `src/types/`. Nếu không bật Claude (Zero-Claude), Antigravity hoặc Codex tự điền theo mẫu này và ghi "spec chưa qua Claude review" vào `HANDOFF.md`.
> **Ai đọc:** Codex code đúng theo spec. Antigravity làm UI theo mục 5 và `UI_DESIGN_SPEC.md` (nếu có).
> Chép mẫu này thành `docs/specs/<yyyy-mm-dd>-<tinh-nang>.md` cho từng tính năng; không sửa trực tiếp file mẫu.

---

## 1. Mục tiêu
- Tính năng làm gì, cho ai, trong 2–3 câu.
- Điều kiện hoàn thành (người dùng làm được gì khi xong).
- Ngoài phạm vi (lần này KHÔNG làm gì).

## 2. Mô hình dữ liệu
- Kiểu dữ liệu chốt tại `src/types/<tinh-nang>.ts` (hoặc `src/types/index.ts` nếu nhỏ).
- Mỗi trường: tên, kiểu, bắt buộc hay không, giá trị mặc định, ràng buộc (độ dài, khoảng số, định dạng).
- Nơi lưu: bộ nhớ server, file, database hay `localStorage` (chỉ dùng cho tiện ích của riêng người xem).

## 3. API
| Method | Đường dẫn | Body vào | Response | Lỗi |
|---|---|---|---|---|
| GET | `/api/<tinh-nang>` | — | `{ items: T[] }` | 500 |
| POST | `/api/<tinh-nang>` | `{ ... }` | `T` | 400 dữ liệu sai |

- Route đặt tại `src/app/api/<tinh-nang>/route.ts`; logic nằm ở `src/server/`, route chỉ kiểm tra đầu vào và gọi logic.
- Mọi đầu vào từ client phải được kiểm tra ở server; response lỗi không lộ stack trace hay dữ liệu nội bộ.

## 4. Luật nghiệp vụ & giới hạn
- Các quy tắc tính toán, sắp xếp, lọc, phân quyền.
- Hằng số giới hạn (số mục tối đa, kích thước tối đa, timeout) đặt tên rõ và dùng chung giữa server và client.
- Ca biên phải có test: rỗng, vượt giới hạn, trùng, dữ liệu sai kiểu, lỗi mạng.

## 5. Màn hình & trạng thái
- Danh sách trang/component, đặt ở `src/app/` và `src/components/ui/`.
- Mỗi màn hình có đủ trạng thái: đang tải, rỗng, có dữ liệu, lỗi (có nút thử lại), đang lưu.
- Responsive: mobile 360px và desktop 1280px; giao diện sáng và tối.

## 6. Bảo mật & riêng tư
- Không đưa secret vào code, log, URL hay bundle client. Biến môi trường ở `.env.local` (đã gitignore).
- Dữ liệu nhạy cảm nào cần che hoặc không được ghi log.

## 7. Test bắt buộc
- Liệt kê từng ca test cho `src/server/` và hook/component quan trọng, viết trong `tests/`.
