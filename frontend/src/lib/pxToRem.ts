export interface UnitConversionResult {
  px: number;
  rem: string;
  em: string;
  percent: string;
  pt: string;
  vw: string;
  vh: string;
}

export function convertPxToUnits(
  px: number,
  baseFontSize: number = 16,
  viewportWidth: number = 1920,
  viewportHeight: number = 1080,
): UnitConversionResult {
  const safeBase = baseFontSize > 0 ? baseFontSize : 16;
  const safeVw = viewportWidth > 0 ? viewportWidth : 1920;
  const safeVh = viewportHeight > 0 ? viewportHeight : 1080;

  const remValue = px / safeBase;
  const emValue = px / safeBase;
  const percentValue = (px / safeBase) * 100;
  const ptValue = px * 0.75;
  const vwValue = (px / safeVw) * 100;
  const vhValue = (px / safeVh) * 100;

  return {
    px,
    rem: `${parseFloat(remValue.toFixed(4))}rem`,
    em: `${parseFloat(emValue.toFixed(4))}em`,
    percent: `${parseFloat(percentValue.toFixed(2))}%`,
    pt: `${parseFloat(ptValue.toFixed(2))}pt`,
    vw: `${parseFloat(vwValue.toFixed(4))}vw`,
    vh: `${parseFloat(vhValue.toFixed(4))}vh`,
  };
}

export function convertRemToPx(rem: number, baseFontSize: number = 16): number {
  const safeBase = baseFontSize > 0 ? baseFontSize : 16;
  return parseFloat((rem * safeBase).toFixed(2));
}

export const COMMON_PX_SCALE = [
  8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96,
];
