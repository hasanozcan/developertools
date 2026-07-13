import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildRequestUrl,
  convertCurlToFetch,
  generateCurl,
  generateFetch,
  isSensitiveHeader,
  parseCurlCommand,
  quotePosixShell,
  redactRequestHeaders,
  tokenizeCurlCommand,
  type CurlRequestInput,
} from './curlRequest';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('POSIX shell argument quoting', () => {
  it.each([
    ['', "''"],
    ['plain text', "'plain text'"],
    ["Ada's request", "'Ada'\"'\"'s request'"],
    ['$(echo never-run)', "'$(echo never-run)'"],
  ])('quotes %j as one non-interpolating argument', (input, expected) => {
    expect(quotePosixShell(input)).toBe(expected);
  });

  it('rejects NUL bytes that cannot be represented in a shell argument', () => {
    expect(() => quotePosixShell('before\0after')).toThrow(/NUL byte/);
  });
});

describe('request URL building', () => {
  it('appends encoded query entries without dropping existing query or fragment data', () => {
    expect(
      buildRequestUrl('https://example.com/search?existing=1#results', [
        { name: 'q', value: 'curl builder' },
        { name: 'tag', value: 'api&http' },
      ]),
    ).toBe('https://example.com/search?existing=1&q=curl+builder&tag=api%26http#results');
  });

  it.each(['', 'relative/path', 'ftp://example.com/file', 'https://example.com\r\nInjected'])(
    'rejects unsupported URL %j',
    (url) => {
      expect(() => buildRequestUrl(url)).toThrow();
    },
  );

  it('rejects NUL bytes in query entries', () => {
    expect(() => buildRequestUrl('https://example.com', [{ name: 'q', value: 'a\0b' }])).toThrow(
      /NUL byte/,
    );
  });
});

describe('header protection and output generation', () => {
  const request: CurlRequestInput = {
    method: 'post',
    url: 'https://api.example.com/v1/items',
    query: [{ name: 'include', value: 'owner details' }],
    headers: [
      { name: 'Content-Type', value: 'application/json' },
      { name: 'Authorization', value: 'Bearer super-secret' },
      { name: 'cookie', value: 'session=secret' },
      { name: 'X-API-Key', value: 'key-secret' },
    ],
    body: '{"name":"Ada\'s item"}',
    followRedirects: true,
    compressed: true,
  };

  it('recognizes common credential-bearing headers case-insensitively', () => {
    expect(isSensitiveHeader(' authorization ')).toBe(true);
    expect(isSensitiveHeader('COOKIE')).toBe(true);
    expect(isSensitiveHeader('X-API-Key')).toBe(true);
    expect(isSensitiveHeader('X-Amz-Security-Token')).toBe(true);
    expect(isSensitiveHeader('Private-Token')).toBe(true);
    expect(isSensitiveHeader('Client-Secret')).toBe(true);
    expect(isSensitiveHeader('X-Request-ID')).toBe(false);
  });

  it('redacts credentials by default without mutating the request', () => {
    const curl = generateCurl(request);

    expect(curl).toContain("--request 'POST'");
    expect(curl).toContain("--url 'https://api.example.com/v1/items?include=owner+details'");
    expect(curl).toContain("--header 'Content-Type: application/json'");
    expect(curl).toContain("--header 'Authorization: [REDACTED]'");
    expect(curl).toContain("--header 'cookie: [REDACTED]'");
    expect(curl).toContain("--header 'X-API-Key: [REDACTED]'");
    expect(curl).not.toContain('super-secret');
    expect(curl).toContain('--data-raw \'{"name":"Ada\'"\'"\'s item"}\'');
    expect(curl).toContain('--location');
    expect(curl).toContain('--compressed');
    expect(request.headers?.[1].value).toBe('Bearer super-secret');
  });

  it('can deliberately preserve sensitive values or use a custom redaction marker', () => {
    expect(generateFetch(request, { redactSensitiveHeaders: false })).toContain(
      'Bearer super-secret',
    );
    expect(redactRequestHeaders(request.headers ?? [], '<hidden>')).toContainEqual({
      name: 'Authorization',
      value: '<hidden>',
    });
  });

  it.each([
    [[{ name: 'X-Test\r\nInjected', value: 'yes' }]],
    [[{ name: 'X-Test', value: 'yes\r\nInjected: true' }]],
  ])('rejects CRLF header injection', (headers) => {
    expect(() => generateCurl({ url: 'https://example.com', headers })).toThrow(/CR or LF/);
  });

  it('emits valid Fetch source, warns about duplicate-header combining, and models redirects', () => {
    const source = generateFetch({
      method: 'POST',
      url: 'https://example.com/submit',
      headers: [
        { name: 'X-Tag', value: 'one' },
        { name: 'X-Tag', value: 'two' },
      ],
      body: 'line 1\nline 2',
      followRedirects: false,
    });

    expect(source).toContain('headers: new Headers([');
    expect(source).toContain('["X-Tag", "one"]');
    expect(source).toContain('["X-Tag", "two"]');
    expect(source).toContain('Fetch Headers may combine repeated fields: x-tag');
    expect(source).toContain('body: "line 1\\nline 2"');
    expect(source).toContain('redirect: "manual"');
    expect(() => new Function(`return async function generated() { ${source} }`)).not.toThrow();
  });

  it('uses Fetch follow mode when cURL redirect following is enabled', () => {
    expect(generateFetch({ url: 'https://example.com', followRedirects: true })).toContain(
      'redirect: "follow"',
    );
  });

  it.each(['GET', 'HEAD'])('rejects a Fetch body with %s', (method) => {
    expect(() =>
      generateFetch({ method, url: 'https://example.com', body: 'not allowed' }),
    ).toThrow(/does not allow a request body/);
  });

  it('uses curl empty-header syntax for an explicitly empty value', () => {
    expect(
      generateCurl({
        url: 'https://example.com',
        headers: [{ name: 'X-Empty', value: '' }],
      }),
    ).toContain("--header 'X-Empty;'");
  });

  it('rejects cURL header-suppression syntax instead of treating it as an empty header', () => {
    expect(() => parseCurlCommand("curl -H 'Accept:' https://example.com")).toThrow(
      /suppresses a header/,
    );
    expect(parseCurlCommand("curl -H 'X-Empty;' https://example.com").headers).toEqual([
      { name: 'X-Empty', value: '' },
    ]);
  });
});

