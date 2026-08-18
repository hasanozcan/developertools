export interface BlobOptions {
  points: number; // 4 to 8
  growth: number; // 1 to 9
  color: string;
}

export interface BlobResult {
  borderRadius: string;
  css: string;
  svgPath: string;
  svgCode: string;
}

export function generateRandomBlobRadius(): string {
  // Generate 8 percentage values for border-radius: a% b% c% d% / e% f% g% h%
  const r = () => Math.floor(Math.random() * 40) + 30; // 30% to 70%
  const r1 = r(), r2 = 100 - r1;
  const r3 = r(), r4 = 100 - r3;
  const r5 = r(), r6 = 100 - r5;
  const r7 = r(), r8 = 100 - r7;

  return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
}

export function generateBlob(borderRadius: string, color: string = '#6366F1'): BlobResult {
  const css = `border-radius: ${borderRadius};
background: ${color};
width: 300px;
height: 300px;`;

  // Standard smooth organic SVG blob path representation
  const svgPath = 'M42.2,-68.8C53.7,-60.8,61.4,-47.9,67.6,-34.5C73.9,-21,78.6,-6.9,76.5,6.3C74.4,19.5,65.5,31.7,55.8,42.4C46,53,35.5,62.1,23.3,66.8C11.1,71.5,-2.7,71.8,-15.8,68C-28.9,64.2,-41.2,56.3,-50.7,45.8C-60.1,35.4,-66.6,22.4,-68.8,8.8C-70.9,-4.8,-68.7,-19.1,-61.7,-30.9C-54.7,-42.6,-42.9,-51.9,-30.5,-59.4C-18,-66.8,-5,-72.6,8.7,-74C22.4,-75.3,30.6,-76.8,42.2,-68.8Z';

  const svgCode = `<svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" d="${svgPath}" />
</svg>`;

  return {
    borderRadius,
    css,
    svgPath,
    svgCode,
  };
}
