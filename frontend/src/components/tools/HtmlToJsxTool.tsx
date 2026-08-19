'use client';

import React, { useState, useMemo } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { convertHtmlToJsx } from '@/lib/htmlToJsx';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_HTML = `<div class="card" style="margin-top: 20px; background-color: #f8fafc;">
  <img src="avatar.png" class="avatar" for="user-img">
  <label class="form-label" for="user-input">Username</label>
  <input type="text" class="input" tabindex="1" autofocus>
</div>`;

export default function HtmlToJsxTool() {
  const { t } = useLanguage();
  const [htmlInput, setHtmlInput] = useState(SAMPLE_HTML);
  const [wrapComponent, setWrapComponent] = useState(true);
  const [componentName, setComponentName] = useState('MyComponent');
  const [copied, setCopied] = useState(false);

  const jsxOutput = useMemo(() => {
    return convertHtmlToJsx(htmlInput, {
      createFunctionComponent: wrapComponent,
      componentName,
    });
  }, [htmlInput, wrapComponent, componentName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.htmljsx.title') || 'HTML to JSX / React Converter'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={wrapComponent}
              onChange={(e) => setWrapComponent(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Wrap in React Function Component</span>
          </label>

          {wrapComponent && (
            <input
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              placeholder="ComponentName"
              className="px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 w-36"
            />
          )}
        </div>
      </div>

      {/* Grid: HTML in -> JSX out */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">HTML Input</span>
            <button
              onClick={() => setHtmlInput(SAMPLE_HTML)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="Paste your HTML template here..."
          />
        </div>

        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">JSX / React Code</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSX')}
            </button>
          </div>
          <textarea
            readOnly
            value={jsxOutput}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
