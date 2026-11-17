'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';
import { convertGraphqlToZod } from '@/lib/graphqlSchemaToZod';

export default function GraphqlSchemaToZodTool() {
  const { t } = useLanguage();
  const [sdlInput, setSdlInput] = useState(
    `enum Role {\n  ADMIN\n  USER\n  GUEST\n}\n\ntype User {\n  id: ID!\n  name: String!\n  email: String\n  age: Int\n  roles: [Role!]!\n}`
  );
  const [copied, setCopied] = useState(false);

  const zodOutput = useMemo(() => {
    if (!sdlInput.trim()) return '';
    try {
      return convertGraphqlToZod(sdlInput);
    } catch (err: any) {
      return '// Error parsing GraphQL SDL: ' + err.message;
    }
  }, [sdlInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(zodOutput);
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
          {copied ? t("uiText.8dc21305") : t("uiText.c75df9e5")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.0b86547a")}</label>
          <textarea
            value={sdlInput}
            onChange={(e) => setSdlInput(e.target.value)}
            placeholder={t("uiText.72622c84")}
            className="w-full h-96 rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("uiText.9d43b2a0")}</label>
          <textarea
            readOnly
            value={zodOutput}
            className="w-full h-96 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
