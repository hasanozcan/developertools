export interface RequestQueryParameter {
  name: string;
  value: string;
}

export interface RequestHeader {
  name: string;
  value: string;
}

export interface CurlRequestInput {
  method?: string;
  url: string;
  query?: readonly RequestQueryParameter[];
  headers?: readonly RequestHeader[];
  body?: string;
  followRedirects?: boolean;
  compressed?: boolean;
}

export interface ParsedCurlRequest {
  method: string;
  url: string;
  headers: RequestHeader[];
  body?: string;
  followRedirects: boolean;
  compressed: boolean;
}

export interface RequestOutputOptions {
  redactSensitiveHeaders?: boolean;
  redactionValue?: string;
}

export class CurlRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CurlRequestError';
  }
}

const MAX_COMMAND_LENGTH = 100_000;
const MAX_TOKEN_COUNT = 1_024;
const DEFAULT_REDACTION_VALUE = '[REDACTED]';
const HTTP_TOKEN_PATTERN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
const SENSITIVE_HEADER_NAMES = new Set([
  'authorization',
  'proxy-authorization',
  'cookie',
  'set-cookie',
  'api-key',
  'x-api-key',
  'x-auth-token',
  'x-access-token',
]);

function assertNoNul(value: string, label: string): void {
  if (value.includes('\0')) {
    throw new CurlRequestError(`${label} cannot contain a NUL byte.`);
  }
}

function assertNoLineBreak(value: string, label: string): void {
  if (/[\r\n]/.test(value)) {
    throw new CurlRequestError(`${label} cannot contain CR or LF characters.`);
  }
}

function normalizeMethod(method: string | undefined, hasBody: boolean): string {
  const normalized = (method?.trim() || (hasBody ? 'POST' : 'GET')).toUpperCase();
  assertNoNul(normalized, 'HTTP method');
  if (!HTTP_TOKEN_PATTERN.test(normalized)) {
    throw new CurlRequestError('HTTP method must be a valid HTTP token.');
  }
  return normalized;
}

function normalizeHeader(header: RequestHeader): RequestHeader {
  assertNoNul(header.name, 'Header name');
  assertNoNul(header.value, 'Header value');
  assertNoLineBreak(header.name, 'Header name');
  assertNoLineBreak(header.value, 'Header value');

  const name = header.name.trim();
  if (!HTTP_TOKEN_PATTERN.test(name)) {
    throw new CurlRequestError(`Invalid HTTP header name: ${header.name || '(empty)'}.`);
  }

  return { name, value: header.value };
}

function normalizeRequest(input: CurlRequestInput): ParsedCurlRequest {
  const hasBody = input.body !== undefined;
  if (hasBody) {
    assertNoNul(input.body!, 'Request body');
  }

  return {
    method: normalizeMethod(input.method, hasBody),
    url: buildRequestUrl(input.url, input.query),
    headers: (input.headers ?? []).map(normalizeHeader),
    ...(hasBody ? { body: input.body } : {}),
    followRedirects: Boolean(input.followRedirects),
    compressed: Boolean(input.compressed),
  };
}

function outputHeaders(
  headers: readonly RequestHeader[],
  options: RequestOutputOptions,
): RequestHeader[] {
  const shouldRedact = options.redactSensitiveHeaders ?? true;
  if (!shouldRedact) {
    return headers.map((header) => ({ ...header }));
  }

  const redactionValue = options.redactionValue ?? DEFAULT_REDACTION_VALUE;
  assertNoNul(redactionValue, 'Redaction value');
  assertNoLineBreak(redactionValue, 'Redaction value');

  return headers.map((header) => ({
    ...header,
    value: isSensitiveHeader(header.name) ? redactionValue : header.value,
  }));
}

