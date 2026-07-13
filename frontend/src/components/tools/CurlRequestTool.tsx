'use client';

import { useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';
import {
  generateCurl,
  generateFetch,
  parseCurlCommand,
  type CurlRequestInput,
  type ParsedCurlRequest,
  type RequestHeader,
  type RequestQueryParameter,
} from '@/lib/curlRequest';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
const SAMPLE_CURL = [
  'curl --request POST \\',
  "  --url 'https://api.example.com/v1/items?limit=10' \\",
  "  --header 'Content-Type: application/json' \\",
  "  --header 'Authorization: Bearer example-secret' \\",
  '  --data-raw \'{"name":"Ada"}\' \\',
  '  --location --compressed',
].join('\n');

function indexedLabel(template: string, index: number): string {
  return template.replace('{index}', String(index + 1));
}

function activeRows<T extends RequestHeader | RequestQueryParameter>(rows: readonly T[]): T[] {
  return rows.filter((row) => row.name !== '' || row.value !== '');
}

export default function CurlRequestTool() {
  const { t } = useLanguage();
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('https://api.example.com/v1/items');
  const [query, setQuery] = useState<RequestQueryParameter[]>([{ name: 'limit', value: '10' }]);
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { name: 'Content-Type', value: 'application/json' },
    { name: 'Authorization', value: 'Bearer example-secret' },
  ]);
  const [body, setBody] = useState('{\n  "name": "Ada"\n}');
  const [followRedirects, setFollowRedirects] = useState(true);
  const [compressed, setCompressed] = useState(true);
  const [redactSensitiveHeaders, setRedactSensitiveHeaders] = useState(true);
  const [pastedCurl, setPastedCurl] = useState(SAMPLE_CURL);
  const [parsedRequest, setParsedRequest] = useState<ParsedCurlRequest | null>(null);
  const [converterError, setConverterError] = useState<string | null>(null);

  const request = useMemo<CurlRequestInput>(
    () => ({
      method,
      url,
      query: activeRows(query),
      headers: activeRows(headers),
      ...(body !== '' ? { body } : {}),
      followRedirects,
      compressed,
    }),
    [body, compressed, followRedirects, headers, method, query, url],
  );

  const builderResult = useMemo(() => {
    let curl = '';
    let fetch = '';
    let curlError: string | null = null;
    let fetchError: string | null = null;
    const options = { redactSensitiveHeaders };

    try {
      curl = generateCurl(request, options);
    } catch {
      curlError = t('tool.curl.error');
    }
    try {
      fetch = generateFetch(request, options);
    } catch {
      fetchError = t('tool.curl.error');
    }

    return { curl, fetch, curlError, fetchError };
  }, [redactSensitiveHeaders, request, t]);

  const convertedFetch = useMemo(
    () => (parsedRequest ? generateFetch(parsedRequest, { redactSensitiveHeaders }) : ''),
    [parsedRequest, redactSensitiveHeaders],
  );

  const updateQuery = (index: number, field: keyof RequestQueryParameter, value: string) => {
    setQuery((rows) =>
      rows.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)),
    );
  };

  const updateHeader = (index: number, field: keyof RequestHeader, value: string) => {
    setHeaders((rows) =>
      rows.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)),
    );
  };

  const convertPastedCurl = () => {
    try {
      const parsed = parseCurlCommand(pastedCurl);
      generateFetch(parsed, { redactSensitiveHeaders });
      setParsedRequest(parsed);
      setConverterError(null);
    } catch {
      setParsedRequest(null);
      setConverterError(t('tool.curl.error'));
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">
        <strong>{t('tool.curl.localTitle')}</strong> {t('tool.curl.localDescription')}
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <input
          type="checkbox"
          checked={redactSensitiveHeaders}
          onChange={(event) => setRedactSensitiveHeaders(event.target.checked)}
          className="mt-0.5 rounded border-gray-300 text-primary-600"
        />
        <span>
          <span className="block text-sm font-medium text-gray-900 dark:text-white">
            {t('tool.curl.redactTitle')}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {t('tool.curl.redactDescription')}
          </span>
        </span>
      </label>

      {!redactSensitiveHeaders && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          {t('tool.curl.redactionWarning')}
        </div>
      )}

      <section className="space-y-5" aria-labelledby="curl-builder-heading">
        <div>
          <h2
            id="curl-builder-heading"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {t('tool.curl.builderTitle')}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('tool.curl.builderDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[10rem_1fr]">
          <div>
            <label
              htmlFor="curl-method"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.curl.method')}
            </label>
            <select
              id="curl-method"
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            >
              {METHODS.map((candidate) => (
                <option key={candidate}>{candidate}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="curl-url"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('tool.curl.url')}
            </label>
            <input
              id="curl-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.curl.queryParameters')}
            </h3>
            <button
              type="button"
              onClick={() => setQuery((rows) => [...rows, { name: '', value: '' }])}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {t('tool.curl.addParameter')}
            </button>
          </div>
          {query.map((row, index) => (
            <div key={`query-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                aria-label={indexedLabel(t('tool.curl.queryNameAria'), index)}
                placeholder={t('tool.curl.namePlaceholder')}
                value={row.name}
                onChange={(event) => updateQuery(index, 'name', event.target.value)}
                className="min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <input
                aria-label={indexedLabel(t('tool.curl.queryValueAria'), index)}
                placeholder={t('tool.curl.valuePlaceholder')}
                value={row.value}
                onChange={(event) => updateQuery(index, 'value', event.target.value)}
                className="min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <button
                type="button"
                aria-label={indexedLabel(t('tool.curl.removeQueryAria'), index)}
                onClick={() => setQuery((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}
                className="rounded-lg border border-gray-300 px-3 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.curl.headers')}
            </h3>
            <button
              type="button"
              onClick={() => setHeaders((rows) => [...rows, { name: '', value: '' }])}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {t('tool.curl.addHeader')}
            </button>
          </div>
          {headers.map((row, index) => (
            <div key={`header-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                aria-label={indexedLabel(t('tool.curl.headerNameAria'), index)}
                placeholder="Content-Type"
                value={row.name}
                onChange={(event) => updateHeader(index, 'name', event.target.value)}
                className="min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <input
                aria-label={indexedLabel(t('tool.curl.headerValueAria'), index)}
                placeholder="application/json"
                value={row.value}
                onChange={(event) => updateHeader(index, 'value', event.target.value)}
                className="min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <button
                type="button"
                aria-label={indexedLabel(t('tool.curl.removeHeaderAria'), index)}
                onClick={() =>
                  setHeaders((rows) => rows.filter((_, rowIndex) => rowIndex !== index))
                }
                className="rounded-lg border border-gray-300 px-3 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('tool.curl.bodyLabel')}
          </label>
          <CodeEditor
            value={body}
            onChange={setBody}
            language="text"
            placeholder={t('tool.curl.bodyPlaceholder')}
            minHeight="140px"
          />
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-gray-700 dark:text-gray-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={followRedirects}
              onChange={(event) => setFollowRedirects(event.target.checked)}
              className="rounded border-gray-300 text-primary-600"
            />
            {t('tool.curl.followRedirects')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={compressed}
              onChange={(event) => setCompressed(event.target.checked)}
              className="rounded border-gray-300 text-primary-600"
            />
            {t('tool.curl.compressedResponses')}
          </label>
        </div>

        {(builderResult.curlError || builderResult.fetchError) && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
          >
            {builderResult.curlError && (
              <p>
                {t('tool.curl.curlLabel')}: {builderResult.curlError}
              </p>
            )}
            {builderResult.fetchError && (
              <p>
                {t('tool.curl.fetchLabel')}: {builderResult.fetchError}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.curl.curlLabel')}
            </label>
            <CodeEditor
              value={builderResult.curl}
              onChange={() => {}}
              readOnly
              language="bash"
              placeholder={t('tool.curl.outputPlaceholder')}
              minHeight="280px"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.curl.fetchLabel')}
            </label>
            <CodeEditor
              value={builderResult.fetch}
              onChange={() => {}}
              readOnly
              language="javascript"
              placeholder={t('tool.curl.outputPlaceholder')}
              minHeight="280px"
            />
          </div>
        </div>
      </section>

      <section
        className="space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700"
        aria-labelledby="curl-converter-heading"
      >
        <div>
          <h2
            id="curl-converter-heading"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {t('tool.curl.converterTitle')}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('tool.curl.converterDescription')}
          </p>
        </div>
        <CodeEditor
          value={pastedCurl}
          onChange={(value) => {
            setPastedCurl(value);
            setParsedRequest(null);
            setConverterError(null);
          }}
          language="bash"
          placeholder={t('tool.curl.pastePlaceholder')}
          minHeight="220px"
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={convertPastedCurl}
            className="rounded-lg bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700"
          >
            {t('tool.curl.convert')}
          </button>
          <button
            type="button"
            onClick={() => {
              setPastedCurl(SAMPLE_CURL);
              setParsedRequest(null);
              setConverterError(null);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t('common.loadSample')}
          </button>
          <button
            type="button"
            onClick={() => {
              setPastedCurl('');
              setParsedRequest(null);
              setConverterError(null);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t('common.clear')}
          </button>
        </div>
        {converterError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
          >
            {converterError}
          </div>
        )}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('tool.curl.convertedFetch')}
          </label>
          <CodeEditor
            value={convertedFetch}
            onChange={() => {}}
            readOnly
            language="javascript"
            placeholder={t('tool.curl.convertedPlaceholder')}
            minHeight="260px"
          />
        </div>
      </section>
    </div>
  );
}
