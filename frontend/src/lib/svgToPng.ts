export interface SvgDimensions {
  width: number;
  height: number;
}

export function parseSvgDimensions(svgContent: string): SvgDimensions {
  const widthMatch = svgContent.match(/\bwidth\s*=\s*["']?([\d.]+)(px)?["']?/i);
  const heightMatch = svgContent.match(/\bheight\s*=\s*["']?([\d.]+)(px)?["']?/i);
  const viewBoxMatch = svgContent.match(/\bviewBox\s*=\s*["']?[\d.]+[\s,]+[\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)["']?/i);

  let width = 300;
  let height = 150;

  if (widthMatch) width = parseFloat(widthMatch[1]);
  if (heightMatch) height = parseFloat(heightMatch[1]);

  if ((!widthMatch || !heightMatch) && viewBoxMatch) {
    width = parseFloat(viewBoxMatch[1]);
    height = parseFloat(viewBoxMatch[2]);
  }

  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}

export function calculateExportDimensions(original: SvgDimensions, scale: number): SvgDimensions {
  const s = Math.max(0.1, scale);
  return {
    width: Math.max(1, Math.round(original.width * s)),
    height: Math.max(1, Math.round(original.height * s)),
  };
}

export function sanitizeSvg(svg: string): string {
  if (!svg.includes('xmlns="http://www.w3.org/2000/svg"') && !svg.includes("xmlns='http://www.w3.org/2000/svg'")) {
    return svg.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return svg;
}
