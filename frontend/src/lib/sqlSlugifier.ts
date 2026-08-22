export function slugifyToSqlIdentifier(name: string, maxLength: number = 63): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, maxLength);
}