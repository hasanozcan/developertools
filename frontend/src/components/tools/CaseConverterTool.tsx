'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

type CaseType = 'camel' | 'pascal' | 'kebab' | 'snake' | 'constant' | 'space' | 'dot';

function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s.]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s.]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

function toSpaceCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_.]+/g, ' ')
    .replace(/^ +| +$/g, '')
    .toLowerCase();
}

function toDotCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/[-_\s.]+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .toLowerCase();
}

const converters: Record<CaseType, (str: string) => string> = {
  camel: toCamelCase,
  pascal: toPascalCase,
  kebab: toKebabCase,
  snake: toSnakeCase,
  constant: toConstantCase,
  space: toSpaceCase,
  dot: toDotCase,
};

const caseNames: Record<CaseType, string> = {
  camel: 'camelCase',
  pascal: 'PascalCase',
  kebab: 'kebab-case',
  snake: 'snake_case',
  constant: 'CONSTANT_CASE',
  space: 'space case',
  dot: 'dot.case',
};

export default function CaseConverterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('camel');
  const deferredInput = useDeferredValue(input);
  const isUpdating = input !== deferredInput;

  const converted = deferredInput ? converters[selectedCase](deferredInput) : '';

  const convertAll = useCallback((str: string) => {
    const result: Partial<Record<CaseType, string>> = {};
    if (!str.trim()) return result;
    (Object.keys(converters) as CaseType[]).forEach((caseType) => {
      result[caseType] = converters[caseType](str);
    });
    return result;
  }, []);

  const allCases = useMemo(() => convertAll(deferredInput), [convertAll, deferredInput]);

  const loadSample = useCallback(() => {
    setInput('Hello World! This is a test-string.for_case conversion.');
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Input */}
      <div>
        <div className="mb-2 flex min-h-5 items-center justify-between gap-3">
          <label
            htmlFor="case-converter-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Input Text
          </label>
          {isUpdating ? (
            <span role="status" className="text-xs text-gray-500 dark:text-gray-400">
              {t('common.updating')}
            </span>
          ) : null}
        </div>
        <CodeEditor
          id="case-converter-input"
          value={input}
          onChange={setInput}
          placeholder="Enter text to convert..."
          language="text"
          minHeight="100px"
          maxLength={250_000}
        />
      </div>

      {/* Selected Case Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Convert to:
          <select
            value={selectedCase}
            onChange={(e) => setSelectedCase(e.target.value as CaseType)}
            className="ml-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {(Object.keys(caseNames) as CaseType[]).map((caseType) => (
              <option key={caseType} value={caseType}>
                {caseNames[caseType]}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <code className="flex-1 font-mono text-sm break-all text-gray-800 dark:text-gray-200">
            {converted || 'Converted text will appear here...'}
          </code>
          {converted && <CopyButton text={converted} />}
        </div>
      </div>

      {/* All Cases */}
      {deferredInput ? (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            All Case Conversions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(Object.keys(caseNames) as CaseType[]).map((caseType) => (
              <div
                key={caseType}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-24 shrink-0">
                  {caseNames[caseType]}
                </span>
                <code className="flex-1 font-mono text-xs break-all text-gray-800 dark:text-gray-200">
                  {allCases[caseType] || ''}
                </code>
                <CopyButton text={allCases[caseType] || ''} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
