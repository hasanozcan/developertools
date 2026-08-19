export function minifyJson(jsonStr: string): string {
  const parsed = JSON.parse(jsonStr);
  return JSON.stringify(parsed);
}
