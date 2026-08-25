export function migrateTailwindV3ToV4(v3Config: string): string {
  const lines = ['@import "tailwindcss";', '', '@theme {'];

  const colorsSection = v3Config.match(/colors\s*:\s*\{([\s\S]*?)\}/);
  if (colorsSection) {
    const matches = colorsSection[1].matchAll(/['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*['"]([^'"]+)['"]/g);
    for (const match of matches) {
      lines.push(`  --color-${match[1]}: ${match[2]};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}
