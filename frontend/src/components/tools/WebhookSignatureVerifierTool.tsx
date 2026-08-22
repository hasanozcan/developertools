'use client';
import React, { useState, useMemo } from 'react';
import { verifyWebhookSignature } from '@/lib/webhookSignatureVerifier';

export default function WebhookSignatureVerifierTool() {
  const [payload, setPayload] = useState('{"event":"payment_intent.succeeded"}');
  const [secret, setSecret] = useState('whsec_test123');
  const [sig, setSig] = useState('');

  const res = useMemo(() => verifyWebhookSignature(payload, sig, secret), [payload, sig, secret]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" placeholder="Webhook Secret" value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea rows={4} value={payload} onChange={(e) => setPayload(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <input type="text" placeholder="Expected Signature" value={res.expectedSignature} readOnly className="w-full rounded-xl border bg-slate-900 text-emerald-400 p-2 text-xs font-mono" />
      </div>
    </div>
  );
}
