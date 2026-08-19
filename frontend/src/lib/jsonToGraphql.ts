export function jsonToGraphqlSchema(jsonStr: string, rootTypeName: string = 'RootType'): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Invalid JSON string');
  }

  const typeDefs: Map<string, string[]> = new Map();

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const inferType = (val: unknown, keyName: string): string => {
    if (val === null || val === undefined) return 'String';
    if (typeof val === 'string') return 'String';
    if (typeof val === 'boolean') return 'Boolean';
    if (typeof val === 'number') return Number.isInteger(val) ? 'Int' : 'Float';

    if (Array.isArray(val)) {
      if (val.length === 0) return '[String]';
      const itemType = inferType(val[0], keyName.replace(/s$/, ''));
      return `[${itemType}]`;
    }

    if (typeof val === 'object') {
      const typeName = capitalize(keyName);
      buildType(val as Record<string, unknown>, typeName);
      return typeName;
    }

    return 'String';
  };

  const buildType = (obj: Record<string, unknown>, typeName: string) => {
    if (typeDefs.has(typeName)) return;

    const fields: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const gType = inferType(v, k);
      fields.push(`  ${k}: ${gType}`);
    }
    typeDefs.set(typeName, fields);
  };

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      buildType(parsed[0] as Record<string, unknown>, rootTypeName);
    } else {
      typeDefs.set(rootTypeName, ['  data: [String]']);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    buildType(parsed as Record<string, unknown>, rootTypeName);
  } else {
    typeDefs.set(rootTypeName, ['  value: String']);
  }

  const output: string[] = [];
  for (const [tName, fields] of typeDefs.entries()) {
    output.push(`type ${tName} {\n${fields.join('\n')}\n}`);
  }

  return output.join('\n\n');
}
