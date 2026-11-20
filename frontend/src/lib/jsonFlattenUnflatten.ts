const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function setSafeProperty(target: Record<string, unknown>, key: string, value: unknown): void {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

export function flattenJson(obj: unknown, prefix = '', delimiter = '.'): Record<string, unknown> {
  const sep = delimiter || '.';
  const result: Record<string, unknown> = {};
  if (!obj || typeof obj !== 'object') {
    return result;
  }

  for (const key of Object.keys(obj)) {
    if (!Object.hasOwn(obj, key) || DANGEROUS_KEYS.has(key)) {
      continue;
    }
    const value = (obj as Record<string, unknown>)[key];
    const newKey = prefix ? `${prefix}${sep}${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nested = flattenJson(value, newKey, sep);
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

export function unflattenJson(obj: unknown, delimiter = '.'): Record<string, unknown> {
  const sep = delimiter || '.';
  const result: Record<string, unknown> = {};
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return result;
  }

  for (const flatKey of Object.keys(obj)) {
    if (!Object.hasOwn(obj, flatKey)) continue;
    const segments = flatKey.split(sep);
    if (segments.some((part) => DANGEROUS_KEYS.has(part))) {
      continue;
    }

    let cursor: Record<string, unknown> = result;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      const existing = Object.hasOwn(cursor, segment) ? cursor[segment] : undefined;
      if (typeof existing !== 'object' || existing === null || Array.isArray(existing)) {
        const nextObj: Record<string, unknown> = {};
        setSafeProperty(cursor, segment, nextObj);
        cursor = nextObj;
      } else {
        cursor = existing as Record<string, unknown>;
      }
    }

    const leafKey = segments[segments.length - 1];
    setSafeProperty(cursor, leafKey, (obj as Record<string, unknown>)[flatKey]);
  }

  return result;
}
