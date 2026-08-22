const TAILWIND_TO_CSS_MAP: Record<string, string> = {
  flex: 'display: flex;',
  grid: 'display: grid;',
  block: 'display: block;',
  'inline-block': 'display: inline-block;',
  hidden: 'display: none;',
  'flex-col': 'flex-direction: column;',
  'flex-row': 'flex-direction: row;',
  'justify-center': 'justify-content: center;',
  'justify-between': 'justify-content: space-between;',
  'justify-start': 'justify-content: flex-start;',
  'justify-end': 'justify-content: flex-end;',
  'items-center': 'align-items: center;',
  'items-start': 'align-items: flex-start;',
  'items-end': 'align-items: flex-end;',
  'text-center': 'text-align: center;',
  'text-left': 'text-align: left;',
  'text-right': 'text-align: right;',
  'font-bold': 'font-weight: 700;',
  'font-semibold': 'font-weight: 600;',
  'font-medium': 'font-weight: 500;',
  'font-normal': 'font-weight: 400;',
  'cursor-pointer': 'cursor: pointer;',
  absolute: 'position: absolute;',
  relative: 'position: relative;',
  fixed: 'position: fixed;',
  sticky: 'position: sticky;',
  'overflow-hidden': 'overflow: hidden;',
  'overflow-auto': 'overflow: auto;',
  'w-full': 'width: 100%;',
  'h-full': 'height: 100%;',
  'w-screen': 'width: 100vw;',
  'h-screen': 'height: 100vh;',
};

export function convertTailwindToCss(classNames: string): {
  css: string;
  matchedRules: string[];
  unmapped: string[];
} {
  const classes = classNames.trim().split(/\s+/).filter(Boolean);
  const matchedRules: string[] = [];
  const unmapped: string[] = [];

  for (const cls of classes) {
    if (TAILWIND_TO_CSS_MAP[cls]) {
      matchedRules.push(TAILWIND_TO_CSS_MAP[cls]);
      continue;
    }

    const arbitraryBg = cls.match(/^bg-\[(.*)\]$/);
    if (arbitraryBg) {
      matchedRules.push(`background-color: ${arbitraryBg[1]};`);
      continue;
    }

    const arbitraryText = cls.match(/^text-\[(.*)\]$/);
    if (arbitraryText) {
      matchedRules.push(`color: ${arbitraryText[1]};`);
      continue;
    }

    const arbitraryP = cls.match(/^p-\[(.*)\]$/);
    if (arbitraryP) {
      matchedRules.push(`padding: ${arbitraryP[1]};`);
      continue;
    }

    const arbitraryM = cls.match(/^m-\[(.*)\]$/);
    if (arbitraryM) {
      matchedRules.push(`margin: ${arbitraryM[1]};`);
      continue;
    }

    const arbitraryRounded = cls.match(/^rounded-\[(.*)\]$/);
    if (arbitraryRounded) {
      matchedRules.push(`border-radius: ${arbitraryRounded[1]};`);
      continue;
    }

    unmapped.push(cls);
  }

  const css = matchedRules.length > 0 ? matchedRules.join('\n') : '';

  return {
    css,
    matchedRules,
    unmapped,
  };
}
