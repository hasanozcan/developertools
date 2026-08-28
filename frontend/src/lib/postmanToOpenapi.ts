export function convertPostmanToOpenapi(postmanJson: string, title = 'Exported API'): string {
  const parsed = JSON.parse(postmanJson);
  const paths: Record<string, any> = {};

  const items = parsed.item || [];
  function processItems(itemList: any[]) {
    for (const it of itemList) {
      if (it.item && Array.isArray(it.item)) {
        processItems(it.item);
      } else if (it.request) {
        const req = it.request;
        const method = (req.method || 'GET').toLowerCase();
        let rawUrl = typeof req.url === 'string' ? req.url : req.url?.raw || '/endpoint';
        let pathName = '/';
        try {
          const u = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://api.example.com' + (rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl));
          pathName = u.pathname || '/';
        } catch {
          pathName = rawUrl.replace(/^https?:\/\/[^/]+/, '') || '/';
        }

        if (!paths[pathName]) paths[pathName] = {};
        paths[pathName][method] = {
          summary: it.name || 'API Endpoint',
          operationId: (it.name || 'op').toLowerCase().replace(/[^a-z0-9]/g, '_'),
          responses: {
            '200': {
              description: 'Successful response',
              content: { 'application/json': { schema: { type: 'object' } } }
            }
          }
        };
      }
    }
  }

  processItems(items);

  const openapi = {
    openapi: '3.0.3',
    info: {
      title: parsed.info?.name || title,
      version: '1.0.0',
      description: parsed.info?.description || 'Generated from Postman Collection'
    },
    paths
  };

  return JSON.stringify(openapi, null, 2);
}
