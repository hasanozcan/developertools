'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { ArrowDownUp, Layers, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BatchResult {
  input: string;
  output: string;
  index: number;
}

function textToBinary(text: string): string {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
}

function binaryToText(binary: string): string {
  // Remove spaces and any other whitespace
  const cleanBinary = binary.replace(/\s+/g, ' ').trim();
  
  if (!cleanBinary) return '';
  
  const binaryArray = cleanBinary.split(' ');
  let text = '';
  
  for (const byte of binaryArray) {
    if (!/^[01]+$/.test(byte)) {
      throw new Error(`Invalid binary: "${byte}" is not a valid binary byte`);
    }
    if (byte.length > 8) {
      throw new Error(`Invalid binary byte: "${byte}" is too long (max 8 bits)`);
    }
    const charCode = parseInt(byte.padStart(8, '0'), 2);
    text += String.fromCharCode(charCode);
  }
  
  return text;
}

export default function BinaryEncoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [batchMode, setBatchMode] = useState(false);
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      setBatchResults([]);
      return;
    }

    try {
      if (batchMode) {
        // Batch processing
        const lines = input.split('\n').filter(line => line.trim());
        const results: BatchResult[] = lines.map((line, index) => {
          let result = '';
          if (mode === 'encode') {
            result = textToBinary(line);
          } else {
            result = binaryToText(line);
          }
          return { input: line, output: result, index };
        });
        setBatchResults(results);
        setOutput('');
      } else {
        // Single processing
        if (mode === 'encode') {
          setOutput(textToBinary(input));
        } else {
          setOutput(binaryToText(input));
        }
        setBatchResults([]);
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input for decoding');
      setOutput('');
      setBatchResults([]);
    }
  }, [input, mode, batchMode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError(null);
    setBatchResults([]);
  }, [output]);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput(batchMode ? 'Hello\nWorld\nTest' : 'Hello, World!');
    } else {
      setInput(batchMode ? '01001000 01100101 01101100 01101100 01101111\n01010111 01101111 01110010 01101100 01100100' : '01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001');
    }
    setOutput('');
    setError(null);
    setBatchResults([]);
  }, [mode, batchMode]);

  const copyToClipboard = useCallback(() => {
    if (batchMode) {
      const allResults = batchResults.map(r => r.output).join('\n');
      navigator.clipboard.writeText(allResults);
    } else {
      navigator.clipboard.writeText(output);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [batchMode, batchResults, output]);

  // Auto-convert on input change for single mode
  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (batchMode) {
      setOutput('');
      setBatchResults([]);
      setError(null);
      return;
    }

    if (!value.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(textToBinary(value));
      } else {
        setOutput(binaryToText(value));
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input for decoding');
      setOutput('');
    }
  }, [mode, batchMode]);

  return (
    <div className="space-y-6">
      {/* Controls */}
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
            Encode (Text → Binary)
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Decode (Binary → Text)
          </button>
        </div>

        {/* Batch Mode Toggle */}
        <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <input
            type="checkbox"
            checked={batchMode}
            onChange={(e) => setBatchMode(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
          />
          <Layers className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Batch Mode</span>
        </label>

        <button
          onClick={swapMode}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Swap input/output"
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>

        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Input/Output */}
      {batchMode ? (
        // Batch Mode Layout
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Text Lines (one per line)' : 'Binary Lines (one per line)'}
            </label>
            <CodeEditor
              value={input}
              onChange={(e) => setInput(e)}
              placeholder={mode === 'encode' ? 'Line 1\nLine 2\nLine 3' : '01001000 01100101 01101100 01101100 01101111'}
              language="text"
              minHeight="150px"
            />
            <button
              onClick={handleConvert}
              className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Convert All
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Results ({batchResults.length})
              </label>
              {batchResults.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : 'Copy All'}
                </button>
              )}
            </div>
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                {batchResults.map((result) => (
                  <div
                    key={result.index}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={result.input}>
                        {result.input}
                      </div>
                      <div className="font-mono text-sm text-gray-900 dark:text-white truncate">
                        {result.output}
                      </div>
                    </div>
                  </div>
                ))}
                {batchResults.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                    Enter text and click convert to see results
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Single Mode Layout (auto-convert)
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Text Input' : 'Binary Input'}
            </label>
            <CodeEditor
              value={input}
              onChange={handleInputChange}
              placeholder={mode === 'encode' ? 'Enter text to convert to binary...' : 'Enter binary to decode (e.g., 01001000 01100101)...'}
              language="text"
              minHeight="150px"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Binary Output' : 'Decoded Text'}
            </label>
            <div className="relative">
              <CodeEditor
                value={output}
                onChange={() => {}}
                readOnly
                language="text"
                minHeight="150px"
              />
              {output && !batchMode && (
                <div className="absolute top-2 right-2">
                  <CopyButton text={output} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          {mode === 'encode' 
            ? 'Each character is converted to its 8-bit binary representation (ASCII value).'
            : 'Binary values are converted back to their corresponding characters. Each byte should be 8 bits.'}
        </p>
      </div>
    </div>
  );
}
