export type NeumorphismShape = 'flat' | 'concave' | 'convex' | 'pressed';

export interface NeumorphismOptions {
  bgColor: string;
  size: number;
  radius: number;
  distance: number;
  blur: number;
  intensity: number;
  shape: NeumorphismShape;
}

export const DEFAULT_NEUMORPHISM: NeumorphismOptions = {
  bgColor: '#e0e5ec',
  size: 200,
  radius: 30,
  distance: 12,
  blur: 24,
  intensity: 15,
  shape: 'flat',
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16) || 0;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function adjustColor(rgb: { r: number; g: number; b: number }, amount: number): string {
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
  const r = clamp(rgb.r + amount);
  const g = clamp(rgb.g + amount);
  const b = clamp(rgb.b + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export function generateNeumorphismCss(options: NeumorphismOptions): { boxShadow: string; background: string; css: string } {
  const rgb = hexToRgb(options.bgColor);
  const d = options.distance;
  const b = options.blur;
  const delta = (options.intensity / 100) * 120;

  const darkColor = adjustColor(rgb, -delta);
  const lightColor = adjustColor(rgb, delta);

  let boxShadow = '';
  let background = options.bgColor;

  if (options.shape === 'flat') {
    boxShadow = `${d}px ${d}px ${b}px ${darkColor}, -${d}px -${d}px ${b}px ${lightColor}`;
  } else if (options.shape === 'pressed') {
    boxShadow = `inset ${d}px ${d}px ${b}px ${darkColor}, inset -${d}px -${d}px ${b}px ${lightColor}`;
  } else if (options.shape === 'concave') {
    boxShadow = `${d}px ${d}px ${b}px ${darkColor}, -${d}px -${d}px ${b}px ${lightColor}`;
    background = `linear-gradient(145deg, ${darkColor}, ${lightColor})`;
  } else if (options.shape === 'convex') {
    boxShadow = `${d}px ${d}px ${b}px ${darkColor}, -${d}px -${d}px ${b}px ${lightColor}`;
    background = `linear-gradient(145deg, ${lightColor}, ${darkColor})`;
  }

  const css = `background: ${background};
border-radius: ${options.radius}px;
box-shadow: ${boxShadow};`;

  return { boxShadow, background, css };
}
