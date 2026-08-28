export interface HarHeader {
  name: string;
  value: string;
}

export interface HarQueryParam {
  name: string;
  value: string;
}

export interface HarPostData {
  mimeType: string;
  text: string;
}

export interface HarRequest {
  method: string;
  url: string;
  httpVersion: string;
  headers: HarHeader[];
  queryString: HarQueryParam[];
  postData?: HarPostData;
  headersSize: number;
  bodySize: number;
}

export interface HarEntry {
  startedDateTime: string;
  time: number;
  request: HarRequest;
  response: {
    status: number;
    statusText: string;
    httpVersion: string;
    headers: HarHeader[];
    cookies: unknown[];
    content: {
      size: number;
      mimeType: string;
      text: string;
    };
    redirectURL: string;
    headersSize: number;
    bodySize: number;
  };
  cache: Record<string, unknown>;
  timings: {
    send: number;
    wait: number;
    receive: number;
  };
}

export interface HarRoot {
  log: {
    version: string;
    creator: {
      name: string;
      version: string;
    };
    entries: HarEntry[];
  };
}

export function convertCurlToHar(curlCommand: string): HarRoot {
  const trimmed = curlCommand.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid cURL command');
  }

  const sanitized = trimmed.replace(/\\\r?\n\s*/g, ' ').replace(/\s+/g, ' ');

  let url = '';
  const tokens = sanitized.split(' ');
  for (const t of tokens) {
    const clean = t.replace(/^['"]|['"]$/g, '');
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      url = clean;
      break;
    }
  }

  if (!url) {
    url = 'https://api.example.com/v1/resource';
  }

  let method = 'GET';
  const methodMatch = sanitized.match(/(?:-X|--request)\s+([A-Z]+)/i);
  if (methodMatch) {
    method = methodMatch[1].toUpperCase();
  } else if (
    sanitized.includes('-d ') ||
    sanitized.includes('--data ') ||
    sanitized.includes('--data-raw ') ||
    sanitized.includes('--data-binary ') ||
    sanitized.includes('--json ')
  ) {
    method = 'POST';
  }

  const headers: HarHeader[] = [];
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/gi;
  let hMatch: RegExpExecArray | null;
  while ((hMatch = headerRegex.exec(sanitized)) !== null) {
    const headerStr = hMatch[1];
    const colonIdx = headerStr.indexOf(':');
    if (colonIdx > 0) {
      headers.push({
        name: headerStr.substring(0, colonIdx).trim(),
        value: headerStr.substring(colonIdx + 1).trim(),
      });
    }
  }

  let postData: HarPostData | undefined;
  const dataMatch = sanitized.match(
    /(?:-d|--data|--data-raw|--data-binary|--json)\s+['"]([\s\S]*?)['"](?=\s+-[a-zA-Z]|\s*$)/
  );
  if (dataMatch) {
    const rawBody = dataMatch[1];
    let mimeType = 'application/json';
    const ct = headers.find((h) => h.name.toLowerCase() === 'content-type');
    if (ct) {
      mimeType = ct.value;
    } else if (!rawBody.startsWith('{') && !rawBody.startsWith('[')) {
      mimeType = 'application/x-www-form-urlencoded';
    }
    postData = {
      mimeType,
      text: rawBody,
    };
  }

  const queryString: HarQueryParam[] = [];
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.forEach((value, name) => {
      queryString.push({ name, value });
    });
  } catch {
    // Ignore invalid url parse
  }

  const now = new Date().toISOString();
  const entry: HarEntry = {
    startedDateTime: now,
    time: 50,
    request: {
      method,
      url,
      httpVersion: 'HTTP/1.1',
      headers,
      queryString,
      postData,
      headersSize: -1,
      bodySize: postData ? postData.text.length : 0,
    },
    response: {
      status: 200,
      statusText: 'OK',
      httpVersion: 'HTTP/1.1',
      headers: [],
      cookies: [],
      content: {
        size: 0,
        mimeType: 'application/json',
        text: '',
      },
      redirectURL: '',
      headersSize: -1,
      bodySize: -1,
    },
    cache: {},
    timings: {
      send: 10,
      wait: 30,
      receive: 10,
    },
  };

  return {
    log: {
      version: '1.2',
      creator: {
        name: 'DevsTools cURL to HAR Converter',
        version: '1.0.0',
      },
      entries: [entry],
    },
  };
}
