export function extractUuidV7Date(uuid: string): Date | null {
  try {
    const clean = uuid.replace(/-/g, '');
    const timestampHex = clean.substring(0, 12);
    const ms = parseInt(timestampHex, 16);
    return new Date(ms);
  } catch {
    return null;
  }
}
