'use client';
import React, { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  base64ToBase64Url,
  base64UrlToBase64,
  decodeBase64Url,
  encodeBase64Url,
} from '@/lib/base64urlEncoder';

type Mode = 'encode' | 'decode' | 'to-url' | 'to-standard';

const MODES: { id: Mode; label: string; inputLabel: string; outputLabel: string; sample: string }[] = [
  {
    id: 'encode',
    label: 'Text to Base64url',
    inputLabel: 'Text',
    outputLabel: 'Base64url',
    sample: 'Hello World URL-Safe Payload?',
  },
  {
    id: 'decode',
    label: 'Base64url to Text',
    inputLabel: 'Base64url',
    outputLabel: 'Text',
    sample: 'SGVsbG8gV29ybGQgVVJMLVNhZmUgUGF5bG9hZD8',
  },
  {
    id: 'to-url',
    label: 'Base64 to Base64url',
    inputLabel: 'Standard Base64 (+, /, =)',
    outputLabel: 'URL-safe Base64url (-, _, no padding)',
    sample: 'a+b/c/+/==',
  },
  {
    id: 'to-standard',
    label: 'Base64url to Base64',
    inputLabel: 'URL-safe Base64url (-, _)',
    outputLabel: 'Standard Base64 (+, /, padded)',
    sample: 'ab-_',
  },
];

export default function Base64urlEncoderTool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState(MODES[0].sample);
  const active = MODES.find((entry) => entry.id === mode) ?? MODES[0];

  const { output, error } = useMemo(() => {
    try {
      switch (mode) {
        case 'encode':
          return { output: encodeBase64Url(input), error: '' };
        case 'decode':
          return { output: input.trim() ? decodeBase64Url(input) : '', error: '' };
        case 'to-url':
          return { output: base64ToBase64Url(input), error: '' };
        default:
          return { output: input.trim() ? base64UrlToBase64(input) : '', error: '' };
      }
    } catch (e: unknown) {
      return { output: '', error: e instanceof Error ? e.message : 'Conversion failed.' };
    }
  }, [mode, input]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Conversion mode">
        {MODES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={mode === entry.id}
            onClick={() => {
              setMode(entry.id);
              setInput(entry.sample);
            }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              mode === entry.id
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <label htmlFor="base64url-input" className="text-sm font-medium text-muted-foreground">
          {active.inputLabel}
        </label>
        <textarea
          id="base64url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="base64url-output" className="text-sm font-medium text-muted-foreground">
            {active.outputLabel}
          </label>
          <CopyButton text={output} />
        </div>
        {error && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}
        <textarea
          id="base64url-output"
          readOnly
          value={output}
          rows={8}
          className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm text-foreground shadow-sm"
        />
      </div>
    </div>
  );
}
