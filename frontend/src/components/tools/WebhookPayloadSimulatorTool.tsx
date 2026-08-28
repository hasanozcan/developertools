'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { generateMockWebhook } from '@/lib/webhookPayloadSimulator';

export default function WebhookPayloadSimulatorTool() {
  const [provider, setProvider] = useState<'stripe' | 'github' | 'slack'>('stripe');
  const payload = generateMockWebhook(provider);
  const output = JSON.stringify(payload, null, 2);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setProvider('stripe')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${provider === 'stripe' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Stripe</button>
        <button onClick={() => setProvider('github')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${provider === 'github' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>GitHub</button>
        <button onClick={() => setProvider('slack')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${provider === 'slack' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Slack</button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Synthetic Webhook Event JSON</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={12} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
