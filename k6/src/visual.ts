import { Text, ParticlePos } from "./text";
import { Particle } from "./particle";
import * as PIXI from "pixi.js";
import { ParticleGroup } from "./particle-group";

const LINE_TOTAL = 10;

export interface Mouse {
  x: number;
  y: number;
  radius: number;
}

export class Visual {
  text: Text;
  texture: PIXI.Texture;

  mouse: Mouse;

  container!: PIXI.ParticleContainer;

  particleGroups: ParticleGroup[];
  pos!: ParticlePos[];

  constructor() {
    this.text = new Text();

    this.texture = PIXI.Texture.from("particle.png");

    this.particleGroups = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 10,
    };

    document.addEventListener("pointermove", this.onMove.bind(this), false);
  }

  show(stageWidth: number, stageHeight: number, stage: PIXI.Container) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText("R", 10, stageWidth, stageHeight);

    this.container = new PIXI.ParticleContainer(this.pos.length * LINE_TOTAL, {
      vertices: false,
      position: true,
      rotation: false,
      uvs: false,
      tint: true,
    });
    stage.addChild(this.container);

    this.particleGroups = [];
    const total = this.pos.length;
    for (let i = 0; i < total; i++) {
      const item = new ParticleGroup(
        this.pos[i],
        i / total,
        this.texture,
        LINE_TOTAL
      );
      this.particleGroups.push(item);
    }

    for (let i = LINE_TOTAL - 1; i >= 0; i--) {
      this.addChild(i);
    }
  }

  addChild(index: number) {
    for (let i = 0; i < this.particleGroups.length; i++) {
      this.container.addChild(this.particleGroups[i].particles[index].sprite);
    }
  }

  animate() {
    for (let i = 0; i < this.particleGroups.length; i++) {
      const item = this.particleGroups[i];
      item.animate(this.mouse);
    }
  }

  onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
