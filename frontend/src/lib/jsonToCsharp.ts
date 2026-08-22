export function jsonToCsharp(jsonString: string, rootClassName = 'RootObject'): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: unknown) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }

  const classes: Record<string, Record<string, string>> = {};

  function toPascalCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase());
  }

  function inferCsharpType(val: unknown, keyName: string): string {
    if (val === null) return 'object?';
    if (typeof val === 'boolean') return 'bool';
    if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'double';
    if (typeof val === 'string') return 'string';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'List<object>';
      const itemType = inferCsharpType(val[0], keyName + 'Item');
      return `List<${itemType}>`;
    }

    if (typeof val === 'object') {
      const nestedClassName = toPascalCase(keyName);
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = inferCsharpType(v, k);
      }
      classes[nestedClassName] = props;
      return nestedClassName;
    }

    return 'object';
  }

  inferCsharpType(parsed, rootClassName);

  const lines: string[] = [
    'using System.Text.Json.Serialization;',
    'using System.Collections.Generic;',
    '',
  ];

  for (const [className, props] of Object.entries(classes)) {
    lines.push(`public class ${className}`);
    lines.push('{');
    for (const [k, v] of Object.entries(props)) {
      const propertyName = toPascalCase(k);
      lines.push(`    [JsonPropertyName("${k}")]`);
      lines.push(`    public ${v} ${propertyName} { get; set; }`);
      lines.push('');
    }
    lines.push('}\n');
  }

  return lines.join('\n').trim();
}
