'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, FileCode, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TypeOptions {
  rootName: string;
  useInterface: boolean;
  optionalProperties: boolean;
  addExport: boolean;
  extractNested: boolean;
  detectUnions: boolean;
  addJSDoc: boolean;
}

interface PropertyInfo {
  name: string;
  type: string;
  optional: boolean;
  comment?: string;
}

interface InterfaceInfo {
  name: string;
  properties: PropertyInfo[];
  extends?: string;
}

function detectType(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value)) return 'Date';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date';
    return 'string';
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'number' : 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'unknown';
}

function analyzeArrayTypes(arr: unknown[]): { types: string[]; hasObjects: boolean } {
  const types = new Set<string>();
  const hasObjects = arr.some(item => item !== null && typeof item === 'object' && !Array.isArray(item));
  
  arr.forEach(item => {
    if (item === null) {
      types.add('null');
    } else if (Array.isArray(item)) {
      types.add('unknown[]');
    } else if (typeof item === 'object') {
      types.add('object');
    } else {
      types.add(detectType(item));
    }
  });
  
  return { types: Array.from(types), hasObjects };
}

function extractInterfaces(
  obj: unknown,
  name: string,
  options: TypeOptions,
  interfaces: Map<string, InterfaceInfo>,
  parentPath = ''
): string {
  
  function processObject(obj: Record<string, unknown>, typeName: string, currentPath: string): string {
    const properties: PropertyInfo[] = [];
    
    Object.entries(obj).forEach(([key, value]) => {
      const propertyPath = currentPath ? `${currentPath}.${key}` : key;
      let typeName = detectType(value);
      let isOptional = options.optionalProperties;
      
      if (value === null) {
        typeName = 'null';
        isOptional = true;
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          typeName = 'unknown[]';
        } else {
          const { types, hasObjects } = analyzeArrayTypes(value);
          
          if (options.extractNested && hasObjects) {
            // Extract object items as separate interface
            const nestedName = toPascalCase(`${typeName}_${key}`);
            const firstObj = value.find(v => v !== null && typeof v === 'object' && !Array.isArray(v)) as Record<string, unknown>;
            if (firstObj) {
              processObject(firstObj, nestedName, propertyPath);
              typeName = `${nestedName}[]`;
            }
          } else if (options.detectUnions && types.length > 1) {
            // Create union type for mixed arrays
            typeName = `(${types.join(' | ')})[]`;
          } else {
            const itemTypes = new Set<string>();
            value.forEach(item => {
              if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
                itemTypes.add('object');
              } else {
                itemTypes.add(detectType(item));
              }
            });
            const uniqueTypes = Array.from(itemTypes);
            typeName = uniqueTypes.length === 1 ? `${uniqueTypes[0]}[]` : `(${uniqueTypes.join(' | ')})[]`;
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        if (options.extractNested) {
          const nestedName = toPascalCase(key);
          processObject(value as Record<string, unknown>, nestedName, propertyPath);
          typeName = nestedName;
        } else {
          typeName = generateInlineType(value, propertyPath);
        }
      }
      
      const comment = options.addJSDoc ? generatePropertyComment(key, value) : undefined;
      properties.push({
        name: key,
        type: typeName,
        optional: isOptional,
        comment,
      });
    });
    
    if (options.extractNested && currentPath === '') {
      interfaces.set(typeName, { name: typeName, properties });
      return typeName;
    }
    
    return generateInlineTypeFromProperties(properties);
  }
  
  function generateInlineType(obj: unknown, path: string): string {
    if (obj === null) return 'null';
    if (typeof obj !== 'object' || Array.isArray(obj)) return detectType(obj);
    
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return 'Record<string, unknown>';
    
    const props = entries.map(([key, value]) => {
      const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      const optional = options.optionalProperties ? '?' : '';
      const valueType = typeof value === 'object' && value !== null && !Array.isArray(value)
        ? generateInlineType(value, `${path}.${key}`)
        : detectType(value);
      return `${validKey}${optional}: ${valueType}`;
    });
    
    return `{ ${props.join('; ')} }`;
  }
  
  function generateInlineTypeFromProperties(properties: PropertyInfo[]): string {
    if (properties.length === 0) return '{}';
    const props = properties.map(p => {
      const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : `'${p.name}'`;
      const optional = p.optional ? '?' : '';
      return `${validKey}${optional}: ${p.type}`;
    });
    return `{ ${props.join('; ')} }`;
  }
  
  function generatePropertyComment(key: string, value: unknown): string {
    const comments: string[] = [];
    
    if (value === null) {
      comments.push('Can be null');
    } else if (Array.isArray(value)) {
      comments.push(`Array of ${value.length} item${value.length !== 1 ? 's' : ''}`);
    } else if (typeof value === 'object') {
      const keys = Object.keys(value);
      comments.push(`Object with ${keys.length} propert${keys.length !== 1 ? 'ies' : 'y'}`);
    } else if (typeof value === 'string') {
      comments.push(`Example: "${value.substring(0, 30)}${value.length > 30 ? '...' : ''}"`);
    } else {
      comments.push(`Example: ${value}`);
    }
    
    return comments.join('. ');
  }
  
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return detectType(obj);
  }
  
  return processObject(obj as Record<string, unknown>, name, parentPath);
}

