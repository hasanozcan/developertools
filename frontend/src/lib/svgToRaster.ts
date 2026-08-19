export type RasterFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export interface RasterOptions {
  format: RasterFormat;
  scale: number; // 1, 2, 4
  quality?: number; // 0.1 to 1.0 (for jpeg/webp)
  backgroundColor?: string; // transparent or hex
}

export function sanitizeSvg(svgCode: string): string {
  let cleaned = svgCode.trim();
  if (!cleaned.startsWith('<svg') && cleaned.includes('<svg')) {
    cleaned = cleaned.slice(cleaned.indexOf('<svg'));
  }
  return cleaned;
}

export function svgToDataUri(svgCode: string): string {
  const sanitized = sanitizeSvg(svgCode);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sanitized)}`;
}

export function extractSvgDimensions(svgCode: string): { width: number; height: number } {
  const widthMatch = /width=["']([0-9.]+)(?:px)?["']/i.exec(svgCode);
  const heightMatch = /height=["']([0-9.]+)(?:px)?["']/i.exec(svgCode);
  const viewBoxMatch = /viewBox=["'](?:[0-9.-]+\s+){2}([0-9.-]+)\s+([0-9.-]+)["']/i.exec(svgCode);

  let width = widthMatch ? parseFloat(widthMatch[1]) : 300;
  let height = heightMatch ? parseFloat(heightMatch[1]) : 150;

  if ((!widthMatch || !heightMatch) && viewBoxMatch) {
    width = parseFloat(viewBoxMatch[1]) || width;
    height = parseFloat(viewBoxMatch[2]) || height;
  }

  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}
