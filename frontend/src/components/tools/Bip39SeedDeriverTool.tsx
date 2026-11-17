'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { deriveBip39SeedHex } from '@/lib/bip39SeedDeriver';
import { validateMnemonic } from '@/lib/bip39';

export default function Bip39SeedDeriverTool() {
  const [mnemonic, setMnemonic] = useState(
    'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
  );
  const [passphrase, setPassphrase] = useState('');
  const [seed, setSeed] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(
    () => (mnemonic.trim() ? validateMnemonic(mnemonic) : null),
    [mnemonic],
  );

  useEffect(() => {
    let cancelled = false;
    if (!mnemonic.trim()) {
      setSeed('');
      setError(null);
      return () => {
        cancelled = true;
      };
    }

    deriveBip39SeedHex(mnemonic, passphrase)
      .then((derived) => {
        if (!cancelled) {
          setSeed(derived);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setSeed('');
          setError(err instanceof Error ? err.message : 'Seed derivation failed');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [mnemonic, passphrase]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="bip39-deriver-mnemonic"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            BIP-39 Mnemonic
          </label>
          <textarea
            id="bip39-deriver-mnemonic"
            rows={4}
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 p-3 font-mono text-xs bg-white dark:bg-slate-900"
          />
          {validation && !validation.isValid && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {validation.invalidWords.length > 0
                ? `Unrecognized BIP-39 word(s): ${validation.invalidWords.join(', ')}`
                : 'Invalid BIP-39 checksum or word count (PBKDF2 output still shown per spec).'}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="bip39-deriver-passphrase"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Optional Passphrase (PBKDF2-HMAC-SHA512, 2048 iterations)
          </label>
          <input
            id="bip39-deriver-passphrase"
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Optional BIP-39 passphrase"
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 p-3 font-mono text-xs bg-white dark:bg-slate-900"
          />
        </div>

        {error ? (
          <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl font-mono text-xs text-red-400">
            {error}
          </div>
        ) : (
          <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 break-all">
            {seed}
          </div>
        )}
      </div>
    </div>
  );
}
