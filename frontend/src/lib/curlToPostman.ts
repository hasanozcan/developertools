export function curlToPostmanCollection(curlCommand: string, collectionName = 'Imported cURL'): string {
  const urlMatch = curlCommand.match(/https?:\/\/[^\s"']+/);
  const methodMatch = curlCommand.match(/-X\s+([A-Z]+)/i);
  const headerMatches = Array.from(curlCommand.matchAll(/-H\s+["']([^"']+)["']/g));
  const dataMatch = curlCommand.match(/--(?:data|data-raw|data-binary)\s+["']([^"']+)["']/);

  const url = urlMatch ? urlMatch[0] : 'https://api.example.com/v1/resource';
  const method = methodMatch ? methodMatch[1].toUpperCase() : dataMatch ? 'POST' : 'GET';

  const headers = headerMatches.map((m) => {
    const parts = m[1].split(':');
    return {
      key: parts[0]?.trim() || '',
      value: parts.slice(1).join(':')?.trim() || '',
    };
  });

  const collection = {
    info: {
      name: collectionName,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: [
      {
        name: 'API Request',
        request: {
          method,
          header: headers,
          body: dataMatch
            ? {
                mode: 'raw',
                raw: dataMatch[1],
              }
            : undefined,
          url: {
            raw: url,
          },
        },
      },
    ],
  };

  return JSON.stringify(collection, null, 2);
}
