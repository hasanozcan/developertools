// Multi-Language Model Generator from JSON (Go, Python Pydantic, Rust Serde, C#, Kotlin)

export type TargetLanguage = 'go' | 'python' | 'rust' | 'csharp' | 'kotlin';

export interface ModelGeneratorOptions {
  rootName: string;
  targetLanguage: TargetLanguage;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str: string): string {
  const words = str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words.map((w) => capitalize(w.toLowerCase())).join('');
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase()
    .replace(/_+/g, '_');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// Generate Go Structs
function generateGo(obj: Record<string, unknown>, rootName: string): string {
  const structs = new Map<string, string>();

  function processObject(data: Record<string, unknown>, structName: string): string {
    const fields: string[] = [];

    for (const [key, val] of Object.entries(data)) {
      const fieldName = toPascalCase(key);
      let fieldType = 'interface{}';

      if (val === null || val === undefined) {
        fieldType = '*string';
      } else if (typeof val === 'boolean') {
        fieldType = 'bool';
      } else if (typeof val === 'number') {
        fieldType = Number.isInteger(val) ? 'int64' : 'float64';
      } else if (typeof val === 'string') {
        fieldType = 'string';
      } else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const itemStructName = `${structName}${toPascalCase(key)}Item`;
          processObject(val[0] as Record<string, unknown>, itemStructName);
          fieldType = `[]${itemStructName}`;
        } else if (val.length > 0) {
          const elemType = typeof val[0] === 'string' ? 'string' : typeof val[0] === 'number' ? 'float64' : 'interface{}';
          fieldType = `[]${elemType}`;
        } else {
          fieldType = '[]interface{}';
        }
      } else if (typeof val === 'object') {
        const nestedStructName = `${structName}${toPascalCase(key)}`;
        processObject(val as Record<string, unknown>, nestedStructName);
        fieldType = nestedStructName;
      }

      fields.push(`\t${fieldName} ${fieldType} \`json:"${key},omitempty"\``);
    }

    const code = `type ${structName} struct {\n${fields.join('\n')}\n}`;
    structs.set(structName, code);
    return structName;
  }

  processObject(obj, rootName);
  return Array.from(structs.values()).join('\n\n');
}

// Generate Python Pydantic
function generatePython(obj: Record<string, unknown>, rootName: string): string {
  const models = new Map<string, string>();

  function processObject(data: Record<string, unknown>, modelName: string): string {
    const fields: string[] = [];

    for (const [key, val] of Object.entries(data)) {
      const fieldName = toSnakeCase(key);
      let fieldType = 'Any';

      if (val === null || val === undefined) {
        fieldType = 'Optional[str] = None';
      } else if (typeof val === 'boolean') {
        fieldType = 'bool';
      } else if (typeof val === 'number') {
        fieldType = Number.isInteger(val) ? 'int' : 'float';
      } else if (typeof val === 'string') {
        fieldType = 'str';
      } else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const itemModelName = `${modelName}${toPascalCase(key)}Item`;
          processObject(val[0] as Record<string, unknown>, itemModelName);
          fieldType = `List[${itemModelName}] = []`;
        } else if (val.length > 0) {
          const elemType = typeof val[0] === 'string' ? 'str' : typeof val[0] === 'number' ? 'float' : 'Any';
          fieldType = `List[${elemType}] = []`;
        } else {
          fieldType = 'List[Any] = []';
        }
      } else if (typeof val === 'object') {
        const nestedModelName = `${modelName}${toPascalCase(key)}`;
        processObject(val as Record<string, unknown>, nestedModelName);
        fieldType = nestedModelName;
      }

      fields.push(`    ${fieldName}: ${fieldType}`);
    }

    const code = `class ${modelName}(BaseModel):\n${fields.join('\n')}`;
    models.set(modelName, code);
    return modelName;
  }

  processObject(obj, rootName);

  const header = `from typing import List, Optional, Any\nfrom pydantic import BaseModel\n\n`;
  return header + Array.from(models.values()).reverse().join('\n\n');
}

// Generate Rust Serde Structs
function generateRust(obj: Record<string, unknown>, rootName: string): string {
  const structs = new Map<string, string>();

  function processObject(data: Record<string, unknown>, structName: string): string {
    const fields: string[] = [];

    for (const [key, val] of Object.entries(data)) {
      const fieldName = toSnakeCase(key);
      let fieldType = 'Option<String>';

      if (typeof val === 'boolean') {
        fieldType = 'bool';
      } else if (typeof val === 'number') {
        fieldType = Number.isInteger(val) ? 'i64' : 'f64';
      } else if (typeof val === 'string') {
        fieldType = 'String';
      } else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const itemStructName = `${structName}${toPascalCase(key)}Item`;
          processObject(val[0] as Record<string, unknown>, itemStructName);
          fieldType = `Vec<${itemStructName}>`;
        } else if (val.length > 0) {
          const elemType = typeof val[0] === 'string' ? 'String' : typeof val[0] === 'number' ? 'f64' : 'serde_json::Value';
          fieldType = `Vec<${elemType}>`;
        } else {
          fieldType = 'Vec<serde_json::Value>';
        }
      } else if (typeof val === 'object' && val !== null) {
        const nestedStructName = `${structName}${toPascalCase(key)}`;
        processObject(val as Record<string, unknown>, nestedStructName);
        fieldType = nestedStructName;
      }

      fields.push(`    #[serde(rename = "${key}")]\n    pub ${fieldName}: ${fieldType},`);
    }

    const code = `#[derive(Debug, Clone, Serialize, Deserialize)]\npub struct ${structName} {\n${fields.join('\n')}\n}`;
    structs.set(structName, code);
    return structName;
  }

  processObject(obj, rootName);

  const header = `use serde::{Serialize, Deserialize};\n\n`;
  return header + Array.from(structs.values()).reverse().join('\n\n');
}

