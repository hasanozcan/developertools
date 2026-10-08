'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { computeEip712Hash } from '@/lib/eip712Hasher';
import { Copy, Check } from 'lucide-react';

export default function Eip712HasherTool() {
  const { t } = useLanguage();
  const [domainName, setDomainName] = useState('MyApp');
  const [chainId, setChainId] = useState(1);
  const [contract, setContract] = useState('0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC');
  const [copied, setCopied] = useState(false);

  const res = computeEip712Hash({ name: domainName, version: '1', chainId, verifyingContract: contract }, 'Mail', { contents: 'Hello Web3' });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">{t("uiText.ebf72648")}</label>
          <input value={domainName} onChange={(e) => setDomainName(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">{t("uiText.2e0454af")}</label>
          <input type="number" value={chainId} onChange={(e) => setChainId(parseInt(e.target.value, 10) || 1)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">{t("uiText.ecedc46e")}</label>
          <input value={contract} onChange={(e) => setContract(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 font-mono text-xs dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase">{t("uiText.84fe49e0")}</label>
        <p className="font-mono text-xs bg-slate-900 text-emerald-400 p-3 rounded-xl break-all">{res.eip712Digest}</p>
      </div>
    </div>
  );
}
