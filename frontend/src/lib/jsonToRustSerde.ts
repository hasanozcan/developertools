export function jsonToRustSerde(jsonString: string, rootStructName = 'Root'): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: unknown) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }

  const structs: Record<string, Record<string, string>> = {};

  function toPascalCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase());
  }

  function inferRustType(val: unknown, keyName: string): string {
    if (val === null) return 'Option<serde_json::Value>';
    if (typeof val === 'boolean') return 'bool';
    if (typeof val === 'number') return Number.isInteger(val) ? 'i64' : 'f64';
    if (typeof val === 'string') return 'String';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'Vec<serde_json::Value>';
      const itemType = inferRustType(val[0], keyName + 'Item');
      return `Vec<${itemType}>`;
    }

    if (typeof val === 'object') {
      const nestedStructName = toPascalCase(keyName);
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = inferRustType(v, k);
      }
      structs[nestedStructName] = props;
      return nestedStructName;
    }

    return 'serde_json::Value';
  }

  inferRustType(parsed, rootStructName);

  const lines: string[] = [
    'use serde::{Deserialize, Serialize};',
    '',
  ];

  for (const [structName, props] of Object.entries(structs)) {
    lines.push('#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]');
    lines.push('#[serde(rename_all = "camelCase")]');
    lines.push(`pub struct ${structName} {`);
    for (const [k, v] of Object.entries(props)) {
      lines.push(`    pub ${k}: ${v},`);
    }
    lines.push('}\n');
  }

  return lines.join('\n').trim();
}
