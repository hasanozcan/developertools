export interface JsonToExcelOptions {
  delimiter?: string;
  includeHeaders?: boolean;
  flattenNested?: boolean;
}

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const FORMULA_INJECTION_PATTERN = /^[ \t\r\n]*[=+\-@\t\r]/;
const PURE_NEGATIVE_NUMBER_PATTERN = /^\s*-\d+(?:\.\d+)?\s*$/;

function setSafeProperty(target: Record<string, any>, key: string, value: any): void {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

export function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    if (!Object.hasOwn(obj, key) || DANGEROUS_KEYS.has(key)) {
      continue;
    }

    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
    ) {
      const nested = flattenObject(value, newKey);
      for (const nestedKey of Object.keys(nested)) {
        if (Object.hasOwn(nested, nestedKey)) {
          setSafeProperty(result, nestedKey, nested[nestedKey]);
        }
      }
    } else if (Array.isArray(value)) {
      setSafeProperty(result, newKey, JSON.stringify(value));
    } else {
      setSafeProperty(result, newKey, value);
    }
  }

  return result;
}

export function escapeCsvCell(val: any, delimiter = ','): string {
  if (val === null || val === undefined) return '';
  let str = String(val);

  if (
    typeof val !== 'number' &&
    FORMULA_INJECTION_PATTERN.test(str) &&
    !PURE_NEGATIVE_NUMBER_PATTERN.test(str)
  ) {
    str = `'${str}`;
  }

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
      if (!DANGEROUS_KEYS.has(k) && !headerKeys.includes(k)) {
        headerKeys.push(k);
      }
    });
  });

  const lines: string[] = [];

  if (includeHeaders) {
    lines.push(headerKeys.map((h) => escapeCsvCell(h, delimiter)).join(delimiter));
  }

  processedRows.forEach((row) => {
    const rowValues = headerKeys.map((k) =>
      escapeCsvCell(Object.hasOwn(row, k) ? (row[k] ?? '') : '', delimiter)
    );
    lines.push(rowValues.join(delimiter));
  });

  return lines.join('\n');
}
