/**
 * TOOLBOX MODULE: storageManager.ts
 * Quản lý lưu/tải tự động trạng thái ván chơi (Auto-Save Run State) & High Score vào localStorage.
 * An toàn khi chạy trong cả trình duyệt lẫn môi trường Node/Vitest (không gây lỗi ReferenceError).
 */

const HIGH_SCORE_KEY = "orca_html_game_high_score_v1";
const SAVED_RUN_KEY = "orca_html_game_saved_run_v1";

function getStorage(): Storage | null {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

export function loadHighScore(): number {
  const storage = getStorage();
  if (!storage) return 0;
  const raw = storage.getItem(HIGH_SCORE_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function saveHighScore(score: number): number {
  const currentBest = loadHighScore();
  const nextBest = Math.max(currentBest, Math.floor(score));
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(HIGH_SCORE_KEY, String(nextBest));
    } catch {
      // Ignore quota errors
    }
  }
  return nextBest;
}

export function saveRunState<T>(state: T): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(SAVED_RUN_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

export function loadRunState<T>(): T | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(SAVED_RUN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearRunState(): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(SAVED_RUN_KEY);
  } catch {
    // Ignore errors
  }
}
