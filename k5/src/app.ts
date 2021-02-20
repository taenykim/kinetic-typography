import { ColorObj, setColor } from "./color";
import { Visual } from "./visual";
import { ParticlePos, Text } from "./text";

interface Thumb {
  item: HTMLLIElement;
  img: string;
}

export default class App {
  canvas!: HTMLCanvasElement;

  visual!: Visual;

  stageWidth!: number;
  stageHeight!: number;

  ctx: CanvasRenderingContext2D;
  pixelRatio: number;
  thumbs: Thumb[];

  text!: Text;
  pos!: ParticlePos[];

  constructor() {
    this.render();

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.thumbs = [];

    this.initButtons();
  }

  render() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
  }

  initButtons() {
    const ul = document.getElementsByTagName("ul")[0];
    const lis = ul.getElementsByTagName("li");
    for (let i = 0; i < lis.length; i++) {
      const item = lis[i];
      const img = item.getElementsByTagName("img")[0];
      item.addEventListener(
        "click",
        (e) => {
          this.show(i);
        },
        false
      );

      this.thumbs[i] = {
        item,
        img: img.src,
      };
    }

    this.text = new Text();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  async show(index: number) {
    for (let i = 0; i < this.thumbs.length; i++) {
      const item = this.thumbs[i].item;
      if (i === index) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    }

    const img = this.thumbs[index].img;

    // TODO: type check
    await setColor(img).then((obj: any) => {
      this.visual = new Visual(this.pos, obj.colorCtx, obj.width, obj.height);
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.pos = this.text.setText("T", 6, this.stageWidth, this.stageHeight);
  }

  animate(t: number) {
    requestAnimationFrame(this.animate.bind(this));

    if (this.visual) {
      this.visual.animate(this.ctx);
    }
  }
}
