'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Sliders } from 'lucide-react';
import {
  generateNeumorphismCss,
  DEFAULT_NEUMORPHISM,
  type NeumorphismOptions,
  type NeumorphismShape,
} from '@/lib/cssNeumorphism';
import { useLanguage } from '@/context/LanguageContext';

export default function CssNeumorphismTool() {
  const { t } = useLanguage();
  const [options, setOptions] = useState<NeumorphismOptions>(DEFAULT_NEUMORPHISM);
  const [copied, setCopied] = useState(false);

  const { boxShadow, background, css } = useMemo(() => {
    return generateNeumorphismCss(options);
  }, [options]);

  const updateOption = (key: keyof NeumorphismOptions, val: string | number) => {
    setOptions((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Shape Selector Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.neumorph.shapeType') || 'Neumorphic Surface Shape'}:
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {(['flat', 'concave', 'convex', 'pressed'] as NeumorphismShape[]).map((shape) => (
            <button
              key={shape}
              onClick={() => updateOption('shape', shape)}
              className={`px-3 py-1 text-xs font-bold rounded-xl capitalize transition border ${
                options.shape === shape
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-50'
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Live Sandbox */}
      <div
        style={{ backgroundColor: options.bgColor }}
        className="rounded-3xl p-16 flex items-center justify-center min-h-[300px] border border-slate-300 dark:border-white/10 transition-colors duration-200"
      >
        <div
          style={{
            width: `${options.size}px`,
            height: `${options.size}px`,
            borderRadius: `${options.radius}px`,
            background,
            boxShadow,
          }}
          className="flex items-center justify-center font-black text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 select-none transition-all duration-150"
        >
          <span>Soft UI</span>
        </div>
      </div>

      {/* Configuration Sliders */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.neumorph.controls') || 'Shadow Depth & Color Lighting'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Base Color */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.bgColor}
                onChange={(e) => updateOption('bgColor', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={options.bgColor}
                onChange={(e) => updateOption('bgColor', e.target.value)}
                className="w-full px-2 py-1 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Size</span>
              <span className="font-mono">{options.size}px</span>
            </div>
            <input
              type="range"
              min="100"
              max="320"
              value={options.size}
              onChange={(e) => updateOption('size', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Radius */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Radius</span>
              <span className="font-mono">{options.radius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={options.radius}
              onChange={(e) => updateOption('radius', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Distance */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Distance</span>
              <span className="font-mono">{options.distance}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={options.distance}
              onChange={(e) => updateOption('distance', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Blur */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Blur</span>
              <span className="font-mono">{options.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={options.blur}
              onChange={(e) => updateOption('blur', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Intensity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Intensity</span>
              <span className="font-mono">{options.intensity}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={options.intensity}
              onChange={(e) => updateOption('intensity', parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Neumorphic CSS Code
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
          value={css}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
