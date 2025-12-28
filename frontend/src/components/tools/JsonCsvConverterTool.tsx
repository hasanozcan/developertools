'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { Copy, Check, Download, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface JsonToCsvOptions {
  delimiter: string;
  includeHeaders: boolean;
  flattenNested: boolean;
  nestedHandling: 'flatten' | 'expand' | 'jsonString';
}

interface PreviewRow {
  [key: string]: string;
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else if (Array.isArray(value)) {
      result[newKey] = JSON.stringify(value);
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}

function escapeCSVField(field: unknown, delimiter: string): string {
  if (field === null || field === undefined) {
    return '';
  }
  
  const str = String(field);
  
  // If field contains delimiter, quotes, or newlines, wrap in quotes
  if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  
  return str;
}

function jsonToCsv(json: unknown[], options: JsonToCsvOptions): string {
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('Input must be a non-empty array of objects');
  }

  // Process objects based on nested handling option
  const processedData = json.map((item) => {
    const obj = item as Record<string, unknown>;
    
    if (options.nestedHandling === 'flatten') {
      return flattenObject(obj);
    } else if (options.nestedHandling === 'jsonString') {
      // Convert nested objects to JSON strings
      const result: Record<string, unknown> = {};
      for (const key in obj) {
        const value = obj[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          result[key] = JSON.stringify(value);
        } else if (Array.isArray(value)) {
          result[key] = JSON.stringify(value);
        } else {
          result[key] = value;
        }
      }
      return result;
    } else {
      // expand - keep as is, will use top-level keys only
      return obj;
    }
  });

  // Get all unique headers
  const headers = new Set<string>();
  processedData.forEach((item) => {
    if (item && typeof item === 'object') {
      Object.keys(item as object).forEach((key) => headers.add(key));
    }
  });

  const headerArray = Array.from(headers);
  const lines: string[] = [];

  // Add headers
  if (options.includeHeaders) {
    lines.push(headerArray.map((h) => escapeCSVField(h, options.delimiter)).join(options.delimiter));
  }

  // Add data rows
  processedData.forEach((item) => {
    const row = headerArray.map((header) => {
      const value = (item as Record<string, unknown>)[header];
      return escapeCSVField(value, options.delimiter);
    });
    lines.push(row.join(options.delimiter));
  });

  return lines.join('\n');
}

function generatePreview(csv: string, maxRows: number = 5): { headers: string[]; rows: PreviewRow[] } {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim());
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // First line is headers
  const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').replace(/""/g, '"'));
  
  // Get data rows (limited by maxRows)
  const rows: PreviewRow[] = [];
  const dataLines = lines.slice(1, Math.min(maxRows + 1, lines.length));
  
  for (const line of dataLines) {
    const values: string[] = [];
    let inQuotes = false;
    let current = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);
    
    const row: PreviewRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }
  
  return { headers, rows };
}

function csvToJson(csv: string, options: { delimiter: string; hasHeaders: boolean }): unknown[] {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim());
  
  if (lines.length === 0) {
    throw new Error('CSV is empty');
  }

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === options.delimiter && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    
    return result;
  };

  let headers: string[];
  let dataStartIndex: number;

  if (options.hasHeaders) {
    headers = parseCSVLine(lines[0]);
    dataStartIndex = 1;
  } else {
    const firstRow = parseCSVLine(lines[0]);
    headers = firstRow.map((_, index) => `column${index + 1}`);
    dataStartIndex = 0;
  }

  const result: Record<string, string>[] = [];

  for (let i = dataStartIndex; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const obj: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    result.push(obj);
  }

  return result;
}

