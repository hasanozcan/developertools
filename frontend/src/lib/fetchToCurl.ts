export interface FetchToCurlOptions {
  multiline?: boolean;
}

export function fetchToCurl(fetchCode: string, options: FetchToCurlOptions = {}): string {
  const { multiline = true } = options;
  const trimmed = fetchCode.trim();

  if (!trimmed) {
    return '';
  }

  // Extract URL from fetch('url'...) or fetch("url"...) or fetch(`url`...)
  const urlMatch = trimmed.match(/fetch\s*\(\s*['"`]([^'"`]+)['"`]/i);
  let url = urlMatch ? urlMatch[1] : '';

  if (!url) {
    // Try matching if the first arg is a variable or direct string without fetch prefix
    const genericUrlMatch = trimmed.match(/https?:\/\/[^\s'",`\)]+/i);
    url = genericUrlMatch ? genericUrlMatch[0] : 'https://api.example.com';
  }

  // Extract method
  const methodMatch = trimmed.match(/method\s*:\s*['"`]([a-zA-Z]+)['"`]/i);
  const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';

  // Extract headers
  const headers: Record<string, string> = {};
  const headersBlockMatch = trimmed.match(/headers\s*:\s*\{([^}]+)\}/is);
  if (headersBlockMatch) {
    const rawHeaders = headersBlockMatch[1];
    const headerLines = rawHeaders.split(/,\r?\n|,/);
    for (const line of headerLines) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].replace(/['"`]/g, '').trim();
        const val = parts.slice(1).join(':').replace(/^['"`\s]+|['"`\s]+$/g, '').trim();
        if (key && val) {
          headers[key] = val;
        }
      }
    }
  }

  // Extract body
  let body: string | undefined;
  const jsonBodyMatch = trimmed.match(/body\s*:\s*JSON\.stringify\s*\(([\s\S]*?)\)(?:\s*,|\s*\})/i);
  if (jsonBodyMatch) {
    body = jsonBodyMatch[1].trim();
    try {
      const parsed = JSON.parse(body);
      body = JSON.stringify(parsed);
    } catch {
      // Leave as is
    }
  } else {
    const rawBodyMatch = trimmed.match(/body\s*:\s*['"`]([^'"`]+)['"`]/i);
    if (rawBodyMatch) {
      body = rawBodyMatch[1];
    }
  }

  const parts: string[] = ['curl'];

  if (method !== 'GET') {
    parts.push(`-X ${method}`);
  }

  parts.push(`'${url}'`);

  for (const [key, val] of Object.entries(headers)) {
    parts.push(`-H '${key}: ${val}'`);
  }

  if (body) {
    parts.push(`-d '${body}'`);
  }

  if (multiline) {
    return parts.join(' \\\n  ');
  }

  return parts.join(' ');
}
