export function jsonToJavaPojo(jsonString: string, rootClassName = 'Root'): string {
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

  function inferJavaType(val: unknown, keyName: string): string {
    if (val === null) return 'Object';
    if (typeof val === 'boolean') return 'Boolean';
    if (typeof val === 'number') return Number.isInteger(val) ? 'Long' : 'Double';
    if (typeof val === 'string') return 'String';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'List<Object>';
      const itemType = inferJavaType(val[0], keyName + 'Item');
      return `List<${itemType}>`;
    }

    if (typeof val === 'object') {
      const nestedClassName = toPascalCase(keyName);
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = inferJavaType(v, k);
      }
      classes[nestedClassName] = props;
      return nestedClassName;
    }

    return 'Object';
  }

  inferJavaType(parsed, rootClassName);

  const lines: string[] = [
    'import com.fasterxml.jackson.annotation.JsonProperty;',
    'import lombok.Data;',
    'import java.util.List;',
    '',
  ];

  for (const [className, props] of Object.entries(classes)) {
    lines.push('@Data');
    lines.push(`public class ${className} {`);
    for (const [k, v] of Object.entries(props)) {
      lines.push(`    @JsonProperty("${k}")`);
      lines.push(`    private ${v} ${k};`);
      lines.push('');
    }
    lines.push('}\n');
  }

  return lines.join('\n').trim();
}
