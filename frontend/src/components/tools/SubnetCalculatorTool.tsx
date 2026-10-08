'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { calculateSubnet } from '@/lib/subnetCalculator';

export default function SubnetCalculatorTool() {
  const { t } = useLanguage();
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);

  const res = calculateSubnet(ip, cidr);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500">{t("uiText.f368a574")}</label>
          <input value={ip} onChange={(e) => setIp(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">{t("uiText.73557c72")}{cidr})</label>
          <input type="range" min="1" max="32" value={cidr} onChange={(e) => setCidr(parseInt(e.target.value, 10))} className="w-full mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">{t("uiText.2110e4d0")}</span>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{res.netmask}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">{t("uiText.9c44b818")}</span>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{res.networkAddress}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">{t("uiText.a1f20d6f")}</span>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{res.broadcastAddress}</p>
        </div>
        <div className="col-span-2 sm:col-span-3 rounded-2xl bg-indigo-50/50 border border-indigo-200 p-4 text-center dark:border-indigo-900/30 dark:bg-indigo-950/20">
          <span className="text-xs font-semibold text-slate-500">{t("uiText.8292a994")}</span>
          <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{res.usableHostRange} ({res.usableHosts.toLocaleString()} {' ' + t("uiText.cbf893c1")}</p>
        </div>
      </div>
    </div>
  );
}
