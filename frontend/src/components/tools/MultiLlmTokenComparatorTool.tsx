'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Coins, Cpu, Zap } from 'lucide-react';
import { compareLlmCosts } from '@/lib/multiLlmTokenComparator';

export default function MultiLlmTokenComparatorTool() {
  const { t } = useLanguage();
  const [text, setText] = useState(
    'Please summarize the architectural differences between event-driven microservices and monolithic backend systems in high-throughput applications.'
  );

  const analysis = useMemo(() => {
    return compareLlmCosts(text);
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t("uiText.afb0b701")}</span>
          <span className="text-2xl font-bold mt-1 text-primary-600 dark:text-primary-400">
            ~{analysis.models[0]?.estimatedTokens || 0}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t("uiText.d807a4ff")}</span>
          <span className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{analysis.charCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t("tool.passwordGenerator.wordCount")}</span>
          <span className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{analysis.wordCount}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("uiText.43af541c")}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("uiText.5e88dc7e")}
          className="w-full h-36 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs leading-relaxed font-sans text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {t("uiText.5e4069cf")}</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <th className="px-4 py-2.5 font-semibold">{t("uiText.8285e8fa")}</th>
                <th className="px-4 py-2.5 font-semibold">{t("uiText.35a888dc")}</th>
                <th className="px-4 py-2.5 font-semibold">{t("uiText.fd789d48")}</th>
                <th className="px-4 py-2.5 font-semibold">{t("uiText.96d6bb58")}</th>
                <th className="px-4 py-2.5 font-semibold">{t("uiText.96c18dcb")}</th>
                <th className="px-4 py-2.5 font-semibold">{t("uiText.eef7ec62")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900/50">
              {analysis.models.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-2.5 font-semibold text-gray-900 dark:text-white">{m.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-mono">
                      {m.provider}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300">{m.contextWindow}</td>
                  <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300">${m.inputCostPer1M.toFixed(2)}</td>
                  <td className="px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300">${m.outputCostPer1M.toFixed(2)}</td>
                  <td className="px-4 py-2.5 font-mono text-primary-600 dark:text-primary-400 font-semibold">
                    ${m.totalInputCost < 0.0001 ? '<$0.0001' : m.totalInputCost.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
