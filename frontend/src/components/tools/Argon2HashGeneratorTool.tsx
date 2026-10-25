'use client';
import React, { useState } from 'react';
import { generateArgon2idHash } from '@/lib/argon2HashGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function Argon2HashGeneratorTool() {
  const { t } = useLanguage();
  const [pass, setPass] = useState('secret_password');
  const [hash, setHash] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const generate = async () => {
    setBusy(true);
    setHash('');
    setError('');
    try {
      setHash(await generateArgon2idHash(pass, { timeCost: 2, memoryCostKiB: 65536, parallelism: 1 }));
    } catch (error) {
      setError(error instanceof Error ? error.message : t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" aria-label={t('uiText.c791f777')} disabled={busy} value={pass} onChange={(e) => { setPass(e.target.value); setHash(''); setError(''); }} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <button onClick={generate} disabled={busy || !pass} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-50">{busy ? t('tool.bcrypt.generating') : t('common.generate')}</button>
        {error && <p role="alert">{error}</p>}
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{hash}</div>
      </div>
    </div>
  );
}
