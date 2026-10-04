export class HeroCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.characters = 'ASCIIFY<>/\\{}[]#$%&*+-=01░▒▓█';
    this.points = [];
    this.pointer = { x: -9999, y: -9999 };
    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);

    this.resize();
    window.addEventListener('resize', this.resize);
    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      this.pointer.x = event.clientX - rect.left;
      this.pointer.y = event.clientY - rect.top;
    });
    canvas.addEventListener('pointerleave', () => {
      this.pointer.x = -9999;
      this.pointer.y = -9999;
    });

    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(80, Math.floor((rect.width * rect.height) / 4800));
    this.points = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      char: this.characters[Math.floor(Math.random() * this.characters.length)],
      alpha: 0.18 + Math.random() * 0.72
    }));
  }

  animate() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.ctx.fillStyle = '#020403';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.font = '13px "Space Mono", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    for (const point of this.points) {
      const dx = point.x - this.pointer.x;
      const dy = point.y - this.pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 110) {
        const force = (110 - distance) / 110;
        point.x += (dx / (distance || 1)) * force * 3;
        point.y += (dy / (distance || 1)) * force * 3;
      }

      point.x += point.vx;
      point.y += point.vy;

      if (point.x < -12) point.x = width + 12;
      if (point.x > width + 12) point.x = -12;
      if (point.y < -12) point.y = height + 12;
      if (point.y > height + 12) point.y = -12;

      this.ctx.fillStyle = `rgba(0, 255, 102, ${point.alpha})`;
      this.ctx.fillText(point.char, point.x, point.y);
    }

    requestAnimationFrame(this.animate);
  }
}
