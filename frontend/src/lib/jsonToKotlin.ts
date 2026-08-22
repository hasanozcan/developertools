export function jsonToKotlin(jsonString: string, rootClassName = 'Root'): string {
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

  function inferKotlinType(val: unknown, keyName: string): string {
    if (val === null) return 'Any? = null';
    if (typeof val === 'boolean') return 'Boolean';
    if (typeof val === 'number') return Number.isInteger(val) ? 'Long' : 'Double';
    if (typeof val === 'string') return 'String';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'List<Any>';
      const itemType = inferKotlinType(val[0], keyName + 'Item');
      return `List<${itemType}>`;
    }

    if (typeof val === 'object') {
      const nestedClassName = toPascalCase(keyName);
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = inferKotlinType(v, k);
      }
      classes[nestedClassName] = props;
      return nestedClassName;
    }

    return 'Any';
  }

  inferKotlinType(parsed, rootClassName);

  const lines: string[] = [
    'import kotlinx.serialization.Serializable',
    'import kotlinx.serialization.SerialName',
    '',
  ];

  for (const [className, props] of Object.entries(classes)) {
    lines.push('@Serializable');
    lines.push(`data class ${className}(`);
    const entries = Object.entries(props);
    entries.forEach(([k, v], idx) => {
      const comma = idx < entries.length - 1 ? ',' : '';
      lines.push(`    @SerialName("${k}") val ${k}: ${v}${comma}`);
    });
    lines.push(')\n');
  }

  return lines.join('\n').trim();
}
