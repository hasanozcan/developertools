'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Plus, Trash2, Sliders } from 'lucide-react';
import {
  generateTextShadowCss,
  TEXT_SHADOW_PRESETS,
  type TextShadowLayer,
} from '@/lib/cssTextShadow';
import { useLanguage } from '@/context/LanguageContext';

export default function CssTextShadowTool() {
  const { t } = useLanguage();
  const [sampleText, setSampleText] = useState('DevTools 100+');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#1e293b');
  const [layers, setLayers] = useState<TextShadowLayer[]>([
    { x: 2, y: 3, blur: 6, color: 'rgba(0, 0, 0, 0.25)' },
  ]);
  const [copied, setCopied] = useState(false);

  const { cssValue, fullCss } = useMemo(() => {
    return generateTextShadowCss(layers);
  }, [layers]);

  const addLayer = () => {
    setLayers([...layers, { x: 2, y: 2, blur: 4, color: 'rgba(0,0,0,0.3)' }]);
  };

  const removeLayer = (idx: number) => {
    setLayers(layers.filter((_, i) => i !== idx));
  };

  const updateLayer = (idx: number, field: keyof TextShadowLayer, val: string | number) => {
    const next = [...layers];
    next[idx] = { ...next[idx], [field]: val };
    setLayers(next);
  };

  const applyPreset = (presetLayers: TextShadowLayer[]) => {
    setLayers(presetLayers);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.textshadow.presets') || 'Style Presets'}:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {TEXT_SHADOW_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p.layers)}
              className="px-3 py-1 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition font-semibold"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview Display */}
      <div className="surface-card rounded-3xl p-12 flex items-center justify-center min-h-[220px] bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/5 overflow-hidden">
        <span
          style={{
            textShadow: cssValue,
            fontSize: `${fontSize}px`,
            color: textColor,
          }}
          className="font-black tracking-tight text-center select-none transition-all duration-200"
        >
          {sampleText || 'Text Shadow Preview'}
        </span>
      </div>

      {/* Text Settings */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Preview Text</label>
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Font Size</span>
              <span className="font-mono">{fontSize}px</span>
            </div>
            <input
              type="range"
              min="24"
              max="96"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Text Color</label>
            <div className="flex items-center gap-2">
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

      {/* Shadow Layers List */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.textshadow.layers') || 'Shadow Layers'} ({layers.length})
            </h3>
          </div>
          <button
            onClick={addLayer}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            {t('tool.textshadow.addLayer') || 'Add Layer'}
          </button>
        </div>

        <div className="space-y-3">
          {layers.map((layer, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 grid grid-cols-1 sm:grid-cols-5 gap-3 items-center"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">X Offset</span>
                <input
                  type="number"
                  value={layer.x}
                  onChange={(e) => updateLayer(idx, 'x', parseInt(e.target.value, 10) || 0)}
                  className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Y Offset</span>
                <input
                  type="number"
                  value={layer.y}
                  onChange={(e) => updateLayer(idx, 'y', parseInt(e.target.value, 10) || 0)}
                  className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Blur (px)</span>
                <input
                  type="number"
                  min="0"
                  value={layer.blur}
                  onChange={(e) => updateLayer(idx, 'blur', Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block">Shadow Color</span>
                <input
                  type="text"
                  value={layer.color}
                  onChange={(e) => updateLayer(idx, 'color', e.target.value)}
                  className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end pt-3 sm:pt-0">
                <button
                  onClick={() => removeLayer(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                  title="Remove layer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated CSS Code */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            CSS text-shadow Property
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
          value={fullCss}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
