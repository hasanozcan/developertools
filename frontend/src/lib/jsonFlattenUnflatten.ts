export function flattenJson(obj: any, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj || {})) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenJson(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}