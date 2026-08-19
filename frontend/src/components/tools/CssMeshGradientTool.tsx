'use client';

import React, { useState, useMemo } from 'react';
import { Palette, Copy, Check, Sparkles, Plus, Trash2 } from 'lucide-react';
import {
  generateMeshGradientCss,
  DEFAULT_MESH_OPTIONS,
  type MeshPoint,
  type MeshGradientOptions,
} from '@/lib/cssMeshGradient';
import { useLanguage } from '@/context/LanguageContext';

export default function CssMeshGradientTool() {
  const { t } = useLanguage();
  const [options, setOptions] = useState<MeshGradientOptions>(DEFAULT_MESH_OPTIONS);
  const [copied, setCopied] = useState(false);

  const { background, css } = useMemo(() => {
    return generateMeshGradientCss(options);
  }, [options]);

  const updatePoint = (idx: number, field: keyof MeshPoint, val: number | string) => {
    const next = [...options.points];
    next[idx] = { ...next[idx], [field]: val };
    setOptions({ ...options, points: next });
  };

  const addPoint = () => {
    if (options.points.length >= 6) return;
    setOptions({
      ...options,
      points: [...options.points, { x: 50, y: 50, color: '#f59e0b' }],
    });
  };

  const removePoint = (idx: number) => {
    if (options.points.length <= 2) return;
    setOptions({
      ...options,
      points: options.points.filter((_, i) => i !== idx),
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Mesh Canvas Preview */}
      <div className="surface-card rounded-3xl p-6 flex flex-col space-y-3 border border-slate-200/80 dark:border-white/5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Live Mesh & Aura Gradient Preview
        </span>

        <div
          style={{
            background,
            filter: `blur(${options.blur}px)`,
          }}
          className="w-full h-64 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform scale-95"
        />
      </div>

      {/* Configuration Controls */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.mesh.controlsTitle') || 'Mesh Color Anchors & Background'}
            </h3>
          </div>
          <button
            onClick={addPoint}
            disabled={options.points.length >= 6}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Color Point</span>
          </button>
        </div>

        {/* Global Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Canvas Base Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={options.bgColor}
                onChange={(e) => setOptions({ ...options, bgColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={options.bgColor}
                onChange={(e) => setOptions({ ...options, bgColor: e.target.value })}
                className="w-full px-2 py-1 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Blur Aura Radius</span>
              <span className="font-mono">{options.blur}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={options.blur}
              onChange={(e) => setOptions({ ...options, blur: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Color Point Rows */}
        <div className="space-y-3">
          {options.points.map((point, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
            >
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={point.color}
                  onChange={(e) => updatePoint(idx, 'color', e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={point.color}
                  onChange={(e) => updatePoint(idx, 'color', e.target.value)}
                  className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-0.5">
                  <span>X Position</span>
                  <span>{point.x}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={point.x}
                  onChange={(e) => updatePoint(idx, 'x', parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-0.5">
                  <span>Y Position</span>
                  <span>{point.y}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={point.y}
                  onChange={(e) => updatePoint(idx, 'y', parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => removePoint(idx)}
                  disabled={options.points.length <= 2}
                  className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated CSS Box */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            CSS Mesh Gradient Code
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
          rows={6}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-indigo-200"
        />
      </div>
    </div>
  );
}
