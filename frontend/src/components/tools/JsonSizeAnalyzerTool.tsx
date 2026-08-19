'use client';

import React, { useState, useMemo } from 'react';
import { HardDrive, Activity, Layers, Hash } from 'lucide-react';
import { analyzeJsonSize, type JsonSizeMetrics } from '@/lib/jsonSizeAnalyzer';
import { useLanguage } from '@/context/LanguageContext';

const SAMPLE_JSON = `{
  "api_version": "v2.1",
  "status": "success",
  "data": {
    "total_records": 1250,
    "page": 1,
    "users": [
      {
        "id": 101,
        "name": "Sarah Connor",
        "email": "sarah@cyberdyne.com",
        "verified": true,
        "roles": ["admin", "developer"],
        "metadata": {
          "last_login": "2026-08-19T14:00:00Z",
          "ip": "192.168.1.50"
        }
      }
    ]
  }
}`;

export default function JsonSizeAnalyzerTool() {
  const { t } = useLanguage();
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);

  const { metrics, error } = useMemo(() => {
    try {
      const res = analyzeJsonSize(jsonInput);
      return { metrics: res, error: null };
    } catch (err: unknown) {
      return { metrics: null, error: err instanceof Error ? err.message : 'Invalid JSON string' };
    }
  }, [jsonInput]);

  return (
    <div className="space-y-6">
      {/* Editor Input Area */}
      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t('tool.jsonsize.inputTitle') || 'JSON Payload Input'}
            </h3>
          </div>
          <button
            onClick={() => setJsonInput(SAMPLE_JSON)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            {t('common.loadSample') || 'Load Sample'}
          </button>
        </div>

        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={8}
          className="w-full rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
          placeholder="Paste large JSON string to analyze..."
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Metrics Dashboard */}
      {metrics && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="surface-card rounded-2xl p-5 border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Raw Size</span>
              <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {metrics.rawBytes.toLocaleString()} <span className="text-xs font-normal">Bytes</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">{(metrics.rawBytes / 1024).toFixed(2)} KB</span>
            </div>

            <div className="surface-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Minified Size</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {metrics.minifiedBytes.toLocaleString()} <span className="text-xs font-normal">Bytes</span>
              </span>
              <span className="text-[11px] text-emerald-500 font-bold block mt-1">
                {Math.round((1 - metrics.minifiedBytes / (metrics.rawBytes || 1)) * 100)}% reduction
              </span>
            </div>

            <div className="surface-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Keys & Objects</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {metrics.totalKeys} <span className="text-xs font-normal text-slate-400">keys</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">{metrics.totalObjects} objects, {metrics.totalArrays} arrays</span>
            </div>

            <div className="surface-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Max Nesting Depth</span>
              <span className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
                {metrics.maxDepth} <span className="text-xs font-normal text-slate-400">levels</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">{metrics.nullCount} null fields</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
