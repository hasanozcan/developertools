'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Image as ImageIcon, Sliders } from 'lucide-react';
import { generateSvgPlaceholder } from '@/lib/svgPlaceholder';
import { useLanguage } from '@/context/LanguageContext';

export default function SvgPlaceholderGeneratorTool() {
  const { t } = useLanguage();
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [bgColor, setBgColor] = useState('#E2E8F0');
  const [textColor, setTextColor] = useState('#64748B');
  const [customText, setCustomText] = useState('600 × 400');
  const [copiedDataUri, setCopiedDataUri] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const { svg, dataUri } = useMemo(() => {
    return generateSvgPlaceholder({
      width,
      height,
      bgColor,
      textColor,
      text: customText,
    });
  }, [width, height, bgColor, textColor, customText]);

  const copyText = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const downloadSvg = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placeholder_${width}x${height}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Live Preview Display */}
      <div className="surface-card rounded-3xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          className="max-w-full max-h-72 rounded-xl overflow-hidden shadow-lg"
        />
      </div>

      {/* Settings Form */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.svgplaceholder.settings') || 'Placeholder Dimensions & Appearance'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10) || 10)}
              className="w-full px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10) || 10)}
              className="w-full px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Custom Text</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Hero Image"
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Background</label>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full px-2 py-1 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Text Color</label>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full px-2 py-1 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Outputs & Download */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data URI */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Inline SVG Data URI
            </span>
            <button
              onClick={() => copyText(dataUri, setCopiedDataUri)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
            >
              {copiedDataUri ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedDataUri ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Data URI')}
            </button>
          </div>
          <textarea
            readOnly
            value={dataUri}
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200 break-all"
          />
        </div>

        {/* SVG XML Source */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Raw SVG XML
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => copyText(svg, setCopiedSvg)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copiedSvg ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSvg ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy SVG')}
              </button>
              <button
                onClick={downloadSvg}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
                title="Download .svg"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={svg}
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
