export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface ContrastReport {
  foreground: string;
  background: string;
  ratio: number;
  normalText: { aa: boolean; aaa: boolean };
  largeText: { aa: boolean; aaa: boolean };
  nonText: { aa: boolean };
  suggestedTextColor: '#000000' | '#FFFFFF';
  suggestedRatio: number;
}

const HEX_COLOR = /^#?([\da-f]{3}|[\da-f]{6})$/iu;

export function normalizeHexColor(input: string): string {
  const match = input.trim().match(HEX_COLOR);
  if (!match) throw new Error('Enter a 3- or 6-digit hexadecimal color.');
  const digits =
    match[1].length === 3 ? [...match[1]].map((digit) => `${digit}${digit}`).join('') : match[1];
  return `#${digits.toUpperCase()}`;
}

export function hexToRgb(input: string): RgbColor {
  const hex = normalizeHexColor(input).slice(1);
  return {
    red: Number.parseInt(hex.slice(0, 2), 16),
    green: Number.parseInt(hex.slice(2, 4), 16),
    blue: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function linearize(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(input: string | RgbColor): number {
  const color = typeof input === 'string' ? hexToRgb(input) : input;
  return (
    0.2126 * linearize(color.red) + 0.7152 * linearize(color.green) + 0.0722 * linearize(color.blue)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function analyzeColorContrast(foreground: string, background: string): ContrastReport {
  const normalizedForeground = normalizeHexColor(foreground);
  const normalizedBackground = normalizeHexColor(background);
  const ratio = contrastRatio(normalizedForeground, normalizedBackground);
  const blackRatio = contrastRatio('#000000', normalizedBackground);
  const whiteRatio = contrastRatio('#FFFFFF', normalizedBackground);
  const suggestedTextColor = blackRatio >= whiteRatio ? '#000000' : '#FFFFFF';

  return {
    foreground: normalizedForeground,
    background: normalizedBackground,
    ratio,
    normalText: { aa: ratio >= 4.5, aaa: ratio >= 7 },
    largeText: { aa: ratio >= 3, aaa: ratio >= 4.5 },
    nonText: { aa: ratio >= 3 },
    suggestedTextColor,
    suggestedRatio: Math.max(blackRatio, whiteRatio),
  };
}
