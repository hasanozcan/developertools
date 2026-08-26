export interface ExtractedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  population: number; // pixel count
  percentage: number;
  textColor: '#000000' | '#ffffff';
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function getContrastTextColor(r: number, g: number, b: number): '#000000' | '#ffffff' {
  // Relative luminance calculation
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

// Fast Color Quantization using bucketing
export function extractPaletteFromImageData(
  pixels: Uint8ClampedArray,
  colorCount = 6
): ExtractedColor[] {
  const buckets: Record<string, { r: number; g: number; b: number; count: number }> = {};
  let totalSampled = 0;

  // Step across pixels for speed and sample uniform distribution
  const step = Math.max(1, Math.floor(pixels.length / 4 / 10000)) * 4;

  for (let i = 0; i < pixels.length; i += step) {
    const a = pixels[i + 3];
    if (a < 128) continue; // Ignore transparent

    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Quantize into 5-bit RGB buckets (32 levels per channel)
    const qr = Math.floor(r / 16) * 16;
    const qg = Math.floor(g / 16) * 16;
    const qb = Math.floor(b / 16) * 16;
    const key = `${qr},${qg},${qb}`;

    if (!buckets[key]) {
      buckets[key] = { r, g, b, count: 1 };
    } else {
      buckets[key].r += r;
      buckets[key].g += g;
      buckets[key].b += b;
      buckets[key].count += 1;
    }
    totalSampled++;
  }

  const sortedBuckets = Object.values(buckets).sort((a, b) => b.count - a.count);
  const selected = sortedBuckets.slice(0, colorCount);

  return selected.map((bucket) => {
    const avgR = Math.round(bucket.r / bucket.count);
    const avgG = Math.round(bucket.g / bucket.count);
    const avgB = Math.round(bucket.b / bucket.count);
    const percentage = totalSampled > 0 ? Number(((bucket.count / totalSampled) * 100).toFixed(1)) : 0;

    return {
      hex: rgbToHex(avgR, avgG, avgB),
      rgb: { r: avgR, g: avgG, b: avgB },
      hsl: rgbToHsl(avgR, avgG, avgB),
      population: bucket.count,
      percentage,
      textColor: getContrastTextColor(avgR, avgG, avgB),
    };
  });
}
