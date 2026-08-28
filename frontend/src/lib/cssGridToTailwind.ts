export function convertCssGridToTailwind(css: string): string {
  const classes: string[] = ['grid'];
  const colsMatch = css.match(/grid-template-columns:\s*repeat\((\d+)/i);
  if (colsMatch) classes.push('grid-cols-' + colsMatch[1]);
  const gapMatch = css.match(/gap:\s*(\d+)px/i);
  if (gapMatch) classes.push('gap-' + Math.round(parseInt(gapMatch[1]) / 4));
  return classes.join(' ');
}
