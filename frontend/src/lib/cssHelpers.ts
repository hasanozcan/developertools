// CSS Clamp and CSS Box Shadow helpers

export interface ClampConfig {
  minWidth: number; // in px
  maxWidth: number; // in px
  minValue: number; // in px
  maxValue: number; // in px
  rootFontSize: number; // default 16
  unit: 'rem' | 'px';
}

export function calculateCssClamp(config: ClampConfig): {
  clampCss: string;
  slope: number;
  intersection: number;
  tailwindClass: string;
  scssMixin: string;
} {
  const { minWidth, maxWidth, minValue, maxValue, rootFontSize, unit } = config;

  if (maxWidth <= minWidth) {
    throw new Error('Maximum viewport width must be greater than minimum viewport width.');
  }

  // Calculate linear equation: y = slope * x + intersection
  // slope = (maxValue - minValue) / (maxWidth - minWidth)
  const slope = (maxValue - minValue) / (maxWidth - minWidth);
  const slopeVw = Number((slope * 100).toFixed(4));

  // intersection = minValue - slope * minWidth
  const intersectionPx = minValue - slope * minWidth;
  const intersectionRem = Number((intersectionPx / rootFontSize).toFixed(4));

  const minRem = Number((minValue / rootFontSize).toFixed(4));
  const maxRem = Number((maxValue / rootFontSize).toFixed(4));

  let clampCss = '';
  if (unit === 'rem') {
    const preferred = intersectionRem >= 0 ? `${intersectionRem}rem + ${slopeVw}vw` : `${slopeVw}vw - ${Math.abs(intersectionRem)}rem`;
    clampCss = `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`;
  } else {
    const intersectionFixed = Number(intersectionPx.toFixed(2));
    const preferred = intersectionFixed >= 0 ? `${intersectionFixed}px + ${slopeVw}vw` : `${slopeVw}vw - ${Math.abs(intersectionFixed)}px`;
    clampCss = `clamp(${minValue}px, ${preferred}, ${maxValue}px)`;
  }

  const tailwindClass = `text-[${clampCss.replace(/\s+/g, '')}]`;
  const scssMixin = `@function clamp-fluid($min, $max, $min-w: ${minWidth}px, $max-w: ${maxWidth}px) {\n  @return ${clampCss};\n}`;

  return {
    clampCss,
    slope,
    intersection: intersectionPx,
    tailwindClass,
    scssMixin,
  };
}

export interface ShadowLayer {
  id: string;
  inset: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number; // 0 - 1
}

export function generateBoxShadowCss(layers: ShadowLayer[]): string {
  if (layers.length === 0) return 'none';

  return layers
    .map((layer) => {
      const inset = layer.inset ? 'inset ' : '';
      const hexToRgba = (colorStr: string, alpha: number) => {
        if (!colorStr) return `rgba(0, 0, 0, ${alpha})`;
        if (colorStr.startsWith('rgb')) return colorStr;
        let clean = colorStr.replace('#', '');
        if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
        const num = parseInt(clean, 16);
        if (isNaN(num)) return `rgba(0, 0, 0, ${alpha})`;
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      const color = hexToRgba(layer.color, layer.opacity);
      return `${inset}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${color}`;
    })
    .join(',\n  ');
}
