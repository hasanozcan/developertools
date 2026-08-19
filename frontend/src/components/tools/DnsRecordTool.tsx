'use client';

import React, { useState, useMemo } from 'react';
import { Shield, Copy, Check } from 'lucide-react';
import { generateSpfRecord, generateDkimTxt, type DnsSpfOptions } from '@/lib/dnsRecord';
import { useLanguage } from '@/context/LanguageContext';

export default function DnsRecordTool() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'spf' | 'dkim'>('spf');
  const [domain, setDomain] = useState('example.com');
  const [allowA, setAllowA] = useState(true);
  const [allowMx, setAllowMx] = useState(true);
  const [includes, setIncludes] = useState('_spf.google.com, sendgrid.net');
  const [ips, setIps] = useState('192.0.2.1');
  const [policy, setPolicy] = useState<DnsSpfOptions['policy']>('~all');

  const [selector, setSelector] = useState('google');
  const [dkimKey, setDkimKey] = useState('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3...');
  const [copied, setCopied] = useState(false);

  const spfRecord = useMemo(() => {
    return generateSpfRecord({
      domain,
      allowA,
      allowMx,
      includeDomains: includes.split(',').map((s) => s.trim()),
      ip4List: ips.split(',').map((s) => s.trim()),
      policy,
    });
  }, [domain, allowA, allowMx, includes, ips, policy]);

  const dkimRecord = useMemo(() => {
    return generateDkimTxt(selector, domain, dkimKey);
  }, [selector, domain, dkimKey]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="surface-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.dnsrec.title') || 'DNS Email Security Record Builder'}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('spf')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              tab === 'spf' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            SPF Record
          </button>
          <button
            onClick={() => setTab('dkim')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              tab === 'dkim' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            DKIM Record
          </button>
        </div>
      </div>

      {tab === 'spf' ? (
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Domain Name</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Enforcement Policy</label>
              <select
                value={policy}
                onChange={(e) => setPolicy(e.target.value as typeof policy)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              >
                <option value="~all">~all (SoftFail - Recommended)</option>
                <option value="-all">-all (HardFail - Strict)</option>
                <option value="?all">?all (Neutral - Testing)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Includes (comma separated)</label>
              <input
                type="text"
                value={includes}
                onChange={(e) => setIncludes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Authorized IPv4 Addresses</label>
              <input
                type="text"
                value={ips}
                onChange={(e) => setIps(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input type="checkbox" checked={allowA} onChange={(e) => setAllowA(e.target.checked)} className="rounded accent-indigo-600" />
              <span>Include A record (a)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input type="checkbox" checked={allowMx} onChange={(e) => setAllowMx(e.target.checked)} className="rounded accent-indigo-600" />
              <span>Include MX record (mx)</span>
            </label>
          </div>

          {/* Generated SPF TXT */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-slate-500">Generated TXT Record for @ ({domain})</span>
              <button
                onClick={() => handleCopy(spfRecord)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-600 dark:text-indigo-300"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy TXT Value</span>
              </button>
            </div>
            <textarea
              readOnly
              value={spfRecord}
              rows={2}
              className="w-full rounded-xl border border-slate-200 bg-slate-900 p-3.5 font-mono text-xs text-emerald-400"
            />
          </div>
        </div>
      ) : (
        <div className="surface-card rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">DKIM Selector</label>
              <input
                type="text"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-500 block mb-1">Public Key Base64</label>
              <textarea
                value={dkimKey}
                onChange={(e) => setDkimKey(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-1">
              <span className="text-[11px] text-slate-400 block font-mono">DNS Host Name:</span>
              <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">{dkimRecord.host}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500">TXT Record Value</span>
                <button
                  onClick={() => handleCopy(dkimRecord.value)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-600 dark:text-indigo-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Value</span>
                </button>
              </div>
              <textarea
                readOnly
                value={dkimRecord.value}
                rows={2}
                className="w-full rounded-xl border border-slate-200 bg-slate-900 p-3.5 font-mono text-xs text-emerald-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
