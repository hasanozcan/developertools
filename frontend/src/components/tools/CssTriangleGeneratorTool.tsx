'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Triangle, Sliders } from 'lucide-react';
import { generateCssTriangle, type TriangleDirection } from '@/lib/cssTriangle';
import { useLanguage } from '@/context/LanguageContext';

export default function CssTriangleGeneratorTool() {
  const { t } = useLanguage();
  const [direction, setDirection] = useState<TriangleDirection>('top');
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(40);
  const [color, setColor] = useState('#6366F1');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return generateCssTriangle({ direction, width, height, color });
  }, [direction, width, height, color]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Direction Selection Grid */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Triangle className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.csstriangle.direction') || 'Triangle Pointing Direction'}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'top', label: 'Top (▲)' },
            { id: 'bottom', label: 'Bottom (▼)' },
            { id: 'left', label: 'Left (◄)' },
            { id: 'right', label: 'Right (►)' },
            { id: 'top-left', label: 'Top-Left (◤)' },
            { id: 'top-right', label: 'Top-Right (◥)' },
            { id: 'bottom-left', label: 'Bottom-Left (◣)' },
            { id: 'bottom-right', label: 'Bottom-Right (◢)' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDirection(d.id as TriangleDirection)}
              className={`p-2.5 rounded-xl text-xs font-bold transition border text-center ${
                direction === d.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview Stage */}
      <div className="surface-card rounded-3xl p-12 flex items-center justify-center min-h-[260px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] border border-slate-200/80 dark:border-white/5">
        <div style={result.styleObject} className="transition-all duration-300 drop-shadow-md" />
      </div>

      {/* Dimensions & Color Form */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.csstriangle.controls') || 'Size & Color Settings'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Width */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Width</span>
              <span className="font-mono">{width}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Height */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Height</span>
              <span className="font-mono">{height}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Color */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Triangle Color
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
                className="flex-1 px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pure CSS Triangle Code
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy CSS')}
          </button>
        </div>
        <textarea
          readOnly
          value={result.css}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
