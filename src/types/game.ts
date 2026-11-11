/**
 * src/types/game.ts — Hợp đồng Kiểu Dữ Liệu Game HTML (2D Grid/Merge + Card Roguelike)
 * Tuân thủ công thức cân bằng tại: toolbox/templates/GAME_BALANCE_SPEC.md
 */

export type GameStatus = "menu" | "playing" | "paused" | "victory" | "game_over";

export type CardKind = "warrior" | "shield" | "arcane";

export interface GameCard {
  id: string;
  name: string;
  kind: CardKind;
  level: number;
  power: number;
  energyCost: number;
}

export interface BoardTile {
  kind: CardKind;
  level: number;
  power: number;
}

export interface GridCell {
  row: number;
  col: number;
  tile: BoardTile | null;
}

export interface GameState {
  status: GameStatus;
  wave: number;
  turn: number;
  score: number;
  highScore: number;
  playerHp: number;
  maxPlayerHp: number;
  energy: number;
  maxEnergy: number;
  enemyName: string;
  enemyHp: number;
  maxEnemyHp: number;
  enemyAttack: number;
  grid: GridCell[][];
  hand: GameCard[];
  selectedCardId: string | null;
  comboCount: number;
  lastActionLog: string;
}

export interface PlacementResult {
  nextState: GameState;
  actionType: "placed" | "merged" | "invalid";
  powerGain: number;
  message: string;
}

export interface TurnResolutionResult {
  nextState: GameState;
  totalPlayerAttack: number;
  shieldBlocked: number;
  netDamageToPlayer: number;
  waveCleared: boolean;
}
