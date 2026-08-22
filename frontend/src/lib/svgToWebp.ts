export function getSvgDataUri(svgContent: string): string {
  const clean = svgContent.trim();
  const base64 = typeof btoa !== 'undefined' ? btoa(clean) : Buffer.from(clean).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}