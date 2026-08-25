export function jsonToPythonDataclass(jsonStr: string, className: string = 'DataModel'): string {
  try {
    const obj = JSON.parse(jsonStr);
    const lines = ['from dataclasses import dataclass', 'from typing import Optional, List, Any', '', '@dataclass', `class ${className}:`];

    for (const [k, v] of Object.entries(obj)) {
      let pyType = 'Any';
      if (typeof v === 'string') pyType = 'str';
      else if (typeof v === 'number') pyType = Number.isInteger(v) ? 'int' : 'float';
      else if (typeof v === 'boolean') pyType = 'bool';
      else if (Array.isArray(v)) pyType = 'List[Any]';
      else if (typeof v === 'object' && v !== null) pyType = 'dict';

      lines.push(`    ${k}: ${pyType}`);
    }

    return lines.join('\n');
  } catch {
    return '# Error: Invalid JSON input';
  }
}
