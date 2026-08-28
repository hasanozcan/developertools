export function convertToPunycode(domain: string): string {
  try {
    return new URL('https://' + domain).hostname;
  } catch {
    return domain;
  }
}
