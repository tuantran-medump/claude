/**
 * TOOLBOX MODULE: soundSynth.ts
 * Module âm thanh tổng hợp bằng Web Audio API (Không cần tải file .mp3/.wav ngoài).
 * Tái sử dụng cho mọi game 2D Card / Grid / Merge để tiết kiệm token cho Codex & Antigravity.
 */

export type SoundEffectType =
  | "card_draw"
  | "card_place"
  | "tile_merge"
  | "attack_hit"
  | "turn_end"
  | "victory"
  | "game_over";

class WebAudioSynth {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public play(effect: SoundEffectType): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    switch (effect) {
      case "card_draw":
        this.playTone(ctx, 320, 480, 0.08, "sine", now);
        break;
      case "card_place":
        this.playTone(ctx, 220, 330, 0.09, "triangle", now);
        break;
      case "tile_merge":
        this.playTone(ctx, 392, 587.33, 0.12, "triangle", now);
        this.playTone(ctx, 587.33, 783.99, 0.15, "sine", now + 0.07);
        break;
      case "attack_hit":
        this.playTone(ctx, 180, 75, 0.14, "sawtooth", now);
        break;
      case "turn_end":
        this.playTone(ctx, 440, 330, 0.1, "sine", now);
        break;
      case "victory":
        this.playTone(ctx, 523.25, 659.25, 0.12, "triangle", now);
        this.playTone(ctx, 659.25, 783.99, 0.12, "triangle", now + 0.1);
        this.playTone(ctx, 783.99, 1046.5, 0.25, "sine", now + 0.2);
        break;
      case "game_over":
        this.playTone(ctx, 300, 190, 0.2, "sawtooth", now);
        this.playTone(ctx, 190, 110, 0.35, "sawtooth", now + 0.18);
        break;
    }
  }

  private playTone(
    ctx: AudioContext,
    startFreq: number,
    endFreq: number,
    durationSec: number,
    type: OscillatorType,
    startTime: number
  ): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + durationSec);

    gain.gain.setValueAtTime(0.14, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + durationSec);
  }
}

export const soundSynth = new WebAudioSynth();