// Generate C# Record
function generateCSharp(obj: Record<string, unknown>, rootName: string): string {
  const records = new Map<string, string>();

  function processObject(data: Record<string, unknown>, recordName: string): string {
    const properties: string[] = [];

    for (const [key, val] of Object.entries(data)) {
      const propName = toPascalCase(key);
      let propType = 'string?';

      if (typeof val === 'boolean') {
        propType = 'bool';
      } else if (typeof val === 'number') {
        propType = Number.isInteger(val) ? 'long' : 'double';
      } else if (typeof val === 'string') {
        propType = 'string';
      } else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const itemRecordName = `${recordName}${toPascalCase(key)}Item`;
          processObject(val[0] as Record<string, unknown>, itemRecordName);
          propType = `List<${itemRecordName}>`;
        } else if (val.length > 0) {
          const elemType = typeof val[0] === 'string' ? 'string' : typeof val[0] === 'number' ? 'double' : 'object';
          propType = `List<${elemType}>`;
        } else {
          propType = 'List<object>';
        }
      } else if (typeof val === 'object' && val !== null) {
        const nestedRecordName = `${recordName}${toPascalCase(key)}`;
        processObject(val as Record<string, unknown>, nestedRecordName);
        propType = nestedRecordName;
      }

      properties.push(`    [JsonPropertyName("${key}")]\n    public ${propType} ${propName} { get; init; } = default!;`);
    }

    const code = `public record ${recordName}\n{\n${properties.join('\n')}\n}`;
    records.set(recordName, code);
    return recordName;
  }

  processObject(obj, rootName);

  const header = `using System.Text.Json.Serialization;\nusing System.Collections.Generic;\n\n`;
  return header + Array.from(records.values()).reverse().join('\n\n');
}

// Generate Kotlin Data Class
function generateKotlin(obj: Record<string, unknown>, rootName: string): string {
  const classes = new Map<string, string>();

  function processObject(data: Record<string, unknown>, className: string): string {
    const fields: string[] = [];

    for (const [key, val] of Object.entries(data)) {
      const propName = toCamelCase(key);
      let propType = 'String?';

      if (typeof val === 'boolean') {
        propType = 'Boolean';
      } else if (typeof val === 'number') {
        propType = Number.isInteger(val) ? 'Long' : 'Double';
      } else if (typeof val === 'string') {
        propType = 'String';
      } else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const itemClassName = `${className}${toPascalCase(key)}Item`;
          processObject(val[0] as Record<string, unknown>, itemClassName);
          propType = `List<${itemClassName}>`;
        } else if (val.length > 0) {
          const elemType = typeof val[0] === 'string' ? 'String' : typeof val[0] === 'number' ? 'Double' : 'Any';
          propType = `List<${elemType}>`;
        } else {
          propType = 'List<Any>';
        }
      } else if (typeof val === 'object' && val !== null) {
        const nestedClassName = `${className}${toPascalCase(key)}`;
        processObject(val as Record<string, unknown>, nestedClassName);
        propType = nestedClassName;
      }

      fields.push(`    @SerializedName("${key}")\n    val ${propName}: ${propType}`);
    }

    const code = `data class ${className}(\n${fields.join(',\n')}\n)`;
    classes.set(className, code);
    return className;
  }

  processObject(obj, rootName);

  const header = `import com.google.gson.annotations.SerializedName\n\n`;
  return header + Array.from(classes.values()).reverse().join('\n\n');
}

export function generateModelsFromJson(jsonStr: string, options: ModelGeneratorOptions): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  const sampleObj = Array.isArray(parsed) ? parsed[0] : parsed;
  if (!sampleObj || typeof sampleObj !== 'object') {
    throw new Error('JSON must be an object or a non-empty array of objects.');
  }

  const rootName = toPascalCase(options.rootName.trim() || 'RootModel');

  switch (options.targetLanguage) {
    case 'go':
      return generateGo(sampleObj as Record<string, unknown>, rootName);
    case 'python':
      return generatePython(sampleObj as Record<string, unknown>, rootName);
    case 'rust':
      return generateRust(sampleObj as Record<string, unknown>, rootName);
    case 'csharp':
      return generateCSharp(sampleObj as Record<string, unknown>, rootName);
    case 'kotlin':
      return generateKotlin(sampleObj as Record<string, unknown>, rootName);
    default:
      return generateGo(sampleObj as Record<string, unknown>, rootName);
  }
}
