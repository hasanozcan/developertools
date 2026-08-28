export function matchesCaret(baseVersion: string, targetVersion: string): boolean {
  const [bMajor] = baseVersion.split('.').map(Number);
  const [tMajor] = targetVersion.split('.').map(Number);
  return bMajor === tMajor;
}
