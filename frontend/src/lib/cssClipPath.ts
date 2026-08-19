export interface Point {
  x: number; // 0 - 100
  y: number; // 0 - 100
}

export type ClipPathPreset = 'triangle' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'pentagon' | 'hexagon' | 'star' | 'message';

export const CLIP_PATH_PRESETS: Record<ClipPathPreset, { name: string; points: Point[] }> = {
  triangle: {
    name: 'Triangle',
    points: [
      { x: 50, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 },
    ],
  },
  trapezoid: {
    name: 'Trapezoid',
    points: [
      { x: 20, y: 0 },
      { x: 80, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  parallelogram: {
    name: 'Parallelogram',
    points: [
      { x: 25, y: 0 },
      { x: 100, y: 0 },
      { x: 75, y: 100 },
      { x: 0, y: 100 },
    ],
  },
  rhombus: {
    name: 'Rhombus',
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 50 },
    ],
  },
  pentagon: {
    name: 'Pentagon',
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 38 },
      { x: 82, y: 100 },
      { x: 18, y: 100 },
      { x: 0, y: 38 },
    ],
  },
  hexagon: {
    name: 'Hexagon',
    points: [
      { x: 25, y: 0 },
      { x: 75, y: 0 },
      { x: 100, y: 50 },
      { x: 75, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 50 },
    ],
  },
  star: {
    name: 'Star',
    points: [
      { x: 50, y: 0 },
      { x: 61, y: 35 },
      { x: 98, y: 35 },
      { x: 68, y: 57 },
      { x: 79, y: 91 },
      { x: 50, y: 70 },
      { x: 21, y: 91 },
      { x: 32, y: 57 },
      { x: 2, y: 35 },
      { x: 39, y: 35 },
    ],
  },
  message: {
    name: 'Message Bubble',
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 75 },
      { x: 75, y: 75 },
      { x: 75, y: 100 },
      { x: 50, y: 75 },
      { x: 0, y: 75 },
    ],
  },
};

export function generateClipPathCss(points: Point[]): { clipPath: string; css: string } {
  const poly = points.map((p) => `${p.x}% ${p.y}%`).join(', ');
  const clipPath = `polygon(${poly})`;
  const css = `clip-path: ${clipPath};\n-webkit-clip-path: ${clipPath};`;
  return { clipPath, css };
}
