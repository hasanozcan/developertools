export function convertToPunycode(domain: string): string {
  try {
    const u = new URL('https://' + domain.trim());
    return u.hostname;
  } catch {
    return domain.trim().toLowerCase();
  }
}