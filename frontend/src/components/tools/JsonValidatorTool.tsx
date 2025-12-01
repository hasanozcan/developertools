'use client';

import { useState, useCallback, useEffect } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { CheckCircle, XCircle, AlertTriangle, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorPosition?: { line: number; column: number };
  stats?: {
    objects: number;
    arrays: number;
    strings: number;
    numbers: number;
    booleans: number;
    nulls: number;
    totalKeys: number;
    depth: number;
  };
}

function getErrorPosition(jsonString: string, errorMessage: string): { line: number; column: number } | undefined {
  // Try to extract position from error message
  const positionMatch = errorMessage.match(/position\s+(\d+)/i);
  if (positionMatch) {
    const position = parseInt(positionMatch[1], 10);
    let line = 1;
    let column = 1;
    
    for (let i = 0; i < position && i < jsonString.length; i++) {
      if (jsonString[i] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
    
    return { line, column };
  }
  return undefined;
}

function analyzeJson(value: unknown, depth = 0): { objects: number; arrays: number; strings: number; numbers: number; booleans: number; nulls: number; totalKeys: number; maxDepth: number } {
  const result = { objects: 0, arrays: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0, totalKeys: 0, maxDepth: depth };

  if (value === null) {
    result.nulls = 1;
  } else if (Array.isArray(value)) {
    result.arrays = 1;
    for (const item of value) {
      const childResult = analyzeJson(item, depth + 1);
      result.objects += childResult.objects;
      result.arrays += childResult.arrays;
      result.strings += childResult.strings;
      result.numbers += childResult.numbers;
      result.booleans += childResult.booleans;
      result.nulls += childResult.nulls;
      result.totalKeys += childResult.totalKeys;
      result.maxDepth = Math.max(result.maxDepth, childResult.maxDepth);
    }
  } else if (typeof value === 'object') {
    result.objects = 1;
    const keys = Object.keys(value as object);
    result.totalKeys = keys.length;
    for (const key of keys) {
      const childResult = analyzeJson((value as Record<string, unknown>)[key], depth + 1);
      result.objects += childResult.objects;
      result.arrays += childResult.arrays;
      result.strings += childResult.strings;
      result.numbers += childResult.numbers;
      result.booleans += childResult.booleans;
      result.nulls += childResult.nulls;
      result.totalKeys += childResult.totalKeys;
      result.maxDepth = Math.max(result.maxDepth, childResult.maxDepth);
    }
  } else if (typeof value === 'string') {
    result.strings = 1;
  } else if (typeof value === 'number') {
    result.numbers = 1;
  } else if (typeof value === 'boolean') {
    result.booleans = 1;
  }

  return result;
}

function validateJson(jsonString: string): ValidationResult {
  if (!jsonString.trim()) {
    return { isValid: false, error: 'Please enter JSON to validate' };
  }

  try {
    const parsed = JSON.parse(jsonString);
    const analysis = analyzeJson(parsed);
    
    return {
      isValid: true,
      stats: {
        objects: analysis.objects,
        arrays: analysis.arrays,
        strings: analysis.strings,
        numbers: analysis.numbers,
        booleans: analysis.booleans,
        nulls: analysis.nulls,
        totalKeys: analysis.totalKeys,
        depth: analysis.maxDepth,
      },
    };
  } catch (e) {
    const error = e as SyntaxError;
    return {
      isValid: false,
      error: error.message,
      errorPosition: getErrorPosition(jsonString, error.message),
    };
  }
}

export default function JsonValidatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [autoValidate, setAutoValidate] = useState(true);

  const handleValidate = useCallback(() => {
    const validationResult = validateJson(input);
    setResult(validationResult);
  }, [input]);

  // Auto-validate on input change
  useEffect(() => {
    if (autoValidate && input.trim()) {
      const timer = setTimeout(() => {
        handleValidate();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!input.trim()) {
      setResult(null);
    }
  }, [input, autoValidate, handleValidate]);

  const copyToClipboard = useCallback(() => {
    if (result?.isValid) {
      try {
        const formatted = JSON.stringify(JSON.parse(input), null, 2);
        navigator.clipboard.writeText(formatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Ignore copy errors
      }
    }
  }, [input, result]);

  const loadSampleJson = useCallback(() => {
    const sample = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "gaming", "coding"],
  "metadata": null
}`;
    setInput(sample);
  }, []);

  const loadInvalidSampleJson = useCallback(() => {
    const sample = `{
  "name": "John Doe",
  "age": 30
  "email": "john@example.com"
}`;
    setInput(sample);
  }, []);

  const clearInput = useCallback(() => {
    setInput('');
    setResult(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleValidate}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('common.validate')}
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!result?.isValid}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t('common.copied') : t('tool.jsonValidator.copyFormatted')}
        </button>
        <button
          onClick={clearInput}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          {t('common.clear')}
        </button>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoValidate}
              onChange={(e) => setAutoValidate(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            {t('tool.jsonValidator.autoValidate')}
          </label>
        </div>
      </div>

      {/* Sample buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('common.loadSample')}:</span>
        <button
          onClick={loadSampleJson}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          {t('tool.jsonValidator.validSample')}
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={loadInvalidSampleJson}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          {t('tool.jsonValidator.invalidSample')}
        </button>
      </div>

      {/* Validation Result */}
      {result && (
        <div
          className={`p-4 rounded-lg border ${
            result.isValid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  result.isValid
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}
              >
                {result.isValid ? t('tool.jsonValidator.validJson') : t('tool.jsonValidator.invalidJson')}
              </h3>
              {result.error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {result.error}
                  {result.errorPosition && (
                    <span className="block mt-1">
                      Line {result.errorPosition.line}, Column {result.errorPosition.column}
                    </span>
                  )}
                </p>
              )}
              {result.isValid && result.stats && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.objects')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.objects}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.arrays')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.arrays}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.strings')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.strings}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.numbers')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.numbers}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.booleans')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.booleans}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.nulls')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.nulls}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.totalKeys')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.totalKeys}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.jsonValidator.maxDepth')}</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{result.stats.depth}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.jsonValidator.jsonInput')}
        </label>
        <CodeEditor
          value={input}
          onChange={setInput}
          placeholder='{"key": "value"}'
          language="json"
        />
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">{t('tool.jsonValidator.commonErrors')}</h3>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• {t('tool.jsonValidator.error1')}</li>
              <li>• {t('tool.jsonValidator.error4')}</li>
              <li>• {t('tool.jsonValidator.error3')}</li>
              <li>• {t('tool.jsonValidator.error2')}</li>
              <li>• {t('tool.jsonValidator.error5')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
