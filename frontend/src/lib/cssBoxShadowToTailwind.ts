export function cssBoxShadowToTailwind(cssShadow: string): string {
  const clean = cssShadow.trim().replace(/;$/, '');
  if (!clean) return 'shadow-none';

  // Replace whitespace inside rgba/rgb with nothing or commas, and replace spaces with underscores
  const formatted = clean
    .replace(/rgba?\([^)]+\)/g, (m) => m.replace(/\s+/g, ''))
    .replace(/\s*,\s*/g, ',')
    .replace(/\s+/g, '_');

  return `shadow-[${formatted}]`;
}
