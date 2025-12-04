'use client';

import React, { useState } from 'react';
import { Code, Copy, Check, FileText, Trash2, Wand2 } from 'lucide-react';
import { format as formatSqlLib, type SqlLanguage } from 'sql-formatter';
import { useLanguage } from '@/context/LanguageContext';

interface FormatterOptions {
  indent: number;
  uppercase: boolean;
  linesBetweenQueries: number;
}

const DIALECT_OPTIONS: { value: SqlLanguage; label: string }[] = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'transactsql', label: 'SQL Server / T-SQL' },
  { value: 'plsql', label: 'Oracle PL/SQL' },
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'trino', label: 'Trino / Presto' },
];

interface InlineComment {
  placeholder: string;
  comment: string;
}

const INLINE_COMMENT_PREFIX = '__INLINE_COMMENT__';

const extractInlineComments = (sql: string) => {
  const inlineComments: InlineComment[] = [];
  const lines = sql.split(/\r?\n/);
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBracketIdentifier = false;

  const processed = lines.map((line) => {
    let processedLine = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const next = line[i + 1];

      if (char === "'" && !inDoubleQuote && !inBracketIdentifier) {
        processedLine += char;
        if (inSingleQuote && next === "'") {
          processedLine += next;
          i++;
        } else {
          inSingleQuote = !inSingleQuote;
        }
        continue;
      }

      if (char === '"' && !inSingleQuote && !inBracketIdentifier) {
        processedLine += char;
        if (inDoubleQuote && next === '"') {
          processedLine += next;
          i++;
        } else {
          inDoubleQuote = !inDoubleQuote;
        }
        continue;
      }

      if (char === '[' && !inSingleQuote && !inDoubleQuote) {
        inBracketIdentifier = true;
        processedLine += char;
        continue;
      }

      if (char === ']' && inBracketIdentifier) {
        processedLine += char;
        if (next === ']') {
          processedLine += next;
          i++;
        } else {
          inBracketIdentifier = false;
        }
        continue;
      }

      if (!inSingleQuote && !inDoubleQuote && !inBracketIdentifier && char === '-' && next === '-') {
        if (processedLine.trim().length > 0) {
          const commentText = line.slice(i).trimStart();
          const placeholder = `${INLINE_COMMENT_PREFIX}${inlineComments.length}__`;
          inlineComments.push({ placeholder, comment: ` ${commentText}` });
          processedLine = processedLine.replace(/\s+$/, '');
          processedLine += ` ${placeholder}`;
          break;
        } else {
          processedLine += line.slice(i);
          break;
        }
      }

      processedLine += char;
    }
    return processedLine;
  });

  return {
    sqlWithoutInlineComments: processed.join('\n'),
    inlineComments,
  };
};

const restoreInlineComments = (sql: string, inlineComments: InlineComment[]) => {
  if (inlineComments.length === 0) {
    return sql;
  }

  const lines = sql.split('\n');
  const commentMap = new Map(inlineComments.map(({ placeholder, comment }) => [placeholder, comment]));
  const placeholders = Array.from(commentMap.keys());

  for (let i = 0; i < lines.length; i++) {
    for (const placeholder of placeholders) {
      if (!commentMap.has(placeholder) || !lines[i].includes(placeholder)) {
        continue;
      }

      const comment = commentMap.get(placeholder);
      if (!comment) {
        continue;
      }

      if (lines[i].trim() === placeholder) {
        let targetIndex = i - 1;
        while (targetIndex >= 0 && lines[targetIndex].trim() === '') {
          targetIndex--;
        }

        if (targetIndex >= 0) {
          lines[targetIndex] = `${lines[targetIndex].replace(/\s+$/, '')}${comment}`;
        } else {
          lines[i] = lines[i].replace(placeholder, comment.trimStart());
        }

        lines.splice(i, 1);
        i--;
      } else if (lines[i].trim().startsWith(placeholder)) {
        let targetIndex = i - 1;
        while (targetIndex >= 0 && lines[targetIndex].trim() === '') {
          targetIndex--;
        }

        if (targetIndex >= 0) {
          lines[targetIndex] = `${lines[targetIndex].replace(/\s+$/, '')}${comment}`;
        } else {
          lines[i] = lines[i].replace(placeholder, comment.trimStart());
        }

        const placeholderIndex = lines[i].indexOf(placeholder);
        const indent = placeholderIndex > -1 ? lines[i].slice(0, placeholderIndex) : '';
        const remainder = placeholderIndex > -1
          ? lines[i].slice(placeholderIndex + placeholder.length).trimStart()
          : lines[i];

        if (remainder) {
          lines[i] = `${indent}${remainder}`;
        } else {
          lines.splice(i, 1);
          i--;
        }
      } else {
        lines[i] = lines[i].replace(placeholder, comment);
      }

      commentMap.delete(placeholder);
      break;
    }
  }

  return lines.join('\n');
};

