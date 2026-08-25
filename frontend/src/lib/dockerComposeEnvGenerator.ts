export function generateDotenvFromCompose(composeYml: string): string {
  const vars = new Set<string>();
  const matches = composeYml.matchAll(/\$\{?([A-Z0-9_]+)(?::-[^}]*)?\}?/g);
  for (const m of matches) {
    vars.add(m[1]);
  }
  return Array.from(vars).map(v => `${v}=`).join('\n');
}
