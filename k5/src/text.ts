export interface ParticlePos {
  x: number;
  y: number;
}

export class Text {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor() {
    this.init();
  }

  init() {
    this.canvas = document.createElement("canvas");

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  setText(
    str: string,
    density: number,
    stageWidth: number,
    stageHeight: number
  ) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = "Hind";

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    this.ctx.textBaseline = `middle`;

    const fontPos = this.ctx.measureText(myText);

    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
        fontPos.actualBoundingBoxDescent +
        (stageHeight - fontSize) / 2
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density: number, stageWidth: number, stageHeight: number) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles: ParticlePos[] = [];
    let i = 0;
    let width = 0;
    let pixel: number;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = i % 2 === 0;
      width = 0;

      if (slide) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[(width + height * stageWidth) * 4 - 1];
        if (
          pixel !== 0 &&
          width > 0 &&
          width < stageWidth &&
          height > 0 &&
          height < stageHeight
        ) {
          particles.push({
            x: width,
            y: height,
          });
        }
      }
    }
    return particles;
  }
}
