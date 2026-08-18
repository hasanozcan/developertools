export interface AspectRatioResult {
  ratioW: number;
  ratioH: number;
  ratioString: string;
  cssAspectRatio: string;
  scaledWidth: number;
  scaledHeight: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function calculateAspectRatio(
  w1: number,
  h1: number,
  targetW?: number,
  targetH?: number,
): AspectRatioResult {
  const width = Math.max(1, Math.round(w1));
  const height = Math.max(1, Math.round(h1));

  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;
  const ratioString = `${ratioW}:${ratioH}`;
  const cssAspectRatio = `${ratioW} / ${ratioH}`;

  let scaledWidth = targetW ? Math.round(targetW) : width;
  let scaledHeight = targetH ? Math.round(targetH) : height;

  if (targetW !== undefined && targetH === undefined) {
    scaledHeight = Math.round((targetW * height) / width);
  } else if (targetH !== undefined && targetW === undefined) {
    scaledWidth = Math.round((targetH * width) / height);
  }

  return {
    ratioW,
    ratioH,
    ratioString,
    cssAspectRatio,
    scaledWidth,
    scaledHeight,
  };
}
