'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { analyzeOpenApi, type OpenApiAnalysis } from '@/lib/openApi';

const MAX_INPUT_LENGTH = 1_000_000;
const SAMPLE = `openapi: 3.1.0
info:
  title: Users API
  version: 1.0.0
servers:
  - url: https://api.example.test
paths:
  /users:
    get:
      operationId: listUsers
      summary: List users
      tags: [users]
      responses:
        '200':
          description: User list
    post:
      operationId: createUser
      summary: Create a user
      tags: [users]
      responses:
        '201':
          description: Created
  /users/{id}:
    get:
      operationId: getUser
      summary: Read one user
      tags: [users]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Found
        '404':
          description: Missing
`;

export default function OpenApiValidatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<OpenApiAnalysis | null>(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const deferredQuery = useDeferredValue(query);

  const runAnalysis = useCallback(() => {
    try {
      setAnalysis(analyzeOpenApi(input));
      setError('');
      setQuery('');
      setMethodFilter('ALL');
    } catch (analysisError) {
      setAnalysis(null);
      setError(
        analysisError instanceof Error ? analysisError.message : 'OpenAPI validation failed.',
      );
    }
  }, [input]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE);
    setAnalysis(null);
    setError('');
  }, []);

  const methods = useMemo(
    () => [...new Set(analysis?.endpoints.map((endpoint) => endpoint.method) ?? [])].sort(),
    [analysis],
  );
  const filteredEndpoints = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase();
    return (analysis?.endpoints ?? []).filter((endpoint) => {
      const matchesMethod = methodFilter === 'ALL' || endpoint.method === methodFilter;
      const haystack =
        `${endpoint.path} ${endpoint.summary} ${endpoint.operationId} ${endpoint.tags.join(' ')}`.toLocaleLowerCase();
      return matchesMethod && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [analysis, deferredQuery, methodFilter]);

  const errors = analysis?.messages.filter((message) => message.level === 'error') ?? [];
  const warnings = analysis?.messages.filter((message) => message.level === 'warning') ?? [];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor="openapi-input"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('tool.openapi.input')}
          </label>
          <button
            type="button"
            onClick={loadSample}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <textarea
          id="openapi-input"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setAnalysis(null);
            setError('');
          }}
          maxLength={MAX_INPUT_LENGTH}
          rows={20}
          spellCheck={false}
          placeholder={'openapi: 3.1.0\ninfo:\n  title: Example API\n  version: 1.0.0\npaths: {}'}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {t('tool.openapi.inputHelp')}
        </p>
      </div>

      <button
        type="button"
        onClick={runAnalysis}
        disabled={!input.trim()}
        className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t('tool.openapi.analyze')}
      </button>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}

      {analysis ? (
        <div className="space-y-6" aria-live="polite">
          <div
            role="status"
            className={`rounded-lg border p-4 font-semibold ${
              analysis.valid
                ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300'
                : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300'
            }`}
          >
            {analysis.valid ? t('tool.openapi.valid') : t('tool.openapi.invalid')}
          </div>

          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              [t('tool.openapi.format'), analysis.format],
              [t('tool.openapi.version'), analysis.version || '—'],
              [t('tool.openapi.paths'), analysis.stats.paths],
              [t('tool.openapi.operations'), analysis.stats.operations],
              [t('tool.openapi.tags'), analysis.stats.tags],
              [t('tool.openapi.errors'), errors.length],
              [t('tool.openapi.warnings'), warnings.length],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-900"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {label}
                </dt>
                <dd className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="openapi-endpoints-heading" className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="openapi-endpoints-heading"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {t('tool.openapi.explorer')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{analysis.title}</p>
              </div>
              <div className="flex w-full flex-wrap gap-2 md:w-auto">
                <label className="min-w-0 flex-1 md:w-64">
                  <span className="sr-only">{t('tool.openapi.search')}</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('tool.openapi.search')}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </label>
                <label>
                  <span className="sr-only">{t('tool.openapi.methodFilter')}</span>
                  <select
                    value={methodFilter}
                    onChange={(event) => setMethodFilter(event.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="ALL">{t('tool.openapi.allMethods')}</option>
                    {methods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm dark:divide-gray-700">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">{t('tool.openapi.method')}</th>
                    <th className="px-4 py-3">{t('tool.openapi.path')}</th>
                    <th className="px-4 py-3">{t('tool.openapi.summary')}</th>
                    <th className="px-4 py-3">{t('tool.openapi.operationId')}</th>
                    <th className="px-4 py-3">{t('tool.openapi.responses')}</th>
                    <th className="px-4 py-3">{t('tool.openapi.security')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredEndpoints.map((endpoint) => (
                    <tr
                      key={`${endpoint.method}-${endpoint.path}`}
                      className="text-gray-700 dark:text-gray-200"
                    >
                      <td className="px-4 py-3 font-bold text-primary-700 dark:text-primary-300">
                        {endpoint.method}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono">{endpoint.path}</td>
                      <td className="min-w-48 px-4 py-3">
                        {endpoint.summary || '—'}
                        {endpoint.deprecated ? ` · ${t('tool.openapi.deprecated')}` : ''}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{endpoint.operationId || '—'}</td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {endpoint.responseCodes.join(', ') || '—'}
                      </td>
                      <td className="px-4 py-3">
                        {t(`tool.openapi.security.${endpoint.security}`)}
                      </td>
                    </tr>
                  ))}
                  {filteredEndpoints.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        {t('tool.openapi.noEndpoints')}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="openapi-messages-heading">
            <h2
              id="openapi-messages-heading"
              className="mb-3 text-lg font-semibold text-gray-900 dark:text-white"
            >
              {t('tool.openapi.messages')}
            </h2>
            {analysis.messages.length === 0 ? (
              <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-300">
                {t('tool.openapi.noMessages')}
              </p>
            ) : (
              <ul className="space-y-2">
                {analysis.messages.map((message, index) => (
                  <li
                    key={`${message.code}-${message.path}-${index}`}
                    className={`rounded-lg border p-3 text-sm ${message.level === 'error' ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300' : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300'}`}
                  >
                    <span className="font-semibold">{message.level.toUpperCase()}</span> ·{' '}
                    <code>{message.path || '/'}</code> · {message.message}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {analysis.normalizedJson ? (
            <details className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
                {t('tool.openapi.normalized')}
              </summary>
              <div className="mt-4 flex justify-end">
                <CopyButton text={analysis.normalizedJson} />
              </div>
              <pre className="mt-2 max-h-96 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-800 dark:bg-gray-950 dark:text-gray-200">
                {analysis.normalizedJson}
              </pre>
            </details>
          ) : null}
        </div>
      ) : null}

      <p className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        {t('tool.openapi.boundary')}
      </p>
    </div>
  );
}
