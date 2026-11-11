"use client";

import React, { useEffect, useRef, useState } from "react";
import type { CardKind, GameState } from "@/types/game";
import {
  GRID_SIZE,
  cloneGameState,
  createInitialGameState,
  endPlayerTurn,
  placeCardOnGrid,
  startNewGame,
} from "@/game/engine";
import { soundSynth } from "../../../toolbox/modules/soundSynth";
import {
  clearRunState,
  loadHighScore,
  loadRunState,
  saveHighScore,
  saveRunState,
} from "../../../toolbox/modules/storageManager";
import { CanvasJuiceManager } from "../../../toolbox/modules/tweenParticles";

const CANVAS_SIZE = 400;
const CELL_PADDING = 12;
const CELL_SIZE = (CANVAS_SIZE - CELL_PADDING * (GRID_SIZE + 1)) / GRID_SIZE;

const KIND_STYLE: Record<
  CardKind,
  { bg: string; border: string; icon: string; label: string }
> = {
  warrior: {
    bg: "#7f1d1d",
    border: "#f87171",
    icon: "⚔️",
    label: "Kiếm Sĩ (Công)",
  },
  shield: {
    bg: "#1e3a8a",
    border: "#60a5fa",
    icon: "🛡️",
    label: "Hộ Vệ (Thủ)",
  },
  arcane: {
    bg: "#581c87",
    border: "#c084fc",
    icon: "✨",
    label: "Pháp Sư (Cộng hưởng)",
  },
};

