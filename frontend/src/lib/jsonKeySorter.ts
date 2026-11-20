export type JsonKeySortOrder = 'asc' | 'desc';

export function sortJsonKeys(obj: unknown, order: JsonKeySortOrder = 'asc'): unknown {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map((item) => sortJsonKeys(item, order));

  const record = obj as Record<string, unknown>;
  const keys = Object.keys(record).sort((a, b) =>
    order === 'desc' ? b.localeCompare(a) : a.localeCompare(b),
  );
  const sorted: Record<string, unknown> = {};
  for (const k of keys) {
    Object.defineProperty(sorted, k, {
      value: sortJsonKeys(record[k], order),
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }
  return sorted;
}
