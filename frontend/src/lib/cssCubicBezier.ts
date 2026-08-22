export interface BezierPoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const CUBIC_BEZIER_PRESETS: Record<string, BezierPoints> = {
  ease: { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 },
  'ease-in': { x1: 0.42, y1: 0.0, x2: 1.0, y2: 1.0 },
  'ease-out': { x1: 0.0, y1: 0.0, x2: 0.58, y2: 1.0 },
  'ease-in-out': { x1: 0.42, y1: 0.0, x2: 0.58, y2: 1.0 },
  bounce: { x1: 0.68, y1: -0.55, x2: 0.265, y2: 1.55 },
  snappy: { x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0 },
};

export function formatCubicBezier(points: BezierPoints): {
  cssValue: string;
  transitionCss: string;
} {
  const x1 = Math.min(1, Math.max(0, points.x1));
  const x2 = Math.min(1, Math.max(0, points.x2));
  const y1 = Number(points.y1.toFixed(3));
  const y2 = Number(points.y2.toFixed(3));

  const cssValue = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  const transitionCss = `transition: all 0.3s ${cssValue};`;

  return { cssValue, transitionCss };
}
