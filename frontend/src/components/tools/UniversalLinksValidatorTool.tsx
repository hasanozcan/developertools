'use client';
import React, { useState, useMemo } from 'react';
import { generateAppleAppSiteAssociation } from '@/lib/universalLinksValidator';

export default function UniversalLinksValidatorTool() {
  const [appId, setAppId] = useState('TEAMID.com.example.app');
  const json = useMemo(() => generateAppleAppSiteAssociation(appId, ['/tools/*']), [appId]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={appId} onChange={(e) => setAppId(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={10} value={json} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
