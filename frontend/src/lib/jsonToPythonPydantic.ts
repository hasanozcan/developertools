export function convertJsonToPydantic(jsonString: string, rootModelName = 'RootModel'): string {
  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: any) {
    throw new Error('Invalid JSON input: ' + err.message);
  }

  const generatedClasses: string[] = [];
  const generatedNames = new Set<string>();

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function inferType(val: any, fieldName: string): string {
    if (val === null || val === undefined) return 'Optional[Any] = None';
    if (typeof val === 'string') return 'str';
    if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
    if (typeof val === 'boolean') return 'bool';
    if (Array.isArray(val)) {
      if (val.length === 0) return 'List[Any] = Field(default_factory=list)';
      const innerType = inferType(val[0], fieldName + 'Item');
      return 'List[' + innerType + ']';
    }
    if (typeof val === 'object') {
      const subClassName = capitalize(fieldName);
      generateModel(val, subClassName);
      return subClassName;
    }
    return 'Any';
  }

  function generateModel(obj: Record<string, any>, className: string): void {
    if (generatedNames.has(className)) return;
    generatedNames.add(className);

    const fields: string[] = [];
    for (const [key, val] of Object.entries(obj)) {
      const fieldType = inferType(val, key);
      const safeKey = /^[0-9]/.test(key) || ['class', 'def', 'import', 'from', 'global', 'return'].includes(key)
        ? key + '_field'
        : key;

      fields.push('    ' + safeKey + ': ' + fieldType);
    }

    const classDef = 'class ' + className + '(BaseModel):\n' + (fields.length > 0 ? fields.join('\n') : '    pass');
    generatedClasses.unshift(classDef);
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object') {
      generateModel(parsed[0], rootModelName);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateModel(parsed, rootModelName);
  }

  return 'from typing import List, Optional, Any\nfrom pydantic import BaseModel, Field\n\n\n' + generatedClasses.join('\n\n\n') + '\n';
}
