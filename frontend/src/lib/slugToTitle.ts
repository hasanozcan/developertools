export interface TitleCaseOptions {
  capitalizeAll?: boolean;
}

export function slugToTitleCase(slug: string, options: TitleCaseOptions = {}): string {
  const words = slug
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const minorWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'of', 'on', 'or', 'the', 'to', 'via']);

  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (!options.capitalizeAll && idx !== 0 && idx !== words.length - 1 && minorWords.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

export function slugToPascalCase(slug: string): string {
  return slug
    .trim()
    .replace(/[_-]+/g, ' ')
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

export function slugToCamelCase(slug: string): string {
  const pascal = slugToPascalCase(slug);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
