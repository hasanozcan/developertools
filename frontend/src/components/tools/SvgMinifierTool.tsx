'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, RefreshCw, FileCode, ArrowDown } from 'lucide-react';
import { minifySvg } from '@/lib/svgConverter';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_BLOATED_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 100.000 100.000" width="100" height="100">
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <cc:Work rdf:about="" />
    </rdf:RDF>
  </metadata>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <g id="Layer_1">
    <circle cx="50.0000" cy="50.0000" r="40.0000" fill="url(#grad1)" />
    <path d="M 30.12345 50.98765 L 45.54321 65.43210 L 70.99999 35.11111" stroke="#ffffff" stroke-width="6.0000" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

export default function SvgMinifierTool() {
  const { t } = useLanguage();
  const [inputSvg, setInputSvg] = useState(SAMPLE_BLOATED_SVG);
  const [copied, setCopied] = useState(false);

  const { minified, originalSize, minifiedSize, savingsPercent } = useMemo(() => {
    if (!inputSvg.trim()) {
      return { minified: '', originalSize: 0, minifiedSize: 0, savingsPercent: 0 };
    }
    return minifySvg(inputSvg);
  }, [inputSvg]);

  const handleCopy = () => {
    if (!minified) return;
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!minified) return;
    const blob = new Blob([minified], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Original Size</span>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{(originalSize / 1024).toFixed(2)} KB</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5 text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Minified Size</span>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{(minifiedSize / 1024).toFixed(2)} KB</p>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-900/20 border border-indigo-200/80 dark:border-indigo-500/20 text-center">
          <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">Size Savings</span>
          <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">-{savingsPercent}%</p>
        </div>
      </div>

      {/* Editor Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Original SVG
            </span>
            <button
              onClick={() => setInputSvg(SAMPLE_BLOATED_SVG)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Load Sample
            </button>
          </div>
          <textarea
            value={inputSvg}
            onChange={(e) => setInputSvg(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Minified SVG
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!minified}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:opacity-50 dark:bg-indigo-400/10 dark:text-indigo-300 dark:hover:bg-indigo-400/20"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                disabled={!minified}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={minified}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-sm focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-300 resize-y"
          />
        </div>
      </div>

      {/* Live Visual Preview */}
      {minified && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 bg-slate-50/60 dark:bg-slate-900/40 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-4">
            Live Rendered Preview
          </span>
          <div
            className="inline-flex items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-inner border border-slate-200/60 dark:border-white/10"
            dangerouslySetInnerHTML={{ __html: minified }}
          />
        </div>
      )}
    </div>
  );
}
