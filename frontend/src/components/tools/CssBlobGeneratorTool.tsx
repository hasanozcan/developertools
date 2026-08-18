'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Shuffle, Sparkles } from 'lucide-react';
import { generateRandomBlobRadius, generateBlob } from '@/lib/cssBlob';
import { useLanguage } from '@/context/LanguageContext';

export default function CssBlobGeneratorTool() {
  const { t } = useLanguage();
  const [borderRadius, setBorderRadius] = useState('30% 70% 70% 30% / 30% 30% 70% 70%');
  const [color, setColor] = useState('#6366F1');
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const result = useMemo(() => {
    return generateBlob(borderRadius, color);
  }, [borderRadius, color]);

  const randomize = () => {
    setBorderRadius(generateRandomBlobRadius());
  };

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const downloadSvg = () => {
    const blob = new Blob([result.svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organic_blob.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Live Blob Canvas */}
      <div className="surface-card rounded-3xl p-10 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-white/5">
        <div
          style={{
            borderRadius: result.borderRadius,
            backgroundColor: color,
            width: '260px',
            height: '260px',
            transition: 'border-radius 0.5s ease, background-color 0.3s ease',
          }}
          className="shadow-2xl shadow-indigo-500/30 flex items-center justify-center text-white"
        >
          <Sparkles className="w-8 h-8 opacity-80 animate-pulse" />
        </div>

        <button
          onClick={randomize}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition active:scale-95"
        >
          <Shuffle className="w-4 h-4" />
          {t('tool.blob.randomize') || 'Generate Random Shape'}
        </button>
      </div>

      {/* Settings Form */}
      <div className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.blob.color') || 'Blob Color'}:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-28 px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <button
          onClick={downloadSvg}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 transition"
        >
          <Download className="w-3.5 h-3.5" />
          {t('tool.blob.downloadSvg') || 'Download SVG Vector'}
        </button>
      </div>

      {/* Code Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSS border-radius */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              CSS border-radius
            </span>
            <button
              onClick={() => copyText(result.css, setCopiedCss)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCss ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
            </button>
          </div>
          <textarea
            readOnly
            value={result.css}
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
          />
        </div>

        {/* SVG Code */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Raw SVG Vector Code
            </span>
            <button
              onClick={() => copyText(result.svgCode, setCopiedSvg)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedSvg ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSvg ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy SVG')}
            </button>
          </div>
          <textarea
            readOnly
            value={result.svgCode}
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
