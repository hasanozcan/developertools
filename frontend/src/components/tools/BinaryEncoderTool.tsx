'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { ArrowDownUp, Layers, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { convertEncoding } from '@/lib/encodingWorkbench';
import { localizeUiText } from '@/lib/localizedText';

interface BatchResult {
  input: string;
  output: string;
  index: number;
}

function textToBinary(text: string): string {
  return convertEncoding(text, 'binary', 'encode');
}

function binaryToText(binary: string): string {
  return convertEncoding(binary, 'binary', 'decode');
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
            {t("uiText.413fc3fe")}</button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t("uiText.4f804d5e")}</button>
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
          <span className="text-sm text-gray-700 dark:text-gray-300">{t("tool.base64.batchMode")}</span>
        </label>

        <button
          onClick={swapMode}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={t("tool.yamlJson.swap")}
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>

        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t("common.loadSample")}</button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {localizeUiText(error, t)}
        </div>
      )}

      {/* Input/Output */}
      {batchMode ? (
        // Batch Mode Layout
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? t("uiText.0d6e88e9") : t("uiText.e3e6558b")}
            </label>
            <CodeEditor
              value={input}
              onChange={(e) => setInput(e)}
              placeholder={mode === 'encode' ? t("uiText.a0697327") : '01001000 01100101 01101100 01101100 01101111'}
              language="text"
              minHeight="150px"
            />
            <button
              onClick={handleConvert}
              className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              {t("tool.base64.convertAll")}</button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("uiText.a7a3e345")}{batchResults.length})
              </label>
              {batchResults.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : t("tool.slugGenerator.copyAll")}
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
                    {t("uiText.3d5a67e2")}</div>
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
              {mode === 'encode' ? t("uiText.c65f0bae") : t("uiText.3da1f918")}
            </label>
            <CodeEditor
              value={input}
              onChange={handleInputChange}
              placeholder={mode === 'encode' ? t("uiText.20948512") : t("uiText.7201c13c")}
              language="text"
              minHeight="150px"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? t("uiText.7e7c09f9") : t("tool.urlEncoder.decodedText")}
            </label>
            <div className="relative">
              <CodeEditor
                value={output}
                onChange={() => {}}
                readOnly
                language="text"
                minHeight="150px"
              />
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          {mode === 'encode' 
            ? t("uiText.eb4c5305")
            : t("uiText.45fe45d4")}
        </p>
      </div>
    </div>
  );
}
