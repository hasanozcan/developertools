'use client';

import React, { useState, useMemo } from 'react';
import { Terminal, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { buildCurlCommand, type CurlBuilderOptions, type HeaderItem } from '@/lib/curlBuilder';
import { useLanguage } from '@/context/LanguageContext';

export default function CurlBuilderTool() {
  const { t } = useLanguage();
  const [method, setMethod] = useState<CurlBuilderOptions['method']>('POST');
  const [url, setUrl] = useState('https://api.example.com/v1/users');
  const [authType, setAuthType] = useState<CurlBuilderOptions['authType']>('bearer');
  const [bearerToken, setBearerToken] = useState('eyJh...');
  const [basicUser, setBasicUser] = useState('admin');
  const [basicPass, setBasicPass] = useState('secret123');
  const [headers, setHeaders] = useState<HeaderItem[]>([
    { key: 'Accept', value: 'application/json' },
  ]);
  const [bodyType, setBodyType] = useState<CurlBuilderOptions['bodyType']>('json');
  const [bodyContent, setBodyContent] = useState('{\n  "name": "Jane Doe",\n  "email": "jane@example.com"\n}');
  const [followRedirects, setFollowRedirects] = useState(true);
  const [insecure, setInsecure] = useState(false);
  const [compressed, setCompressed] = useState(true);
  const [copied, setCopied] = useState(false);

  const curlCommand = useMemo(() => {
    return buildCurlCommand({
      method,
      url,
      headers,
      bodyType,
      bodyContent,
      authType,
      bearerToken,
      basicUser,
      basicPass,
      followRedirects,
      insecure,
      compressed,
    });
  }, [
    method,
    url,
    headers,
    bodyType,
    bodyContent,
    authType,
    bearerToken,
    basicUser,
    basicPass,
    followRedirects,
    insecure,
    compressed,
  ]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (idx: number, field: 'key' | 'value', val: string) => {
    const next = [...headers];
    next[idx][field] = val;
    setHeaders(next);
  };

  const removeHeader = (idx: number) => {
    setHeaders(headers.filter((_, i) => i !== idx));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Request Settings */}
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {t('tool.curl.title') || 'HTTP Request Parameters & Target URL'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">HTTP Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as typeof method)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
              <option value="HEAD">HEAD</option>
              <option value="OPTIONS">OPTIONS</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="text-xs font-bold text-slate-500 block mb-1">Target Endpoint URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Authentication */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">Auth Type</label>
            <select
              value={authType}
              onChange={(e) => setAuthType(e.target.value as typeof authType)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="none">No Auth</option>
              <option value="bearer">Bearer Token</option>
              <option value="basic">Basic Auth (user:pass)</option>
            </select>
          </div>

          {authType === 'bearer' && (
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-500 block mb-1">Bearer Token</label>
              <input
                type="text"
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          )}

          {authType === 'basic' && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Username</label>
                <input
                  type="text"
                  value={basicUser}
                  onChange={(e) => setBasicUser(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Password</label>
                <input
                  type="password"
                  value={basicPass}
                  onChange={(e) => setBasicPass(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Headers & Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custom Headers */}
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Custom HTTP Headers
            </span>
            <button
              onClick={addHeader}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Header</span>
            </button>
          </div>

          <div className="space-y-2">
            {headers.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Header (e.g. X-Api-Key)"
                  value={h.key}
                  onChange={(e) => updateHeader(i, 'key', e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={h.value}
                  onChange={(e) => updateHeader(i, 'value', e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900"
                />
                <button
                  onClick={() => removeHeader(i)}
                  className="p-1.5 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Request Body */}
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Request Payload / Body
            </span>
            <div className="flex items-center gap-1.5">
              {(['none', 'json', 'form', 'raw'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBodyType(b)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-lg uppercase ${
                    bodyType === b ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {bodyType !== 'none' ? (
            <textarea
              value={bodyContent}
              onChange={(e) => setBodyContent(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
              placeholder={bodyType === 'json' ? '{"key": "value"}' : 'key=value'}
            />
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-xl border-slate-200 dark:border-white/10">
              No body attached (Standard for GET/HEAD requests)
            </div>
          )}
        </div>
      </div>

      {/* Generated cURL Command */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Executable cURL Command
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy cURL')}
          </button>
        </div>

        <textarea
          readOnly
          value={curlCommand}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950"
        />
      </div>
    </div>
  );
}
