export function analyzeCacheControl(header: string): { isPublic: boolean; maxAgeSeconds: number; mustRevalidate: boolean; immutable: boolean } {
  const isPublic = /public/i.test(header);
  const maxAgeMatch = header.match(/max-age=(\d+)/i);
  const maxAgeSeconds = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
  const mustRevalidate = /must-revalidate|no-cache/i.test(header);
  const immutable = /immutable/i.test(header);
  return { isPublic, maxAgeSeconds, mustRevalidate, immutable };
}
