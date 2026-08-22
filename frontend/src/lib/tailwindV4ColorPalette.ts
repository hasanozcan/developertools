export function generateTailwindV4OklchPalette(baseHue: number = 250): Record<string, string> {
  return {
    '50': `oklch(0.97 0.02 ${baseHue})`,
    '100': `oklch(0.93 0.04 ${baseHue})`,
    '200': `oklch(0.86 0.08 ${baseHue})`,
    '300': `oklch(0.77 0.14 ${baseHue})`,
    '400': `oklch(0.68 0.20 ${baseHue})`,
    '500': `oklch(0.58 0.24 ${baseHue})`,
    '600': `oklch(0.50 0.22 ${baseHue})`,
    '700': `oklch(0.42 0.18 ${baseHue})`,
    '800': `oklch(0.34 0.14 ${baseHue})`,
    '900': `oklch(0.26 0.10 ${baseHue})`,
    '950': `oklch(0.18 0.06 ${baseHue})`,
  };
}