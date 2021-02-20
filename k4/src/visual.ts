import { Text, ParticlePos } from "./text";
import { Particle } from "./particle";
import { hslToHex } from "./utils";

export const RANDOM_TEXT = "ABCMNRSTUXZ";

export interface Mouse {
  x: number;
  y: number;
  radius: number;
}

export class Visual {
  text: Text;

  mouse: Mouse;

  particles: Particle[];
  pos!: ParticlePos[];
  posTotal!: number;

  constructor() {
    this.text = new Text();

    this.particles = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    document.addEventListener("pointermove", this.onMove.bind(this), false);
  }

  show(stageWidth: number, stageHeight: number) {
    this.pos = this.text.setText("A", 26, stageWidth, stageHeight);
    this.posTotal = this.pos.length - 1;
  }

  animate(ctx: CanvasRenderingContext2D) {
    if (!this.pos) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      const myPos = this.pos[(Math.random() * this.posTotal) | 0];
      this.particles.push(new Particle(myPos, this.getColor()));
    }

    for (let i = 0; i < this.particles.length; i++) {
      const item = this.particles[i];
      if (item.radius <= 1) {
        this.particles.splice(i, 1);
      }

      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        item.progress += 100;
      }

      item.draw(ctx);
    }
  }

  getColor() {
    const minHue = 80;
    const maxHue = 340;
    const hue = (maxHue - minHue) * Math.random() + minHue;

    return hslToHex(hue, 84, 50);
  }

  onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
