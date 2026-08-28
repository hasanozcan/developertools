export interface PostmanHeader {
  key: string;
  value: string;
  type: string;
}

export interface PostmanRequest {
  method: string;
  header: PostmanHeader[];
  body?: {
    mode: string;
    raw: string;
    options?: {
      raw: {
        language: string;
      };
    };
  };
  url: {
    raw: string;
    protocol?: string;
    host?: string[];
    path?: string[];
    query?: { key: string; value: string }[];
  };
}

export interface PostmanItem {
  name: string;
  request: PostmanRequest;
  response: unknown[];
}

export interface PostmanCollection {
  info: {
    _postman_id: string;
    name: string;
    schema: string;
  };
  item: PostmanItem[];
}

export function convertCurlToPostman(curlCommand: string, collectionName = 'Imported cURL Collection'): PostmanCollection {
  const trimmed = curlCommand.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid cURL command');
  }

  const commands = trimmed.split(/(?:^|\n)\s*curl\s+/i).filter((c) => c.trim().length > 0);
  const items: PostmanItem[] = [];

  for (let i = 0; i < commands.length; i++) {
    const rawCmd = commands[i].replace(/\\\r?\n\s*/g, ' ').replace(/\s+/g, ' ');

    let urlStr = '';
    const tokens = rawCmd.split(' ');
    for (const t of tokens) {
      const clean = t.replace(/^['"]|['"]$/g, '');
      if (clean.startsWith('http://') || clean.startsWith('https://')) {
        urlStr = clean;
        break;
      }
    }

    if (!urlStr) {
      urlStr = 'https://api.example.com/endpoint';
    }

    let method = 'GET';
    const methodMatch = rawCmd.match(/(?:-X|--request)\s+([A-Z]+)/i);
    if (methodMatch) {
      method = methodMatch[1].toUpperCase();
    } else if (
      rawCmd.includes('-d ') ||
      rawCmd.includes('--data ') ||
      rawCmd.includes('--data-raw ') ||
      rawCmd.includes('--json ')
    ) {
      method = 'POST';
    }

    const headers: PostmanHeader[] = [];
    const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/gi;
    let hMatch: RegExpExecArray | null;
    while ((hMatch = headerRegex.exec(rawCmd)) !== null) {
      const headerStr = hMatch[1];
      const colonIdx = headerStr.indexOf(':');
      if (colonIdx > 0) {
        headers.push({
          key: headerStr.substring(0, colonIdx).trim(),
          value: headerStr.substring(colonIdx + 1).trim(),
          type: 'text',
        });
      }
    }

    let bodyData: PostmanRequest['body'];
    const dataMatch = rawCmd.match(/(?:-d|--data|--data-raw|--json)\s+['"]([\s\S]*?)['"](?=\s+-[a-zA-Z]|\s*$)/);
    if (dataMatch) {
      bodyData = {
        mode: 'raw',
        raw: dataMatch[1],
        options: {
          raw: {
            language: 'json',
          },
        },
      };
    }

    let parsedUrl: URL | null = null;
    try {
      parsedUrl = new URL(urlStr);
    } catch {
      // ignore
    }

    const queryParams: { key: string; value: string }[] = [];
    if (parsedUrl) {
      parsedUrl.searchParams.forEach((value, key) => {
        queryParams.push({ key, value });
      });
    }

    let itemName = `Request ${i + 1}`;
    if (parsedUrl) {
      const pathname = parsedUrl.pathname.replace(/^\//, '');
      itemName = `${method} ${pathname || parsedUrl.hostname}`;
    }

    items.push({
      name: itemName,
      request: {
        method,
        header: headers,
        body: bodyData,
        url: {
          raw: urlStr,
          protocol: parsedUrl ? parsedUrl.protocol.replace(':', '') : 'https',
          host: parsedUrl ? parsedUrl.hostname.split('.') : ['api', 'example', 'com'],
          path: parsedUrl ? parsedUrl.pathname.split('/').filter(Boolean) : ['endpoint'],
          query: queryParams.length > 0 ? queryParams : undefined,
        },
      },
      response: [],
    });
  }

  return {
    info: {
      _postman_id: 'postman-curl-' + Date.now(),
      name: collectionName,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: items,
  };
}
