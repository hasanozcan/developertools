export interface MediaQueryOptions {
  minWidth?: number;
  maxWidth?: number;
  mediaType?: 'all' | 'screen' | 'print';
  orientation?: 'any' | 'portrait' | 'landscape';
  prefersColorScheme?: 'any' | 'dark' | 'light';
  prefersReducedMotion?: boolean;
  useRangeSyntax?: boolean;
}

export function buildMediaQuery(options: MediaQueryOptions): {
  query: string;
  cssBlock: string;
} {
  const {
    minWidth,
    maxWidth,
    mediaType = 'screen',
    orientation = 'any',
    prefersColorScheme = 'any',
    prefersReducedMotion = false,
    useRangeSyntax = true,
  } = options;

  const conditions: string[] = [];

  if (useRangeSyntax) {
    if (minWidth && maxWidth) {
      conditions.push(`(${minWidth}px <= width <= ${maxWidth}px)`);
    } else if (minWidth) {
      conditions.push(`(width >= ${minWidth}px)`);
    } else if (maxWidth) {
      conditions.push(`(width <= ${maxWidth}px)`);
    }
  } else {
    if (minWidth) conditions.push(`(min-width: ${minWidth}px)`);
    if (maxWidth) conditions.push(`(max-width: ${maxWidth}px)`);
  }

  if (orientation !== 'any') {
    conditions.push(`(orientation: ${orientation})`);
  }

  if (prefersColorScheme !== 'any') {
    conditions.push(`(prefers-color-scheme: ${prefersColorScheme})`);
  }

  if (prefersReducedMotion) {
    conditions.push('(prefers-reduced-motion: reduce)');
  }

  const condStr = conditions.length > 0 ? ' and ' + conditions.join(' and ') : '';
  const query = `@media ${mediaType}${condStr}`;
  const cssBlock = `${query} {\n  /* Responsive styles go here */\n}`;

  return { query, cssBlock };
}
