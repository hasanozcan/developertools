'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, ArrowLeftRight, FileText, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { convertJsonToYaml, convertYamlToJson } from '@/lib/yamlJson';

interface YamlError {
  message: string;
  line?: number;
  column?: number;
}

export default function YamlJsonConverterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'yamlToJson' | 'jsonToYaml'>('yamlToJson');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSpaces, setIndentSpaces] = useState(2);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      setErrorLine(null);
      return;
    }

    try {
      if (mode === 'yamlToJson') {
        setOutput(convertYamlToJson(input, indentSpaces));
      } else {
        setOutput(convertJsonToYaml(input, indentSpaces));
      }
      setError(null);
      setErrorLine(null);
    } catch (e) {
      const err = e as YamlError;
      
      // Extract line number from js-yaml error if available
      const match = err.message.match(/at line (\d+)(?:, column (\d+))?/);
      if (match) {
        setErrorLine(parseInt(match[1], 10));
      }
      
      const errorMsg = mode === 'yamlToJson' 
        ? (err.message || t('tool.yamlJson.invalidYaml'))
        : (err.message || t('tool.yamlJson.invalidJson'));
      
      setError(errorMsg);
      setOutput('');
    }
  }, [input, mode, indentSpaces, t]);

  const swap = useCallback(() => {
    setMode(mode === 'yamlToJson' ? 'jsonToYaml' : 'yamlToJson');
    setInput(output);
    setOutput('');
    setError(null);
    setErrorLine(null);
  }, [mode, output]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const loadSample = useCallback(() => {
    if (mode === 'yamlToJson') {
      setInput(`# Kubernetes Deployment Example
# This demonstrates advanced YAML features supported by js-yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
    version: "1.0"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: my-app:latest
          ports:
            - containerPort: 8080
              protocol: TCP
          env:
            - name: NODE_ENV
              value: production
            - name: PORT
              value: "8080"
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
            requests:
              memory: "256Mi"
              cpu: "250m"

# Anchors and aliases example (fully supported)
defaults: &defaults
  timeout: 30s
  retries: 3

service:
  <<: *defaults
  name: api-service
  port: 8080`);
    } else {
      setInput(JSON.stringify({
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
          name: "my-app",
          labels: { 
            app: "my-app",
            version: "1.0"
          }
        },
        spec: {
          replicas: 3,
          selector: { 
            matchLabels: { 
              app: "my-app" 
            } 
          },
          template: {
            metadata: {
              labels: { 
                app: "my-app" 
              }
            },
            spec: {
              containers: [{
                name: "my-app",
                image: "my-app:latest",
                ports: [{ 
                  containerPort: 8080,
                  protocol: "TCP"
                }],
                env: [
                  { name: "NODE_ENV", value: "production" },
                  { name: "PORT", value: "8080" }
                ],
                resources: {
                  limits: {
                    memory: "512Mi",
                    cpu: "500m"
                  },
                  requests: {
                    memory: "256Mi",
                    cpu: "250m"
                  }
                }
              }]
            }
          }
        },
        defaults: {
          timeout: "30s",
          retries: 3
        },
        service: {
          timeout: "30s",
          retries: 3,
          name: "api-service",
          port: 8080
        }
      }, null, 2));
    }
    setOutput('');
    setError(null);
    setErrorLine(null);
  }, [mode]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => { setMode('yamlToJson'); setInput(''); setOutput(''); setError(null); setErrorLine(null); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'yamlToJson'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            YAML → JSON
          </button>
          <button
            onClick={() => { setMode('jsonToYaml'); setInput(''); setOutput(''); setError(null); setErrorLine(null); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'jsonToYaml'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            JSON → YAML
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.yamlJson.indent')}:</label>
          <select
            value={indentSpaces}
            onChange={(e) => setIndentSpaces(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700"
          >
            <option value={2}>2 {t('common.spaces')}</option>
            <option value={4}>4 {t('common.spaces')}</option>
          </select>
        </div>

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
          onClick={() => { setInput(''); setOutput(''); setError(null); setErrorLine(null); }}
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
          <div className="font-medium mb-1">Parse Error</div>
          <div>{error}</div>
          {errorLine && (
            <div className="mt-2 text-xs text-red-500 dark:text-red-400">
              Error at line {errorLine}
            </div>
          )}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'yamlToJson' ? 'YAML Input' : 'JSON Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            placeholder={mode === 'yamlToJson' ? 'key: value\n# Supports anchors, aliases, multiline strings, etc.' : '{"key": "value"}'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'yamlToJson' ? 'JSON Output' : 'YAML Output'}
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
        <p className="mb-2">{t('tool.yamlJson.tipText')}</p>
        <p className="text-blue-700 dark:text-blue-400 font-medium">YAML 1.1 compatibility mode powered by js-yaml:</p>
        <ul className="mt-1 ml-4 list-disc space-y-1">
          <li>✓ Anchors (&amp;) and aliases (*)</li>
          <li>✓ Multi-line strings (|, &gt;)</li>
          <li>✓ Explicit type tags (!!str, !!int, etc.)</li>
          <li>✓ Set and merge keys (&lt;&lt;)</li>
          <li>✓ Better error messages with line numbers</li>
        </ul>
      </div>
    </div>
  );
}
