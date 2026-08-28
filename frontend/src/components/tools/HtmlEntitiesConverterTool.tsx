'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowLeftRight } from 'lucide-react';
import { encodeHtmlEntities, decodeHtmlEntities } from '@/lib/htmlEntitiesConverter';

export default function HtmlEntitiesConverterTool() {
  const [inputText, setInputText] = useState('<h1>Hello & "World" © 2026 €</h1>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [entityFormat, setEntityFormat] = useState<'named' | 'decimal' | 'hex'>('named');
  const [copied, setCopied] = useState(false);

  const outputText = useMemo(() => {
    if (!inputText) return '';
    if (mode === 'encode') {
      return encodeHtmlEntities(inputText, entityFormat);
    }
    return decodeHtmlEntities(inputText);
  }, [inputText, mode, entityFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-4">
          <div className="btn-group">
            <button
              onClick={() => setMode('encode')}
              className={`btn btn-sm ${mode === 'encode' ? 'btn-primary' : 'btn-outline'}`}
            >
              Encode to HTML Entities
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`btn btn-sm ${mode === 'decode' ? 'btn-primary' : 'btn-outline'}`}
            >
              Decode to Plain Text
            </button>
          </div>

          {mode === 'encode' && (
            <select
              value={entityFormat}
              onChange={(e) => setEntityFormat(e.target.value as any)}
              className="select select-bordered select-sm"
            >
              <option value="named">Named (&copy;, &lt;)</option>
              <option value="decimal">Decimal (&#169;)</option>
              <option value="hex">Hexadecimal (&#x00A9;)</option>
            </select>
          )}
        </div>

        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Output'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {mode === 'encode' ? 'Input Text / HTML:' : 'Input HTML Entities:'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {mode === 'encode' ? 'Encoded Result:' : 'Decoded UTF-8 Text:'}
          </label>
          <textarea
            readOnly
            value={outputText}
            className="textarea textarea-bordered w-full h-80 font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
