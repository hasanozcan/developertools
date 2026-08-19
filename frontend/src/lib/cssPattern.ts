export type PatternType = 'dots' | 'grid' | 'stripes' | 'checkerboard' | 'diagonal';

export interface PatternOptions {
  type: PatternType;
  bgColor: string;
  fgColor: string;
  size: number; // px (10 - 80)
  dotRadius: number; // px (1 - 10)
}

export const DEFAULT_PATTERN: PatternOptions = {
  type: 'dots',
  bgColor: '#0f172a',
  fgColor: '#38bdf8',
  size: 24,
  dotRadius: 2,
};

export function generatePatternCss(options: PatternOptions): { background: string; backgroundSize: string; css: string } {
  let background = '';
  let backgroundSize = `${options.size}px ${options.size}px`;

  if (options.type === 'dots') {
    background = `radial-gradient(${options.fgColor} ${options.dotRadius}px, transparent ${options.dotRadius}px)`;
  } else if (options.type === 'grid') {
    background = `linear-gradient(to right, ${options.fgColor} 1px, transparent 1px), linear-gradient(to bottom, ${options.fgColor} 1px, transparent 1px)`;
  } else if (options.type === 'stripes') {
    background = `repeating-linear-gradient(0deg, ${options.fgColor}, ${options.fgColor} 2px, transparent 2px, transparent ${options.size}px)`;
    backgroundSize = 'auto';
  } else if (options.type === 'diagonal') {
    background = `repeating-linear-gradient(45deg, ${options.fgColor}, ${options.fgColor} 2px, transparent 2px, transparent ${options.size}px)`;
    backgroundSize = 'auto';
  } else if (options.type === 'checkerboard') {
    background = `linear-gradient(45deg, ${options.fgColor} 25%, transparent 25%), linear-gradient(-45deg, ${options.fgColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${options.fgColor} 75%), linear-gradient(-45deg, transparent 75%, ${options.fgColor} 75%)`;
  }

  const css = `background-color: ${options.bgColor};
background-image: ${background};
background-size: ${backgroundSize};`;

  return { background, backgroundSize, css };
}
