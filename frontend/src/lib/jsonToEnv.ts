export function convertJsonToEnv(jsonStr: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Invalid JSON string');
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('JSON root must be an object');
  }

  const envLines: string[] = [];

  const flatten = (obj: Record<string, unknown>, prefix: string = '') => {
    for (const [key, val] of Object.entries(obj)) {
      const cleanKey = key.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
      const fullKey = prefix ? `${prefix}_${cleanKey}` : cleanKey;

      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        flatten(val as Record<string, unknown>, fullKey);
      } else if (Array.isArray(val)) {
        envLines.push(`${fullKey}=${JSON.stringify(val)}`);
      } else if (val === null || val === undefined) {
        envLines.push(`${fullKey}=`);
      } else {
        envLines.push(`${fullKey}=${String(val)}`);
      }
    }
  };

  flatten(parsed as Record<string, unknown>);
  return envLines.join('\n');
}

export function convertEnvToJson(envStr: string): string {
  const lines = envStr.split(/\r\n|\r|\n/);
  const result: Record<string, unknown> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;

    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();

    // Remove wrapping quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    if (val === '') {
      result[key] = null;
    } else if (val.toLowerCase() === 'true') {
      result[key] = true;
    } else if (val.toLowerCase() === 'false') {
      result[key] = false;
    } else if (!isNaN(Number(val))) {
      result[key] = Number(val);
    } else {
      result[key] = val;
    }
  }

  return JSON.stringify(result, null, 2);
}
