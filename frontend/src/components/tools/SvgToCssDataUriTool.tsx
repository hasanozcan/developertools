'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { convertSvgToCssDataUri, SvgCssOptions } from '@/lib/svgToCssDataUri';

export default function SvgToCssDataUriTool() {
  const { t } = useLanguage();
  const [svgInput, setSvgInput] = useState(
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
  );
  const [format, setFormat] = useState<'utf8-encoded' | 'base64'>('utf8-encoded');
  const [mode, setMode] = useState<'background-image' | 'mask-image' | 'data-uri-only'>('background-image');
  const [copied, setCopied] = useState(false);

  const cssOutput = useMemo(() => {
    if (!svgInput.trim()) return '';
    try {
      return convertSvgToCssDataUri(svgInput, { format, mode });
    } catch (err: any) {
      return '// Error encoding SVG: ' + err.message;
    }
  }, [svgInput, format, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.5ba62793")}</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="utf8-encoded">{t("uiText.de32a8d4")}</option>
              <option value="base64">Base64</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.cf559e20")}</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="background-image">{t("uiText.118767bd")}</option>
              <option value="mask-image">{t("uiText.297dd2a1")}</option>
              <option value="data-uri-only">{t("uiText.fc804187")}</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          {copied ? <Check className="w-4 h-4 text-green-200" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.8dc21305") : t("uiText.76c99cd7")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.1e7efb3f")}</label>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            placeholder="<svg ...>...</svg>"
            className="w-full h-80 rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.e4a5eef5")}</label>
          <textarea
            readOnly
            value={cssOutput}
            className="w-full h-80 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
