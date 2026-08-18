'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Grid as GridIcon } from 'lucide-react';
import { generateCssGrid } from '@/lib/cssGrid';
import { useLanguage } from '@/context/LanguageContext';

export default function CssGridGeneratorTool() {
  const { t } = useLanguage();
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [colUnit, setColUnit] = useState<'fr' | 'px' | '%'>('fr');
  const [rowUnit, setRowUnit] = useState<'fr' | 'px' | 'auto'>('fr');
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const { css, html } = useMemo(() => {
    return generateCssGrid({
      columns,
      rows,
      columnGap,
      rowGap,
      colUnit,
      rowUnit,
    });
  }, [columns, rows, columnGap, rowGap, colUnit, rowUnit]);

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <GridIcon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.grid.matrixConfig') || 'Grid Matrix & Gap Configuration'}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{t('tool.grid.columns') || 'Columns'}</span>
              <span className="font-mono">{columns}</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{t('tool.grid.rows') || 'Rows'}</span>
              <span className="font-mono">{rows}</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Column Gap</span>
              <span className="font-mono">{columnGap}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={columnGap}
              onChange={(e) => setColumnGap(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Row Gap</span>
              <span className="font-mono">{rowGap}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={rowGap}
              onChange={(e) => setRowGap(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Visual Interactive Grid Preview */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {t('tool.grid.livePreview') || 'Live Visual Grid Preview'}
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 64px)`,
            columnGap: `${columnGap}px`,
            rowGap: `${rowGap}px`,
          }}
          className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 min-h-[200px]"
        >
          {Array.from({ length: columns * rows }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shadow-xs transition hover:scale-[1.02]"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Generated Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSS */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              CSS Grid Rules
            </span>
            <button
              onClick={() => copyText(css, setCopiedCss)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCss ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
            </button>
          </div>
          <textarea
            readOnly
            value={css}
            rows={8}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
          />
        </div>

        {/* HTML */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HTML Structure
            </span>
            <button
              onClick={() => copyText(html, setCopiedHtml)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedHtml ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy HTML')}
            </button>
          </div>
          <textarea
            readOnly
            value={html}
            rows={8}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
