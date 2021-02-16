import { Visual } from "./visual";
import * as PIXI from "pixi.js";

export default class App {
  renderer!: PIXI.Renderer;
  stage!: PIXI.Container;
  visual!: Visual;

  stageWidth!: number;
  stageHeight!: number;

  constructor() {
    this.initRenderer();
    this.renderRenderer();

    this.initStage();

    this.initVisual();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  initRenderer() {
    this.renderer = new PIXI.Renderer({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio > 1 ? 2 : 1,
      autoDensity: true,
      powerPreference: "high-performance",
      backgroundColor: 0xffffff,
    });
  }

  renderRenderer() {
    document.body.appendChild(this.renderer.view);
  }

  initStage() {
    this.stage = new PIXI.Container();
  }

  initVisual() {
    this.visual = new Visual();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.renderer.resize(this.stageWidth, this.stageHeight);

    this.visual.show(this.stageWidth, this.stageHeight, this.stage);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.visual.animate();

    this.renderer.render(this.stage);
  }
}
