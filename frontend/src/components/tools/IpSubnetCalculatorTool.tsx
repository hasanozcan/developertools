'use client';

import React, { useState, useMemo } from 'react';
import { Network, Copy, Check } from 'lucide-react';
import { calculateSubnet } from '@/lib/ipSubnet';
import { useLanguage } from '@/context/LanguageContext';

export default function IpSubnetCalculatorTool() {
  const { t } = useLanguage();
  const [ip, setIp] = useState('192.168.1.100');
  const [cidr, setCidr] = useState(24);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateSubnet(ip, cidr);
  }, [ip, cidr]);

  const handleCopySummary = () => {
    const summary = `IP Address: ${result.ipAddress}/${result.cidr}
Network Address: ${result.networkAddress}
Broadcast Address: ${result.broadcastAddress}
Subnet Mask: ${result.subnetMask}
Wildcard Mask: ${result.wildcardMask}
Usable Host Range: ${result.firstUsableIp} - ${result.lastUsableIp}
Total Hosts: ${result.totalHosts} (Usable: ${result.usableHosts})
Class: ${result.ipClass}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.subnet.inputTitle') || 'IPv4 Address & CIDR Prefix'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 block mb-1">IPv4 Address</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="e.g. 192.168.1.1"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Subnet Prefix (CIDR / Mask)</label>
            <select
              value={cidr}
              onChange={(e) => setCidr(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {Array.from({ length: 33 }, (_, i) => i).map((c) => (
                <option key={c} value={c}>
                  /{c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subnet Calculation Matrix */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Subnet Calculation Results
          </span>
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy Summary')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Network Address', val: result.networkAddress, color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Broadcast Address', val: result.broadcastAddress, color: 'text-pink-600 dark:text-pink-400' },
            { label: 'Subnet Mask', val: result.subnetMask, color: 'text-slate-900 dark:text-white' },
            { label: 'Wildcard Mask', val: result.wildcardMask, color: 'text-slate-900 dark:text-white' },
            { label: 'First Usable Host', val: result.firstUsableIp, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Last Usable Host', val: result.lastUsableIp, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Usable Hosts', val: result.usableHosts.toLocaleString(), color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'IP Class', val: result.ipClass, color: 'text-amber-600 dark:text-amber-400' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-900/60 space-y-1"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{item.label}</span>
              <span className={`font-mono text-sm font-black ${item.color} truncate block`}>{item.val}</span>
            </div>
          ))}
        </div>

        {/* Binary Breakdown */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
          <span className="text-xs font-bold text-slate-500 block">Binary IP & Mask Representations</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 text-cyan-300">
              <span className="text-slate-500 block text-[10px] uppercase">IP Binary:</span>
              <span>{result.binaryIp}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-emerald-300">
              <span className="text-slate-500 block text-[10px] uppercase">Mask Binary:</span>
              <span>{result.binaryMask}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
