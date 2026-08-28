export interface GlassClayOptions {
  type: 'glassmorphism' | 'claymorphism';
  blur: number;
  opacity: number;
  color: string;
  borderRadius: number;
  borderWidth: number;
}

export function generateGlassClayCss(options: GlassClayOptions): string {
  if (options.type === 'glassmorphism') {
    return `/* Glassmorphism CSS */
background: rgba(${hexToRgb(options.color)}, ${options.opacity / 100});
backdrop-filter: blur(${options.blur}px);
-webkit-backdrop-filter: blur(${options.blur}px);
border-radius: ${options.borderRadius}px;
border: ${options.borderWidth}px solid rgba(255, 255, 255, 0.18);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;
  }

  return `/* Claymorphism 3D CSS */
background: ${options.color};
border-radius: ${options.borderRadius}px;
box-shadow: 16px 16px 32px rgba(0, 0, 0, 0.25),
            inset -8px -8px 16px rgba(0, 0, 0, 0.3),
            inset 8px 8px 16px rgba(255, 255, 255, 0.4);`;
}

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 255;
  const g = parseInt(clean.substring(2, 4), 16) || 255;
  const b = parseInt(clean.substring(4, 6), 16) || 255;
  return `${r}, ${g}, ${b}`;
}
