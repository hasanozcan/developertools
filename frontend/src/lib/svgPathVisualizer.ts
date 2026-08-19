export interface PathCommand {
  type: string;
  params: number[];
}

export function parseSvgPath(d: string): PathCommand[] {
  const commands: PathCommand[] = [];
  const regex = /([a-df-z])([^a-df-z]*)/gi;
  let match;

  while ((match = regex.exec(d)) !== null) {
    const type = match[1];
    const rawParams = match[2].trim();
    const numbers = rawParams
      ? rawParams
          .split(/[\s,]+/)
          .filter((n) => n.length > 0)
          .map((n) => parseFloat(n))
          .filter((n) => !isNaN(n))
      : [];
    commands.push({ type, params: numbers });
  }

  return commands;
}

export function cleanSvgPath(d: string): string {
  return d
    .trim()
    .replace(/^<path[^>]*d=["']([^"']+)["'][^>]*\/?>$/i, '$1')
    .trim();
}