export default function JsonCsvConverterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'jsonToCsv' | 'csvToJson'>('jsonToCsv');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Options
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flattenNested, setFlattenNested] = useState(true);
  const [nestedHandling, setNestedHandling] = useState<'flatten' | 'expand' | 'jsonString'>('flatten');
  const [showPreview, setShowPreview] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'jsonToCsv') {
        const json = JSON.parse(input);
        const csv = jsonToCsv(json, { delimiter, includeHeaders, flattenNested, nestedHandling });
        setOutput(csv);
      } else {
        const json = csvToJson(input, { delimiter, hasHeaders: includeHeaders });
        setOutput(JSON.stringify(json, null, 2));
      }
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, mode, delimiter, includeHeaders, flattenNested, nestedHandling]);

  const preview = output && mode === 'jsonToCsv' ? generatePreview(output, 5) : null;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const downloadFile = useCallback(() => {
    const blob = new Blob([output], { type: mode === 'jsonToCsv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'jsonToCsv' ? 'data.csv' : 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, mode]);

  const loadSampleData = useCallback(() => {
    if (mode === 'jsonToCsv') {
      setInput(JSON.stringify([
        { name: 'John Doe', age: 30, email: 'john@example.com', address: { city: 'New York', country: 'USA' } },
        { name: 'Jane Smith', age: 25, email: 'jane@example.com', address: { city: 'London', country: 'UK' } },
        { name: 'Bob Johnson', age: 35, email: 'bob@example.com', address: { city: 'Tokyo', country: 'Japan' } },
      ], null, 2));
    } else {
      setInput('name,age,email,city\nJohn Doe,30,john@example.com,New York\nJane Smith,25,jane@example.com,London\nBob Johnson,35,bob@example.com,Tokyo');
    }
  }, [mode]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => { setMode('jsonToCsv'); setInput(''); setOutput(''); setError(null); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'jsonToCsv'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t('tool.jsonCsv.jsonToCsv')}
          </button>
          <button
            onClick={() => { setMode('csvToJson'); setInput(''); setOutput(''); setError(null); }}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'csvToJson'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t('tool.jsonCsv.csvToJson')}
          </button>
        </div>
        
        <button
          onClick={loadSampleData}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {t('common.loadSample')}
        </button>
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonCsv.delimiter')}:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value=",">{t('tool.jsonCsv.comma')} (,)</option>
            <option value=";">{t('tool.jsonCsv.semicolon')} (;)</option>
            <option value="\t">TSV ({t('common.tab')})</option>
            <option value="|">{t('tool.jsonCsv.pipe')} (|)</option>
          </select>
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeHeaders}
            onChange={(e) => setIncludeHeaders(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {mode === 'jsonToCsv' ? t('tool.jsonCsv.includeHeaders') : t('tool.jsonCsv.firstRowHeaders')}
          </span>
        </label>
        
        {mode === 'jsonToCsv' && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">{t('tool.jsonCsv.nestedHandling')}:</label>
              <select
                value={nestedHandling}
                onChange={(e) => setNestedHandling(e.target.value as 'flatten' | 'expand' | 'jsonString')}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="flatten">{t('tool.jsonCsv.nestedFlatten')}</option>
                <option value="expand">{t('tool.jsonCsv.nestedExpand')}</option>
                <option value="jsonString">{t('tool.jsonCsv.nestedJsonString')}</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flattenNested}
                onChange={(e) => setFlattenNested(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.jsonCsv.flattenObjects')}</span>
            </label>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleConvert}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('common.convert')}
        </button>
        {output && (
          <>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
            <button
              onClick={downloadFile}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('common.download')}
            </button>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'jsonToCsv' ? t('tool.jsonCsv.jsonInput') : t('tool.jsonCsv.csvInput')}
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={mode === 'jsonToCsv' ? '[{"name": "John", "age": 30}]' : 'name,age\nJohn,30'}
            language={mode === 'jsonToCsv' ? 'json' : 'text'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'jsonToCsv' ? t('tool.jsonCsv.csvOutput') : t('tool.jsonCsv.jsonOutput')}
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language={mode === 'jsonToCsv' ? 'text' : 'json'}
            placeholder={t('tool.jsonCsv.outputPlaceholder')}
          />
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && preview && mode === 'jsonToCsv' && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">CSV Preview (First 5 rows)</span>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {preview.headers.map((header) => (
                    <th key={header} className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-600">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {preview.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    {preview.headers.map((header) => (
                      <td key={header} className="px-4 py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                        <span className="block max-w-xs truncate" title={row[header]}>
                          {row[header] || <span className="text-gray-400">-</span>}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
