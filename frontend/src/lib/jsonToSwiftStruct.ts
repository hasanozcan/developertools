export function jsonToSwiftStruct(jsonStr: string, structName: string = 'Model'): string {
  try {
    const obj = JSON.parse(jsonStr);
    const fields: string[] = [];

    for (const [k, v] of Object.entries(obj)) {
      let sType = 'Any';
      if (typeof v === 'string') sType = 'String';
      else if (typeof v === 'number') sType = Number.isInteger(v) ? 'Int' : 'Double';
      else if (typeof v === 'boolean') sType = 'Bool';
      else if (Array.isArray(v)) sType = '[Any]';

      fields.push(`    let ${k}: ${sType}`);
    }

    return `import Foundation\n\nstruct ${structName}: Codable {\n${fields.join('\n')}\n}`;
  } catch {
    return '// Error: Invalid JSON';
  }
}