function jsonToTypeScript(json: unknown, name: string, options: TypeOptions, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  const typeKeyword = options.useInterface ? 'interface' : 'type';
  const exportKeyword = options.addExport ? 'export ' : '';
  const optional = options.optionalProperties ? '?' : '';

  if (json === null) return 'null';
  if (typeof json === 'undefined') return 'undefined';
  if (typeof json === 'string') return 'string';
  if (typeof json === 'number') return 'number';
  if (typeof json === 'boolean') return 'boolean';

  const interfaces = new Map<string, InterfaceInfo>();
  
  if (options.extractNested) {
    extractInterfaces(json, name, options, interfaces);
    
    const results: string[] = [];
    
    // Generate all nested interfaces first
    interfaces.forEach((iface) => {
      if (iface.name === name) return; // Skip root, will generate it separately
      
      const props = iface.properties.map(p => {
        const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : `'${p.name}'`;
        const optional = p.optional ? '?' : '';
        const jsdoc = p.comment ? `\n  /** ${p.comment} */\n  ` : '';
        return `${jsdoc}${validKey}${optional}: ${p.type};`;
      });
      
      if (options.useInterface) {
        results.push(`${exportKeyword}interface ${iface.name} {\n${props.join('\n')}\n}`);
      } else {
        results.push(`${exportKeyword}type ${iface.name} = {\n${props.join('\n')}\n};`);
      }
    });
    
    // Generate root interface
    const rootIface = interfaces.get(name);
    if (rootIface) {
      const props = rootIface.properties.map(p => {
        const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : `'${p.name}'`;
        const optional = p.optional ? '?' : '';
        const jsdoc = p.comment ? `\n  /** ${p.comment} */\n  ` : '';
        return `${jsdoc}${validKey}${optional}: ${p.type};`;
      });
      
      if (options.useInterface) {
        results.unshift(`${exportKeyword}interface ${name} {\n${props.join('\n')}\n}`);
      } else {
        results.unshift(`${exportKeyword}type ${name} = {\n${props.join('\n')}\n};`);
      }
    }
    
    return results.join('\n\n');
  }

  if (Array.isArray(json)) {
    if (json.length === 0) return 'unknown[]';
    
    const itemTypes = new Set<string>();
    const objectItems: object[] = [];
    
    json.forEach(item => {
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        objectItems.push(item);
      } else {
        itemTypes.add(jsonToTypeScript(item, '', { ...options, extractNested: false, addJSDoc: false }, 0));
      }
    });

    if (objectItems.length > 0) {
      const mergedObj: Record<string, unknown> = {};
      objectItems.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
          if (!(key in mergedObj)) {
            mergedObj[key] = value;
          }
        });
      });
      const objType = jsonToTypeScript(mergedObj, '', { ...options, addExport: false, extractNested: false, addJSDoc: false }, indent);
      itemTypes.add(objType);
    }

    const types = Array.from(itemTypes);
    if (options.detectUnions && types.length > 1) {
      return `(${types.join(' | ')})[]`;
    }
    if (types.length === 1) {
      return `${types[0]}[]`;
    }
    return `(${types.join(' | ')})[]`;
  }

  if (typeof json === 'object') {
    const entries = Object.entries(json as Record<string, unknown>);
    if (entries.length === 0) {
      return options.useInterface ? '{}' : 'Record<string, unknown>';
    }

    const props = entries.map(([key, value]) => {
      const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      const valueType = jsonToTypeScript(value, toPascalCase(key), { ...options, addExport: false, extractNested: false, addJSDoc: false }, indent + 1);
      const optional = options.optionalProperties ? '?' : '';
      const comment = options.addJSDoc ? `\n  /** Property: ${key} */\n  ` : '';
      return `${comment}${validKey}${optional}: ${valueType};`;
    });

    if (indent === 0 && name) {
      if (options.useInterface) {
        return `${exportKeyword}interface ${name} {\n${props.join('\n')}\n}`;
      } else {
        return `${exportKeyword}type ${name} = {\n${props.join('\n')}\n};`;
      }
    }

    return `{\n${props.join('\n')}\n${spaces}}`;
  }

  return 'unknown';
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

