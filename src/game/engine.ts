/**
 * src/game/engine.ts — Core Game Engine (Địa bàn của Codex — Code chính 65%)
 * Thể loại: 2D Grid/Merge (4x4) kết hợp Card/Deckbuilder Roguelike theo lượt.
 * Tuân thủ công thức trong: toolbox/templates/GAME_BALANCE_SPEC.md
 */

import type {
  BoardTile,
  CardKind,
  GameCard,
  GameState,
  GridCell,
  PlacementResult,
  TurnResolutionResult,
} from "@/types/game";

export const GRID_SIZE = 4;
export const MAX_ENERGY_PER_TURN = 3;
export const HAND_SIZE = 4;

const ENEMY_NAMES = [
  "Slime Hư Không",
  "Kỵ Sĩ Hắc Ám",
  "Phù Thủy Cổ Đại",
  "Rồng Tinh Thể",
  "Chúa Tể Hỗn Mang",
];

const BASE_CARD_POOL: Array<{ name: string; kind: CardKind; power: number; energyCost: number }> = [
  { name: "Kiếm Sĩ", kind: "warrior", power: 4, energyCost: 1 },
  { name: "Hộ Vệ Khiên", kind: "shield", power: 3, energyCost: 1 },
  { name: "Pháp Sư Tinh Cầu", kind: "arcane", power: 5, energyCost: 1 },
];

export function calculateWaveEnemyHp(wave: number): number {
  return 15 + (Math.max(1, wave) - 1) * 12;
}

export function calculateWaveEnemyAttack(wave: number): number {
  return 3 + Math.floor((Math.max(1, wave) - 1) * 1.5);
}

export function createEmptyGrid(): GridCell[][] {
  const grid: GridCell[][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const rowCells: GridCell[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      rowCells.push({ row: r, col: c, tile: null });
    }
    grid.push(rowCells);
  }
  return grid;
}

export function generateHand(turnSeed: number, wave: number): GameCard[] {
  const hand: GameCard[] = [];
  for (let i = 0; i < HAND_SIZE; i++) {
    const templateIndex = (turnSeed + i + wave) % BASE_CARD_POOL.length;
    const base = BASE_CARD_POOL[templateIndex];
    hand.push({
      id: `card-w${wave}-t${turnSeed}-${i}`,
      name: base.name,
      kind: base.kind,
      level: 1,
      power: base.power,
      energyCost: base.energyCost,
    });
  }
  return hand;
}

export function createInitialGameState(highScore = 0): GameState {
  const wave = 1;
  const enemyMaxHp = calculateWaveEnemyHp(wave);
  const hand = generateHand(1, wave);
  return {
    status: "menu",
    wave,
    turn: 1,
    score: 0,
    highScore,
    playerHp: 25,
    maxPlayerHp: 25,
    energy: MAX_ENERGY_PER_TURN,
    maxEnergy: MAX_ENERGY_PER_TURN,
    enemyName: ENEMY_NAMES[0],
    enemyHp: enemyMaxHp,
    maxEnemyHp: enemyMaxHp,
    enemyAttack: calculateWaveEnemyAttack(wave),
    grid: createEmptyGrid(),
    hand,
    selectedCardId: hand[0]?.id ?? null,
    comboCount: 0,
    lastActionLog: "Chọn 1 thẻ bài bên dưới rồi chạm vào ô trên lưới 4x4 để đặt hoặc Merge!",
  };
}

export function startNewGame(highScore = 0): GameState {
  const initial = createInitialGameState(highScore);
  return {
    ...initial,
    status: "playing",
  };
}

export function cloneGameState(state: GameState): GameState {
  return {
    ...state,
    grid: state.grid.map((row) =>
      row.map((cell) => ({
        row: cell.row,
        col: cell.col,
        tile: cell.tile ? { ...cell.tile } : null,
      }))
    ),
    hand: state.hand.map((card) => ({ ...card })),
  };
}

export function placeCardOnGrid(
  state: GameState,
  cardId: string,
  row: number,
  col: number
): PlacementResult {
  if (state.status !== "playing") {
    return {
      nextState: state,
      actionType: "invalid",
      powerGain: 0,
      message: "Ván chơi hiện không ở trạng thái đang diễn ra.",
    };
  }

  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) {
    return {
      nextState: state,
      actionType: "invalid",
      powerGain: 0,
      message: "Tọa độ ô lưới không hợp lệ.",
    };
  }

  const card = state.hand.find((c) => c.id === cardId);
  if (!card) {
    return {
      nextState: state,
      actionType: "invalid",
      powerGain: 0,
      message: "Vui lòng chọn một thẻ bài trên tay trước khi đặt lên lưới.",
    };
  }

  if (state.energy < card.energyCost) {
    return {
      nextState: state,
      actionType: "invalid",
      powerGain: 0,
      message: "Không đủ Năng lượng! Hãy bấm 'Kết thúc Lượt' để hồi đầy năng lượng.",
    };
  }

  const targetCell = state.grid[row][col];
  const next = cloneGameState(state);

  // Trường hợp 1: Ô trống -> Đặt thẻ bài mới
  if (!targetCell.tile) {
    const newTile: BoardTile = {
      kind: card.kind,
      level: card.level,
      power: card.power,
    };
    next.grid[row][col].tile = newTile;
    next.energy -= card.energyCost;
    next.hand = next.hand.filter((c) => c.id !== cardId);
    next.selectedCardId = next.hand[0]?.id ?? null;
    next.score += 10;
    next.highScore = Math.max(next.highScore, next.score);
    next.lastActionLog = `Đã đặt [${card.name} Lv.${card.level}] tại ô (${row + 1}, ${col + 1}).`;

    return {
      nextState: next,
      actionType: "placed",
      powerGain: card.power,
      message: next.lastActionLog,
    };
  }

  // Trường hợp 2: Ô đã có đơn vị cùng loại (kind) và cùng cấp (level) -> Hợp nhất (MERGE!)
  if (targetCell.tile.kind === card.kind && targetCell.tile.level === card.level) {
    const newLevel = targetCell.tile.level + 1;
    const mergedPower = Math.ceil(targetCell.tile.power * 2.2);
    const nextCombo = next.comboCount + 1;
    const mergeScoreBonus = newLevel * 50 * nextCombo;

    next.grid[row][col].tile = {
      kind: card.kind,
      level: newLevel,
      power: mergedPower,
    };
    next.energy -= card.energyCost;
    next.hand = next.hand.filter((c) => c.id !== cardId);
    next.selectedCardId = next.hand[0]?.id ?? null;
    next.comboCount = nextCombo;
    next.score += mergeScoreBonus;
    next.highScore = Math.max(next.highScore, next.score);
    next.lastActionLog = `🔥 MERGE THÀNH CÔNG! Nâng lên Lv.${newLevel} (Sức mạnh ${mergedPower}) • +${mergeScoreBonus} điểm (Combo x${nextCombo})!`;

    return {
      nextState: next,
      actionType: "merged",
      powerGain: mergedPower,
      message: next.lastActionLog,
    };
  }

  return {
    nextState: state,
    actionType: "invalid",
    powerGain: 0,
    message: "Ô này đã có đơn vị khác loại hoặc khác cấp! Chỉ Merge được 2 đơn vị cùng loại và cùng cấp.",
  };
}

