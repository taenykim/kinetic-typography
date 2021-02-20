export function distance(x1: number, y1: number, x2: number, y2: number) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function pointCircle(
  px: number,
  py: number,
  cx: number,
  cy: number,
  r: number
) {
  if (distance(px, py, cx, cy) <= r) {
    return true;
  } else {
    return false;
  }
}

export function linePoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  px: number,
  py: number
) {
  const dist1 = distance(px, py, x1, y1);
  const dist2 = distance(px, py, x2, y2);
  const dist = dist1 + dist2;
  const lineLength = distance(x1, y1, x2, y2);
  const buffer = 0.1;

  if (dist >= lineLength - buffer && dist <= lineLength + buffer) {
    return true;
  } else {
    return false;
  }
}

export function lineCircle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number,
  r: number
) {
  const lineLength = distance(x1, y1, x2, y2);

  const point =
    ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(lineLength, 2);

  const px = x1 + point * (x2 - x1);
  const py = y1 + point * (y2 - y1);

  const onSegment = linePoint(x1, y1, x2, y2, px, py);
  if (!onSegment) return false;

  if (distance(px, py, cx, cy) < r) {
    return true;
  } else {
    return false;
  }
}
