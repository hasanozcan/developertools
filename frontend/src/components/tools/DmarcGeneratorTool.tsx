'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ShieldCheck, Mail, Globe, Server } from 'lucide-react';
import { generateSpfRecord, generateDmarcRecord } from '@/lib/dnsRecordGenerator';
import { useLanguage } from '@/context/LanguageContext';

export default function DmarcGeneratorTool() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'spf' | 'dmarc'>('spf');
  const [domain, setDomain] = useState('example.com');

  // SPF options
  const [allowMx, setAllowMx] = useState(true);
  const [allowA, setAllowA] = useState(true);
  const [ip4Input, setIp4Input] = useState('');
  const [includeGoogle, setIncludeGoogle] = useState(true);
  const [includeSendgrid, setIncludeSendgrid] = useState(false);
  const [includeMicrosoft, setIncludeMicrosoft] = useState(false);
  const [spfPolicy, setSpfPolicy] = useState<'~all' | '-all' | '?all'>('~all');

  // DMARC options
  const [dmarcPolicy, setDmarcPolicy] = useState<'none' | 'quarantine' | 'reject'>('quarantine');
  const [ruaEmail, setRuaEmail] = useState('dmarc-reports@example.com');
  const [dmarcPercentage, setDmarcPercentage] = useState(100);
  const [dkimAlign, setDkimAlign] = useState<'r' | 's'>('r');
  const [spfAlign, setSpfAlign] = useState<'r' | 's'>('r');

  const [copied, setCopied] = useState(false);

  const spfRecord = useMemo(() => {
    const includes: string[] = [];
    if (includeGoogle) includes.push('_spf.google.com');
    if (includeSendgrid) includes.push('sendgrid.net');
    if (includeMicrosoft) includes.push('spf.protection.outlook.com');

    const ip4 = ip4Input.split(',').map((s) => s.trim()).filter(Boolean);

    return generateSpfRecord({
      domain,
      allowMx,
      allowA,
      ip4,
      ip6: [],
      includes,
      policy: spfPolicy,
    });
  }, [domain, allowMx, allowA, ip4Input, includeGoogle, includeSendgrid, includeMicrosoft, spfPolicy]);

  const dmarcRecord = useMemo(() => {
    return generateDmarcRecord({
      domain,
      policy: dmarcPolicy,
      ruaEmail,
      percentage: dmarcPercentage,
      alignmentDkim: dkimAlign,
      alignmentSpf: spfAlign,
      reportFormat: 'afrf',
    });
  }, [domain, dmarcPolicy, ruaEmail, dmarcPercentage, dkimAlign, spfAlign]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Domain Bar */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <Globe className="h-5 w-5 text-indigo-500 shrink-0" />
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Target Domain Name
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('spf')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'spf'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          1. SPF Record Generator
        </button>
        <button
          onClick={() => setActiveTab('dmarc')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'dmarc'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          2. DMARC Record Generator
        </button>
      </div>

      {/* SPF Tab Form */}
      {activeTab === 'spf' && (
        <div className="p-6 rounded-3xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Basic Inclusions
              </span>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowMx}
                  onChange={(e) => setAllowMx(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                Include Domain MX servers (<code>mx</code>)
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowA}
                  onChange={(e) => setAllowA(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                Include Domain A/AAAA IP (<code>a</code>)
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Custom Authorized IPv4 Addresses / CIDRs (comma separated):
                </label>
                <input
                  type="text"
                  value={ip4Input}
                  onChange={(e) => setIp4Input(e.target.value)}
                  placeholder="192.0.2.1, 198.51.100.0/24"
                  className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Third-Party Email Providers
              </span>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGoogle}
                  onChange={(e) => setIncludeGoogle(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                Google Workspace (<code>_spf.google.com</code>)
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMicrosoft}
                  onChange={(e) => setIncludeMicrosoft(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                Microsoft 365 (<code>spf.protection.outlook.com</code>)
              </label>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSendgrid}
                  onChange={(e) => setIncludeSendgrid(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                SendGrid (<code>sendgrid.net</code>)
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Enforcement Policy:
                </label>
                <select
                  value={spfPolicy}
                  onChange={(e) => setSpfPolicy(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="~all">~all (SoftFail - Recommended default)</option>
                  <option value="-all">-all (Strict Fail - Reject unauthorized)</option>
                  <option value="?all">?all (Neutral - Testing mode)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Generated DNS TXT Record (Host: {spfRecord.host})
              </span>
              <button
                onClick={() => handleCopy(spfRecord.record)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy TXT'}
              </button>
            </div>
            <pre className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-300 select-all whitespace-pre-wrap">
              {spfRecord.record}
            </pre>
          </div>
        </div>
      )}

      {/* DMARC Tab Form */}
      {activeTab === 'dmarc' && (
        <div className="p-6 rounded-3xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-900 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Policy (p):
              </label>
              <select
                value={dmarcPolicy}
                onChange={(e) => setDmarcPolicy(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="none">none (Monitoring only - No action on failure)</option>
                <option value="quarantine">quarantine (Send failed mail to Spam/Junk)</option>
                <option value="reject">reject (Block failed mail completely)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Aggregate Reporting Email (rua):
              </label>
              <input
                type="email"
                value={ruaEmail}
                onChange={(e) => setRuaEmail(e.target.value)}
                placeholder="dmarc-reports@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Generated DNS TXT Record (Host: {dmarcRecord.host})
              </span>
              <button
                onClick={() => handleCopy(dmarcRecord.record)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy TXT'}
              </button>
            </div>
            <pre className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-300 select-all whitespace-pre-wrap">
              {dmarcRecord.record}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
