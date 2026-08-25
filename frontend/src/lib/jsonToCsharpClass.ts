export function jsonToCsharpClass(jsonStr: string, className: string = 'RootModel'): string {
  try {
    const obj = JSON.parse(jsonStr);
    const lines = [
      'using System.Text.Json.Serialization;',
      '',
      `public record ${className}(`
    ];

    const props: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      let csType = 'object';
      if (typeof v === 'string') csType = 'string';
      else if (typeof v === 'number') csType = Number.isInteger(v) ? 'int' : 'double';
      else if (typeof v === 'boolean') csType = 'bool';

      const propName = k.charAt(0).toUpperCase() + k.slice(1);
      props.push(`    [property: JsonPropertyName("${k}")] ${csType} ${propName}`);
    }

    lines.push(props.join(',\n'));
    lines.push(');');
    return lines.join('\n');
  } catch {
    return '// Error: Invalid JSON';
  }
}
