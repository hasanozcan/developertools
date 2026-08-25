'use client';
import React, { useState } from 'react';
import { calculateSubnet } from '@/lib/subnetCalculator';

export default function SubnetCalculatorTool() {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);

  const res = calculateSubnet(ip, cidr);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500">IP Address</label>
          <input value={ip} onChange={(e) => setIp(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold dark:border-white/10 dark:bg-slate-950" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">CIDR Prefix (/{cidr})</label>
          <input type="range" min="1" max="32" value={cidr} onChange={(e) => setCidr(parseInt(e.target.value, 10))} className="w-full mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Netmask</span>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{res.netmask}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Network Addr</span>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{res.networkAddress}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500">Broadcast Addr</span>
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{res.broadcastAddress}</p>
        </div>
        <div className="col-span-2 sm:col-span-3 rounded-2xl bg-indigo-50/50 border border-indigo-200 p-4 text-center dark:border-indigo-900/30 dark:bg-indigo-950/20">
          <span className="text-xs font-semibold text-slate-500">Usable Host Range & Total</span>
          <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{res.usableHostRange} ({res.usableHosts.toLocaleString()} usable hosts)</p>
        </div>
      </div>
    </div>
  );
}
