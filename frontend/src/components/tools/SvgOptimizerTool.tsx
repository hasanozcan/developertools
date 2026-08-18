'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Sparkles, Image as ImageIcon } from 'lucide-react';
import { optimizeSvg, type SvgOptimizeResult } from '@/lib/svgOptimizer';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" data-name="Layer 1">
  <!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In -->
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description />
    </rdf:RDF>
  </metadata>
  <defs></defs>
  <g id="Layer_2" data-name="Layer 2">
    <circle cx="50.00000" cy="50.00000" r="40.00000" fill="#4F46E5" stroke="#312E81" stroke-width="4.0000" />
    <path d="M 35.0000 50.0000 L 45.0000 60.0000 L 65.0000 40.0000" fill="none" stroke="#FFFFFF" stroke-width="5.0000" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

export default function SvgOptimizerTool() {
  const { t } = useLanguage();
  const [inputSvg, setInputSvg] = useState(SAMPLE_SVG);
  const [copied, setCopied] = useState(false);

  const result: SvgOptimizeResult = useMemo(() => {
    if (!inputSvg.trim()) {
      return { optimizedSvg: '', originalSize: 0, optimizedSize: 0, savingsBytes: 0, savingsPercent: 0 };
    }
    return optimizeSvg(inputSvg);
  }, [inputSvg]);

  const handleCopy = () => {
    if (!result.optimizedSvg) return;
    navigator.clipboard.writeText(result.optimizedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result.optimizedSvg) return;
    const blob = new Blob([result.optimizedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">{t('tool.svg.original') || 'Original'}</span>
            <p className="font-mono font-bold text-slate-900 dark:text-white text-base">{result.originalSize} B</p>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">{t('tool.svg.optimized') || 'Optimized'}</span>
            <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-base">{result.optimizedSize} B</p>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">{t('tool.svg.savings') || 'Savings'}</span>
            <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
              {result.savingsBytes} B ({result.savingsPercent}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!result.optimizedSvg}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy SVG')}
          </button>
          <button
            onClick={handleDownload}
            disabled={!result.optimizedSvg}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 transition disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            {t('common.download') || 'Download'}
          </button>
        </div>
      </div>

      {/* Side-by-side Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raw Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Raw SVG Code
            </span>
            <button
              onClick={() => setInputSvg(SAMPLE_SVG)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={inputSvg}
            onChange={(e) => setInputSvg(e.target.value)}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="<svg ...>...</svg>"
          />
        </div>

        {/* Optimized Output */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Minified &amp; Cleaned SVG
          </span>
          <textarea
            readOnly
            value={result.optimizedSvg}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 resize-y"
            placeholder="Clean SVG will appear here..."
          />
        </div>
      </div>

      {/* Live Preview */}
      {result.optimizedSvg && (
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-500" /> {t('tool.svg.preview') || 'Live Visual Preview'}
          </span>
          <div className="flex items-center justify-center p-8 rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 min-h-[160px]">
            <div
              className="max-w-[200px] max-h-[200px] flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: result.optimizedSvg }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
