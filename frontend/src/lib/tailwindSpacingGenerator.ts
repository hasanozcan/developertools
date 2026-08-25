export function generateTailwindSpacingScale(basePx: number = 4, steps: number = 16): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 1; i <= steps; i++) {
    result[String(i)] = `${(i * basePx) / 16}rem`;
  }
  return result;
}
