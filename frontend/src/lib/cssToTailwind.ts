const CSS_TO_TAILWIND_MAP: Record<string, string> = {
  'display: flex': 'flex',
  'display: grid': 'grid',
  'display: block': 'block',
  'display: inline-block': 'inline-block',
  'display: hidden': 'hidden',
  'display: none': 'hidden',
  'flex-direction: column': 'flex-col',
  'flex-direction: row': 'flex-row',
  'justify-content: center': 'justify-center',
  'justify-content: space-between': 'justify-between',
  'justify-content: flex-start': 'justify-start',
  'justify-content: flex-end': 'justify-end',
  'align-items: center': 'items-center',
  'align-items: flex-start': 'items-start',
  'align-items: flex-end': 'items-end',
  'text-align: center': 'text-center',
  'text-align: left': 'text-left',
  'text-align: right': 'text-right',
  'font-weight: bold': 'font-bold',
  'font-weight: 700': 'font-bold',
  'font-weight: 600': 'font-semibold',
  'font-weight: 500': 'font-medium',
  'font-weight: 400': 'font-normal',
  'cursor: pointer': 'cursor-pointer',
  'position: absolute': 'absolute',
  'position: relative': 'relative',
  'position: fixed': 'fixed',
  'position: sticky': 'sticky',
  'overflow: hidden': 'overflow-hidden',
  'overflow: auto': 'overflow-auto',
  'width: 100%': 'w-full',
  'height: 100%': 'h-full',
  'width: 100vw': 'w-screen',
  'height: 100vh': 'h-screen',
};

export function convertCssToTailwind(css: string): {
  classes: string[];
  tailwindClassString: string;
  unmapped: string[];
} {
  const lines = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(';')
    .map((l) => l.trim())
    .filter(Boolean);

  const matchedClasses: string[] = [];
  const unmapped: string[] = [];

  for (const line of lines) {
    const normalized = line.replace(/\s+/g, ' ').toLowerCase();
    if (CSS_TO_TAILWIND_MAP[normalized]) {
      matchedClasses.push(CSS_TO_TAILWIND_MAP[normalized]);
      continue;
    }

    // Heuristics for padding & margin
    const pMatch = normalized.match(/^padding:\s*(\d+)px$/);
    if (pMatch) {
      matchedClasses.push(`p-[${pMatch[1]}px]`);
      continue;
    }
    const mMatch = normalized.match(/^margin:\s*(\d+)px$/);
    if (mMatch) {
      matchedClasses.push(`m-[${mMatch[1]}px]`);
      continue;
    }
    const bgMatch = normalized.match(/^background(?:-color)?:\s*(#[a-fA-F0-9]{3,8}|rgba?\([^)]+\))$/);
    if (bgMatch) {
      matchedClasses.push(`bg-[${bgMatch[1]}]`);
      continue;
    }
    const colMatch = normalized.match(/^color:\s*(#[a-fA-F0-9]{3,8}|rgba?\([^)]+\))$/);
    if (colMatch) {
      matchedClasses.push(`text-[${colMatch[1]}]`);
      continue;
    }
    const radiusMatch = normalized.match(/^border-radius:\s*(\d+)px$/);
    if (radiusMatch) {
      matchedClasses.push(`rounded-[${radiusMatch[1]}px]`);
      continue;
    }

    unmapped.push(line);
  }

  return {
    classes: matchedClasses,
    tailwindClassString: matchedClasses.join(' '),
    unmapped,
  };
}
