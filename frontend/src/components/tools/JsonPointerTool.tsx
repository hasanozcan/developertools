'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { evaluateJsonPointer } from '@/lib/jsonPointer';
import { localizeUiText } from '@/lib/localizedText';

const SAMPLE =
  '{\n  "users": [\n    { "id": 1, "profile": { "display/name": "Ada" } },\n    { "id": 2, "profile": { "display/name": "Linus" } }\n  ]\n}';

function serialize(value: unknown): string {
  const json = JSON.stringify(value, null, 2);
  return json === undefined ? 'undefined' : json;
}

export default function JsonPointerTool() {
  const { t } = useLanguage();
  const [document, setDocument] = useState(SAMPLE);
  const [pointer, setPointer] = useState('/users/0/profile/display~1name');

  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(document) as unknown;
      return { output: serialize(evaluateJsonPointer(parsed, pointer)), error: '' };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unable to evaluate the pointer.',
      };
    }
  }, [document, pointer]);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="json-pointer"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("uiText.ded38f06")}</label>
        <input
          id="json-pointer"
          value={pointer}
          onChange={(event) => setPointer(event.target.value)}
          placeholder="/users/0/name"
          spellCheck={false}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {t("uiText.4869e18b")}</p>
      </div>

      {result.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {localizeUiText(result.error, t)}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("tool.jsonpath.documentLabel")}</label>
          <CodeEditor value={document} onChange={setDocument} language="json" minHeight="280px" />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("uiText.0a019d14")}</label>
            <CopyButton text={result.output} />
          </div>
          <CodeEditor
            value={result.output}
            onChange={() => {}}
            readOnly
            showCopy={false}
            language="json"
            minHeight="280px"
            placeholder={t("uiText.6aac48a2")}
          />
        </div>
      </div>
    </div>
  );
}