export function TacticalGridGame() {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(0)
  );
  const [undoSnapshot, setUndoSnapshot] = useState<GameState | null>(null);
  const [muted, setMuted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const juiceRef = useRef<CanvasJuiceManager>(new CanvasJuiceManager());
  const stateRef = useRef<GameState>(gameState);
  stateRef.current = gameState;

  // Khởi tạo High Score & Auto-Save từ localStorage qua Toolbox
  useEffect(() => {
    const savedHigh = loadHighScore();
    const savedRun = loadRunState<GameState>();
    if (savedRun && savedRun.status === "playing") {
      setGameState({
        ...savedRun,
        highScore: Math.max(savedHigh, savedRun.highScore),
      });
    } else {
      setGameState((prev) => ({
        ...prev,
        highScore: Math.max(prev.highScore, savedHigh),
      }));
    }
  }, []);

  // Tự động lưu trạng thái ván chơi & High Score
  useEffect(() => {
    if (gameState.score > 0) {
      saveHighScore(gameState.score);
    }
    if (gameState.status === "playing") {
      saveRunState(gameState);
    } else if (gameState.status === "game_over") {
      clearRunState();
    }
  }, [gameState]);

  // Vòng lặp vẽ HTML5 Canvas 60 FPS
  useEffect(() => {
    let animationFrameId = 0;

    const renderLoop = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          juiceRef.current.update();
          drawBoard(ctx, stateRef.current, juiceRef.current);
        }
      }
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  const handleStartNewGame = () => {
    const best = Math.max(gameState.highScore, loadHighScore());
    const next = startNewGame(best);
    setUndoSnapshot(null);
    setGameState(next);
    soundSynth.play("card_draw");
  };

  const handleTogglePause = () => {
    setGameState((prev) => {
      if (prev.status === "playing") return { ...prev, status: "paused" };
      if (prev.status === "paused") return { ...prev, status: "playing" };
      return prev;
    });
  };

  const handleToggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    soundSynth.setMuted(nextMute);
  };

  const handleUndo = () => {
    if (!undoSnapshot || gameState.status !== "playing") return;
    setGameState(undoSnapshot);
    setUndoSnapshot(null);
    soundSynth.play("card_draw");
  };

  const handleCanvasPointerDown = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (gameState.status !== "playing" || !gameState.selectedCardId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cellX = CELL_PADDING + c * (CELL_SIZE + CELL_PADDING);
        const cellY = CELL_PADDING + r * (CELL_SIZE + CELL_PADDING);

        if (
          clickX >= cellX &&
          clickX <= cellX + CELL_SIZE &&
          clickY >= cellY &&
          clickY <= cellY + CELL_SIZE
        ) {
          const snapshotBeforeMove = cloneGameState(gameState);
          const result = placeCardOnGrid(
            gameState,
            gameState.selectedCardId,
            r,
            c
          );

          const centerX = cellX + CELL_SIZE / 2;
          const centerY = cellY + CELL_SIZE / 2;

          if (result.actionType === "placed") {
            setUndoSnapshot(snapshotBeforeMove);
            setGameState(result.nextState);
            soundSynth.play("card_place");
            juiceRef.current.spawnBurst(centerX, centerY, "#38bdf8", 12);
            juiceRef.current.spawnFloatingText(
              centerX,
              centerY - 10,
              `+${result.powerGain}`,
              "#e0f2fe"
            );
          } else if (result.actionType === "merged") {
            setUndoSnapshot(snapshotBeforeMove);
            setGameState(result.nextState);
            soundSynth.play("tile_merge");
            juiceRef.current.triggerShake(7);
            juiceRef.current.spawnBurst(centerX, centerY, "#fbbf24", 22);
            juiceRef.current.spawnFloatingText(
              centerX,
              centerY - 12,
              `MERGE Lv! (${result.powerGain})`,
              "#fde047"
            );
          } else {
            setGameState((prev) => ({
              ...prev,
              lastActionLog: result.message,
            }));
          }
          return;
        }
      }
    }
  };

  const handleEndTurn = () => {
    if (gameState.status !== "playing") return;
    const snapshotBeforeTurn = cloneGameState(gameState);
    const resolution = endPlayerTurn(gameState);
    setUndoSnapshot(snapshotBeforeTurn);
    setGameState(resolution.nextState);

    if (resolution.waveCleared) {
      soundSynth.play("victory");
      juiceRef.current.triggerShake(9);
      juiceRef.current.spawnFloatingText(
        CANVAS_SIZE / 2,
        CANVAS_SIZE / 2,
        "WAVE CLEARED!",
        "#34d399"
      );
    } else if (resolution.nextState.status === "game_over") {
      soundSynth.play("game_over");
      juiceRef.current.triggerShake(12);
    } else {
      soundSynth.play(
        resolution.totalPlayerAttack > 0 ? "attack_hit" : "turn_end"
      );
      if (resolution.totalPlayerAttack > 0) {
        juiceRef.current.triggerShake(5);
        juiceRef.current.spawnFloatingText(
          CANVAS_SIZE / 2,
          40,
          `-${resolution.totalPlayerAttack} HP Địch!`,
          "#f87171"
        );
      }
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-xl space-y-5">
      {/* Thanh tiêu đề & Điều khiển tiện ích */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🎴 Tactical Grid & Card Merge Roguelike
            <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-medium text-emerald-300">
              HTML5 Canvas 60 FPS
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Đặt thẻ lên lưới 4x4 • Ghép 2 ô cùng loại & cùng cấp để Merge x2.2 sức mạnh • Cuối lượt tự động công/thủ!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={!undoSnapshot || gameState.status !== "playing"}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition"
          >
            ↩️ Đi lại (Undo)
          </button>
          <button
            type="button"
            onClick={handleToggleMute}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
          >
            {muted ? "🔇 Đang tắt tiếng" : "🔊 Âm thanh Synth"}
          </button>
          {gameState.status === "playing" || gameState.status === "paused" ? (
            <button
              type="button"
              onClick={handleTogglePause}
              className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/25 transition"
            >
              {gameState.status === "paused" ? "▶️ Tiếp tục" : "⏸️ Tạm dừng"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleStartNewGame}
            className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition"
          >
            {gameState.status === "menu" ? "🚀 Bắt đầu Chơi" : "🔄 Ván Mới"}
          </button>
        </div>
      </div>

      {/* Thanh chỉ số HUD: Wave, Điểm, Kỷ lục, Máu Người chơi vs Máu Kẻ địch */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Đợt (Wave) / Lượt
          </div>
          <div className="mt-1 text-lg font-bold text-indigo-300">
            Wave {gameState.wave} • Lượt {gameState.turn}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Máu Người Chơi
          </div>
          <div className="mt-1 text-lg font-bold text-emerald-400">
            ❤️ {gameState.playerHp} / {gameState.maxPlayerHp}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Năng Lượng Lượt
          </div>
          <div className="mt-1 text-lg font-bold text-sky-400">
            ⚡ {gameState.energy} / {gameState.maxEnergy}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            {gameState.enemyName}
          </div>
          <div className="mt-1 text-sm font-bold text-rose-400">
            👾 HP: {gameState.enemyHp}/{gameState.maxEnemyHp} (⚔️{gameState.enemyAttack})
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Điểm / Kỷ Lục
          </div>
          <div className="mt-1 text-lg font-bold text-amber-300">
            🏆 {gameState.score} <span className="text-xs text-slate-400">(Best: {gameState.highScore})</span>
          </div>
        </div>
      </div>

      {/* Khu vực chính: Bảng Lưới HTML5 Canvas bên trái + Bộ bài trên tay bên phải */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Cột 1: HTML5 Canvas 4x4 Board */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-inner">
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              onPointerDown={handleCanvasPointerDown}
              className="w-full h-full cursor-pointer touch-manipulation block"
            />

            {/* Overlay Menu Mở đầu / Tạm dừng / Game Over */}
            {gameState.status !== "playing" && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                {gameState.status === "menu" && (
                  <>
                    <div className="text-4xl">🏰</div>
                    <h3 className="text-xl font-bold text-white">
                      Sẵn sàng bước vào Bàn Cờ Chiến Thuật?
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                      Mỗi lượt bạn có <strong>3 Năng lượng (⚡)</strong>. Chọn bài bên phải và đặt vào lưới 4x4. Đặt 2 thẻ <strong>cùng loại & cùng cấp</strong> chồng lên nhau để <strong>MERGE</strong> tăng vọt sức mạnh!
                    </p>
                    <button
                      type="button"
                      onClick={handleStartNewGame}
                      className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 shadow-lg transition"
                    >
                      ▶️ Bắt Đầu Ván Mới
                    </button>
                  </>
                )}

                {gameState.status === "paused" && (
                  <>
                    <div className="text-4xl">⏸️</div>
                    <h3 className="text-xl font-bold text-amber-300">
                      Đang Tạm Dừng
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tiến độ ván chơi đã được tự động lưu vào localStorage.
                    </p>
                    <button
                      type="button"
                      onClick={handleTogglePause}
                      className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
                    >
                      ▶️ Tiếp Tục Chơi
                    </button>
                  </>
                )}

                {gameState.status === "game_over" && (
                  <>
                    <div className="text-4xl">💀</div>
                    <h3 className="text-2xl font-bold text-rose-400">
                      THẤT THỦ Ở WAVE {gameState.wave}!
                    </h3>
                    <p className="text-sm text-slate-200">
                      Điểm đạt được: <strong className="text-amber-300">{gameState.score}</strong> • Kỷ lục: <strong className="text-emerald-300">{gameState.highScore}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={handleStartNewGame}
                      className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 transition"
                    >
                      🔄 Phục Thù Ngay
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cột 2: Thẻ bài trên tay (Card Hand) & Nút Kết thúc Lượt */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Nhật ký Chiến trường
            </div>
            <div className="text-sm font-medium text-amber-200">
              {gameState.lastActionLog}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200">
                Thẻ Bài Trên Tay ({gameState.hand.length} lá)
              </span>
              <span className="text-xs text-slate-400">
                Bước 1: Chọn thẻ • Bước 2: Chạm ô trên lưới 4x4
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {gameState.hand.map((card) => {
                const isSelected = card.id === gameState.selectedCardId;
                const style = KIND_STYLE[card.kind];
                return (
                  <button
                    key={card.id}
                    type="button"
                    disabled={gameState.status !== "playing"}
                    onClick={() => {
                      setGameState((prev) => ({
                        ...prev,
                        selectedCardId: card.id,
                      }));
                      soundSynth.play("card_draw");
                    }}
                    className={`text-left rounded-xl border-2 p-3.5 transition ${
                      isSelected
                        ? "border-amber-400 bg-slate-800/95 ring-2 ring-amber-400/30 -translate-y-0.5"
                        : "border-slate-800 bg-slate-950/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">
                        {style.icon} <strong className="text-sm text-white">{card.name}</strong>
                      </span>
                      <span className="rounded-md bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-xs font-bold text-sky-300">
                        ⚡{card.energyCost}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                      <span>Cấp: <strong>Lv.{card.level}</strong></span>
                      <span>Chỉ số: <strong className="text-amber-300">{card.power}</strong></span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      {style.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            disabled={gameState.status !== "playing"}
            onClick={handleEndTurn}
            className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 py-3.5 text-sm font-bold text-white shadow-lg hover:from-rose-500 hover:to-amber-500 disabled:opacity-40 transition"
          >
            ⚔️ Kết Thúc Lượt & Kích Hoạt Tấn Công Trên Lưới
          </button>
        </div>
      </div>
    </section>
  );
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  juice: CanvasJuiceManager
): void {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const { offsetX, offsetY } = juice.getShakeOffset();
  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Nền bàn cờ
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const selectedCard = state.hand.find((c) => c.id === state.selectedCardId) ?? null;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = state.grid[r][c];
      const x = CELL_PADDING + c * (CELL_SIZE + CELL_PADDING);
      const y = CELL_PADDING + r * (CELL_SIZE + CELL_PADDING);

      const canMergeWithSelected =
        selectedCard !== null &&
        cell.tile !== null &&
        cell.tile.kind === selectedCard.kind &&
        cell.tile.level === selectedCard.level;

      // Vẽ ô lưới
      ctx.beginPath();
      ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 12);

      if (!cell.tile) {
        ctx.fillStyle = "#111827";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = selectedCard ? "#334155" : "#1f2937";
        ctx.stroke();
      } else {
        const style = KIND_STYLE[cell.tile.kind];
        ctx.fillStyle = style.bg;
        ctx.fill();
        ctx.lineWidth = canMergeWithSelected ? 3 : 2;
        ctx.strokeStyle = canMergeWithSelected ? "#fde047" : style.border;
        ctx.stroke();

        // Biểu tượng & Cấp độ
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 22px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(style.icon, x + CELL_SIZE / 2, y + 32);

        ctx.fillStyle = "#fde047";
        ctx.font = "bold 12px Inter, system-ui, sans-serif";
        ctx.fillText(`Lv.${cell.tile.level}`, x + CELL_SIZE / 2, y + 52);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 15px Inter, system-ui, sans-serif";
        ctx.fillText(`⚡${cell.tile.power}`, x + CELL_SIZE / 2, y + 72);

        if (canMergeWithSelected) {
          ctx.fillStyle = "#fde047";
          ctx.font = "bold 10px Inter, system-ui, sans-serif";
          ctx.fillText("MERGE!", x + CELL_SIZE / 2, y + 14);
        }
      }
    }
  }

  // Vẽ Particles & Chữ nổi từ Toolbox
  juice.render(ctx);
  ctx.restore();
}