describe('non-executing cURL tokenization', () => {
  it('handles adjacent quotes, escaped spaces, empty values, and line continuations', () => {
    const command = [
      'curl -XPOST \\',
      "  -H'Content-Type: application/json' \\",
      '  --data-raw "a=hello world" \\',
      '  --header X-Empty:\\ value \\',
      "  --url 'https://example.com/items'",
    ].join('\n');

    expect(tokenizeCurlCommand(command)).toEqual([
      'curl',
      '-XPOST',
      '-HContent-Type: application/json',
      '--data-raw',
      'a=hello world',
      '--header',
      'X-Empty: value',
      '--url',
      'https://example.com/items',
    ]);
  });

  it.each([
    "curl 'https://example.com",
    'curl https://example.com\\',
    'curl "$(whoami)"',
    'curl `whoami`',
    'curl https://example.com/$TOKEN',
    'curl "https://example.com/${TOKEN}"',
    'curl https://example.com\0hidden',
    'curl https://example.com ; echo unsafe',
    'curl https://example.com | tee output',
  ])('rejects unsafe or incomplete shell source %j', (command) => {
    expect(() => tokenizeCurlCommand(command)).toThrow();
  });

  it('keeps expansion syntax literal when protected by single quotes or an escape', () => {
    expect(tokenizeCurlCommand("curl 'https://example.com/$TOKEN?value=$(literal)' ")).toEqual([
      'curl',
      'https://example.com/$TOKEN?value=$(literal)',
    ]);
    expect(tokenizeCurlCommand('curl https://example.com/\\$TOKEN')).toEqual([
      'curl',
      'https://example.com/$TOKEN',
    ]);
  });

  it('requires backslash continuations for a multiline command', () => {
    expect(() => tokenizeCurlCommand('curl\nhttps://example.com')).toThrow(/backslash/);
  });
});

describe('limited cURL parsing and Fetch conversion', () => {
  it('parses the supported short and flag options', () => {
    expect(
      parseCurlCommand(
        "curl -XPOST -H'Content-Type: application/json' -d'{\"ok\":true}' --location --compressed 'https://api.example.com/items?limit=2'",
      ),
    ).toEqual({
      method: 'POST',
      url: 'https://api.example.com/items?limit=2',
      headers: [{ name: 'Content-Type', value: 'application/json' }],
      body: '{"ok":true}',
      followRedirects: true,
      compressed: true,
    });
  });

  it('parses long equals forms, curl.exe, and an empty header', () => {
    expect(
      parseCurlCommand(
        "curl.exe --request=PATCH --header='X-Test: yes' --header='X-Empty;' --url=https://example.com/resource",
      ),
    ).toEqual({
      method: 'PATCH',
      url: 'https://example.com/resource',
      headers: [
        { name: 'X-Test', value: 'yes' },
        { name: 'X-Empty', value: '' },
      ],
      followRedirects: false,
      compressed: false,
    });
  });

  it('infers POST, joins repeated data arguments, and preserves explicit empty data', () => {
    expect(
      parseCurlCommand("curl -d 'a=1' --data-raw='b=two words' https://example.com"),
    ).toMatchObject({
      method: 'POST',
      body: 'a=1&b=two words',
    });
    expect(parseCurlCommand("curl --data '' https://example.com")).toMatchObject({
      method: 'POST',
      body: '',
    });
  });

  it('allows literal @ data only with --data-raw and rejects file-backed input', () => {
    expect(parseCurlCommand("curl --data-raw '@literal' https://example.com").body).toBe(
      '@literal',
    );
    expect(() =>
      parseCurlCommand("curl --data-binary '@payload.json' https://example.com"),
    ).toThrow(/File-backed data/);
    expect(() => parseCurlCommand("curl --header '@headers.txt' https://example.com")).toThrow(
      /File-backed header/,
    );
  });

  it.each([
    'curl --user ada:secret https://example.com',
    'curl --url',
    'curl https://one.example https://two.example',
    'wget https://example.com',
    'curl',
  ])('fails closed for unsupported or incomplete input %j', (command) => {
    expect(() => parseCurlCommand(command)).toThrow();
  });

  it('rejects CRLF injection after tokenization', () => {
    expect(() =>
      parseCurlCommand('curl -H "X-Test: safe\r\nInjected: true" https://example.com'),
    ).toThrow(/CR or LF/);
  });

  it('converts to redacted Fetch source without executing fetch or cURL', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const source = convertCurlToFetch(
      "curl -H 'Authorization: Bearer real-token' --url 'https://example.com/private'",
    );

    expect(source).toContain('["Authorization", "[REDACTED]"]');
    expect(source).not.toContain('real-token');
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
