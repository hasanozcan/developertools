export function generateTypeGuards(jsonStr: string, typeName = 'User'): string {
  const parsed = JSON.parse(jsonStr);
  const checks: string[] = [
    "typeof obj === 'object' && obj !== null"
  ];

  for (const [key, val] of Object.entries(parsed)) {
    const type = typeof val;
    if (val === null) {
      checks.push("'" + key + "' in obj");
    } else if (Array.isArray(val)) {
      checks.push("Array.isArray((obj as any)." + key + ")");
    } else {
      checks.push("typeof (obj as any)." + key + " === '" + type + "'");
    }
  }

  return 'export function is' + typeName + '(obj: unknown): obj is ' + typeName + ' {\n  return (\n    ' + checks.join(' &&\n    ') + '\n  );\n}\n';
}
