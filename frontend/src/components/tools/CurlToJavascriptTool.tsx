'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { curlToJavascript } from '@/lib/curlToJavascript';
import { Copy, Check } from 'lucide-react';

export default function CurlToJavascriptTool() {
  const { t } = useLanguage();
  const [curl, setCurl] = useState('curl https://api.github.com/repos/hasanozcan/developertools -H "User-Agent: App"');
  const [style, setStyle] = useState<'fetch' | 'axios'>('fetch');
  const [copied, setCopied] = useState(false);

  const code = curlToJavascript(curl, style);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("uiText.cba1de58")}</label>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setStyle('fetch')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${style === 'fetch' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t("uiText.e5a522d3")}</button>
            <button
              onClick={() => setStyle('axios')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${style === 'axios' ? 'bg-white shadow-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t("uiText.0039ff09")}</button>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? t("uiText.8dc21305") : t("uiText.369907a0")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("uiText.131c2e4e")}</label>
          <textarea
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("uiText.815fd237")}</label>
          <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
}
