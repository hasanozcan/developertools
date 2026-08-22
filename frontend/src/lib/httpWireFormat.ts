export function formatRawHttpWire(
  method: string,
  urlPath: string,
  host: string,
  headers: Record<string, string>,
  body = '',
): string {
  const lines = [`${method.toUpperCase()} ${urlPath || '/'} HTTP/1.1`, `Host: ${host || 'api.example.com'}`];

  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() !== 'host') {
      lines.push(`${k}: ${v}`);
    }
  }

  if (body && !headers['Content-Length'] && !headers['content-length']) {
    lines.push(`Content-Length: ${new TextEncoder().encode(body).length}`);
  }

  lines.push('');
  if (body) {
    lines.push(body);
  }

  return lines.join('\r\n');
}
