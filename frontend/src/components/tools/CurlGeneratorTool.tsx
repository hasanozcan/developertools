'use client';

import { useState, useCallback, useMemo } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { Plus, X, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function escapeShellString(str: string): string {
  // Escape single quotes by replacing with '\'' (end quote, escaped single quote, start new quote)
  return str.replace(/'/g, "'\\''");
}

export default function CurlGeneratorTool() {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [headers, setHeaders] = useState<KeyValuePair[]>([
    { id: generateId(), key: '', value: '' },
  ]);
  const [body, setBody] = useState('');
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>([
    { id: generateId(), key: '', value: '' },
  ]);
  const [includeContentType, setIncludeContentType] = useState(true);
  const [includeAccept, setIncludeAccept] = useState(false);
  const [contentType, setContentType] = useState('application/json');

  const addHeader = useCallback(() => {
    setHeaders((prev) => [...prev, { id: generateId(), key: '', value: '' }]);
  }, []);

  const removeHeader = useCallback((id: string) => {
    setHeaders((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const updateHeader = useCallback((id: string, field: 'key' | 'value', val: string) => {
    setHeaders((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: val } : h))
    );
  }, []);

  const addQueryParam = useCallback(() => {
    setQueryParams((prev) => [...prev, { id: generateId(), key: '', value: '' }]);
  }, []);

  const removeQueryParam = useCallback((id: string) => {
    setQueryParams((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQueryParam = useCallback((id: string, field: 'key' | 'value', val: string) => {
    setQueryParams((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  }, []);

  const resetAll = useCallback(() => {
    setUrl('');
    setMethod('GET');
    setHeaders([{ id: generateId(), key: '', value: '' }]);
    setBody('');
    setQueryParams([{ id: generateId(), key: '', value: '' }]);
    setIncludeContentType(true);
    setIncludeAccept(false);
    setContentType('application/json');
  }, []);

  const loadSample = useCallback(() => {
    setUrl('https://api.example.com/users');
    setMethod('POST');
    setHeaders([
      { id: generateId(), key: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
      { id: generateId(), key: 'X-Request-ID', value: 'abc-123-def' },
    ]);
    setBody('{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "active": true\n}');
    setQueryParams([
      { id: generateId(), key: 'page', value: '1' },
      { id: generateId(), key: 'limit', value: '10' },
    ]);
    setIncludeContentType(true);
    setIncludeAccept(true);
    setContentType('application/json');
  }, []);

  const curlCommand = useMemo(() => {
    if (!url.trim()) {
      return '';
    }

    const parts: string[] = ['curl'];

    // Add URL with query parameters
    let fullUrl = url.trim();
    const validParams = queryParams.filter((p) => p.key.trim() !== '');
    if (validParams.length > 0) {
      const queryString = validParams
        .map((p) => `${encodeURIComponent(p.key.trim())}=${encodeURIComponent(p.value.trim())}`)
        .join('&');
      fullUrl += fullUrl.includes('?') ? `&${queryString}` : `?${queryString}`;
    }

    // Escape the URL for shell
    parts.push(`'${escapeShellString(fullUrl)}'`);

    // Add method (only if not GET, as GET is default)
    if (method !== 'GET') {
      parts.push(`-X ${method}`);
    }

    // Collect headers
    const allHeaders: KeyValuePair[] = [...headers];

    // Add common headers
    if (includeContentType && contentType) {
      allHeaders.unshift({ id: 'common-content-type', key: 'Content-Type', value: contentType });
    }
    if (includeAccept) {
      allHeaders.unshift({ id: 'common-accept', key: 'Accept', value: '*/*' });
    }

    // Add header flags
    const validHeaders = allHeaders.filter((h) => h.key.trim() !== '');
    for (const header of validHeaders) {
      parts.push(`-H '${escapeShellString(header.key)}: ${escapeShellString(header.value)}'`);
    }

    // Add body for methods that support it
    if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) {
      parts.push(`-d '${escapeShellString(body)}'`);
    }

    return parts.join(' \\\n  ');
  }, [url, method, headers, body, queryParams, includeContentType, includeAccept, contentType]);

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 font-mono text-sm"
        />
      </div>

      {/* Method Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          HTTP Method
        </label>
        <div className="flex flex-wrap gap-2">
          {HTTP_METHODS.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                method === m
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-150 dark:hover:bg-gray-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Query Parameters */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Query Parameters
          </label>
          <button
            onClick={addQueryParam}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {queryParams.map((param) => (
            <div key={param.id} className="flex gap-2">
              <input
                type="text"
                value={param.key}
                onChange={(e) => updateQueryParam(param.id, 'key', e.target.value)}
                placeholder="Key"
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm"
              />
              <input
                type="text"
                value={param.value}
                onChange={(e) => updateQueryParam(param.id, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm"
              />
              <button
                onClick={() => removeQueryParam(param.id)}
                className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={queryParams.length === 1}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Headers */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Headers
          </label>
          <button
            onClick={addHeader}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {headers.map((header) => (
            <div key={header.id} className="flex gap-2">
              <input
                type="text"
                value={header.key}
                onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                placeholder="Header Name"
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm"
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                placeholder="Header Value"
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm"
              />
              <button
                onClick={() => removeHeader(header.id)}
                className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={headers.length === 1}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Common Headers Options */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeContentType}
            onChange={(e) => setIncludeContentType(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Content-Type</span>
        </label>
        {includeContentType && (
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="application/json">application/json</option>
            <option value="application/xml">application/xml</option>
            <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
            <option value="text/plain">text/plain</option>
            <option value="text/html">text/html</option>
          </select>
        )}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeAccept}
            onChange={(e) => setIncludeAccept(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Accept: */*</span>
        </label>
      </div>

      {/* Request Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Request Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='{"key": "value"}'
          rows={6}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 font-mono text-sm resize-none"
        />
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Generated cURL Command
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
        <div className="relative">
          <pre className="w-full p-4 bg-gray-900 dark:bg-gray-800 text-green-400 rounded-lg font-mono text-sm overflow-x-auto max-h-80 border border-gray-200 dark:border-gray-700">
            <code>{curlCommand || 'Enter a URL to generate a cURL command...'}</code>
          </pre>
          {curlCommand && (
            <div className="absolute top-3 right-3">
              <CopyButton text={curlCommand} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
