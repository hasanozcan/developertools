'use client';

import React, { useState, useMemo } from 'react';
import { Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';
import { generateUlid, generateUuidV7, decodeUlidTimestamp } from '@/lib/ulidGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function UlidGeneratorTool() {
  const { t } = useLanguage();
  const [type, setType] = useState<'ulid' | 'uuidv7'>('ulid');
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const generatedList = useMemo(() => {
    const items: string[] = [];
    const now = Date.now() + seed;
    for (let i = 0; i < count; i++) {
      items.push(type === 'ulid' ? generateUlid(now + i) : generateUuidV7(now + i));
    }
    return items;
  }, [type, count, seed]);

  const outputText = generatedList.join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setSeed((prev) => prev + 1);
  };

  const firstDecoded = type === 'ulid' && generatedList.length > 0 ? decodeUlidTimestamp(generatedList[0]) : null;

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.ulid.title') || 'Timestamp-Ordered ID Generator (ULID & UUID v7)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">{t("uiText.527b1d83")}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="ulid">{t("uiText.5f02832b")}</option>
              <option value="uuidv7">{t("uiText.0bf5bdf4")}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">{t("tool.uuidGenerator.quantity")}</label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="1">{t("uiText.f2040479")}</option>
              <option value="5">{t("uiText.7a8c729a")}</option>
              <option value="10">{t("uiText.ead5b096")}</option>
              <option value="25">{t("uiText.641dea8a")}</option>
              <option value="50">{t("uiText.df08898a")}</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRegenerate}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t("tool.qrCode.regenerate")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated IDs Output Display */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("uiText.a16a96e2")}{type.toUpperCase()} {t("uiText.8d2937a1")}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy All')}
          </button>
        </div>

        <textarea
          readOnly
          value={outputText}
          rows={Math.max(5, count)}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950"
        />

        {firstDecoded && (
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
            {t("uiText.548bd640")}<span className="text-indigo-600 dark:text-indigo-400 font-bold">{firstDecoded.toISOString()}</span> ({firstDecoded.toLocaleString()})
          </div>
        )}
      </div>
    </div>
  );
}
