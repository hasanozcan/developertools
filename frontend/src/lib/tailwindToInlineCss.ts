const TAILWIND_MAP: Record<string, string> = {
  'p-2': 'padding: 8px;',
  'p-4': 'padding: 16px;',
  'p-6': 'padding: 24px;',
  'm-2': 'margin: 8px;',
  'm-4': 'margin: 16px;',
  'text-center': 'text-align: center;',
  'text-left': 'text-align: left;',
  'text-right': 'text-align: right;',
  'text-white': 'color: #ffffff;',
  'text-black': 'color: #000000;',
  'text-sm': 'font-size: 14px; line-height: 20px;',
  'text-base': 'font-size: 16px; line-height: 24px;',
  'text-lg': 'font-size: 18px; line-height: 28px;',
  'text-xl': 'font-size: 20px; line-height: 28px;',
  'font-bold': 'font-weight: 700;',
  'font-semibold': 'font-weight: 600;',
  'rounded': 'border-radius: 4px;',
  'rounded-lg': 'border-radius: 8px;',
  'rounded-full': 'border-radius: 9999px;',
  'bg-white': 'background-color: #ffffff;',
  'bg-black': 'background-color: #000000;',
  'bg-blue-600': 'background-color: #2563eb;',
  'bg-gray-100': 'background-color: #f3f4f6;',
  'flex': 'display: flex;',
  'inline-block': 'display: inline-block;',
  'block': 'display: block;',
  'w-full': 'width: 100%;',
};

export function convertTailwindToInlineCss(html: string): string {
  return html.replace(/class=["']([^"']+)["']/g, (match, classes) => {
    const classList = classes.split(/\s+/);
    const styles: string[] = [];

    for (const cls of classList) {
      if (TAILWIND_MAP[cls]) {
        styles.push(TAILWIND_MAP[cls]);
      }
    }

    if (styles.length > 0) {
      return `style="${styles.join(' ')}"`;
    }
    return match;
  });
}
