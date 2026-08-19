export interface BorderRadiusValues {
  topLeftH: number;
  topRightH: number;
  bottomRightH: number;
  bottomLeftH: number;
  topLeftV: number;
  topRightV: number;
  bottomRightV: number;
  bottomLeftV: number;
  unit: '%' | 'px';
}

export const DEFAULT_BORDER_RADIUS: BorderRadiusValues = {
  topLeftH: 30,
  topRightH: 70,
  bottomRightH: 70,
  bottomLeftH: 30,
  topLeftV: 30,
  topRightV: 30,
  bottomRightV: 70,
  bottomLeftV: 70,
  unit: '%',
};

export const BORDER_RADIUS_PRESETS = [
  {
    name: 'Organic Blob',
    values: {
      topLeftH: 30,
      topRightH: 70,
      bottomRightH: 70,
      bottomLeftH: 30,
      topLeftV: 30,
      topRightV: 30,
      bottomRightV: 70,
      bottomLeftV: 70,
      unit: '%' as const,
    },
  },
  {
    name: 'Apple Squircle',
    values: {
      topLeftH: 45,
      topRightH: 45,
      bottomRightH: 45,
      bottomLeftH: 45,
      topLeftV: 45,
      topRightV: 45,
      bottomRightV: 45,
      bottomLeftV: 45,
      unit: '%' as const,
    },
  },
  {
    name: 'Egg Shape',
    values: {
      topLeftH: 50,
      topRightH: 50,
      bottomRightH: 50,
      bottomLeftH: 50,
      topLeftV: 60,
      topRightV: 60,
      bottomRightV: 40,
      bottomLeftV: 40,
      unit: '%' as const,
    },
  },
  {
    name: 'Leaf Corner',
    values: {
      topLeftH: 0,
      topRightH: 80,
      bottomRightH: 0,
      bottomLeftH: 80,
      topLeftV: 0,
      topRightV: 80,
      bottomRightV: 0,
      bottomLeftV: 80,
      unit: '%' as const,
    },
  },
];

export function generateBorderRadius(r: BorderRadiusValues): { value: string; css: string } {
  const u = r.unit;
  const isSymmetricV =
    r.topLeftH === r.topLeftV &&
    r.topRightH === r.topRightV &&
    r.bottomRightH === r.bottomRightV &&
    r.bottomLeftH === r.bottomLeftV;

  let value = '';
  if (isSymmetricV) {
    value = `${r.topLeftH}${u} ${r.topRightH}${u} ${r.bottomRightH}${u} ${r.bottomLeftH}${u}`;
  } else {
    value = `${r.topLeftH}${u} ${r.topRightH}${u} ${r.bottomRightH}${u} ${r.bottomLeftH}${u} / ${r.topLeftV}${u} ${r.topRightV}${u} ${r.bottomRightV}${u} ${r.bottomLeftV}${u}`;
  }

  const css = `border-radius: ${value};
-webkit-border-radius: ${value};`;

  return { value, css };
}
