'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateHmac } from '@/lib/hmacSha384Sha512Calculator';

export default function HmacSha384Sha512CalculatorTool() {
  const [msg, setMsg] = useState('{"event":"auth","user":"alice"}');
  const [secret, setSecret] = useState('super-secret-key');
  let output = '';
  try {
    const res = calculateHmac(msg, secret, 'sha512');
    output = JSON.stringify(res, null, 2);
  } catch (e: any) {
    output = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold">Message Payload</label>
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div>
          <label className="text-xs font-semibold">Secret Key</label>
          <input type="text" value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">HMAC-SHA512 Digest</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={8} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
