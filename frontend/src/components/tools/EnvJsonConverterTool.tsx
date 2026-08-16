'use client';

import { useCallback, useState } from 'react';
import { ArrowLeftRight, FileText, Trash2 } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { convertDotEnvToJson, convertJsonToDotEnv } from '@/lib/dotEnv';

type ConversionMode = 'envToJson' | 'jsonToEnv';

const MAX_INPUT_LENGTH = 500_000;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Conversion failed.';
}

export default function EnvJsonConverterTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ConversionMode>('envToJson');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inferTypes, setInferTypes] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState('');

  const clearResult = useCallback(() => {
    setOutput('');
    setWarnings([]);
    setError('');
  }, []);

  const selectMode = useCallback(
    (nextMode: ConversionMode) => {
      if (nextMode === mode) return;
      setMode(nextMode);
      setInput('');
      clearResult();
    },
    [clearResult, mode],
  );

  const convert = useCallback(() => {
    try {
      const result =
        mode === 'envToJson'
          ? convertDotEnvToJson(input, { inferTypes })
          : convertJsonToDotEnv(input);
      setOutput(result.output);
      setWarnings(result.warnings);
      setError('');
    } catch (conversionError) {
      setOutput('');
      setWarnings([]);
      setError(getErrorMessage(conversionError));
    }
  }, [inferTypes, input, mode]);

  const swap = useCallback(() => {
    if (!output) return;
    setMode((current) => (current === 'envToJson' ? 'jsonToEnv' : 'envToJson'));
    setInput(output);
    setOutput('');
    setWarnings([]);
    setError('');
  }, [output]);

  const loadSample = useCallback(() => {
    setInput(
      mode === 'envToJson'
        ? [
            '# Safe sample values',
            'APP_NAME="Example API"',
            'PORT=3000',
            'DEBUG=false',
            'PUBLIC_URL=https://example.com',
          ].join('\n')
        : JSON.stringify(
            {
              APP_NAME: 'Example API',
              PORT: 3000,
              DEBUG: false,
              PUBLIC_URL: 'https://example.com',
            },
            null,
            2,
          ),
    );
    clearResult();
  }, [clearResult, mode]);

  const inputLabel = mode === 'envToJson' ? t('tool.env.envInput') : t('tool.env.jsonInput');
  const outputLabel = mode === 'envToJson' ? t('tool.env.jsonOutput') : t('tool.env.envOutput');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div
          role="group"
          aria-label={t('tool.env.modeLabel')}
          className="flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600"
        >
          <button
            type="button"
            aria-pressed={mode === 'envToJson'}
            onClick={() => selectMode('envToJson')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'envToJson'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            .env → JSON
          </button>
          <button
            type="button"
            aria-pressed={mode === 'jsonToEnv'}
            onClick={() => selectMode('jsonToEnv')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'jsonToEnv'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            JSON → .env
          </button>
        </div>

        {mode === 'envToJson' && (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={inferTypes}
              onChange={(event) => {
                setInferTypes(event.target.checked);
                clearResult();
              }}
              className="h-4 w-4 rounded border-gray-300 text-primary-600"
            />
            {t('tool.env.inferTypes')}
          </label>
        )}

        <button
          type="button"
          onClick={loadSample}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <FileText className="h-4 w-4" />
          {t('common.loadSample')}
        </button>
        <button
          type="button"
          onClick={() => {
            setInput('');
            clearResult();
          }}
          aria-label={t('common.clear')}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={swap}
          disabled={!output}
          title={t('tool.env.swap')}
          aria-label={t('tool.env.swap')}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <ArrowLeftRight className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={convert}
        disabled={!input.trim()}
        className="rounded-lg bg-primary-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mode === 'envToJson' ? t('tool.env.convertToJson') : t('tool.env.convertToEnv')}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </p>
      )}

      {warnings.length > 0 && (
        <div
          role="status"
          className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <p className="font-medium">{t('tool.env.warnings')}</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="env-json-input"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {inputLabel}
          </label>
          <textarea
            id="env-json-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              clearResult();
            }}
            maxLength={MAX_INPUT_LENGTH}
            rows={18}
            spellCheck={false}
            placeholder={
              mode === 'envToJson' ? 'APP_NAME="Example API"\nPORT=3000' : '{"PORT": 3000}'
            }
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="env-json-output"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {outputLabel}
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            id="env-json-output"
            value={output}
            readOnly
            rows={18}
            aria-live="polite"
            placeholder={t('tool.env.outputPlaceholder')}
            className="w-full resize-y rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>

      <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        {t('tool.env.localNote')}
      </p>
    </div>
  );
}
