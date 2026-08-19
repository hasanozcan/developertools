export interface CssFilterValues {
  blur: number; // px (0 - 20)
  brightness: number; // % (0 - 200)
  contrast: number; // % (0 - 200)
  grayscale: number; // % (0 - 100)
  hueRotate: number; // deg (0 - 360)
  invert: number; // % (0 - 100)
  saturate: number; // % (0 - 200)
  sepia: number; // % (0 - 100)
  opacity: number; // % (0 - 100)
}

export const DEFAULT_FILTER_VALUES: CssFilterValues = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  saturate: 100,
  sepia: 0,
  opacity: 100,
};

export function generateCssFilter(filters: CssFilterValues): { filterString: string; css: string } {
  const parts: string[] = [];

  if (filters.blur > 0) parts.push(`blur(${filters.blur}px)`);
  if (filters.brightness !== 100) parts.push(`brightness(${filters.brightness}%)`);
  if (filters.contrast !== 100) parts.push(`contrast(${filters.contrast}%)`);
  if (filters.grayscale > 0) parts.push(`grayscale(${filters.grayscale}%)`);
  if (filters.hueRotate > 0) parts.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.invert > 0) parts.push(`invert(${filters.invert}%)`);
  if (filters.saturate !== 100) parts.push(`saturate(${filters.saturate}%)`);
  if (filters.sepia > 0) parts.push(`sepia(${filters.sepia}%)`);
  if (filters.opacity !== 100) parts.push(`opacity(${filters.opacity}%)`);

  const filterString = parts.length > 0 ? parts.join(' ') : 'none';
  const css = `filter: ${filterString};
-webkit-filter: ${filterString};`;

  return { filterString, css };
}
