export function convertOpenapiToPostman(openapiSpec: string): string {
  const parsed = JSON.parse(openapiSpec);
  const items: any[] = [];

  const paths = parsed.paths || {};
  for (const [pathKey, methods] of Object.entries(paths)) {
    for (const [method, def] of Object.entries(methods as Record<string, any>)) {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
        items.push({
          name: def.summary || (method.toUpperCase() + ' ' + pathKey),
          request: {
            method: method.toUpperCase(),
            url: { raw: 'https://api.example.com' + pathKey, path: pathKey.split('/').filter(Boolean) }
          }
        });
      }
    }
  }

  return JSON.stringify({
    info: { name: parsed.info?.title || 'OpenAPI Collection', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
    item: items
  }, null, 2);
}
