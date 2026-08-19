export interface MeshPoint {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  color: string;
}

export interface MeshGradientOptions {
  bgColor: string;
  points: MeshPoint[];
  blur: number; // px (20 - 100)
}

export const DEFAULT_MESH_OPTIONS: MeshGradientOptions = {
  bgColor: '#0f172a',
  blur: 40,
  points: [
    { x: 20, y: 20, color: '#4f46e5' },
    { x: 80, y: 20, color: '#ec4899' },
    { x: 20, y: 80, color: '#06b6d4' },
    { x: 80, y: 80, color: '#8b5cf6' },
  ],
};

export function generateMeshGradientCss(options: MeshGradientOptions): { background: string; css: string } {
  const radials = options.points.map(
    (p) => `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent 50%)`
  );

  const background = `${radials.join(',\n')},\n${options.bgColor}`;

  const css = `background-color: ${options.bgColor};
background-image:
  ${radials.join(',\n  ')};`;

  return { background, css };
}
