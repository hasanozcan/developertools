'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { derivePbkdf2, type Pbkdf2HashAlgorithm } from '@/lib/pbkdf2KeyDerivation';

export default function Pbkdf2KeyDerivationTool() {
  const { t } = useLanguage();
  const [pass, setPass] = useState('master-password-123');
  const [salt, setSalt] = useState('unique-salt-hex');
  const [hash, setHash] = useState<Pbkdf2HashAlgorithm>('SHA-256');
  const [iterations, setIterations] = useState(100000);
  const [keyLength, setKeyLength] = useState(32);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [deriving, setDeriving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setDeriving(true);
    setError(null);

    derivePbkdf2(pass, salt, iterations, keyLength, hash)
      .then((hex) => {
        if (!cancelled) {
          setOutput(hex);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setOutput('');
          setError(err instanceof Error ? err.message : 'PBKDF2 key derivation failed.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setDeriving(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pass, salt, iterations, keyLength, hash]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="pbkdf2-password" className="block text-xs font-semibold">
            {t('uiText.2cc30838')}
          </label>
          <input
            id="pbkdf2-password"
            type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="pbkdf2-salt" className="block text-xs font-semibold">
            {t('uiText.423c56a1')}
          </label>
          <input
            id="pbkdf2-salt"
            type="text"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label htmlFor="pbkdf2-hash" className="block text-xs font-semibold">
            HMAC Digest
          </label>
          <select
            id="pbkdf2-hash"
            value={hash}
            onChange={(e) => setHash(e.target.value as Pbkdf2HashAlgorithm)}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="pbkdf2-iterations" className="block text-xs font-semibold">
            Iterations
          </label>
          <input
            id="pbkdf2-iterations"
            type="number"
            min={1}
            max={5000000}
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="pbkdf2-keylen" className="block text-xs font-semibold">
            Key Length (bytes)
          </label>
          <input
            id="pbkdf2-keylen"
            type="number"
            min={1}
            max={1024}
            value={keyLength}
            onChange={(e) => setKeyLength(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="pbkdf2-output" className="text-xs font-semibold">
            Derived Key (PBKDF2-HMAC-{hash}, {iterations.toLocaleString()} iterations,{' '}
            {keyLength * 8}-bit)
            {deriving ? ' — computing...' : ''}
          </label>
          <CopyButton text={output} />
        </div>
        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        ) : (
          <textarea
            id="pbkdf2-output"
            value={output}
            readOnly
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
        )}
      </div>
    </div>
  );
}
