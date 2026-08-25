export function jsonToKotlinClass(jsonStr: string, className: string = 'ResponseData'): string {
  try {
    const obj = JSON.parse(jsonStr);
    const fields: string[] = [];

    for (const [k, v] of Object.entries(obj)) {
      let kType = 'Any';
      if (typeof v === 'string') kType = 'String';
      else if (typeof v === 'number') kType = Number.isInteger(v) ? 'Int' : 'Double';
      else if (typeof v === 'boolean') kType = 'Boolean';
      else if (Array.isArray(v)) kType = 'List<Any>';

      fields.push(`    val ${k}: ${kType}`);
    }

    return `import kotlinx.serialization.Serializable\n\n@Serializable\ndata class ${className}(\n${fields.join(',\n')}\n)`;
  } catch {
    return '// Error: Invalid JSON';
  }
}
