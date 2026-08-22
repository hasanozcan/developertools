export interface FluidTypographyParams {
  minFontSizePx: number;
  maxFontSizePx: number;
  minViewportPx: number;
  maxViewportPx: number;
  rootFontSizePx?: number;
}

export function calculateFluidTypography(params: FluidTypographyParams): {
  clampCss: string;
  formula: string;
  slope: number;
  yInterceptPx: number;
  yInterceptRem: number;
} {
  const {
    minFontSizePx,
    maxFontSizePx,
    minViewportPx,
    maxViewportPx,
    rootFontSizePx = 16,
  } = params;

  if (maxViewportPx <= minViewportPx) {
    throw new Error('Max viewport width must be greater than min viewport width');
  }

  // Formula: slope = (maxFontSize - minFontSize) / (maxViewport - minViewport)
  const slope = (maxFontSizePx - minFontSizePx) / (maxViewportPx - minViewportPx);
  const yInterceptPx = minFontSizePx - slope * minViewportPx;
  const yInterceptRem = yInterceptPx / rootFontSizePx;

  const minRem = (minFontSizePx / rootFontSizePx).toFixed(4).replace(/\.?0+$/, '') + 'rem';
  const maxRem = (maxFontSizePx / rootFontSizePx).toFixed(4).replace(/\.?0+$/, '') + 'rem';
  const preferredVw = (slope * 100).toFixed(4).replace(/\.?0+$/, '') + 'vw';
  const preferredRem = yInterceptRem.toFixed(4).replace(/\.?0+$/, '') + 'rem';

  const clampCss = `font-size: clamp(${minRem}, ${preferredRem} + ${preferredVw}, ${maxRem});`;
  const formula = `clamp(${minFontSizePx}px, ${yInterceptPx.toFixed(2)}px + ${(slope * 100).toFixed(2)}vw, ${maxFontSizePx}px)`;

  return {
    clampCss,
    formula,
    slope,
    yInterceptPx,
    yInterceptRem,
  };
}
