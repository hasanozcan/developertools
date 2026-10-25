'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { verifyWebhookSignature } from '@/lib/webhookSignatureVerifier';

export default function WebhookSignatureVerifierTool() {
  const { t } = useLanguage();
  const [payload, setPayload] = useState('{"event":"payment_intent.succeeded"}');
  const [secret, setSecret] = useState('whsec_test123');
  const [sig, setSig] = useState('');
  const [res, setRes] = useState<Awaited<ReturnType<typeof verifyWebhookSignature>> | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const verify = async () => {
    setBusy(true);
    setRes(null);
    setError('');
    try {
      setRes(await verifyWebhookSignature(payload, sig, secret));
    } catch (error) {
      setError(error instanceof Error ? error.message : t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" aria-label={t("uiText.91a41642")} placeholder={t("uiText.91a41642")} disabled={busy} value={secret} onChange={(e) => { setSecret(e.target.value); setRes(null); setError(''); }} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea rows={4} aria-label={t('uiText.6d28b29a')} disabled={busy} value={payload} onChange={(e) => { setPayload(e.target.value); setRes(null); setError(''); }} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <input type="text" aria-label={t('uiText.c038c347')} placeholder="sha256=..." disabled={busy} value={sig} onChange={(e) => { setSig(e.target.value); setRes(null); }} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <button onClick={verify} disabled={busy || !secret} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-50">{busy ? t('tool.bcrypt.verifying') : t('uiText.50c51176')}</button>
        {error && <p role="alert">{error}</p>}
        {res && sig.trim() && <p role="status">{res.valid ? t('uiText.8e4625fd') : t('uiText.43716542')}</p>}
        <input type="text" aria-label={t("uiText.187a236f")} placeholder={t("uiText.187a236f")} value={res?.expectedSignature ?? ''} readOnly className="w-full rounded-xl border bg-slate-900 text-emerald-400 p-2 text-xs font-mono" />
      </div>
    </div>
  );
}
