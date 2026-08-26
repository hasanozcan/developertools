'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, FileSpreadsheet, RefreshCw, Download } from 'lucide-react';
import { jsonToDelimitedText } from '@/lib/jsonToExcel';

const SAMPLE_JSON = JSON.stringify(
  [
    {
      orderId: 'ORD-9842',
      customer: 'Sarah Connor',
      itemsCount: 3,
      totalAmount: 249.99,
      status: 'shipped',
      deliveryDate: '2026-03-10',
    },
    {
      orderId: 'ORD-9843',
      customer: 'John Matrix',
      itemsCount: 1,
      totalAmount: 89.0,
      status: 'processing',
      deliveryDate: '2026-03-12',
    },
    {
      orderId: 'ORD-9844',
      customer: 'Ellen Ripley',
      itemsCount: 5,
      totalAmount: 512.45,
      status: 'delivered',
      deliveryDate: '2026-03-08',
    },
  ],
  null,
  2
);

export default function JsonToExcelTool() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [delimiter, setDelimiter] = useState<',' | '\t' | ';'>(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flattenNested, setFlattenNested] = useState(true);
  const [copied, setCopied] = useState(false);

  const { tableOutput, error } = useMemo(() => {
    if (!jsonInput.trim()) return { tableOutput: '', error: null };
    try {
      const res = jsonToDelimitedText(jsonInput, {
        delimiter,
        includeHeaders,
        flattenNested,
      });
      return { tableOutput: res, error: null };
    } catch (err: any) {
      return { tableOutput: '', error: err.message || 'Invalid JSON input' };
    }
  }, [jsonInput, delimiter, includeHeaders, flattenNested]);

  const handleCopy = () => {
    if (!tableOutput) return;
    navigator.clipboard.writeText(tableOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!tableOutput) return;
    const ext = delimiter === '\t' ? 'tsv' : 'csv';
    const mime = delimiter === '\t' ? 'text/tab-separated-values' : 'text/csv';
    const blob = new Blob([tableOutput], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spreadsheet.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Format:</span>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as any)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value=",">CSV (Comma Separated)</option>
              <option value="&#9;">TSV / Excel Clipboard (Tab Separated)</option>
              <option value=";">Semicolon Separated</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Include Headers
          </label>

          <label className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={flattenNested}
              onChange={(e) => setFlattenNested(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Flatten Nested Objects
          </label>
        </div>

        <button
          onClick={() => setJsonInput(SAMPLE_JSON)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> Load Sample JSON
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            JSON Array Input
          </span>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={15}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-500" /> Spreadsheet Table Output
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Cells'}
              </button>
            </div>
          </div>
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={tableOutput}
              placeholder="Table cells will appear here..."
              rows={15}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
