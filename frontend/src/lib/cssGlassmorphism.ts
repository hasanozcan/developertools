export interface GlassmorphismOptions {
  blur: number; // 0 to 40px
  opacity: number; // 0 to 1
  bgColor: string; // hex #ffffff or rgb
  borderOpacity: number; // 0 to 1
  borderRadius: number; // px
  hasShadow: boolean;
}

export interface GlassmorphismResult {
  css: string;
  tailwind: string;
  styleObject: React.CSSProperties;
}

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

export function computeGlassmorphism(options: GlassmorphismOptions): GlassmorphismResult {
  const { blur, opacity, bgColor, borderOpacity, borderRadius, hasShadow } = options;

  const bgRgba = hexToRgba(bgColor, opacity);
  const borderRgba = `rgba(255, 255, 255, ${borderOpacity.toFixed(2)})`;
  const boxShadow = hasShadow
    ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    : 'none';

  const css = `background: ${bgRgba};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: ${borderRadius}px;
border: 1px solid ${borderRgba};${hasShadow ? `\nbox-shadow: ${boxShadow};` : ''}`;

  const tailwind = `bg-white/[${opacity.toFixed(2)}] backdrop-blur-[${blur}px] rounded-[${borderRadius}px] border border-white/[${borderOpacity.toFixed(2)}]${hasShadow ? ' shadow-2xl' : ''}`;

  const styleObject: React.CSSProperties = {
    background: bgRgba,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    borderRadius: `${borderRadius}px`,
    border: `1px solid ${borderRgba}`,
    ...(hasShadow ? { boxShadow } : {}),
  };

  return {
    css,
    tailwind,
    styleObject,
  };
}
