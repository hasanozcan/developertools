export function httpHeadersToJson(headersStr: string): string {
  const lines = headersStr.split('\n').map(l => l.trim()).filter(Boolean);
  const result: Record<string, string> = {};

  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim();
      result[k] = v;
    }
  }

  return JSON.stringify(result, null, 2);
}

export function jsonToHttpHeaders(jsonStr: string): string {
  try {
    const obj = JSON.parse(jsonStr);
    return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join('\n');
  } catch {
    return '';
  }
}
