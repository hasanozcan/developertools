export function checkLicenses(deps: Record<string, string>): { allowed: string[]; warnings: string[] } {
  return { allowed: Object.keys(deps), warnings: [] };
}
