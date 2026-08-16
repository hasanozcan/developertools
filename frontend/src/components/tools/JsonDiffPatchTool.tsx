'use client';

import { useCallback, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import {
  applyJsonPatch,
  generateJsonPatch,
  parseJsonDocument,
  parseJsonPatch,
} from '@/lib/jsonPatch';

const MAX_INPUT_LENGTH = 500_000;
const SAMPLE_SOURCE = `{
  "name": "Ada",
  "active": true,
  "profile": {
    "city": "London",
    "role": "admin"
  },
  "tags": ["math", "code"]
}`;
const SAMPLE_TARGET = `{
  "name": "Ada Lovelace",
  "profile": {
    "city": "London",
    "language": "TypeScript"
  },
  "tags": ["math", "code", "history"]
}`;

function messageFrom(error: unknown): string {
  return error instanceof Error ? error.message : 'JSON Patch operation failed.';
}

export default function JsonDiffPatchTool() {
  const { t } = useLanguage();
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [patch, setPatch] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const clearFeedback = useCallback(() => {
    setError('');
    setStatus('');
  }, []);

  const loadSample = useCallback(() => {
    setSource(SAMPLE_SOURCE);
    setTarget(SAMPLE_TARGET);
    setPatch('');
    setResult('');
    clearFeedback();
  }, [clearFeedback]);

  const generate = useCallback(() => {
    try {
      const sourceDocument = parseJsonDocument(source, t('tool.jsonPatch.source'));
      const targetDocument = parseJsonDocument(target, t('tool.jsonPatch.target'));
      const operations = generateJsonPatch(sourceDocument, targetDocument);
      setPatch(JSON.stringify(operations, null, 2));
      setResult('');
      setError('');
      setStatus(t('tool.jsonPatch.generated'));
    } catch (operationError) {
      setError(messageFrom(operationError));
      setStatus('');
    }
  }, [source, t, target]);

  const apply = useCallback(() => {
    try {
      const sourceDocument = parseJsonDocument(source, t('tool.jsonPatch.source'));
      const operations = parseJsonPatch(patch);
      setResult(JSON.stringify(applyJsonPatch(sourceDocument, operations), null, 2));
      setError('');
      setStatus(t('tool.jsonPatch.applied'));
    } catch (operationError) {
      setError(messageFrom(operationError));
      setStatus('');
    }
  }, [patch, source, t]);

  const editorClass =
    'w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-300">{t('tool.jsonPatch.intro')}</p>
        <button
          type="button"
          onClick={loadSample}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {t('common.loadSample')}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label
            htmlFor="json-patch-source"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.jsonPatch.source')}
          </label>
          <textarea
            id="json-patch-source"
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
              clearFeedback();
            }}
            maxLength={MAX_INPUT_LENGTH}
            rows={16}
            spellCheck={false}
            placeholder='{"name":"before"}'
            className={editorClass}
          />
        </div>
        <div>
          <label
            htmlFor="json-patch-target"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.jsonPatch.target')}
          </label>
          <textarea
            id="json-patch-target"
            value={target}
            onChange={(event) => {
              setTarget(event.target.value);
              clearFeedback();
            }}
            maxLength={MAX_INPUT_LENGTH}
            rows={16}
            spellCheck={false}
            placeholder='{"name":"after"}'
            className={editorClass}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={generate}
          className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          {t('tool.jsonPatch.generate')}
        </button>
        <button
          type="button"
          onClick={apply}
          disabled={!source.trim() || !patch.trim()}
          className="rounded-lg border border-primary-600 px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-primary-300 dark:hover:bg-primary-950/30"
        >
          {t('tool.jsonPatch.apply')}
        </button>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}
      {status ? (
        <p
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300"
        >
          {status}
        </p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="json-patch-operations"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.jsonPatch.patch')}
            </label>
            <CopyButton text={patch} />
          </div>
          <textarea
            id="json-patch-operations"
            value={patch}
            onChange={(event) => {
              setPatch(event.target.value);
              clearFeedback();
            }}
            maxLength={MAX_INPUT_LENGTH}
            rows={16}
            spellCheck={false}
            placeholder='[{"op":"replace","path":"/name","value":"after"}]'
            className={editorClass}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="json-patch-result"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.jsonPatch.result')}
            </label>
            <CopyButton text={result} />
          </div>
          <textarea
            id="json-patch-result"
            value={result}
            readOnly
            rows={16}
            aria-live="polite"
            placeholder={t('tool.jsonPatch.resultPlaceholder')}
            className={`${editorClass} bg-gray-50 dark:bg-gray-950`}
          />
        </div>
      </div>

      <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        {t('tool.jsonPatch.localNote')}
      </p>
    </div>
  );
}
