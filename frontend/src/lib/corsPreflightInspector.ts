export interface CorsPreflightInput {
  requestOrigin: string;
  requestMethod: string;
  requestHeaders: string[];
  allowOrigin: string;
  allowCredentials: boolean;
  allowMethods: string[];
  allowHeaders: string[];
  maxAge?: number;
}

export interface CorsCheckItem {
  id: 'origin' | 'credentials' | 'method' | 'headers';
  label: string;
  passed: boolean;
  detail: string;
}

export interface CorsPreflightReport {
  allowed: boolean;
  preflightRequired: boolean;
  checks: CorsCheckItem[];
  responseHeaders: Record<string, string>;
}

const CORS_SAFELISTED_METHODS = new Set(['GET', 'HEAD', 'POST']);
const CORS_SAFELISTED_HEADERS = new Set(['accept', 'accept-language', 'content-language']);
const SAFELISTED_CONTENT_TYPES = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]);

export function evaluateCorsOptions(origin: string, allowedOrigins: string[]): boolean {
  const cleanOrigin = (origin || '').trim();
  if (!cleanOrigin) return false;
  return allowedOrigins.includes('*') || allowedOrigins.includes(cleanOrigin);
}

function isValidOriginFormat(origin: string): boolean {
  if (origin === 'null') return true;
  try {
    const url = new URL(origin);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.origin === origin;
  } catch {
    return false;
  }
}

export function isCorsSafelistedContentType(headerValue: string): boolean {
  const essence = headerValue.split(';')[0].trim().toLowerCase();
  return SAFELISTED_CONTENT_TYPES.has(essence);
}

export function inspectCorsPreflight(input: CorsPreflightInput): CorsPreflightReport {
  const requestOrigin = (input.requestOrigin || '').trim();
  const requestMethod = (input.requestMethod || 'GET').trim().toUpperCase();
  const allowOrigin = (input.allowOrigin || '').trim();
  const allowCredentials = Boolean(input.allowCredentials);
  const allowMethods = input.allowMethods.map((m) => m.trim()).filter(Boolean);
  const allowHeaders = input.allowHeaders.map((h) => h.trim()).filter(Boolean);
  const requestHeaders = input.requestHeaders.map((h) => h.trim()).filter(Boolean);

  const nonSafelistedHeaders = requestHeaders.filter(
    (h) => !CORS_SAFELISTED_HEADERS.has(h.toLowerCase()),
  );
  const preflightRequired =
    !CORS_SAFELISTED_METHODS.has(requestMethod) || nonSafelistedHeaders.length > 0;

  const checks: CorsCheckItem[] = [];

  // 1. Credentials + wildcard prohibition (WHATWG Fetch standard)
  const wildcardWithCreds = allowCredentials && allowOrigin === '*';
  checks.push({
    id: 'credentials',
    label: 'Access-Control-Allow-Credentials',
    passed: !wildcardWithCreds,
    detail: wildcardWithCreds
      ? 'Forbidden by Fetch spec: Access-Control-Allow-Origin cannot be "*" when Access-Control-Allow-Credentials is true.'
      : allowCredentials
        ? 'Credentials allowed with an explicit origin (Access-Control-Allow-Credentials: true).'
        : 'Credentials mode omitted or false.',
  });

  // 2. Origin check
  const validOrigin = isValidOriginFormat(requestOrigin);
  const multiOriginHeader = allowOrigin.includes(',');
  const originMatches =
    validOrigin && !multiOriginHeader && (allowOrigin === '*' || allowOrigin === requestOrigin);

  checks.push({
    id: 'origin',
    label: 'Access-Control-Allow-Origin',
    passed: originMatches && !wildcardWithCreds,
    detail: !validOrigin
      ? `Invalid request Origin "${requestOrigin || '(empty)'}". Expected scheme://host[:port].`
      : multiOriginHeader
        ? 'Access-Control-Allow-Origin must contain a single origin or "*", never a comma-separated list.'
        : !originMatches
          ? `Server ACAO "${allowOrigin || '(missing)'}" does not match request Origin "${requestOrigin}".`
          : wildcardWithCreds
            ? 'Wildcard "*" is rejected because credentials are enabled.'
            : `Origin "${requestOrigin}" permitted by "${allowOrigin}".`,
  });

  // 3. Method check
  const methodWildcardBlocked =
    allowCredentials && allowMethods.includes('*') && !allowMethods.includes(requestMethod);
  const methodPermitted =
    CORS_SAFELISTED_METHODS.has(requestMethod) ||
    allowMethods.includes(requestMethod) ||
    (!allowCredentials && allowMethods.includes('*'));

  checks.push({
    id: 'method',
    label: 'Access-Control-Allow-Methods',
    passed: methodPermitted,
    detail: methodPermitted
      ? CORS_SAFELISTED_METHODS.has(requestMethod)
        ? `Method ${requestMethod} is CORS-safelisted.`
        : `Method ${requestMethod} is permitted by Access-Control-Allow-Methods.`
      : methodWildcardBlocked
        ? `Wildcard "*" in Access-Control-Allow-Methods does not match ${requestMethod} when credentials are enabled.`
        : `Method ${requestMethod} is missing from Access-Control-Allow-Methods (${allowMethods.join(', ') || 'none'}).`,
  });

  // 4. Request Headers check
  const allowHeadersLower = new Set(allowHeaders.map((h) => h.toLowerCase()));
  const hasWildcardHeader = !allowCredentials && allowHeadersLower.has('*');
  const disallowedHeaders: string[] = [];

  for (const header of nonSafelistedHeaders) {
    const lower = header.toLowerCase();
    // Per Fetch spec, Authorization requires explicit listing even when ACAH is "*"
    if (lower === 'authorization') {
      if (!allowHeadersLower.has('authorization')) {
        disallowedHeaders.push(header);
      }
      continue;
    }
    if (!allowHeadersLower.has(lower) && !hasWildcardHeader) {
      disallowedHeaders.push(header);
    }
  }

  checks.push({
    id: 'headers',
    label: 'Access-Control-Allow-Headers',
    passed: disallowedHeaders.length === 0,
    detail:
      disallowedHeaders.length === 0
        ? nonSafelistedHeaders.length === 0
          ? 'No non-safelisted request headers requested.'
          : `All requested headers (${nonSafelistedHeaders.join(', ')}) are permitted.`
        : `Disallowed request header(s): ${disallowedHeaders.join(', ')}. Add them explicitly to Access-Control-Allow-Headers.`,
  });

  const allowed = checks.every((c) => c.passed);

  const responseHeaders: Record<string, string> = {};
  if (allowOrigin) responseHeaders['Access-Control-Allow-Origin'] = allowOrigin;
  if (allowCredentials) responseHeaders['Access-Control-Allow-Credentials'] = 'true';
  if (allowMethods.length > 0)
    responseHeaders['Access-Control-Allow-Methods'] = allowMethods.join(', ');
  if (allowHeaders.length > 0)
    responseHeaders['Access-Control-Allow-Headers'] = allowHeaders.join(', ');
  if (typeof input.maxAge === 'number' && Number.isFinite(input.maxAge) && input.maxAge >= 0) {
    responseHeaders['Access-Control-Max-Age'] = String(Math.floor(input.maxAge));
  }
  if (allowOrigin && allowOrigin !== '*') {
    responseHeaders.Vary = 'Origin';
  }

  return {
    allowed,
    preflightRequired,
    checks,
    responseHeaders,
  };
}
