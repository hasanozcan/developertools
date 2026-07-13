'use client';

import { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  analyzeCsp,
  formatCsp,
  parseCsp,
  setCspDirective,
  type CspDirective,
} from '@/lib/contentSecurityPolicy';

const presets: Record<string, string> = {
  'Strict app':
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
  'Static site':
    "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'",
  'Report first':
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; report-to csp-endpoint",
};

const directiveSuggestions = [
  'default-src',
  'script-src',
  'style-src',
  'img-src',
  'font-src',
  'connect-src',
  'media-src',
  'worker-src',
  'object-src',
  'base-uri',
  'frame-ancestors',
  'form-action',
  'upgrade-insecure-requests',
];

export default function CspBuilderTool() {
  const [input, setInput] = useState(presets['Strict app']);
  const [directiveName, setDirectiveName] = useState('script-src');
  const [directiveValues, setDirectiveValues] = useState("'self'");
  const [builderError, setBuilderError] = useState('');

  const result = useMemo(() => {
    try {
      const directives = parseCsp(input);
      return {
        directives,
        normalized: formatCsp(directives),
        findings: analyzeCsp(directives),
        error: '',
      };
    } catch (error) {
      return {
        directives: [] as CspDirective[],
        normalized: '',
        findings: [],
        error: error instanceof Error ? error.message : 'Invalid CSP header value.',
      };
    }
  }, [input]);

  const applyDirective = () => {
    try {
      const base = result.directives.length ? result.directives : parseCsp("default-src 'self'");
      const values = directiveValues.trim() ? directiveValues.trim().split(/\s+/) : [];
      setInput(formatCsp(setCspDirective(base, directiveName, values)));
      setBuilderError('');
    } catch (error) {
      setBuilderError(error instanceof Error ? error.message : 'Unable to update the directive.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="csp-policy"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Content-Security-Policy header value
        </label>
        <textarea
          id="csp-policy"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={7}
          spellCheck={false}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([label, value]) => (
          <button
            key={label}
            type="button"
            onClick={() => setInput(value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70">
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          Add or replace a directive
        </h3>
        <div className="grid gap-3 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)_auto]">
          <div>
            <label htmlFor="csp-directive" className="sr-only">
              Directive
            </label>
            <input
              id="csp-directive"
              list="csp-directive-suggestions"
              value={directiveName}
              onChange={(event) => setDirectiveName(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
            <datalist id="csp-directive-suggestions">
              {directiveSuggestions.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="csp-values" className="sr-only">
              Space-separated directive values
            </label>
            <input
              id="csp-values"
              value={directiveValues}
              onChange={(event) => setDirectiveValues(event.target.value)}
              placeholder="'self' https://cdn.example.com"
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <button
            type="button"
            onClick={applyDirective}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Apply
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Leave values empty for valueless directives such as upgrade-insecure-requests.
        </p>
        {builderError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-300">{builderError}</p>
        )}
      </div>

      {result.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {result.error}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Normalized policy
          </span>
          <CopyButton text={result.normalized} />
        </div>
        <code className="block break-words text-sm text-gray-900 dark:text-white">
          {result.normalized || 'Enter a valid policy.'}
        </code>
      </div>

      {result.findings.length > 0 && (
        <section aria-labelledby="csp-findings-heading">
          <h3
            id="csp-findings-heading"
            className="mb-3 font-semibold text-gray-900 dark:text-white"
          >
            Analysis
          </h3>
          <div className="space-y-2">
            {result.findings.map((finding) => (
              <div
                key={`${finding.severity}-${finding.message}`}
                className={`rounded-lg border p-3 text-sm ${
                  finding.severity === 'high'
                    ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200'
                    : finding.severity === 'medium'
                      ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                      : 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                }`}
              >
                <span className="mr-2 font-semibold uppercase">{finding.severity}</span>
                {finding.message}
              </div>
            ))}
          </div>
        </section>
      )}

      {result.directives.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Directive</th>
                <th className="px-4 py-3">Sources or values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {result.directives.map((directive, index) => (
                <tr key={`${directive.name}-${index}`}>
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                    {directive.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">
                    {directive.values.join(' ') || 'flag'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        This is a baseline static analysis, not a browser compatibility or application-flow proof.
        Start with Content-Security-Policy-Report-Only and test every required resource before
        enforcement.
      </p>
    </div>
  );
}
