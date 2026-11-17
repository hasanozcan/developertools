const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function setSafeProperty(target: Record<string, any>, key: string, value: any): void {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

export function flattenJson(obj: any, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};
  if (!obj || typeof obj !== 'object') {
    return result;
  }

  for (const key of Object.keys(obj)) {
    if (!Object.hasOwn(obj, key) || DANGEROUS_KEYS.has(key)) {
      continue;
    }
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nested = flattenJson(value, newKey);
      for (const nestedKey of Object.keys(nested)) {
        if (Object.hasOwn(nested, nestedKey)) {
          setSafeProperty(result, nestedKey, nested[nestedKey]);
        }
      }
    } else {
      setSafeProperty(result, newKey, value);
    }
  }
  return result;
}