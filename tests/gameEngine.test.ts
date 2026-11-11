import { describe, expect, it } from "vitest";
import {
  GRID_SIZE,
  calculateWaveEnemyHp,
  endPlayerTurn,
  placeCardOnGrid,
  startNewGame,
} from "@/game/engine";

describe("2D Grid/Merge + Card Roguelike Game Engine", () => {
  it("initializes a 4x4 grid, 3 energy, and 4 cards in hand on startNewGame", () => {
    const state = startNewGame(100);
    expect(state.status).toBe("playing");
    expect(state.grid.length).toBe(GRID_SIZE);
    expect(state.grid[0].length).toBe(GRID_SIZE);
    expect(state.energy).toBe(3);
    expect(state.hand.length).toBe(4);
    expect(state.highScore).toBe(100);
  });

  it("places a card onto an empty cell and deducts energy", () => {
    const state = startNewGame(0);
    const firstCard = state.hand[0];
    const result = placeCardOnGrid(state, firstCard.id, 1, 2);

    expect(result.actionType).toBe("placed");
    expect(result.nextState.energy).toBe(state.energy - firstCard.energyCost);
    expect(result.nextState.grid[1][2].tile).toEqual({
      kind: firstCard.kind,
      level: 1,
      power: firstCard.power,
    });
    expect(result.nextState.hand.length).toBe(3);
  });

  it("merges two identical (kind + level) cards on the same cell with 2.2x power scaling and combo bonus", () => {
    let state = startNewGame(0);
    const cardA = state.hand[0];

    // Đặt thẻ đầu tiên vào ô (0, 0)
    const step1 = placeCardOnGrid(state, cardA.id, 0, 0);
    state = step1.nextState;

    // Tạo thêm 1 thẻ cùng kind & level trong tay để test Merge
    const matchingCard = {
      ...cardA,
      id: "matching-card-test",
    };
    state = {
      ...state,
      hand: [matchingCard, ...state.hand],
    };

    const step2 = placeCardOnGrid(state, matchingCard.id, 0, 0);
    expect(step2.actionType).toBe("merged");
    expect(step2.nextState.grid[0][0].tile?.level).toBe(2);
    expect(step2.nextState.grid[0][0].tile?.power).toBe(
      Math.ceil(cardA.power * 2.2)
    );
    expect(step2.nextState.comboCount).toBe(1);
    expect(step2.nextState.score).toBeGreaterThan(step1.nextState.score);
  });

  it("rejects placing a card when energy is 0", () => {
    const state = {
      ...startNewGame(0),
      energy: 0,
    };
    const result = placeCardOnGrid(state, state.hand[0].id, 0, 0);
    expect(result.actionType).toBe("invalid");
  });

  it("resolves end of turn combat, advances wave when enemy HP drops to 0, and refreshes hand", () => {
    let state = startNewGame(0);
    // Đặt 1 đơn vị cực mạnh lên ô (0,0) để kết liễu kẻ địch Wave 1
    state.grid[0][0].tile = {
      kind: "warrior",
      level: 3,
      power: 50,
    };

    const resolution = endPlayerTurn(state);
    expect(resolution.waveCleared).toBe(true);
    expect(resolution.nextState.wave).toBe(2);
    expect(resolution.nextState.enemyHp).toBe(calculateWaveEnemyHp(2));
    expect(resolution.nextState.energy).toBe(state.maxEnergy);
    expect(resolution.nextState.hand.length).toBe(4);
  });
});
