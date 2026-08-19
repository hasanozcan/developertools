export type QuoteType = 'single' | 'double' | 'none';

export interface SqlInOptions {
  quoteType: QuoteType;
  separator: string;
  prefix: string;
  suffix: string;
  removeDuplicates: boolean;
  trimItems: boolean;
  skipEmpty: boolean;
}

export function convertListToSqlIn(rawInput: string, options: Partial<SqlInOptions> = {}): string {
  const {
    quoteType = 'single',
    separator = ', ',
    prefix = 'IN (',
    suffix = ')',
    removeDuplicates = false,
    trimItems = true,
    skipEmpty = true,
  } = options;

  if (!rawInput.trim()) return '';

  // Split by newlines or commas
  const lines = rawInput.split(/[\r\n,]+/);

  let items = lines.map((line) => (trimItems ? line.trim() : line));

  if (skipEmpty) {
    items = items.filter((item) => item.length > 0);
  }

  if (removeDuplicates) {
    items = Array.from(new Set(items));
  }

  const q = quoteType === 'single' ? "'" : quoteType === 'double' ? '"' : '';

  const quotedItems = items.map((item) => {
    if (quoteType === 'single') {
      // Escape internal single quotes as '' (SQL standard)
      const escaped = item.replace(/'/g, "''");
      return `'${escaped}'`;
    }
    if (quoteType === 'double') {
      const escaped = item.replace(/"/g, '""');
      return `"${escaped}"`;
    }
    return item;
  });

  return `${prefix}${quotedItems.join(separator)}${suffix}`;
}
