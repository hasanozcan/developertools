export interface HeaderItem {
  key: string;
  value: string;
}

export interface CurlBuilderOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
  headers: HeaderItem[];
  bodyType: 'none' | 'json' | 'form' | 'raw';
  bodyContent: string;
  authType: 'none' | 'bearer' | 'basic';
  bearerToken: string;
  basicUser: string;
  basicPass: string;
  followRedirects: boolean;
  insecure: boolean;
  compressed: boolean;
}

export function buildCurlCommand(options: CurlBuilderOptions): string {
  const parts: string[] = ['curl'];

  // Method (unless default GET without body)
  if (options.method !== 'GET') {
    parts.push(`-X ${options.method}`);
  }

  // URL
  const trimmedUrl = options.url.trim() || 'https://api.example.com/v1/resource';
  parts.push(`'${trimmedUrl}'`);

  // Flags
  if (options.followRedirects) parts.push('-L');
  if (options.insecure) parts.push('-k');
  if (options.compressed) parts.push('--compressed');

  // Authentication
  if (options.authType === 'bearer' && options.bearerToken.trim()) {
    parts.push(`-H 'Authorization: Bearer ${options.bearerToken.trim()}'`);
  } else if (options.authType === 'basic' && (options.basicUser || options.basicPass)) {
    parts.push(`-u '${options.basicUser}:${options.basicPass}'`);
  }

  // Headers
  const activeHeaders = options.headers.filter((h) => h.key.trim().length > 0);
  for (const h of activeHeaders) {
    parts.push(`-H '${h.key.trim()}: ${h.value.trim()}'`);
  }

  // Body
  if (options.bodyType === 'json' && options.bodyContent.trim()) {
    const hasContentType = activeHeaders.some((h) => h.key.toLowerCase() === 'content-type');
    if (!hasContentType) {
      parts.push(`-H 'Content-Type: application/json'`);
    }
    const escaped = options.bodyContent.replace(/'/g, "'\\''");
    parts.push(`-d '${escaped}'`);
  } else if (options.bodyType === 'form' && options.bodyContent.trim()) {
    const lines = options.bodyContent.split('\n').filter((l) => l.trim().length > 0);
    for (const line of lines) {
      parts.push(`-F '${line.trim()}'`);
    }
  } else if (options.bodyType === 'raw' && options.bodyContent.trim()) {
    const escaped = options.bodyContent.replace(/'/g, "'\\''");
    parts.push(`-d '${escaped}'`);
  }

  return parts.join(' \\\n  ');
}
