'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Globe, RefreshCw } from 'lucide-react';
import {
  checkDnsPropagation,
  DNS_RECORD_TYPES,
  type DnsLocationResult,
  type DnsRecordType,
} from '@/lib/dnsPropagationChecker';

function statusBadge(status: DnsLocationResult['status']) {
  switch (status) {
    case 'propagated':
      return {
        label: 'Propagated',
        className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
        Icon: CheckCircle2,
      };
    case 'mismatch':
      return {
        label: 'Mismatch',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
        Icon: AlertCircle,
      };
    case 'error':
      return {
        label: 'Error',
        className: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
        Icon: AlertCircle,
      };
    default:
      return {
        label: 'No Record',
        className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
        Icon: Clock,
      };
  }
}

export default function DnsPropagationCheckerTool() {
  const { t } = useLanguage();
  const [domain, setDomain] = useState('devstools.app');
  const [recordType, setRecordType] = useState<DnsRecordType>('A');
  const [expectedAnswer, setExpectedAnswer] = useState('');
  const [results, setResults] = useState<DnsLocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const runCheck = useCallback(
    async (targetDomain: string, targetType: DnsRecordType, targetExpected: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const nextResults = await checkDnsPropagation(targetDomain, targetExpected, {
          recordType: targetType,
          signal: controller.signal,
        });
        if (!controller.signal.aborted) {
          setResults(nextResults);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResults([]);
          setError(err instanceof Error ? err.message : 'DNS lookup failed.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    void runCheck('devstools.app', 'A', '');
    return () => {
      abortRef.current?.abort();
    };
  }, [runCheck]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runCheck(domain, recordType, expectedAnswer);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label htmlFor="dns-domain-input" className="text-xs font-semibold text-slate-500">
              {t('uiText.ebf72648')}
            </label>
            <input
              id="dns-domain-input"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-white/10 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="dns-record-type" className="text-xs font-semibold text-slate-500">
              Record Type
            </label>
            <select
              id="dns-record-type"
              value={recordType}
              onChange={(e) => setRecordType(e.target.value as DnsRecordType)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-white/10 dark:bg-slate-950"
            >
              {DNS_RECORD_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="dns-expected-input" className="text-xs font-semibold text-slate-500">
              Expected Value (optional)
            </label>
            <input
              id="dns-expected-input"
              value={expectedAnswer}
              onChange={(e) => setExpectedAnswer(e.target.value)}
              placeholder="e.g. 76.76.21.21"
              className="w-full rounded-xl border border-slate-200 p-2 text-xs font-mono dark:border-white/10 dark:bg-slate-950"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Querying DoH Resolvers...' : 'Check DNS Propagation'}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-2 dark:divide-white/10 dark:border-white/10 dark:bg-slate-900">
        {results.length === 0 && !loading ? (
          <p className="p-4 text-center text-xs text-slate-500">
            Submit a domain to compare live DNS-over-HTTPS responses from Google and Cloudflare.
          </p>
        ) : (
          results.map((r) => {
            const badge = statusBadge(r.status);
            const StatusIcon = badge.Icon;
            return (
              <div
                key={r.server}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-indigo-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {r.provider}
                    </span>
                    <span className="text-slate-400 font-mono">({r.server})</span>
                    <span className="text-[11px] text-slate-400">{r.latencyMs} ms</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {r.location} • TTL: {r.ttl !== null ? `${r.ttl}s` : 'N/A'} • RCODE: {r.rcode}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {r.error ? (
                    <span className="font-mono text-red-600 dark:text-red-400">{r.error}</span>
                  ) : r.answers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {r.answers.map((ans, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {ans}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="font-mono text-slate-400">No {r.recordType} records</span>
                  )}

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${badge.className}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {badge.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
