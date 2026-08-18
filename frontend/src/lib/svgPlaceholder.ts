export interface PlaceholderOptions {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  text: string;
  fontSize?: number;
}

export function generateSvgPlaceholder(options: PlaceholderOptions): { svg: string; dataUri: string } {
  const { width, height, bgColor, textColor, text, fontSize } = options;
  const displayText = text.trim() || `${width} × ${height}`;
  const calculatedFontSize = fontSize || Math.max(12, Math.round(Math.min(width, height) / 8));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" fill="${textColor}" font-family="system-ui, -apple-system, sans-serif" font-size="${calculatedFontSize}px" font-weight="bold" text-anchor="middle" dominant-baseline="central">${displayText}</text>
</svg>`;

  const encodedSvg = encodeURIComponent(svg);
  const dataUri = `data:image/svg+xml;utf8,${encodedSvg}`;

  return { svg, dataUri };
}
