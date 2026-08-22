export type HarmonyType = 'complementary' | 'triadic' | 'analogous' | 'split-complementary' | 'tetradic';

function hexToHsl(hex: string): [number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.min(100, Math.max(0, s)) / 100;
  const lNorm = Math.min(100, Math.max(0, l)) / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;
  if (hNorm < 60) { r = c; g = x; b = 0; }
  else if (hNorm < 120) { r = x; g = c; b = 0; }
  else if (hNorm < 180) { r = 0; g = c; b = x; }
  else if (hNorm < 240) { r = 0; g = x; b = c; }
  else if (hNorm < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function generateColorHarmonies(
  baseHex: string,
  harmony: HarmonyType = 'complementary',
): { name: string; hex: string; hsl: string }[] {
  const [h, s, l] = hexToHsl(baseHex);
  let angles: number[] = [];

  switch (harmony) {
    case 'complementary':
      angles = [0, 180, 30, 210, 60];
      break;
    case 'triadic':
      angles = [0, 120, 240, 60, 180];
      break;
    case 'analogous':
      angles = [-40, -20, 0, 20, 40];
      break;
    case 'split-complementary':
      angles = [0, 150, 210, 30, 180];
      break;
    case 'tetradic':
      angles = [0, 90, 180, 270, 45];
      break;
  }

  return angles.map((angle, idx) => {
    if (idx === 0) {
      return {
        name: 'Base Color',
        hex: baseHex.toUpperCase(),
        hsl: `hsl(${h}, ${s}%, ${l}%)`,
      };
    }
    const newH = (h + angle + 360) % 360;
    const hex = hslToHex(newH, s, l);
    return {
      name: `Harmony ${idx}`,
      hex,
      hsl: `hsl(${newH}, ${s}%, ${l}%)`,
    };
  });
}
