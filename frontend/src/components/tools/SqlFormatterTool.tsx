'use client';

import React, { useState } from 'react';
import { Code, Copy, Check, FileText, Trash2, Wand2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FormatOptions {
  indent: number;
  uppercase: boolean;
  linesBetweenQueries: number;
}

export default function SqlFormatterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<FormatOptions>({
    indent: 2,
    uppercase: true,
    linesBetweenQueries: 2,
  });

  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN',
    'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'OUTER JOIN',
    'ON', 'AS', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
    'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'TRUNCATE TABLE',
    'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW', 'DROP VIEW',
    'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
    'NULL', 'IS NULL', 'IS NOT NULL', 'TRUE', 'FALSE',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT',
    'ASC', 'DESC', 'EXISTS', 'ALL', 'ANY',
    'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'CONSTRAINT',
    'INDEX', 'UNIQUE', 'DEFAULT', 'AUTO_INCREMENT',
    'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION',
  ];

  const formatSql = (sql: string): string => {
    if (!sql.trim()) return '';

    let formatted = sql.trim();
    const indent = ' '.repeat(options.indent);

    // Normalize whitespace
    formatted = formatted.replace(/\s+/g, ' ');

    // Handle keywords case
    if (options.uppercase) {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/ /g, '\\s+')}\\b`, 'gi');
        formatted = formatted.replace(regex, keyword);
      });
    } else {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/ /g, '\\s+')}\\b`, 'gi');
        formatted = formatted.replace(regex, keyword.toLowerCase());
      });
    }

    const kw = options.uppercase;

    // Add newlines after major clauses
    const majorClauses = kw 
      ? ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'SET', 'VALUES']
      : ['select', 'from', 'where', 'order by', 'group by', 'having', 'limit', 'set', 'values'];

    majorClauses.forEach(clause => {
      const regex = new RegExp(`\\b${clause}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${clause}`);
    });

    // Add newlines before JOINs
    const joins = kw 
      ? ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'OUTER JOIN', 'JOIN']
      : ['inner join', 'left join', 'right join', 'full join', 'outer join', 'join'];

    joins.forEach(join => {
      const regex = new RegExp(`\\b${join}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${join}`);
    });

    // Add newlines before AND/OR in WHERE clauses
    const logicalOps = kw ? ['AND', 'OR'] : ['and', 'or'];
    logicalOps.forEach(op => {
      const regex = new RegExp(`\\b${op}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${indent}${op}`);
    });

    // Handle commas in SELECT
    formatted = formatted.replace(/,\s*/g, ',\n' + indent);

    // Handle subqueries - add indentation
    let parenDepth = 0;
    let result = '';
    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
      if (char === '(') {
        parenDepth++;
        result += char;
        if (formatted.substring(i + 1).trim().toUpperCase().startsWith('SELECT')) {
          result += '\n' + indent.repeat(parenDepth);
        }
      } else if (char === ')') {
        if (parenDepth > 0) {
          parenDepth--;
        }
        result += char;
      } else {
        result += char;
      }
    }
    formatted = result;

    // Clean up multiple newlines
    formatted = formatted.replace(/\n\s*\n/g, '\n');

    // Indent all lines except first
    const lines = formatted.split('\n');
    formatted = lines.map((line, i) => {
      const trimmed = line.trim();
      if (i === 0) return trimmed;
      
      // Check if line starts with a major keyword
      const startsWithMajor = majorClauses.some(clause => 
        trimmed.toUpperCase().startsWith(clause.toUpperCase())
      );
      const startsWithJoin = joins.some(join => 
        trimmed.toUpperCase().startsWith(join.toUpperCase())
      );

      if (startsWithMajor || startsWithJoin) {
        return trimmed;
      }
      return indent + trimmed;
    }).filter(line => line.trim()).join('\n');

    // Handle multiple statements
    formatted = formatted.replace(/;\s*/g, ';\n' + '\n'.repeat(options.linesBetweenQueries - 1));

    return formatted.trim();
  };

  const handleFormat = () => {
    setOutput(formatSql(input));
  };

  const minifySql = () => {
    const minified = input
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      .replace(/\s*=\s*/g, '=')
      .replace(/\s*;\s*/g, ';')
      .trim();
    setOutput(minified);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`select u.id, u.name, u.email, o.order_id, o.total_amount from users u inner join orders o on u.id = o.user_id where u.status = 'active' and o.created_at > '2024-01-01' and o.total_amount > 100 order by o.created_at desc limit 10;

select count(*) as total_users, avg(age) as average_age from users where country in ('US', 'UK', 'CA') group by country having count(*) > 100;`);
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
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
          onClick={() => { setInput(''); setOutput(''); }}
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
          onChange={(e) => setInput(e.target.value)}
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
