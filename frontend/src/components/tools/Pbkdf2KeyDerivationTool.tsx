'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { derivePbkdf2 } from '@/lib/pbkdf2KeyDerivation';

export default function Pbkdf2KeyDerivationTool() {
  const [pass, setPass] = useState('master-password-123');
  const [salt, setSalt] = useState('unique-salt-hex');
  let output = '';
  try {
    output = derivePbkdf2(pass, salt, 100000, 32);
  } catch (e: any) {
    output = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold">Password</label>
          <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div>
          <label className="text-xs font-semibold">Salt</label>
          <input type="text" value={salt} onChange={(e) => setSalt(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Derived Key (HMAC-SHA256, 100k iters)</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