export function endPlayerTurn(state: GameState): TurnResolutionResult {
  if (state.status !== "playing") {
    return {
      nextState: state,
      totalPlayerAttack: 0,
      shieldBlocked: 0,
      netDamageToPlayer: 0,
      waveCleared: false,
    };
  }

  const next = cloneGameState(state);
  let totalAttack = 0;
  let totalShield = 0;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const tile = next.grid[r][c].tile;
      if (!tile) continue;
      if (tile.kind === "warrior") {
        totalAttack += tile.power;
      } else if (tile.kind === "arcane") {
        // Phép thuật cộng hưởng: thêm +2 sát thương nếu có đơn vị ở ô liền kề
        const hasNeighbor =
          (r > 0 && next.grid[r - 1][c].tile !== null) ||
          (r < GRID_SIZE - 1 && next.grid[r + 1][c].tile !== null) ||
          (c > 0 && next.grid[r][c - 1].tile !== null) ||
          (c < GRID_SIZE - 1 && next.grid[r][c + 1].tile !== null);
        totalAttack += tile.power + (hasNeighbor ? 2 * tile.level : 0);
      } else if (tile.kind === "shield") {
        totalShield += tile.power;
      }
    }
  }

  next.enemyHp = Math.max(0, next.enemyHp - totalAttack);

  // Kiểm tra tiêu diệt Boss của Wave hiện tại
  if (next.enemyHp <= 0) {
    const clearedWave = next.wave;
    const nextWave = clearedWave + 1;
    const waveClearBonus = clearedWave * 150;
    next.score += waveClearBonus;
    next.highScore = Math.max(next.highScore, next.score);
    next.wave = nextWave;
    next.turn += 1;
    next.energy = next.maxEnergy;
    next.playerHp = Math.min(next.maxPlayerHp, next.playerHp + 4);
    const newEnemyMaxHp = calculateWaveEnemyHp(nextWave);
    next.enemyName = ENEMY_NAMES[(nextWave - 1) % ENEMY_NAMES.length];
    next.enemyHp = newEnemyMaxHp;
    next.maxEnemyHp = newEnemyMaxHp;
    next.enemyAttack = calculateWaveEnemyAttack(nextWave);
    next.hand = generateHand(next.turn, nextWave);
    next.selectedCardId = next.hand[0]?.id ?? null;
    next.lastActionLog = `🏆 Đã tiêu diệt kẻ địch Wave ${clearedWave} (+${waveClearBonus} điểm, hồi +4 HP)! Tiến vào Wave ${nextWave}!`;

    return {
      nextState: next,
      totalPlayerAttack: totalAttack,
      shieldBlocked: totalShield,
      netDamageToPlayer: 0,
      waveCleared: true,
    };
  }

  // Kẻ địch phản công nếu chưa bị hạ
  const blocked = Math.min(next.enemyAttack, totalShield);
  const netDamage = Math.max(0, next.enemyAttack - totalShield);
  next.playerHp = Math.max(0, next.playerHp - netDamage);

  if (next.playerHp <= 0) {
    next.status = "game_over";
    next.highScore = Math.max(next.highScore, next.score);
    next.lastActionLog = `💀 Bạn đã gục ngã ở Wave ${next.wave}! Tổng điểm: ${next.score}.`;
    return {
      nextState: next,
      totalPlayerAttack: totalAttack,
      shieldBlocked: blocked,
      netDamageToPlayer: netDamage,
      waveCleared: false,
    };
  }

  next.turn += 1;
  next.energy = next.maxEnergy;
  next.hand = generateHand(next.turn, next.wave);
  next.selectedCardId = next.hand[0]?.id ?? null;
  next.lastActionLog = `⚔️ Lượt ${state.turn}: Gây ${totalAttack} sát thương • Khiên chặn ${blocked}/${next.enemyAttack} đòn địch (Mất ${netDamage} HP).`;

  return {
    nextState: next,
    totalPlayerAttack: totalAttack,
    shieldBlocked: blocked,
    netDamageToPlayer: netDamage,
    waveCleared: false,
  };
}
