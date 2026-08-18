export interface SvgOptimizeResult {
  optimizedSvg: string;
  originalSize: number;
  optimizedSize: number;
  savingsBytes: number;
  savingsPercent: number;
}

export function optimizeSvg(rawSvg: string): SvgOptimizeResult {
  const originalSize = new Blob([rawSvg]).size;
  let svg = rawSvg.trim();

  // 1. Strip XML declarations and DOCTYPEs
  svg = svg.replace(/<\?xml[\s\S]*?\?>/gi, '');
  svg = svg.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

  // 2. Strip HTML/XML comments
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');

  // 3. Strip editor metadata tags (Inkscape, Illustrator, Figma, Sketch)
  svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
  svg = svg.replace(/<sodipodi:[\s\S]*?>/gi, '');
  svg = svg.replace(/<inkscape:[\s\S]*?>/gi, '');
  svg = svg.replace(/\s*xmlns:(?:inkscape|sodipodi|sketch|xlink|i|ns_[a-z0-9]+)="[^"]*"/gi, '');
  svg = svg.replace(/\s*(?:inkscape|sodipodi|sketch|i|ns_[a-z0-9]+):[a-z0-9-_]+="[^"]*"/gi, '');
  svg = svg.replace(/\s*(?:data-name|data-original-title)="[^"]*"/gi, '');

  // 4. Remove empty <defs></defs> and <g></g>
  svg = svg.replace(/<(defs|g)\s*><\/\1>/gi, '');

  // 5. Clean unnecessary whitespace between tags
  svg = svg.replace(/>\s+</g, '><');

  // 6. Round floating point numbers in paths to 2 decimals
  svg = svg.replace(/(\d+\.\d{3,})/g, (match) => {
    return parseFloat(parseFloat(match).toFixed(2)).toString();
  });

  svg = svg.trim();
  const optimizedSize = new Blob([svg]).size;
  const savingsBytes = Math.max(0, originalSize - optimizedSize);
  const savingsPercent = originalSize > 0 ? parseFloat(((savingsBytes / originalSize) * 100).toFixed(1)) : 0;

  return {
    optimizedSvg: svg,
    originalSize,
    optimizedSize,
    savingsBytes,
    savingsPercent,
  };
}