export default function JsonToTypescriptTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<TypeOptions>({
    rootName: 'Root',
    useInterface: true,
    optionalProperties: false,
    addExport: true,
    extractNested: false,
    detectUnions: true,
    addJSDoc: false,
  });

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const json = JSON.parse(input);
      const result = jsonToTypeScript(json, options.rootName, options, 0);
      setOutput(result);
      setError(null);
    } catch (e) {
      setError(t('tool.jsonToTs.invalidJson'));
      setOutput('');
    }
  }, [input, options, t]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const loadSample = useCallback(() => {
    setInput(JSON.stringify({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      isActive: true,
      roles: ["admin", "user"],
      metadata: {
        created: "2024-01-01T00:00:00Z",
        updated: "2024-01-15T00:00:00Z"
      },
      tags: ["premium", null, "verified"],
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      orders: [
        { id: 101, total: 99.99, items: ["item1", "item2"] },
        { id: 102, total: 149.99, items: ["item3"] }
      ],
      settings: {
        theme: "dark",
        notifications: true
      }
    }, null, 2));
    setOutput('');
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.rootName')}:</label>
          <input
            type="text"
            value={options.rootName}
            onChange={(e) => setOptions({ ...options, rootName: e.target.value || 'Root' })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-32"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.useInterface}
            onChange={(e) => setOptions({ ...options, useInterface: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.useInterface')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.optionalProperties}
            onChange={(e) => setOptions({ ...options, optionalProperties: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.optionalProps')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.addExport}
            onChange={(e) => setOptions({ ...options, addExport: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.addExport')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.extractNested}
            onChange={(e) => setOptions({ ...options, extractNested: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.extractNested')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.detectUnions}
            onChange={(e) => setOptions({ ...options, detectUnions: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.detectUnions')}</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.addJSDoc}
            onChange={(e) => setOptions({ ...options, addJSDoc: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonToTs.jsdocComments')}</span>
        </label>

        <div className="flex-1" />

        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {t('common.loadSample')}
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); setError(null); }}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Convert Button */}
      <button
        onClick={convert}
        disabled={!input.trim()}
        className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FileCode className="w-4 h-4" />
        {t('tool.jsonToTs.convert')}
      </button>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.jsonToTs.jsonInput')}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            placeholder='{"name": "John", "age": 30}'
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.jsonToTs.tsOutput')}
            </label>
            {output && (
              <button
                onClick={copyOutput}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? t('common.copied') : t('common.copy')}
              </button>
            )}
          </div>
          <pre className="w-full h-[400px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto">
            <code>{output || t('tool.jsonToTs.outputPlaceholder')}</code>
          </pre>
        </div>
      </div>

      {/* Features Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="font-medium text-blue-900 dark:text-blue-300 mb-2">Smart Type Detection Features:</p>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>✓ <strong>Extract Nested:</strong> Creates separate interfaces for nested objects</li>
          <li>✓ <strong>Detect Unions:</strong> Creates union types for mixed arrays (e.g., string | null)</li>
          <li>✓ <strong>JSDoc Comments:</strong> Adds documentation comments for properties</li>
          <li>✓ <strong>Type Detection:</strong> Recognizes Date strings from ISO format</li>
        </ul>
      </div>
    </div>
  );
}
