export function convertJsonSchemaToZod(jsonSchemaStr: string): string {
  try {
    const parsed = JSON.parse(jsonSchemaStr);
    const props = parsed.properties || {};
    const required = new Set(parsed.required || []);
    
    let code = 'import { z } from "zod";\n\nexport const Schema = z.object({\n';
    for (const [key, value] of Object.entries(props) as [string, any][]) {
      let zodType = 'z.string()';
      if (value.type === 'number' || value.type === 'integer') zodType = 'z.number()';
      else if (value.type === 'boolean') zodType = 'z.boolean()';
      else if (value.type === 'array') zodType = 'z.array(z.any())';

      if (!required.has(key)) {
        zodType += '.optional()';
      }
      code += `  ${key}: ${zodType},\n`;
    }
    code += '});\n';
    return code;
  } catch (e: any) {
    return '// Error: ' + e.message;
  }
}