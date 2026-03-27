'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

interface InsertOptions {
  batchInsert: boolean;
  includeNullValues: boolean;
}

function detectFormat(input: string): 'json' | 'csv' | 'unknown' {
  const trimmed = input.trim();
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      return 'unknown';
    }
  }
  if (trimmed.includes(',') && trimmed.includes('\n')) {
    return 'csv';
  }
  return 'unknown';
}

function parseCSV(input: string): { headers: string[]; rows: string[][] } {
  const lines = input.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length === 0) {
    return { headers: [], rows: [] };
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
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());

    return result;
  };

  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map((line) => parseCSVLine(line));

  return { headers, rows };
}

function parseJSON(input: string): Record<string, unknown>[] {
  const parsed = JSON.parse(input);
  if (Array.isArray(parsed)) {
    return parsed as Record<string, unknown>[];
  }
  return [parsed as Record<string, unknown>];
}

function escapeSQLValue(value: unknown, includeNull: boolean): string {
  if (value === null || value === undefined) {
    return includeNull ? 'NULL' : '';
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }

  const str = String(value);
  return `'${str.replace(/'/g, "''")}'`;
}

function generateInsertStatement(
  tableName: string,
  data: Record<string, unknown>[],
  options: InsertOptions
): string[] {
  if (data.length === 0) {
    return [];
  }

  const headers = Object.keys(data[0]);

  if (options.batchInsert) {
    const values = data
      .map((row) => {
        const rowValues = headers.map((header) => {
          const value = row[header];
          if ((value === null || value === undefined) && !options.includeNullValues) {
            return null;
          }
          return escapeSQLValue(value, options.includeNullValues);
        });
        if (rowValues.every((v) => v === null)) {
          return null;
        }
        return `(${rowValues.filter((v) => v !== null).join(', ')})`;
      })
      .filter((v) => v !== null);

    if (values.length === 0) {
      return [];
    }

    return [`INSERT INTO ${tableName} (${headers.join(', ')}) VALUES ${values.join(', ')};`];
  }

  return data.map((row) => {
    const rowValues = headers.map((header) => {
      const value = row[header];
      if ((value === null || value === undefined) && !options.includeNullValues) {
        return null;
      }
      return escapeSQLValue(value, options.includeNullValues);
    });

    const filteredHeaders = headers.filter((_, i) => rowValues[i] !== null);
    const filteredValues = rowValues.filter((v) => v !== null);

    return `INSERT INTO ${tableName} (${filteredHeaders.join(', ')}) VALUES (${filteredValues.join(', ')});`;
  });
}

function generateCSVInsertStatements(
  tableName: string,
  headers: string[],
  rows: string[][],
  options: InsertOptions
): string[] {
  const data = rows.map((row) => {
    const obj: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      const value = row[index];
      if (value === '' && !options.includeNullValues) {
        obj[header] = undefined;
      } else if (value === '') {
        obj[header] = null;
      } else {
        const numValue = Number(value);
        if (!isNaN(numValue) && value.trim() !== '') {
          obj[header] = numValue;
        } else {
          obj[header] = value;
        }
      }
    });
    return obj;
  });

  return generateInsertStatement(tableName, data, options);
}

export default function SqlInsertGeneratorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [tableName, setTableName] = useState('users');
  const [error, setError] = useState<string | null>(null);
  const [detectedFormat, setDetectedFormat] = useState<'json' | 'csv' | 'unknown' | null>(null);

  const [options, setOptions] = useState<InsertOptions>({
    batchInsert: true,
    includeNullValues: true,
  });

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (value.trim()) {
      setDetectedFormat(detectFormat(value));
    } else {
      setDetectedFormat(null);
    }
  }, []);

  const handleGenerate = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    if (!tableName.trim()) {
      setError('Table name is required');
      setOutput('');
      return;
    }

    try {
      const format = detectFormat(input);

      if (format === 'unknown') {
        setError('Unable to detect format. Please enter valid JSON array or CSV data.');
        setOutput('');
        return;
      }

      let statements: string[];

      if (format === 'json') {
        const data = parseJSON(input);
        statements = generateInsertStatement(tableName, data, options);
      } else {
        const { headers, rows } = parseCSV(input);
        if (headers.length === 0) {
          setError('CSV data must have at least one header and one data row');
          setOutput('');
          return;
        }
        statements = generateCSVInsertStatements(tableName, headers, rows, options);
      }

      if (statements.length === 0) {
        setOutput('');
        setError('No valid data to generate INSERT statements');
        return;
      }

      setOutput(statements.join('\n'));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, tableName, options]);

  const loadSampleData = useCallback(() => {
    setInput(JSON.stringify([
      { name: 'John', age: 30, email: 'john@example.com' },
      { name: 'Jane', age: 25, email: 'jane@example.com' },
      { name: 'Bob', age: 35, email: 'bob@example.com' },
    ], null, 2));
    setDetectedFormat('json');
  }, []);

  const loadSampleCSV = useCallback(() => {
    setInput('name,age,email\nJohn,30,john@example.com\nJane,25,jane@example.com\nBob,35,bob@example.com');
    setDetectedFormat('csv');
  }, []);

  return (
    <div className="space-y-6">
      {/* Table Name Input */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Table Name:
          </label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="e.g., users"
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {detectedFormat && (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            Detected: {detectedFormat.toUpperCase()}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.batchInsert}
            onChange={(e) => setOptions({ ...options, batchInsert: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Batch INSERT (multiple rows in one statement)
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeNullValues}
            onChange={(e) => setOptions({ ...options, includeNullValues: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Include NULL values
          </span>
        </label>
      </div>

      {/* Sample Data Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={loadSampleData}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Load Sample JSON
        </button>
        <button
          onClick={loadSampleCSV}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Load Sample CSV
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Generate INSERT
        </button>
        {output && <CopyButton text={output} />}
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
            Input Data (JSON or CSV)
          </label>
          <CodeEditor
            value={input}
            onChange={handleInputChange}
            placeholder={'[{"name": "John", "age": 30}]' + '\nor\nname,age\nJohn,30'}
            language="text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SQL INSERT Statement
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="sql"
            placeholder="Generated SQL INSERT statements will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
