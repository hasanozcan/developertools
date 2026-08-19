export interface TextShadowLayer {
  x: number; // px
  y: number; // px
  blur: number; // px
  color: string;
}

export interface TextShadowPreset {
  name: string;
  layers: TextShadowLayer[];
}

export const TEXT_SHADOW_PRESETS: TextShadowPreset[] = [
  {
    name: 'Soft Drop',
    layers: [{ x: 2, y: 3, blur: 6, color: 'rgba(0, 0, 0, 0.25)' }],
  },
  {
    name: 'Neon Glow',
    layers: [
      { x: 0, y: 0, blur: 5, color: '#06b6d4' },
      { x: 0, y: 0, blur: 15, color: '#06b6d4' },
      { x: 0, y: 0, blur: 30, color: '#3b82f6' },
    ],
  },
  {
    name: '3D Extruded',
    layers: [
      { x: 1, y: 1, blur: 0, color: '#6366f1' },
      { x: 2, y: 2, blur: 0, color: '#4f46e5' },
      { x: 3, y: 3, blur: 0, color: '#4338ca' },
      { x: 4, y: 4, blur: 0, color: '#3730a3' },
    ],
  },
  {
    name: 'Retro Outline',
    layers: [
      { x: 2, y: 2, blur: 0, color: '#f43f5e' },
      { x: 4, y: 4, blur: 0, color: '#0ea5e9' },
    ],
  },
];

export function generateTextShadowCss(layers: TextShadowLayer[]): { cssValue: string; fullCss: string } {
  if (!layers.length) {
    return {
      cssValue: 'none',
      fullCss: 'text-shadow: none;',
    };
  }

  const cssValue = layers
    .map((l) => `${l.x}px ${l.y}px ${l.blur}px ${l.color}`)
    .join(', ');

  const fullCss = `text-shadow: ${cssValue};`;

  return { cssValue, fullCss };
}