function javascriptString(value: string): string {
  return JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function parseHeaderArgument(argument: string): RequestHeader {
  if (argument.startsWith('@')) {
    throw new CurlRequestError('File-backed header arguments are not supported.');
  }

  const colonIndex = argument.indexOf(':');
  if (colonIndex >= 0) {
    const value = argument.slice(colonIndex + 1).replace(/^[\t ]+/, '');
    if (value === '') {
      throw new CurlRequestError(
        'cURL Name: syntax suppresses a header and cannot be converted safely. Use Name; for an explicit empty value.',
      );
    }
    return normalizeHeader({
      name: argument.slice(0, colonIndex),
      value,
    });
  }

  // curl uses a trailing semicolon to send an explicitly empty header value.
  if (argument.endsWith(';')) {
    return normalizeHeader({ name: argument.slice(0, -1), value: '' });
  }

  throw new CurlRequestError(`Header must use "Name: value" syntax: ${argument}.`);
}

function assertSafePastedCommand(command: string): void {
  if (!command.trim()) {
    throw new CurlRequestError('Paste a cURL command to convert.');
  }
  if (command.length > MAX_COMMAND_LENGTH) {
    throw new CurlRequestError(`cURL command exceeds ${MAX_COMMAND_LENGTH} characters.`);
  }
  assertNoNul(command, 'cURL command');
}

function takeFollowingValue(tokens: readonly string[], index: number, option: string): string {
  const value = tokens[index + 1];
  if (value === undefined) {
    throw new CurlRequestError(`${option} requires a value.`);
  }
  return value;
}

function longOptionValue(token: string, option: string): string | undefined {
  const prefix = `${option}=`;
  return token.startsWith(prefix) ? token.slice(prefix.length) : undefined;
}

export function isSensitiveHeader(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return (
    SENSITIVE_HEADER_NAMES.has(normalized) ||
    normalized.endsWith('-token') ||
    normalized.endsWith('-secret') ||
    /(?:^|-)api-key$/.test(normalized)
  );
}

export function redactRequestHeaders(
  headers: readonly RequestHeader[],
  redactionValue = DEFAULT_REDACTION_VALUE,
): RequestHeader[] {
  return outputHeaders(headers.map(normalizeHeader), {
    redactSensitiveHeaders: true,
    redactionValue,
  });
}

/** Quotes one complete POSIX shell argument without allowing interpolation. */
export function quotePosixShell(value: string): string {
  assertNoNul(value, 'Shell argument');
  return `'${value.replace(/'/g, `'"'"'`)}'`;
}

export function buildRequestUrl(
  rawUrl: string,
  query: readonly RequestQueryParameter[] = [],
): string {
  assertNoNul(rawUrl, 'URL');
  assertNoLineBreak(rawUrl, 'URL');
  const trimmedUrl = rawUrl.trim();
  if (!trimmedUrl) {
    throw new CurlRequestError('URL is required.');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedUrl);
  } catch {
    throw new CurlRequestError('Enter a valid absolute HTTP or HTTPS URL.');
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new CurlRequestError('Only HTTP and HTTPS URLs are supported.');
  }

  for (const parameter of query) {
    assertNoNul(parameter.name, 'Query parameter name');
    assertNoNul(parameter.value, 'Query parameter value');
    parsedUrl.searchParams.append(parameter.name, parameter.value);
  }

  return parsedUrl.toString();
}

export function generateCurl(input: CurlRequestInput, options: RequestOutputOptions = {}): string {
  const request = normalizeRequest(input);
  const headers = outputHeaders(request.headers, options);
  const argumentsList = [
    `--request ${quotePosixShell(request.method)}`,
    `--url ${quotePosixShell(request.url)}`,
    ...headers.map((header) => {
      const value = header.value === '' ? `${header.name};` : `${header.name}: ${header.value}`;
      return `--header ${quotePosixShell(value)}`;
    }),
    ...(request.body !== undefined ? [`--data-raw ${quotePosixShell(request.body)}`] : []),
    ...(request.followRedirects ? ['--location'] : []),
    ...(request.compressed ? ['--compressed'] : []),
  ];

  return argumentsList
    .map((argument, index) => {
      const line = `${index === 0 ? 'curl ' : '  '}${argument}`;
      return index < argumentsList.length - 1 ? `${line} \\` : line;
    })
    .join('\n');
}

