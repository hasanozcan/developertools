export function jsonToSwift(jsonString: string, rootStructName = 'Root'): string {
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

  function inferSwiftType(val: unknown, keyName: string): string {
    if (val === null) return 'AnyCodable?';
    if (typeof val === 'boolean') return 'Bool';
    if (typeof val === 'number') return Number.isInteger(val) ? 'Int' : 'Double';
    if (typeof val === 'string') return 'String';

    if (Array.isArray(val)) {
      if (val.length === 0) return '[AnyCodable]';
      const itemType = inferSwiftType(val[0], keyName + 'Item');
      return `[${itemType}]`;
    }

    if (typeof val === 'object') {
      const nestedStructName = toPascalCase(keyName);
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = inferSwiftType(v, k);
      }
      structs[nestedStructName] = props;
      return nestedStructName;
    }

    return 'AnyCodable';
  }

  inferSwiftType(parsed, rootStructName);

  const lines: string[] = ['import Foundation', ''];

  for (const [structName, props] of Object.entries(structs)) {
    lines.push(`struct ${structName}: Codable, Identifiable {`);
    for (const [k, v] of Object.entries(props)) {
      lines.push(`    let ${k}: ${v}`);
    }
    lines.push('}\n');
  }

  return lines.join('\n').trim();
}
