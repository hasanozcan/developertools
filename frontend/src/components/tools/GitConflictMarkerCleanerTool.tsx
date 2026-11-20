'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  resolveConflictMarkers,
  type ConflictResolutionChoice,
} from '@/lib/gitConflictMarkerCleaner';

const SAMPLE = `<<<<<<< HEAD
const API_URL = "https://api.v2.devstools.app";
=======
const API_URL = "https://api.devstools.app";
>>>>>>> main`;

export default function GitConflictMarkerCleanerTool() {
  const { t } = useLanguage();
  const [text, setText] = useState(SAMPLE);
  const [take, setTake] = useState<ConflictResolutionChoice>('ours');
  const output = useMemo(() => resolveConflictMarkers(text, take), [text, take]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTake('ours')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold ${
              take === 'ours' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t('uiText.6fb54886')}
          </button>
          <button
            type="button"
            onClick={() => setTake('theirs')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold ${
              take === 'theirs' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t('uiText.545507c2')}
          </button>
          <button
            type="button"
            onClick={() => setTake('both')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold ${
              take === 'both' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            Keep Both
          </button>
        </div>

        <button
          type="button"
          onClick={() => setText(SAMPLE)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {t('common.loadSample')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="conflict-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Conflicted File Input
          </label>
          <textarea
            id="conflict-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="conflict-output"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Resolved Output
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            id="conflict-output"
            value={output}
            readOnly
            rows={12}
            className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
