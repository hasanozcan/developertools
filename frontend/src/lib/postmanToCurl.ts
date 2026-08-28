export function convertPostmanToCurl(jsonContent: string): string {
  try {
    const collection = JSON.parse(jsonContent);
    const requests = extractRequests(collection.item || []);
    if (requests.length === 0) return '# No requests found in collection.';

    return requests.map((req, i) => {
      const parts: string[] = [`# Request ${i + 1}: ${req.name}`];
      parts.push(`curl -X ${req.method || 'GET'} "${req.url}"`);
      if (req.headers && req.headers.length > 0) {
        for (const h of req.headers) {
          if (h.key && !h.disabled) {
            parts.push(`  -H "${h.key}: ${h.value}"`);
          }
        }
      }
      if (req.body) {
        parts.push(`  -d '${req.body.replace(/'/g, "'\\''")}'`);
      }
      return parts.join(' \\\n');
    }).join('\n\n');
  } catch (err: any) {
    return `# Error parsing Postman collection: ${err.message}`;
  }
}

function extractRequests(items: any[]): any[] {
  const list: any[] = [];
  for (const item of items) {
    if (item.request) {
      const r = item.request;
      const url = typeof r.url === 'string' ? r.url : r.url?.raw || '';
      const headers = r.header || [];
      let body = '';
      if (r.body?.mode === 'raw' && r.body.raw) {
        body = r.body.raw;
      }
      list.push({
        name: item.name || 'Untitled Request',
        method: (r.method || 'GET').toUpperCase(),
        url,
        headers,
        body,
      });
    } else if (item.item && Array.isArray(item.item)) {
      list.push(...extractRequests(item.item));
    }
  }
  return list;
}
