export function generateSriScriptTag(scriptUrl: string, hashBase64: string, algo: 'sha256' | 'sha384' | 'sha512' = 'sha384'): string {
  const integrity = `${algo}-${hashBase64.trim()}`;
  return `<script src="${scriptUrl}" integrity="${integrity}" crossorigin="anonymous"></script>`;
}