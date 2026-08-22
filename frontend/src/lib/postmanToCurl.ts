export function convertPostmanToCurl(postmanJson: string): string[] {
  try {
    const data = JSON.parse(postmanJson);
    const items = data.item || [];
    const commands: string[] = [];

    for (const item of items) {
      const request = item.request || {};
      const method = request.method || 'GET';
      const url = typeof request.url === 'string' ? request.url : request.url?.raw || 'https://api.example.com';
      let cmd = `curl -X ${method} "${url}"`;

      if (request.header && Array.isArray(request.header)) {
        for (const h of request.header) {
          if (!h.disabled && h.key) {
            cmd += ` -H "${h.key}: ${h.value}"`;
          }
        }
      }

      if (request.body?.raw) {
        cmd += ` -d '${request.body.raw.replace(/'/g, "\\'")}'`;
      }

      commands.push(cmd);
    }

    return commands.length ? commands : ['# No requests found in Postman collection'];
  } catch (e: any) {
    return ['# Error parsing Postman collection: ' + e.message];
  }
}