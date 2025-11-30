'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { ArrowDownUp } from 'lucide-react';

// Common HTML entities
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
  ' ': '&nbsp;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '¢': '&cent;',
  '§': '&sect;',
  '°': '&deg;',
  '±': '&plusmn;',
  '×': '&times;',
  '÷': '&divide;',
  '¶': '&para;',
  '•': '&bull;',
  '…': '&hellip;',
  '–': '&ndash;',
  '—': '&mdash;',
  '←': '&larr;',
  '→': '&rarr;',
  '↑': '&uarr;',
  '↓': '&darr;',
  '♠': '&spades;',
  '♣': '&clubs;',
  '♥': '&hearts;',
  '♦': '&diams;',
};

// Reverse mapping for decoding
const ENTITY_TO_CHAR: Record<string, string> = {};
Object.entries(HTML_ENTITIES).forEach(([char, entity]) => {
  ENTITY_TO_CHAR[entity] = char;
});

function encodeHtmlEntities(text: string, encodeAll: boolean = false): string {
  if (encodeAll) {
    // Encode all characters to numeric entities
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code > 127 || char === '&' || char === '<' || char === '>' || char === '"' || char === "'") {
          return `&#${code};`;
        }
        return char;
      })
      .join('');
  }

  // Encode only special characters
  return text.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] || char);
}

function decodeHtmlEntities(text: string): string {
  // Create a temporary element to decode entities
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  
  // Fallback for SSR
  let result = text;
  
  // Decode named entities
  Object.entries(ENTITY_TO_CHAR).forEach(([entity, char]) => {
    result = result.replace(new RegExp(entity, 'g'), char);
  });
  
  // Decode numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  
  // Decode numeric entities (hex)
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
  
  return result;
}

export default function HtmlEntityTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeAll, setEncodeAll] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    if (mode === 'encode') {
      setOutput(encodeHtmlEntities(input, encodeAll));
    } else {
      setOutput(decodeHtmlEntities(input));
    }
  }, [input, mode, encodeAll]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput(input);
  }, [input, output]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Decode
          </button>
        </div>
        
        {mode === 'encode' && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={encodeAll}
              onChange={(e) => setEncodeAll(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Encode all characters (numeric entities)</span>
          </label>
        )}
        
        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        
        <button
          onClick={swapMode}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Swap input and output"
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Plain Text' : 'HTML Encoded Text'}
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={mode === 'encode' ? 'Enter text with special characters...' : 'Enter HTML entities to decode...'}
            language="html"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'HTML Encoded' : 'Decoded Text'}
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="html"
            placeholder="Result will appear here..."
          />
        </div>
      </div>

      {/* Common Entities Reference */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Common HTML Entities Reference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[
            ['&', '&amp;'],
            ['<', '&lt;'],
            ['>', '&gt;'],
            ['"', '&quot;'],
            [' ', '&nbsp;'],
            ['©', '&copy;'],
            ['®', '&reg;'],
            ['™', '&trade;'],
            ['€', '&euro;'],
            ['£', '&pound;'],
            ['°', '&deg;'],
            ['•', '&bull;'],
          ].map(([char, entity]) => (
            <div
              key={entity}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm"
            >
              <span className="font-mono text-gray-600 dark:text-gray-300">{char === ' ' ? '␣' : char}</span>
              <span className="font-mono text-primary-600 dark:text-primary-400 text-xs">{entity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
