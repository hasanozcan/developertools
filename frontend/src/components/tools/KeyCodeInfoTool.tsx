'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Keyboard } from 'lucide-react';
import { parseKeyboardEvent, type KeyInfo } from '@/lib/keyCodeInfo';
import { useLanguage } from '@/context/LanguageContext';

export default function KeyCodeInfoTool() {
  const { t } = useLanguage();
  const [keyInfo, setKeyInfo] = useState<KeyInfo>({
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    location: 0,
    locationDescription: 'Standard',
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
  });
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent capturing inputs when user is typing inside textareas or inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      e.preventDefault();
      setKeyInfo(parseKeyboardEvent(e));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const jsCode = `window.addEventListener('keydown', (event) => {
  if (event.code === '${keyInfo.code}' || event.key === '${keyInfo.key}') {
    console.log('Pressed: ${keyInfo.key} (keyCode: ${keyInfo.keyCode})');
  }
});`;

  const copySnippet = () => {
    navigator.clipboard.writeText(jsCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Key Press Stage */}
      <div className="surface-card rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4 shadow-sm border border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
          <Keyboard className="w-4 h-4" />
          <span>{t('tool.keycode.pressPrompt') || 'Press Any Key on Your Keyboard'}</span>
        </div>

        {/* Large Key Code Banner */}
        <div className="font-mono text-6xl sm:text-7xl font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 px-10 py-5 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 shadow-inner">
          {keyInfo.keyCode}
        </div>

        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Key: <code className="text-indigo-600 dark:text-indigo-400">{keyInfo.key}</code> | Code:{' '}
          <code className="text-indigo-600 dark:text-indigo-400">{keyInfo.code}</code>
        </span>
      </div>

      {/* Property Details Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'event.key', val: keyInfo.key },
          { label: 'event.code', val: keyInfo.code },
          { label: 'event.which', val: keyInfo.which.toString() },
          { label: 'event.location', val: `${keyInfo.location} (${keyInfo.locationDescription})` },
        ].map((item) => (
          <div key={item.label} className="surface-card rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{item.label}</span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white truncate block">
              {item.val}
            </span>
          </div>
        ))}
      </div>

      {/* Modifier Keys Indicator */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Modifiers:</span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'Ctrl', active: keyInfo.ctrlKey },
            { label: 'Shift', active: keyInfo.shiftKey },
            { label: 'Alt', active: keyInfo.altKey },
            { label: 'Meta / Cmd', active: keyInfo.metaKey },
          ].map((m) => (
            <span
              key={m.label}
              className={`px-3 py-1 text-xs font-bold rounded-xl border transition ${
                m.active
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
              }`}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* JavaScript Event Listener Code */}
      <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            JavaScript Event Listener Code
          </span>
          <button
            onClick={copySnippet}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCode ? (t('common.copied') || 'Copied') : (t('common.copy') || 'Copy JS Code')}
          </button>
        </div>
        <textarea
          readOnly
          value={jsCode}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 font-mono text-xs text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-900/80 dark:text-cyan-300"
        />
      </div>
    </div>
  );
}
