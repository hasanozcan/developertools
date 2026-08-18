'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Code2, Layers, CheckSquare, Square } from 'lucide-react';
import { convertSvgToJsx } from '@/lib/svgConverter';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" />
  <path d="m4.93 4.93 4.24 4.24" />
  <path d="m14.83 9.17 4.24-4.24" />
  <path d="m14.83 14.83 4.24 4.24" />
  <path d="m9.17 14.83-4.24 4.24" />
  <circle cx="12" cy="12" r="4" />
</svg>`;

export default function SvgToJsxTool() {
  const { t } = useLanguage();
  const [svgInput, setSvgInput] = useState(SAMPLE_SVG);
  const [componentName, setComponentName] = useState('IconComponent');
  const [typescript, setTypescript] = useState(true);
  const [namedExport, setNamedExport] = useState(false);
  const [forwardRef, setForwardRef] = useState(false);
  const [spreadProps, setSpreadProps] = useState(true);
  const [iconMode, setIconMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!svgInput.trim()) {
      return { output: '', error: null };
    }
    try {
      const res = convertSvgToJsx(svgInput, {
        componentName,
        typescript,
        namedExport,
        forwardRef,
        spreadProps,
        iconMode,
      });
      return { output: res, error: null };
    } catch (err: any) {
      return { output: '', error: err.message || 'Error converting SVG' };
    }
  }, [svgInput, componentName, typescript, namedExport, forwardRef, spreadProps, iconMode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Component Name
          </label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            placeholder="IconComponent"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={typescript}
              onChange={(e) => setTypescript(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            TypeScript (TSX)
          </label>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={forwardRef}
              onChange={(e) => setForwardRef(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            forwardRef
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={spreadProps}
              onChange={(e) => setSpreadProps(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            {'{...props}'} Spread
          </label>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={iconMode}
              onChange={(e) => setIconMode(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Icon Mode (1em)
          </label>
        </div>

        <div className="flex items-center justify-end">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={namedExport}
              onChange={(e) => setNamedExport(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Named Export
          </label>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SVG Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Raw SVG Input
            </span>
            <button
              onClick={() => setSvgInput(SAMPLE_SVG)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Load Sample
            </button>
          </div>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            placeholder="<svg ...>...</svg>"
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        {/* JSX Output */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              React JSX / TSX Output
            </span>
            {output && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300 dark:hover:bg-indigo-400/20"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy JSX'}
              </button>
            )}
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder="React component will appear here..."
              rows={14}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
