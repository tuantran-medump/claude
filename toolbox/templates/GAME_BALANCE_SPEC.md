# ⚖️ GAME_BALANCE_SPEC.md — Mẫu Thiết Kế Cân Bằng Game (Dành cho Claude 10% hoặc Codex Failsafe)

> **Quy định sử dụng**:
> - Ở đầu mỗi tính năng mới, **Claude (Architect-Only ~10%)** chỉ điền thông số vào bảng này và cập nhật `src/types/game.ts`, sau đó rút lui để **Codex (Code chính)** triển khai.
> - **Failsafe**: Nếu người dùng không bật Claude (để dành token cho việc khác), **Antigravity** và **Codex** tự điền bảng này dựa trên công thức mặc định bên dưới.

---

## 1. Cấu hình Bảng Lưới (Grid / Board)
- **Kích thước lưới**: `4 x 4` ô (16 ô chiến thuật).
- **Quy tắc đặt bài & Merge**:
  - Đặt thẻ bài lên ô trống: tốn năng lượng (`energyCost`) của thẻ.
  - Đặt thẻ bài cùng loại (`unit` / `shield` / `spell`) và cùng cấp (`level`) lên ô đã có đơn vị cùng loại & cấp $\rightarrow$ **Hợp nhất (Merge) lên `level + 1`**, sức mạnh (`power`) nhân hệ số **`2.2x`** (làm tròn lên) và tặng điểm thưởng Combo!

## 2. Công thức Cân bằng theo Lượt / Màn (Turn & Wave Scaling)
- **Năng lượng mỗi lượt (`maxEnergy`)**: `3` năng lượng / lượt.
- **Số lá bài rút mỗi lượt (`handSize`)**: `4` lá.
- **Máu boss / Đợt kẻ địch (`enemyWaveHp`)**:
  $$\text{EnemyHP}(\text{wave}) = 15 + (\text{wave} - 1) \times 12$$
- **Sát thương kẻ địch cuối mỗi lượt (`enemyAttack`)**:
  $$\text{EnemyATK}(\text{wave}) = 3 + \lfloor (\text{wave} - 1) \times 1.5 \rfloor$$
- **Điểm thưởng khi Merge (`mergeScore`)**:
  $$\text{Score} = \text{NewLevel} \times 50 \times \text{ComboMultiplier}$$
