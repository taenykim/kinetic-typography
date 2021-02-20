import { Visual } from "./visual";

export default class App {
  canvas!: HTMLCanvasElement;

  visual!: Visual;

  stageWidth!: number;
  stageHeight!: number;

  ctx: CanvasRenderingContext2D;
  pixelRatio: number;

  constructor() {
    this.render();

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.initVisual();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  render() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
  }

  initVisual() {
    this.visual = new Visual();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx?.scale(this.pixelRatio, this.pixelRatio);

    this.visual.show(this.stageWidth, this.stageHeight);
  }

  animate(t: number) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.visual.animate(this.ctx, t);
  }
}