export function generateFetch(input: CurlRequestInput, options: RequestOutputOptions = {}): string {
  const request = normalizeRequest(input);
  if (request.body !== undefined && (request.method === 'GET' || request.method === 'HEAD')) {
    throw new CurlRequestError('Fetch does not allow a request body with GET or HEAD.');
  }

  const headers = outputHeaders(request.headers, options);
  const properties = [`method: ${javascriptString(request.method)}`];

  if (headers.length > 0) {
    const headerLines = headers.map(
      (header) => `      [${javascriptString(header.name)}, ${javascriptString(header.value)}]`,
    );
    properties.push(`headers: new Headers([\n${headerLines.join(',\n')}\n    ])`);
  }
  if (request.body !== undefined) {
    properties.push(`body: ${javascriptString(request.body)}`);
  }
  properties.push(`redirect: ${javascriptString(request.followRedirects ? 'follow' : 'manual')}`);

  const formattedProperties = properties
    .map((property) =>
      property.includes('\n') ? `  ${property.replace(/\n/g, '\n  ')},` : `  ${property},`,
    )
    .join('\n');

  const duplicateHeaderNames = [
    ...new Set(
      headers
        .map((header) => header.name.toLowerCase())
        .filter((name, index, names) => names.indexOf(name) !== index),
    ),
  ];
  const duplicateWarning = duplicateHeaderNames.length
    ? `// Fetch Headers may combine repeated fields: ${duplicateHeaderNames.join(', ')}.\n`
    : '';

  return `${duplicateWarning}const response = await fetch(${javascriptString(request.url)}, {\n${formattedProperties}\n});`;
}

/**
 * Tokenizes a deliberately small, non-executing subset of POSIX shell syntax.
 * It supports quotes, escaped characters, and backslash-newline continuations.
 */
export function tokenizeCurlCommand(command: string): string[] {
  assertSafePastedCommand(command);

  const tokens: string[] = [];
  let token = '';
  let tokenStarted = false;
  let quote: 'single' | 'double' | null = null;

  const pushToken = () => {
    if (!tokenStarted) {
      return;
    }
    tokens.push(token);
    if (tokens.length > MAX_TOKEN_COUNT) {
      throw new CurlRequestError(`cURL command exceeds ${MAX_TOKEN_COUNT} arguments.`);
    }
    token = '';
    tokenStarted = false;
  };

  for (let index = 0; index < command.length; index += 1) {
    const character = command[index];

    if (quote === 'single') {
      if (character === "'") {
        quote = null;
      } else {
        token += character;
      }
      continue;
    }

    if (quote === 'double') {
      if (character === '"') {
        quote = null;
        continue;
      }
      if (character === '$' || character === '`') {
        throw new CurlRequestError('Shell variable and command expansion are not supported.');
      }
      if (character === '\\') {
        const next = command[index + 1];
        if (next === undefined) {
          throw new CurlRequestError('cURL command ends with an incomplete escape.');
        }
        if (next === '\n') {
          index += 1;
          continue;
        }
        if (next === '\r' && command[index + 2] === '\n') {
          index += 2;
          continue;
        }
        if (next === '"' || next === '\\' || next === '$' || next === '`') {
          token += next;
        } else {
          token += `\\${next}`;
        }
        tokenStarted = true;
        index += 1;
        continue;
      }
      token += character;
      tokenStarted = true;
      continue;
    }

    if (character === "'") {
      quote = 'single';
      tokenStarted = true;
      continue;
    }
    if (character === '"') {
      quote = 'double';
      tokenStarted = true;
      continue;
    }
    if (character === '$' || character === '`') {
      throw new CurlRequestError('Shell variable and command expansion are not supported.');
    }
    if (character === '\\') {
      const next = command[index + 1];
      if (next === undefined) {
        throw new CurlRequestError('cURL command ends with an incomplete escape.');
      }
      if (next === '\n') {
        index += 1;
        continue;
      }
      if (next === '\r' && command[index + 2] === '\n') {
        index += 2;
        continue;
      }
      token += next;
      tokenStarted = true;
      index += 1;
      continue;
    }
    if (character === '\n' || character === '\r') {
      throw new CurlRequestError('Use a backslash before each line break in a multiline command.');
    }
    if (/\s/.test(character)) {
      pushToken();
      continue;
    }
    if (/[;&|<>()]/.test(character)) {
      throw new CurlRequestError(`Unsupported shell control operator: ${character}.`);
    }

    token += character;
    tokenStarted = true;
  }

  if (quote) {
    throw new CurlRequestError(`cURL command has an unclosed ${quote}-quoted string.`);
  }
  pushToken();
  return tokens;
}

