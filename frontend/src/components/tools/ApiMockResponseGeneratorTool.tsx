'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, Layers } from 'lucide-react';
import { generateMockData, MockDatasetType } from '@/lib/apiMockResponseGenerator';

export default function ApiMockResponseGeneratorTool() {
  const { t } = useLanguage();
  const [type, setType] = useState<MockDatasetType>('users');
  const [count, setCount] = useState<number>(5);
  const [includePagination, setIncludePagination] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [copied, setCopied] = useState(false);

  const mockJson = useMemo(() => {
    const data = generateMockData({
      type,
      count,
      statusCode,
      includePagination,
      page: 1,
      perPage: count,
    });
    return JSON.stringify(data, null, 2);
  }, [type, count, statusCode, includePagination]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.14a6754e")}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MockDatasetType)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="users">{t("uiText.21623171")}</option>
              <option value="products">{t("uiText.5647ee90")}</option>
              <option value="orders">{t("uiText.52edce78")}</option>
              <option value="posts">{t("uiText.bfcf6c3b")}</option>
              <option value="transactions">{t("uiText.6a2fcadd")}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.d6e02074")}{count})</label>
            <input
              type="range"
              min="1"
              max="25"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-36 h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">{t("uiText.872879e9")}</label>
            <select
              value={statusCode}
              onChange={(e) => setStatusCode(parseInt(e.target.value, 10))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value={200}>{t("uiText.e7a545a9")}</option>
              <option value={201}>{t("uiText.32c04d5a")}</option>
              <option value={400}>{t("uiText.485f4435")}</option>
              <option value={404}>{t("uiText.fe41419a")}</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="includePag"
              checked={includePagination}
              onChange={(e) => setIncludePagination(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 accent-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="includePag" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
              {t("uiText.44eec8e7")}</label>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          {copied ? <Check className="w-4 h-4 text-green-200" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.16b0813d") : t("uiText.57a5d971")}
        </button>
      </div>

      <div className="relative">
        <textarea
          readOnly
          value={mockJson}
          className="w-full h-[450px] rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
}
