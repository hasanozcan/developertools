export interface JsonToExcelOptions {
  delimiter?: string;
  includeHeaders?: boolean;
  flattenNested?: boolean;
}

export function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
    ) {
      Object.assign(result, flattenObject(value, newKey));
    } else if (Array.isArray(value)) {
      result[newKey] = JSON.stringify(value);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

export function escapeCsvCell(val: any, delimiter = ','): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (
    str.includes(delimiter) ||
    str.includes('"') ||
    str.includes('\n') ||
    str.includes('\r')
  ) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function jsonToDelimitedText(
  jsonInput: string | any[],
  options: JsonToExcelOptions = {}
): string {
  const {
    delimiter = ',',
    includeHeaders = true,
    flattenNested = true,
  } = options;

  let arrayData: any[];

  if (typeof jsonInput === 'string') {
    if (!jsonInput.trim()) return '';
    const parsed = JSON.parse(jsonInput);
    arrayData = Array.isArray(parsed) ? parsed : [parsed];
  } else {
    arrayData = Array.isArray(jsonInput) ? jsonInput : [jsonInput];
  }

  if (arrayData.length === 0) return '';

  const processedRows = arrayData.map((item) => {
    if (typeof item !== 'object' || item === null) {
      return { value: item };
    }
    return flattenNested ? flattenObject(item) : item;
  });

  // Collect all unique keys across all rows
  const headerKeys: string[] = [];
  processedRows.forEach((row) => {
    Object.keys(row).forEach((k) => {
      if (!headerKeys.includes(k)) {
        headerKeys.push(k);
      }
    });
  });

  const lines: string[] = [];

  if (includeHeaders) {
    lines.push(headerKeys.map((h) => escapeCsvCell(h, delimiter)).join(delimiter));
  }

  processedRows.forEach((row) => {
    const rowValues = headerKeys.map((k) => escapeCsvCell(row[k] ?? '', delimiter));
    lines.push(rowValues.join(delimiter));
  });

  return lines.join('\n');
}