const fixLeadingSemicolonBeforeWith = (sql: string) =>
  sql.replace(/\n\s*;\n(\s*)(WITH\b)/gi, '\n$1;$2');

export default function SqlFormatterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [dialect, setDialect] = useState<SqlLanguage>('sql');
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<FormatterOptions>({
    indent: 2,
    uppercase: true,
    linesBetweenQueries: 2,
  });

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const { sqlWithoutInlineComments, inlineComments } = extractInlineComments(input);
      const formatted = formatSqlLib(sqlWithoutInlineComments, {
        language: dialect,
        tabWidth: options.indent,
        useTabs: false,
        keywordCase: options.uppercase ? 'upper' : 'lower',
        linesBetweenQueries: options.linesBetweenQueries,
        newlineBeforeSemicolon: false,
      });
      const withInlineComments = restoreInlineComments(formatted, inlineComments);
      const cleaned = fixLeadingSemicolonBeforeWith(withInlineComments);
      setOutput(cleaned.trim());
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : t('common.error');
      setError(message);
      setOutput('');
    }
  };

  const minifySql = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const minified = input
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      .replace(/\s*=\s*/g, '=')
      .replace(/\s*;\s*/g, ';')
      .trim();
    setOutput(minified);
    setError(null);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`select u.id, u.name, u.email, o.order_id, o.total_amount from users u inner join orders o on u.id = o.user_id where u.status = 'active' and o.created_at > '2024-01-01' and o.total_amount > 100 order by o.created_at desc limit 10;
      select count(*) as total_users, avg(age) as average_age from users where country in ('US', 'UK', 'CA') group by country having count(*) > 100;
      -- This is a sample SQL query`);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">{t('tool.sqlFormatter.dialect')}:</label>
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value as SqlLanguage)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            {DIALECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">{t('tool.sqlFormatter.indent')}:</label>
          <select
            value={options.indent}
            onChange={(e) => setOptions({ ...options, indent: Number(e.target.value) })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value={2}>2 {t('common.spaces')}</option>
            <option value={4}>4 {t('common.spaces')}</option>
            <option value={8}>{t('common.tab')} (8)</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('tool.sqlFormatter.uppercaseKeywords')}</span>
        </label>

        <div className="flex-1" />

        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          {t('common.loadSample')}
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError(null);
          }}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {t('common.clear')}
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.sqlFormatter.sqlInput')}
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          rows={8}
          placeholder={t('tool.sqlFormatter.inputPlaceholder')}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-4 h-4" />
          {t('common.format')}
        </button>
        <button
          onClick={minifySql}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Code className="w-4 h-4" />
          {t('common.minify')}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-200">
          {t('common.error')}: {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('tool.sqlFormatter.formattedSql')}
            </label>
            <button
              onClick={copyOutput}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
          <div className="relative">
            <pre className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto max-h-96">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      )}

      {/* SQL Keywords Reference */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.sqlFormatter.commonKeywords')}</span>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'].map((kw) => (
              <span
                key={kw}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-mono"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
