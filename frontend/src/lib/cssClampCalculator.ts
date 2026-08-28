export interface ClampParams {
  minWidth: number;
  maxWidth: number;
  minValue: number;
  maxValue: number;
  rootFontSize?: number;
}

export function calculateCssClamp(params: ClampParams): string {
  const root = params.rootFontSize || 16;
  const minV = params.minValue;
  const maxV = params.maxValue;
  const minW = params.minWidth;
  const maxW = params.maxWidth;

  const slope = (maxV - minV) / (maxW - minW);
  const yAxisIntersection = -minW * slope + minV;

  const minRem = (minV / root).toFixed(3);
  const maxRem = (maxV / root).toFixed(3);
  const valVw = (slope * 100).toFixed(3);
  const valRem = (yAxisIntersection / root).toFixed(3);

  return `clamp(${minRem}rem, ${valRem}rem + ${valVw}vw, ${maxRem}rem)`;
}
