export function formatPackageJson(jsonText: string): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err: unknown) {
    throw new Error('Invalid package.json: ' + (err instanceof Error ? err.message : String(err)));
  }

  // Sort scripts, dependencies, devDependencies alphabetically
  if (parsed.dependencies) {
    parsed.dependencies = Object.keys(parsed.dependencies)
      .sort()
      .reduce((obj: any, key) => {
        obj[key] = parsed.dependencies[key];
        return obj;
      }, {});
  }

  if (parsed.devDependencies) {
    parsed.devDependencies = Object.keys(parsed.devDependencies)
      .sort()
      .reduce((obj: any, key) => {
        obj[key] = parsed.devDependencies[key];
        return obj;
      }, {});
  }

  return JSON.stringify(parsed, null, 2);
}
