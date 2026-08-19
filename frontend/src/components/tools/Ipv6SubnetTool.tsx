'use client';

import React, { useState, useMemo } from 'react';
import { Network, Copy, Check } from 'lucide-react';
import { calculateIpv6Subnet } from '@/lib/ipv6Subnet';
import { useLanguage } from '@/context/LanguageContext';

export default function Ipv6SubnetTool() {
  const { t } = useLanguage();
  const [ipInput, setIpInput] = useState('2001:0db8:85a3::8a2e:0370:7334');
  const [prefix, setPrefix] = useState(64);
  const [copied, setCopied] = useState(false);

  const subnet = useMemo(() => {
    return calculateIpv6Subnet(ipInput, prefix);
  }, [ipInput, prefix]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(subnet, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Config Card */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.ipv6.title') || 'IPv6 Subnet & Prefix Calculator'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 block mb-1">IPv6 Address</label>
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="2001:db8::1"
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Prefix Length (/{prefix})</label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
            >
              {[32, 48, 56, 64, 96, 112, 120, 124, 126, 127, 128].map((p) => (
                <option key={p} value={p}>/{p} ({p === 64 ? 'Standard Subnet' : p === 48 ? 'Site Prefix' : `${p} bits`})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subnet Details Grid */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">IPv6 Subnet Breakdown</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JSON')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900 space-y-1">
            <span className="text-[11px] text-slate-400 block">Expanded IPv6 (128-bit Full)</span>
            <span className="font-bold text-slate-900 dark:text-white break-all">{subnet.expandedIp}</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900 space-y-1">
            <span className="text-[11px] text-slate-400 block">Compressed IPv6 (RFC 5952)</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 break-all">{subnet.compressedIp}</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900 space-y-1">
            <span className="text-[11px] text-slate-400 block">Network Prefix / CIDR</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{subnet.networkPrefix}</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900 space-y-1">
            <span className="text-[11px] text-slate-400 block">Address Type</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">{subnet.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
