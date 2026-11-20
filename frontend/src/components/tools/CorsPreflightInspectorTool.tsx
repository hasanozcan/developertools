'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { inspectCorsPreflight } from '@/lib/corsPreflightInspector';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

export default function CorsPreflightInspectorTool() {
  const { t } = useLanguage();
  const [requestOrigin, setRequestOrigin] = useState('https://devstools.app');
  const [requestMethod, setRequestMethod] = useState('POST');
  const [requestHeadersInput, setRequestHeadersInput] = useState('Content-Type, Authorization');

  const [allowOrigin, setAllowOrigin] = useState('https://devstools.app');
  const [allowCredentials, setAllowCredentials] = useState(true);
  const [allowMethodsInput, setAllowMethodsInput] = useState(
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  const [allowHeadersInput, setAllowHeadersInput] = useState('Content-Type, Authorization');

  const report = useMemo(
    () =>
      inspectCorsPreflight({
        requestOrigin,
        requestMethod,
        requestHeaders: requestHeadersInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        allowOrigin,
        allowCredentials,
        allowMethods: allowMethodsInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        allowHeaders: allowHeadersInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    [
      requestOrigin,
      requestMethod,
      requestHeadersInput,
      allowOrigin,
      allowCredentials,
      allowMethodsInput,
      allowHeadersInput,
    ],
  );

  const output = useMemo(() => JSON.stringify(report, null, 2), [report]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Browser Request (Preflight)
          </h3>

          <div className="space-y-1">
            <label htmlFor="cors-req-origin" className="block text-xs font-semibold">
              {t('uiText.b639b336')}
            </label>
            <input
              id="cors-req-origin"
              type="text"
              value={requestOrigin}
              onChange={(e) => setRequestOrigin(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="cors-req-method" className="block text-xs font-semibold">
              Access-Control-Request-Method
            </label>
            <select
              id="cors-req-method"
              value={requestMethod}
              onChange={(e) => setRequestMethod(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="cors-req-headers" className="block text-xs font-semibold">
              Access-Control-Request-Headers (comma-separated)
            </label>
            <input
              id="cors-req-headers"
              type="text"
              value={requestHeadersInput}
              onChange={(e) => setRequestHeadersInput(e.target.value)}
              placeholder="Content-Type, Authorization"
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="surface-card rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Server CORS Response Headers
          </h3>

          <div className="space-y-1">
            <label htmlFor="cors-allow-origin" className="block text-xs font-semibold">
              Access-Control-Allow-Origin
            </label>
            <input
              id="cors-allow-origin"
              type="text"
              value={allowOrigin}
              onChange={(e) => setAllowOrigin(e.target.value)}
              placeholder="https://devstools.app or *"
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="cors-allow-methods" className="block text-xs font-semibold">
              Access-Control-Allow-Methods
            </label>
            <input
              id="cors-allow-methods"
              type="text"
              value={allowMethodsInput}
              onChange={(e) => setAllowMethodsInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="cors-allow-headers" className="block text-xs font-semibold">
              Access-Control-Allow-Headers
            </label>
            <input
              id="cors-allow-headers"
              type="text"
              value={allowHeadersInput}
              onChange={(e) => setAllowHeadersInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={allowCredentials}
              onChange={(e) => setAllowCredentials(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Access-Control-Allow-Credentials: true
          </label>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold">{t('uiText.ab6b153b')}</span>
            {report.allowed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Preflight Passed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300">
                <ShieldAlert className="h-3.5 w-3.5" />
                Blocked by Browser CORS
              </span>
            )}
          </div>
          <CopyButton text={output} />
        </div>

        <ul className="space-y-2">
          {report.checks.map((check) => (
            <li
              key={check.id}
              className={`rounded-xl border p-3 text-xs ${
                check.passed
                  ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                  : 'border-red-200 bg-red-50/70 dark:border-red-900/50 dark:bg-red-950/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 font-semibold">
                <span className="font-mono">{check.label}</span>
                <span
                  className={
                    check.passed
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-red-700 dark:text-red-300'
                  }
                >
                  {check.passed ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{check.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
