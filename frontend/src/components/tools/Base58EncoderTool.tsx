'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { decodeBase58, encodeBase58 } from '@/lib/base58Encoder';

const SAMPLE_TEXT = 'Hello Bitcoin & Solana';

export default function Base58EncoderTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState(SAMPLE_TEXT);

  const { output, error } = useMemo(() => {
    try {
      const value = mode === 'encode' ? encodeBase58(input) : decodeBase58(input.trim());
      return { output: value, error: '' };
    } catch (e) {
      return {
        output: '',
        error: e instanceof Error ? e.message : 'Invalid Base58 input.',
      };
    }
  }, [input, mode]);

  const handleModeSwitch = (nextMode: 'encode' | 'decode') => {
    if (nextMode === mode) return;
    if (!error && output) {
      setInput(output);
    }
    setMode(nextMode);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => handleModeSwitch('encode')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              mode === 'encode'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('decode')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
              mode === 'decode'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            Decode
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setMode('encode');
            setInput(SAMPLE_TEXT);
          }}
          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {t('common.loadSample')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="base58-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {mode === 'encode' ? 'Plain Text Input' : 'Base58 Input'}
          </label>
          <textarea
            id="base58-input"
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="base58-output"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {mode === 'encode' ? 'Base58 Output' : 'Decoded UTF-8 Output'}
            </label>
            <CopyButton text={output} />
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 font-mono text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </div>
          ) : (
            <textarea
              id="base58-output"
              readOnly
              rows={8}
              value={output}
              className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}
