export function convertZodToTsType(zodCode: string): string {
  const schemaRegex = /export\s+const\s+([a-zA-Z0-9_]+)Schema\s*=\s*z\.object/g;
  let match: RegExpExecArray | null;
  const inferred: string[] = [];

  while ((match = schemaRegex.exec(zodCode)) !== null) {
    const baseName = match[1];
    inferred.push('export type ' + baseName + ' = z.infer<typeof ' + baseName + 'Schema>;');
  }

  if (inferred.length === 0) return '// No Zod schemas found. Wrap schemas with export const MySchema = z.object({...})';
  return 'import { z } from "zod";\n\n' + zodCode + '\n\n// Inferred Types:\n' + inferred.join('\n');
}
