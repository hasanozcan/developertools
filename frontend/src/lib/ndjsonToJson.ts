export function ndjsonToJson(ndjson: string): string {
  const lines = ndjson.trim().split(/\r\n|\r|\n/).filter((l) => l.trim().length > 0);
  const objects: unknown[] = [];

  for (const line of lines) {
    try {
      objects.push(JSON.parse(line));
    } catch {
      // ignore or push raw string
      objects.push({ raw: line });
    }
  }

  return JSON.stringify(objects, null, 2);
}

export function jsonToNdjson(jsonStr: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Invalid JSON string');
  }

  if (Array.isArray(parsed)) {
    return parsed.map((item) => JSON.stringify(item)).join('\n');
  }

  return JSON.stringify(parsed);
}
