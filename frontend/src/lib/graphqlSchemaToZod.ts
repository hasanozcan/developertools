export function convertGraphqlToZod(sdl: string): string {
  const lines = sdl.split(/\r?\n/);
  const results: string[] = ['import { z } from "zod";', ''];

  let currentType: string | null = null;
  let isEnum = false;
  let currentFields: { name: string; type: string; isArray: boolean; isRequired: boolean }[] = [];
  let enumValues: string[] = [];

  const flushType = () => {
    if (currentType) {
      if (isEnum) {
        results.push('export const ' + currentType + 'Schema = z.enum([');
        enumValues.forEach((v) => results.push('  "' + v + '",'));
        results.push(']);');
        results.push('export type ' + currentType + ' = z.infer<typeof ' + currentType + 'Schema>;', '');
      } else {
        results.push('export const ' + currentType + 'Schema = z.object({');
        for (const field of currentFields) {
          let zodType = mapScalarToZod(field.type);
          if (field.isArray) {
            zodType = 'z.array(' + zodType + ')';
          }
          if (!field.isRequired) {
            zodType = zodType + '.nullable().optional()';
          }
          results.push('  ' + field.name + ': ' + zodType + ',');
        }
        results.push('});');
        results.push('export type ' + currentType + ' = z.infer<typeof ' + currentType + 'Schema>;', '');
      }
    }
    currentType = null;
    isEnum = false;
    currentFields = [];
    enumValues = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const typeMatch = trimmed.match(/^(?:type|input)\s+([A-Za-z0-9_]+)/);
    const enumMatch = trimmed.match(/^enum\s+([A-Za-z0-9_]+)/);

    if (typeMatch) {
      flushType();
      currentType = typeMatch[1];
      isEnum = false;
      continue;
    }

    if (enumMatch) {
      flushType();
      currentType = enumMatch[1];
      isEnum = true;
      continue;
    }

    if (trimmed === '}') {
      flushType();
      continue;
    }

    if (currentType) {
      if (isEnum) {
        const val = trimmed.replace(/[,;]/g, '').trim();
        if (val) enumValues.push(val);
      } else {
        const fieldMatch = trimmed.match(/^([A-Za-z0-9_]+)\s*:\s*(\[?[A-Za-z0-9_!]+\]?!?)/);
        if (fieldMatch) {
          const fieldName = fieldMatch[1];
          const rawType = fieldMatch[2];
          const isRequired = rawType.endsWith('!');
          const cleanType = isRequired ? rawType.slice(0, -1) : rawType;
          const isArray = cleanType.startsWith('[') && cleanType.endsWith(']');
          const innerType = isArray ? cleanType.slice(1, -1).replace('!', '') : cleanType;

          currentFields.push({
            name: fieldName,
            type: innerType,
            isArray,
            isRequired,
          });
        }
      }
    }
  }

  flushType();
  return results.join('\n');
}

function mapScalarToZod(scalar: string): string {
  switch (scalar) {
    case 'String':
    case 'ID':
      return 'z.string()';
    case 'Int':
      return 'z.number().int()';
    case 'Float':
      return 'z.number()';
    case 'Boolean':
      return 'z.boolean()';
    default:
      return 'z.lazy(() => ' + scalar + 'Schema)';
  }
}
