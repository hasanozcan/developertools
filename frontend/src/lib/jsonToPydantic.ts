export function jsonToPydantic(jsonString: string, rootClassName = 'RootModel'): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: unknown) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }

  const models: Record<string, Record<string, string>> = {};

  function toPascalCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase());
  }

  function inferPythonType(val: unknown, keyName: string): string {
    if (val === null) return 'Optional[Any] = None';
    if (typeof val === 'boolean') return 'bool';
    if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
    if (typeof val === 'string') return 'str';

    if (Array.isArray(val)) {
      if (val.length === 0) return 'List[Any]';
      const itemType = inferPythonType(val[0], keyName + 'Item');
      return `List[${itemType}]`;
    }

    if (typeof val === 'object') {
      const nestedClassName = toPascalCase(keyName);
      const props: Record<string, string> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        props[k] = inferPythonType(v, k);
      }
      models[nestedClassName] = props;
      return nestedClassName;
    }

    return 'Any';
  }

  inferPythonType(parsed, rootClassName);

  const lines: string[] = [
    'from typing import List, Optional, Any',
    'from pydantic import BaseModel, Field',
    '',
  ];

  for (const [className, props] of Object.entries(models)) {
    lines.push(`class ${className}(BaseModel):`);
    const entries = Object.entries(props);
    if (entries.length === 0) {
      lines.push('    pass\n');
    } else {
      for (const [k, v] of entries) {
        lines.push(`    ${k}: ${v}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n').trim();
}
