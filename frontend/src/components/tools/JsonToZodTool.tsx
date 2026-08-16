'use client';

import { useCallback, useState } from 'react';
import { Braces, FileText, Trash2 } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { generateZodSchema } from '@/lib/jsonToZod';

const MAX_INPUT_LENGTH = 500_000;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Schema generation failed.';
}

export default function JsonToZodTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [schemaName, setSchemaName] = useState('Root');
  const [inferStringFormats, setInferStringFormats] = useState(true);
  const [strictObjects, setStrictObjects] = useState(true);
  const [includeInferredType, setIncludeInferredType] = useState(true);
  const [error, setError] = useState('');

  const clearResult = useCallback(() => {
    setOutput('');
    setError('');
  }, []);

  const generate = useCallback(() => {
    try {
      setOutput(
        generateZodSchema(input, {
          schemaName,
          inferStringFormats,
          strictObjects,
          includeInferredType,
        }),
      );
      setError('');
    } catch (generationError) {
      setOutput('');
      setError(getErrorMessage(generationError));
    }
  }, [includeInferredType, inferStringFormats, input, schemaName, strictObjects]);

  const loadSample = useCallback(() => {
    setInput(
      JSON.stringify(
        {
          id: '018f82c1-6e89-7cc9-b8a2-f4e5d6c7b8a9',
          email: 'dev@example.com',
          createdAt: '2026-08-16T10:30:00Z',
          roles: ['admin', 'editor'],
          profile: { active: true, score: 98.5 },
        },
        null,
        2,
      ),
    );
    setSchemaName('User');
    clearResult();
  }, [clearResult]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div>
          <label
            htmlFor="zod-schema-name"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.zod.schemaName')}
          </label>
          <input
            id="zod-schema-name"
            value={schemaName}
            onChange={(event) => {
              setSchemaName(event.target.value);
              clearResult();
            }}
            maxLength={80}
            className="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={inferStringFormats}
            onChange={(event) => {
              setInferStringFormats(event.target.checked);
              clearResult();
            }}
            className="h-4 w-4 rounded border-gray-300 text-primary-600"
          />
          {t('tool.zod.inferFormats')}
        </label>
        <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={strictObjects}
            onChange={(event) => {
              setStrictObjects(event.target.checked);
              clearResult();
            }}
            className="h-4 w-4 rounded border-gray-300 text-primary-600"
          />
          {t('tool.zod.strictObjects')}
        </label>
        <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={includeInferredType}
            onChange={(event) => {
              setIncludeInferredType(event.target.checked);
              clearResult();
            }}
            className="h-4 w-4 rounded border-gray-300 text-primary-600"
          />
          {t('tool.zod.includeType')}
        </label>

        <button
          type="button"
          onClick={loadSample}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={generate}
        disabled={!input.trim()}
        className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Braces className="h-4 w-4" />
        {t('tool.zod.generate')}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="zod-json-input"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.zod.jsonInput')}
          </label>
          <textarea
            id="zod-json-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              clearResult();
            }}
            maxLength={MAX_INPUT_LENGTH}
            rows={20}
            spellCheck={false}
            placeholder='{"name":"Ada","active":true}'
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="zod-schema-output"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.zod.output')}
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            id="zod-schema-output"
            value={output}
            readOnly
            rows={20}
            aria-live="polite"
            placeholder={t('tool.zod.outputPlaceholder')}
            className="w-full resize-y rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>

      <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        {t('tool.zod.localNote')}
      </p>
    </div>
  );
}
