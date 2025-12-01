'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, FileCode, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TypeOptions {
  rootName: string;
  useInterface: boolean;
  optionalProperties: boolean;
  addExport: boolean;
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

  if (Array.isArray(json)) {
    if (json.length === 0) return 'unknown[]';
    
    // Get unique types in array
    const itemTypes = new Set<string>();
    const objectItems: object[] = [];
    
    json.forEach(item => {
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        objectItems.push(item);
      } else {
        itemTypes.add(jsonToTypeScript(item, '', options, 0));
      }
    });

    if (objectItems.length > 0) {
      // Merge all object properties
      const mergedObj: Record<string, unknown> = {};
      objectItems.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
          if (!(key in mergedObj)) {
            mergedObj[key] = value;
          }
        });
      });
      const objType = jsonToTypeScript(mergedObj, '', { ...options, addExport: false }, indent);
      itemTypes.add(objType);
    }

    const types = Array.from(itemTypes);
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
      const valueType = jsonToTypeScript(value, toPascalCase(key), { ...options, addExport: false }, indent + 1);
      return `${spaces}  ${validKey}${optional}: ${valueType};`;
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

function generateNestedInterfaces(json: unknown, name: string, options: TypeOptions): string[] {
  const interfaces: string[] = [];
  const seen = new Set<string>();

  function traverse(obj: unknown, typeName: string) {
    if (obj === null || typeof obj !== 'object') return;

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          traverse(item, `${typeName}Item`);
        }
      });
      return;
    }

    const signature = JSON.stringify(Object.keys(obj).sort());
    if (seen.has(signature)) return;
    seen.add(signature);

    Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        const nestedName = toPascalCase(key);
        traverse(value, nestedName);
      } else if (Array.isArray(value) && value.length > 0) {
        const firstObj = value.find(v => v !== null && typeof v === 'object' && !Array.isArray(v));
        if (firstObj) {
          traverse(firstObj, `${toPascalCase(key)}Item`);
        }
      }
    });
  }

  traverse(json, name);
  return interfaces;
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
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      orders: [
        { id: 101, total: 99.99, items: ["item1", "item2"] },
        { id: 102, total: 149.99, items: ["item3"] }
      ]
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
    </div>
  );
}
