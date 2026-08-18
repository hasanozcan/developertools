'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Table as TableIcon } from 'lucide-react';
import { htmlTableToJson } from '@/lib/htmlTableToJson';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_HTML_TABLE = `<table>
  <thead>
    <tr>
      <th>User ID</th>
      <th>Full Name</th>
      <th>Email Address</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>101</td>
      <td>Sarah Connor</td>
      <td>sarah@skynet.com</td>
      <td>Security Lead</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>102</td>
      <td>John Doe</td>
      <td>john.doe@example.org</td>
      <td>Developer</td>
      <td>Pending</td>
    </tr>
    <tr>
      <td>103</td>
      <td>Jane Smith</td>
      <td>jane.smith@techcorp.io</td>
      <td>DevOps Engineer</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>`;

export default function HtmlTableToJsonTool() {
  const { t } = useLanguage();
  const [htmlInput, setHtmlInput] = useState(SAMPLE_HTML_TABLE);
  const [asObjects, setAsObjects] = useState(true);
  const [copied, setCopied] = useState(false);

  const { jsonOutput, error } = useMemo(() => {
    if (!htmlInput.trim()) return { jsonOutput: '', error: null };
    try {
      const data = htmlTableToJson(htmlInput, asObjects);
      return { jsonOutput: JSON.stringify(data, null, 2), error: null };
    } catch (err: any) {
      return { jsonOutput: '', error: err.message || 'Failed to parse HTML table' };
    }
  }, [htmlInput, asObjects]);

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Options Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TableIcon className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.htmltable.outputFormat') || 'Output Format'}:
          </span>
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-900">
            <button
              onClick={() => setAsObjects(true)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                asObjects
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Objects (Array of Objects)
            </button>
            <button
              onClick={() => setAsObjects(false)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                !asObjects
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2D Array (Rows &amp; Columns)
            </button>
          </div>
        </div>

        <button
          onClick={() => setHtmlInput(SAMPLE_HTML_TABLE)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {t('common.loadSample') || 'Load Sample'}
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HTML Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            HTML Table Markup
          </span>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="<table>...</table>"
          />
        </div>

        {/* JSON Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Parsed JSON Output
            </span>
            {jsonOutput && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSON')}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                  title="Download JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={jsonOutput}
              rows={14}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400 resize-y"
              placeholder="// JSON array will appear here..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
