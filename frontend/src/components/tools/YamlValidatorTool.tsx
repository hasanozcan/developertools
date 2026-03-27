'use client';

import { useState, useCallback, useEffect } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import CopyButton from '@/components/common/CopyButton';
import { load } from 'js-yaml';

interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorLine?: number;
  errorColumn?: number;
}

function getErrorPosition(errorMessage: string): { line: number; column: number } | undefined {
  // js-yaml error format: "YAMLException: ... (lines X-Y)"
  // or "YAMLException: ... at line X column Y"
  const lineMatch = errorMessage.match(/line\s+(\d+)/i);
  const columnMatch = errorMessage.match(/column\s+(\d+)/i);
  const rowMatch = errorMessage.match(/row\s+(\d+)/i);
  const colMatch = errorMessage.match(/col\s+(\d+)/i);

  const line = lineMatch ? parseInt(lineMatch[1], 10) : rowMatch ? parseInt(rowMatch[1], 10) : undefined;
  const column = columnMatch ? parseInt(columnMatch[1], 10) : colMatch ? parseInt(colMatch[1], 10) : undefined;

  if (line !== undefined) {
    return { line, column: column || 1 };
  }
  return undefined;
}

function validateYaml(yamlString: string): ValidationResult {
  if (!yamlString.trim()) {
    return { isValid: false, error: 'Please enter YAML to validate' };
  }

  try {
    load(yamlString);
    return { isValid: true };
  } catch (e) {
    const error = e as Error;
    const position = getErrorPosition(error.message);
    return {
      isValid: false,
      error: error.message,
      errorLine: position?.line,
      errorColumn: position?.column,
    };
  }
}

export default function YamlValidatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [autoValidate, setAutoValidate] = useState(true);

  const handleValidate = useCallback(() => {
    const validationResult = validateYaml(input);
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

  const loadSampleYaml = useCallback(() => {
    const sample = `# Employee record
name: John Doe
age: 30
email: john@example.com
isActive: true
address:
  street: 123 Main St
  city: New York
  country: USA
hobbies:
  - reading
  - gaming
  - coding
metadata:
  level: senior
  projects: 5`;
    setInput(sample);
  }, []);

  const loadInvalidSampleYaml = useCallback(() => {
    const sample = `# Invalid YAML - missing colon
name: John Doe
age: 30
email john@example.com
isActive: true`;
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
        <CopyButton text={input} />
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
          onClick={loadSampleYaml}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          {t('tool.jsonValidator.validSample')}
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={loadInvalidSampleYaml}
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
                {result.isValid ? 'Valid YAML' : 'Invalid YAML'}
              </h3>
              {result.error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {result.error}
                  {result.errorLine && (
                    <span className="block mt-1">
                      Line {result.errorLine}
                      {result.errorColumn && `, Column ${result.errorColumn}`}
                    </span>
                  )}
                </p>
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
          placeholder="key: value"
          language="yaml"
        />
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">YAML Tips</h3>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>- Use spaces for indentation, not tabs</li>
              <li>- Key-value pairs use colon: key: value</li>
              <li>- Lists use dash: - item</li>
              <li>- Comments start with #</li>
              <li>- Strings don&apos;t need quotes unless special characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
