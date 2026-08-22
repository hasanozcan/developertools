export interface AspectRatioResult {
  width: number;
  height: number;
  ratioString: string;
  ratioDecimal: number;
}

export function calculateAspectRatioDimensions(width: number, height: number, targetWidth?: number, targetHeight?: number): AspectRatioResult {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height) || 1;
  const ratioString = `${width / divisor}:${height / divisor}`;
  const ratioDecimal = width / (height || 1);

  let newWidth = width;
  let newHeight = height;

  if (targetWidth && !targetHeight) {
    newWidth = targetWidth;
    newHeight = Math.round(targetWidth / ratioDecimal);
  } else if (targetHeight && !targetWidth) {
    newHeight = targetHeight;
    newWidth = Math.round(targetHeight * ratioDecimal);
  }

  return {
    width: newWidth,
    height: newHeight,
    ratioString,
    ratioDecimal: Number(ratioDecimal.toFixed(4)),
  };
}