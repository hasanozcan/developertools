export function lookupMimeType(ext: string): string {
  const cleanExt = ext.replace(/^\./, '').toLowerCase();
  const map: Record<string, string> = {
    'json': 'application/json',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'wasm': 'application/wasm'
  };
  return map[cleanExt] || 'application/octet-stream';
}
