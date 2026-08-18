'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Plus, Trash2, Layers, Sparkles } from 'lucide-react';
import { generateBoxShadowCss, type ShadowLayer } from '@/lib/cssHelpers';
import { useLanguage } from '@/context/LanguageContext';

const DEFAULT_LAYERS: ShadowLayer[] = [
  { id: '1', inset: false, offsetX: 0, offsetY: 20, blur: 25, spread: -5, color: '#4f46e5', opacity: 0.2 },
  { id: '2', inset: false, offsetX: 0, offsetY: 8, blur: 10, spread: -6, color: '#0f172a', opacity: 0.15 },
];

export default function CssBoxShadowTool() {
  const { t } = useLanguage();
  const [layers, setLayers] = useState<ShadowLayer[]>(DEFAULT_LAYERS);
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(24);
  const [isGlass, setIsGlass] = useState(false);
  const [copied, setCopied] = useState(false);

  const cssBoxShadow = useMemo(() => generateBoxShadowCss(layers), [layers]);

  const addLayer = () => {
    const newLayer: ShadowLayer = {
      id: String(Date.now()),
      inset: false,
      offsetX: 0,
      offsetY: 10,
      blur: 15,
      spread: 0,
      color: '#000000',
      opacity: 0.1,
    };
    setLayers([...layers, newLayer]);
  };

  const updateLayer = (id: string, field: keyof ShadowLayer, value: any) => {
    setLayers(layers.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const removeLayer = (id: string) => {
    setLayers(layers.filter((l) => l.id !== id));
  };

  const applyPreset = (preset: 'soft' | 'floating' | 'neon' | 'glass') => {
    if (preset === 'soft') {
      setIsGlass(false);
      setLayers([
        { id: '1', inset: false, offsetX: 0, offsetY: 10, blur: 30, spread: -10, color: '#0f172a', opacity: 0.1 },
        { id: '2', inset: false, offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: '#0f172a', opacity: 0.05 },
      ]);
    } else if (preset === 'floating') {
      setIsGlass(false);
      setLayers([
        { id: '1', inset: false, offsetX: 0, offsetY: 30, blur: 60, spread: -12, color: '#4f46e5', opacity: 0.35 },
      ]);
    } else if (preset === 'neon') {
      setIsGlass(false);
      setLayers([
        { id: '1', inset: false, offsetX: 0, offsetY: 0, blur: 20, spread: 2, color: '#06b6d4', opacity: 0.6 },
        { id: '2', inset: false, offsetX: 0, offsetY: 0, blur: 40, spread: 8, color: '#8b5cf6', opacity: 0.4 },
      ]);
    } else if (preset === 'glass') {
      setIsGlass(true);
      setLayers([
        { id: '1', inset: false, offsetX: 0, offsetY: 8, blur: 32, spread: 0, color: '#1f2937', opacity: 0.2 },
        { id: '2', inset: true, offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: '#ffffff', opacity: 0.5 },
      ]);
    }
  };

  const handleCopy = () => {
    const fullCss = isGlass
      ? `background: rgba(255, 255, 255, 0.2);\nbackdrop-filter: blur(16px);\n-webkit-backdrop-filter: blur(16px);\nborder: 1px solid rgba(255, 255, 255, 0.3);\nborder-radius: ${borderRadius}px;\nbox-shadow: ${cssBoxShadow};`
      : `border-radius: ${borderRadius}px;\nbox-shadow: ${cssBoxShadow};`;
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Presets:</span>
          <button
            onClick={() => applyPreset('soft')}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Soft SaaS
          </button>
          <button
            onClick={() => applyPreset('floating')}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Indigo Float
          </button>
          <button
            onClick={() => applyPreset('neon')}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Neon Glow
          </button>
          <button
            onClick={() => applyPreset('glass')}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Glassmorphism
          </button>
        </div>

        <button
          onClick={addLayer}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="h-3.5 w-3.5" /> Add Shadow Layer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-4">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-indigo-500" /> Layer #{index + 1}
                </span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layer.inset}
                      onChange={(e) => updateLayer(layer.id, 'inset', e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    Inset
                  </label>
                  {layers.length > 1 && (
                    <button
                      onClick={() => removeLayer(layer.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Offset X: {layer.offsetX}px</label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={layer.offsetX}
                    onChange={(e) => updateLayer(layer.id, 'offsetX', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Offset Y: {layer.offsetY}px</label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={layer.offsetY}
                    onChange={(e) => updateLayer(layer.id, 'offsetY', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Blur: {layer.blur}px</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={layer.blur}
                    onChange={(e) => updateLayer(layer.id, 'blur', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Spread: {layer.spread}px</label>
                  <input
                    type="range"
                    min={-30}
                    max={50}
                    value={layer.spread}
                    onChange={(e) => updateLayer(layer.id, 'spread', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              {/* Color & Opacity */}
              <div className="flex items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Color:</span>
                  <input
                    type="color"
                    value={layer.color}
                    onChange={(e) => updateLayer(layer.id, 'color', e.target.value)}
                    className="h-6 w-8 rounded cursor-pointer border border-slate-300"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-slate-500">Opacity: {Math.round(layer.opacity * 100)}%</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={layer.opacity}
                    onChange={(e) => updateLayer(layer.id, 'opacity', Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Visual Canvas Column */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex-1 min-h-[300px] flex items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-indigo-100 via-slate-100 to-cyan-100 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-950 border border-slate-200/80 dark:border-white/10 overflow-hidden relative">
            <div
              style={{
                boxShadow: cssBoxShadow,
                borderRadius: `${borderRadius}px`,
                backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.25)' : boxColor,
                backdropFilter: isGlass ? 'blur(16px)' : undefined,
                WebkitBackdropFilter: isGlass ? 'blur(16px)' : undefined,
                border: isGlass ? '1px solid rgba(255, 255, 255, 0.4)' : undefined,
              }}
              className="w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center justify-center p-4 text-center transition-all duration-150"
            >
              <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <span className="text-sm font-bold text-slate-800 dark:text-white">Live Box Preview</span>
            </div>
          </div>

          {/* Generated CSS Box */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Generated CSS
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy CSS'}
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-50 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-indigo-200 overflow-x-auto whitespace-pre-wrap">
              {`box-shadow: ${cssBoxShadow};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
