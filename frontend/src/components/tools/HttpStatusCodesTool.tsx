'use client';

import { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

type StatusCategory = '1xx' | '2xx' | '3xx' | '4xx' | '5xx';

type StatusCodeItem = {
  code: number;
  label: string;
  description: string;
  category: StatusCategory;
};

const statusCodes: StatusCodeItem[] = [
  { code: 100, label: 'Continue', description: 'Request received, continue sending body.', category: '1xx' },
  { code: 101, label: 'Switching Protocols', description: 'Server is switching protocols.', category: '1xx' },
  { code: 102, label: 'Processing', description: 'Server accepted and is processing request.', category: '1xx' },
  { code: 200, label: 'OK', description: 'Request completed successfully.', category: '2xx' },
  { code: 201, label: 'Created', description: 'Resource was created successfully.', category: '2xx' },
  { code: 202, label: 'Accepted', description: 'Request accepted for asynchronous processing.', category: '2xx' },
  { code: 204, label: 'No Content', description: 'Request succeeded, no response body.', category: '2xx' },
  { code: 206, label: 'Partial Content', description: 'Partial response due to range header.', category: '2xx' },
  { code: 301, label: 'Moved Permanently', description: 'Resource moved to a new permanent URL.', category: '3xx' },
  { code: 302, label: 'Found', description: 'Resource temporarily available at another URL.', category: '3xx' },
  { code: 303, label: 'See Other', description: 'Use GET for the redirected resource.', category: '3xx' },
  { code: 304, label: 'Not Modified', description: 'Cached version is still valid.', category: '3xx' },
  { code: 307, label: 'Temporary Redirect', description: 'Temporary redirect preserving method.', category: '3xx' },
  { code: 308, label: 'Permanent Redirect', description: 'Permanent redirect preserving method.', category: '3xx' },
  { code: 400, label: 'Bad Request', description: 'Request could not be understood by server.', category: '4xx' },
  { code: 401, label: 'Unauthorized', description: 'Authentication is required.', category: '4xx' },
  { code: 403, label: 'Forbidden', description: 'Authenticated but not authorized.', category: '4xx' },
  { code: 404, label: 'Not Found', description: 'Requested resource could not be found.', category: '4xx' },
  { code: 405, label: 'Method Not Allowed', description: 'HTTP method is not allowed for endpoint.', category: '4xx' },
  { code: 408, label: 'Request Timeout', description: 'Server timed out waiting for request.', category: '4xx' },
  { code: 409, label: 'Conflict', description: 'Request conflicts with current resource state.', category: '4xx' },
  { code: 410, label: 'Gone', description: 'Resource no longer exists.', category: '4xx' },
  { code: 413, label: 'Payload Too Large', description: 'Request body exceeds server limit.', category: '4xx' },
  { code: 415, label: 'Unsupported Media Type', description: 'Payload format is not supported.', category: '4xx' },
  { code: 422, label: 'Unprocessable Content', description: 'Request format is valid but semantic validation failed.', category: '4xx' },
  { code: 429, label: 'Too Many Requests', description: 'Client sent too many requests in a short time.', category: '4xx' },
  { code: 500, label: 'Internal Server Error', description: 'Unexpected server-side error occurred.', category: '5xx' },
  { code: 501, label: 'Not Implemented', description: 'Server does not support request functionality.', category: '5xx' },
  { code: 502, label: 'Bad Gateway', description: 'Invalid response from upstream server.', category: '5xx' },
  { code: 503, label: 'Service Unavailable', description: 'Server temporarily unavailable or overloaded.', category: '5xx' },
  { code: 504, label: 'Gateway Timeout', description: 'Upstream server did not respond in time.', category: '5xx' },
];

const categoryLabels: Record<StatusCategory | 'all', string> = {
  all: 'All',
  '1xx': '1xx Informational',
  '2xx': '2xx Success',
  '3xx': '3xx Redirection',
  '4xx': '4xx Client Error',
  '5xx': '5xx Server Error',
};

export default function HttpStatusCodesTool() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<StatusCategory | 'all'>('all');
  const translatedCategory = t('common.category');
  const categoryLabel = translatedCategory === 'common.category' ? 'Category' : translatedCategory;

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return statusCodes.filter((status) => {
      const categoryMatch = category === 'all' || status.category === category;
      const searchMatch =
        normalized.length === 0 ||
        String(status.code).includes(normalized) ||
        status.label.toLowerCase().includes(normalized) ||
        status.description.toLowerCase().includes(normalized);

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find by code, title, or description..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {categoryLabel}
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as StatusCategory | 'all')}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filtered.length} result{filtered.length === 1 ? '' : 's'}
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Code</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Description</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Copy</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((status) => (
              <tr key={status.code} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">{status.code}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{status.label}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{status.description}</td>
                <td className="px-4 py-3">
                  <CopyButton text={`${status.code} ${status.label}`} className="text-xs px-2 py-1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
