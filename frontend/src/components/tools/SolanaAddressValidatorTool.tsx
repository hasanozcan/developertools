'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { validateSolanaAddress } from '@/lib/solanaAddressValidator';

const SAMPLE_SOLANA_ADDRESS = '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs';

export default function SolanaAddressValidatorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(SAMPLE_SOLANA_ADDRESS);

  const trimmed = input.trim();
  const validation = useMemo(() => validateSolanaAddress(input), [input]);
  const jsonSummary = useMemo(
    () =>
      JSON.stringify(
        {
          address: trimmed,
          isValid: validation.isValid,
          length: validation.length,
          ...(validation.error ? { error: validation.error } : {}),
        },
        null,
        2,
      ),
    [trimmed, validation],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="solana-address-input"
            className="text-sm font-medium text-muted-foreground"
          >
            {t('common.input')}
          </label>
          <button
            type="button"
            onClick={() => setInput(SAMPLE_SOLANA_ADDRESS)}
            className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <input
          id="solana-address-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a Solana Base58 public key..."
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <span
                data-testid="solana-status-badge"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                Valid Solana Address
              </span>
            ) : (
              <span
                data-testid="solana-status-badge"
                className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-950/60 dark:text-red-300"
              >
                <XCircle className="h-4 w-4" />
                Invalid Solana Address
              </span>
            )}
          </div>
          <CopyButton text={jsonSummary} />
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-slate-500">Character Length</dt>
            <dd className="mt-1 font-mono font-bold text-slate-900 dark:text-slate-100">
              {validation.length} (expected 32–44 Base58 chars)
            </dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-slate-500">Alphabet Check</dt>
            <dd className="mt-1 font-mono font-bold text-slate-900 dark:text-slate-100">
              {validation.isValid ? 'Valid Base58 (no 0, O, I, l)' : validation.error}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
