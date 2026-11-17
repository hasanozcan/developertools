'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { buildXmlSystemPrompt } from '@/lib/systemPromptXmlBuilder';

export default function SystemPromptXmlBuilderTool() {
  const { t } = useLanguage();
  const [role, setRole] = useState('Senior Full-Stack TypeScript Architect');
  const [context, setContext] = useState('You are developing modular Next.js developer utility tools with 100% test coverage.');
  const [instructions, setInstructions] = useState('Analyze input schema\nGenerate robust pure TypeScript functions\nAvoid runtime dependencies where possible');
  const [rules, setRules] = useState('Always export pure functions\nNever return undefined for required fields\nOutput standard GitHub markdown');
  const [outputFormat, setOutputFormat] = useState('Return pure TypeScript code wrapped in markdown blocks.');
  const [copied, setCopied] = useState(false);

  const promptOutput = useMemo(() => {
    return buildXmlSystemPrompt({
      role,
      context,
      instructions: instructions.split('\n').filter(Boolean),
      rules: rules.split('\n').filter(Boolean),
      outputFormat,
      examples: [],
    });
  }, [role, context, instructions, rules, outputFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          {copied ? <Check className="w-4 h-4 text-green-200" /> : <Copy className="w-4 h-4" />}
          {copied ? t("uiText.8dd5a4c2") : t("uiText.367b8cd5")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.d1ea5623")}</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.fa20c0f5")}</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full h-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.a9e152fe")}</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full h-24 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t("uiText.5aaa05ae")}</label>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="w-full h-24 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.3cc0676d")}</label>
          <textarea
            readOnly
            value={promptOutput}
            className="w-full h-[520px] rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
