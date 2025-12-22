'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, ArrowLeftRight, FileText, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Simple YAML parser (handles common cases)
function parseYaml(yaml: string): unknown {
  const lines = yaml.split('\n');
  const result: Record<string, unknown> = {};
  const stack: { indent: number; obj: Record<string, unknown>; key?: string }[] = [{ indent: -1, obj: result }];
  
  let currentArray: unknown[] | null = null;
  let arrayKey: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const indent = line.search(/\S/);
    
    // Array item
    if (trimmed.startsWith('- ')) {
      const value = trimmed.substring(2).trim();
      
      // Find parent
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      
      const parent = stack[stack.length - 1];
      if (arrayKey && parent.obj[arrayKey]) {
        (parent.obj[arrayKey] as unknown[]).push(parseValue(value));
      }
      continue;
    }
    
    // Key-value pair
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).trim();
    
    // Pop stack to find correct parent
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    
    const parent = stack[stack.length - 1].obj;
    
    if (value === '' || value === '|' || value === '>') {
      // Nested object or multiline string
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nextTrimmed = nextLine.trim();
        if (nextTrimmed.startsWith('- ')) {
          // It's an array
          parent[key] = [];
          arrayKey = key;
          stack.push({ indent, obj: parent, key });
        } else {
          // It's an object
          parent[key] = {};
          stack.push({ indent, obj: parent[key] as Record<string, unknown> });
        }
      }
    } else {
      parent[key] = parseValue(value);
    }
  }
  
  return result;
}

function parseValue(value: string): unknown {
  if (value === 'null' || value === '~') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
  // Remove quotes
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

// JSON to YAML converter
function jsonToYaml(json: unknown, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  
  if (json === null) return 'null';
  if (json === undefined) return '';
  if (typeof json === 'boolean') return json.toString();
  if (typeof json === 'number') return json.toString();
  if (typeof json === 'string') {
    // Check if string needs quoting
    if (json.includes('\n') || json.includes(':') || json.includes('#') ||
        json === '' || json === 'true' || json === 'false' || json === 'null' ||
        /^\d/.test(json)) {
      return `"${json.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return json;
  }
  
  if (Array.isArray(json)) {
    if (json.length === 0) return '[]';
    return json.map(item => {
      const value = jsonToYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null) {
        return `${spaces}- ${value.trim().split('\n').map((line, i) => i === 0 ? line : `${spaces}  ${line}`).join('\n')}`;
      }
      return `${spaces}- ${value}`;
    }).join('\n');
  }
  
  if (typeof json === 'object') {
    const entries = Object.entries(json as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    
    return entries.map(([key, value]) => {
      const yamlValue = jsonToYaml(value, indent + 1);
      
      if (Array.isArray(value) && value.length > 0) {
        return `${spaces}${key}:\n${yamlValue}`;
      }
      
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
        return `${spaces}${key}:\n${yamlValue}`;
      }
      
      return `${spaces}${key}: ${yamlValue}`;
    }).join('\n');
  }
  
  return String(json);
}

export default function YamlJsonConverterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'yamlToJson' | 'jsonToYaml'>('yamlToJson');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSpaces, setIndentSpaces] = useState(2);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'yamlToJson') {
        const parsed = parseYaml(input);
        setOutput(JSON.stringify(parsed, null, indentSpaces));
      } else {
        const parsed = JSON.parse(input);
        setOutput(jsonToYaml(parsed));
      }
      setError(null);
    } catch (e) {
      setError(mode === 'yamlToJson' ? t('tool.yamlJson.invalidYaml') : t('tool.yamlJson.invalidJson'));
      setOutput('');
    }
  }, [input, mode, indentSpaces, t]);

  const swap = useCallback(() => {
    setMode(mode === 'yamlToJson' ? 'jsonToYaml' : 'yamlToJson');
    setInput(output);
    setOutput('');
    setError(null);
  }, [mode, output]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const loadSample = useCallback(() => {
    if (mode === 'yamlToJson') {
      setInput(`# Kubernetes Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    spec:
      containers:
        - name: my-app
          image: my-app:latest
          ports:
            - containerPort: 8080`);
    } else {
      setInput(JSON.stringify({
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "my-app",
          labels: { app: "my-app" }
        },
        spec: {
          replicas: 3,
          selector: { matchLabels: { app: "my-app" } },
          template: {
            spec: {
              containers: [{
                name: "my-app",
                image: "my-app:latest",
                ports: [{ containerPort: 8080 }]
              }]
            }
          }
        }
      }, null, 2));
    }
    setOutput('');
    setError(null);
  }, [mode]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => { setMode('yamlToJson'); setInput(''); setOutput(''); setError(null); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'yamlToJson'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            YAML -&gt; JSON
          </button>
          <button
            onClick={() => { setMode('jsonToYaml'); setInput(''); setOutput(''); setError(null); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'jsonToYaml'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            JSON -&gt; YAML
          </button>
        </div>

        {mode === 'yamlToJson' && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.yamlJson.indent')}:</label>
            <select
              value={indentSpaces}
              onChange={(e) => setIndentSpaces(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        )}

        <button
          onClick={swap}
          disabled={!output}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          title={t('tool.yamlJson.swap')}
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>

        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
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
        className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('common.convert')}
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
            {mode === 'yamlToJson' ? 'YAML' : 'JSON'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            placeholder={mode === 'yamlToJson' ? 'key: value' : '{"key": "value"}'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'yamlToJson' ? 'JSON' : 'YAML'}
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
            <code>{output || t('tool.yamlJson.outputPlaceholder')}</code>
          </pre>
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="font-medium text-blue-900 dark:text-blue-300 mb-2">{t('tool.yamlJson.tip')}</p>
        <p>{t('tool.yamlJson.tipText')}</p>
      </div>
    </div>
  );
}
