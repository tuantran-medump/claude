/**
 * TOOLBOX MODULE: tweenParticles.ts
 * Hệ thống Hạt (Particles), Chữ nổi (Floating Text) và Rung màn hình (Screen Shake) cho HTML5 Canvas 2D.
 * Giúp Antigravity & Codex thêm hiệu ứng "Juice" mượt 60 FPS mà không tốn token viết lại.
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

export interface FloatingText {
  x: number;
  y: number;
  vy: number;
  text: string;
  color: string;
  alpha: number;
}

export class CanvasJuiceManager {
  private particles: Particle[] = [];
  private floatingTexts: FloatingText[] = [];
  private shakeIntensity = 0;

  public spawnBurst(x: number, y: number, color: string, count = 14): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.5 + Math.random() * 3.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2.5 + Math.random() * 3,
        color,
        alpha: 1,
        decay: 0.025 + Math.random() * 0.02,
      });
    }
  }

  public spawnFloatingText(x: number, y: number, text: string, color = "#fbbf24"): void {
    this.floatingTexts.push({
      x,
      y,
      vy: -1.2,
      text,
      color,
      alpha: 1,
    });
  }

  public triggerShake(intensity = 6): void {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }

  public getShakeOffset(): { offsetX: number; offsetY: number } {
    if (this.shakeIntensity <= 0.2) {
      return { offsetX: 0, offsetY: 0 };
    }
    return {
      offsetX: (Math.random() - 0.5) * this.shakeIntensity * 2,
      offsetY: (Math.random() - 0.5) * this.shakeIntensity * 2,
    };
  }

  public update(): void {
    if (this.shakeIntensity > 0) {
      this.shakeIntensity *= 0.85;
    }

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
    }
    this.particles = this.particles.filter((p) => p.alpha > 0);

    for (const ft of this.floatingTexts) {
      ft.y += ft.vy;
      ft.alpha -= 0.022;
    }
    this.floatingTexts = this.floatingTexts.filter((ft) => ft.alpha > 0);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = "bold 15px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (const ft of this.floatingTexts) {
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
    }
    ctx.restore();
  }
}