export function parseCurlCommand(command: string): ParsedCurlRequest {
  const tokens = tokenizeCurlCommand(command);
  const executable = tokens[0]?.toLowerCase();
  if (executable !== 'curl' && executable !== 'curl.exe') {
    throw new CurlRequestError('Command must start with curl or curl.exe.');
  }

  let method: string | undefined;
  let url: string | undefined;
  const headers: RequestHeader[] = [];
  const dataParts: string[] = [];
  let followRedirects = false;
  let compressed = false;
  let optionsEnded = false;

  const setUrl = (candidate: string) => {
    if (url !== undefined) {
      throw new CurlRequestError('Only one request URL is supported.');
    }
    url = candidate;
  };

  const addData = (value: string, allowAtLiteral: boolean) => {
    if (!allowAtLiteral && value.startsWith('@')) {
      throw new CurlRequestError('File-backed data arguments are not supported.');
    }
    assertNoNul(value, 'Request data');
    dataParts.push(value);
  };

  for (let index = 1; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (!optionsEnded && token === '--') {
      optionsEnded = true;
      continue;
    }

    const requestValue = longOptionValue(token, '--request');
    if (!optionsEnded && (token === '--request' || token === '-X')) {
      method = takeFollowingValue(tokens, index, token);
      index += 1;
      continue;
    }
    if (!optionsEnded && requestValue !== undefined) {
      method = requestValue;
      continue;
    }
    if (!optionsEnded && token.startsWith('-X') && token.length > 2) {
      method = token.slice(2);
      continue;
    }

    const headerValue = longOptionValue(token, '--header');
    if (!optionsEnded && (token === '--header' || token === '-H')) {
      headers.push(parseHeaderArgument(takeFollowingValue(tokens, index, token)));
      index += 1;
      continue;
    }
    if (!optionsEnded && headerValue !== undefined) {
      headers.push(parseHeaderArgument(headerValue));
      continue;
    }
    if (!optionsEnded && token.startsWith('-H') && token.length > 2) {
      headers.push(parseHeaderArgument(token.slice(2)));
      continue;
    }

    const dataOption = ['--data', '--data-raw', '--data-binary'].find(
      (option) => token === option || token.startsWith(`${option}=`),
    );
    if (!optionsEnded && dataOption) {
      const inlineValue = longOptionValue(token, dataOption);
      const value =
        inlineValue === undefined ? takeFollowingValue(tokens, index, dataOption) : inlineValue;
      addData(value, dataOption === '--data-raw');
      if (inlineValue === undefined) {
        index += 1;
      }
      continue;
    }
    if (!optionsEnded && token === '-d') {
      addData(takeFollowingValue(tokens, index, token), false);
      index += 1;
      continue;
    }
    if (!optionsEnded && token.startsWith('-d') && token.length > 2) {
      addData(token.slice(2), false);
      continue;
    }

    const urlValue = longOptionValue(token, '--url');
    if (!optionsEnded && token === '--url') {
      setUrl(takeFollowingValue(tokens, index, token));
      index += 1;
      continue;
    }
    if (!optionsEnded && urlValue !== undefined) {
      setUrl(urlValue);
      continue;
    }
    if (!optionsEnded && (token === '--location' || token === '-L')) {
      followRedirects = true;
      continue;
    }
    if (!optionsEnded && token === '--compressed') {
      compressed = true;
      continue;
    }
    if (!optionsEnded && token.startsWith('-')) {
      throw new CurlRequestError(`Unsupported cURL option: ${token}.`);
    }

    setUrl(token);
  }

  if (url === undefined) {
    throw new CurlRequestError('cURL command does not contain a request URL.');
  }

  const body = dataParts.length > 0 ? dataParts.join('&') : undefined;
  return normalizeRequest({
    method,
    url,
    headers,
    ...(body !== undefined ? { body } : {}),
    followRedirects,
    compressed,
  });
}

export function convertCurlToFetch(command: string, options: RequestOutputOptions = {}): string {
  return generateFetch(parseCurlCommand(command), options);
}
