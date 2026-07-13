'use client';

import { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { formatChmod, parseChmod, type ChmodPermissions } from '@/lib/chmod';

const classes = [
  { key: 'owner', label: 'Owner' },
  { key: 'group', label: 'Group' },
  { key: 'others', label: 'Others' },
] as const;
const bits = [
  { bit: 4, label: 'Read' },
  { bit: 2, label: 'Write' },
  { bit: 1, label: 'Execute' },
] as const;

export default function ChmodCalculatorTool() {
  const [permissions, setPermissions] = useState<ChmodPermissions>(() => parseChmod('755'));
  const [octalInput, setOctalInput] = useState('755');
  const [error, setError] = useState('');
  const result = useMemo(() => formatChmod(permissions), [permissions]);

  const applyOctal = (value: string) => {
    setOctalInput(value);
    try {
      setPermissions(parseChmod(value));
      setError('');
    } catch (parseError) {
      setError(parseError instanceof Error ? parseError.message : 'Invalid mode.');
    }
  };

  const update = (next: ChmodPermissions) => {
    setPermissions(next);
    const formatted = formatChmod(next);
    setOctalInput(formatted.octal);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <label
            htmlFor="chmod-octal"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Octal mode
          </label>
          <input
            id="chmod-octal"
            value={octalInput}
            onChange={(event) => applyOctal(event.target.value)}
            inputMode="numeric"
            spellCheck={false}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['755', '644', '600', '775'].map((preset) => (
            <button
              key={preset}
              onClick={() => applyOctal(preset)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[34rem] text-sm">
          <thead className="bg-gray-50 text-left text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Class</th>
              {bits.map(({ label }) => (
                <th key={label} className="px-4 py-3">
                  {label}
                </th>
              ))}
              <th className="px-4 py-3">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {classes.map(({ key, label }) => (
              <tr key={key}>
                <th className="px-4 py-3 text-left text-gray-900 dark:text-white">{label}</th>
                {bits.map(({ bit, label: bitLabel }) => (
                  <td key={bit} className="px-4 py-3">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        aria-label={`${label} ${bitLabel}`}
                        checked={Boolean(permissions[key] & bit)}
                        onChange={() => update({ ...permissions, [key]: permissions[key] ^ bit })}
                        className="rounded border-gray-300 text-primary-600"
                      />
                      <span className="text-gray-600 dark:text-gray-300">{bitLabel}</span>
                    </label>
                  </td>
                ))}
                <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                  {permissions[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Octal', result.octal],
          ['Symbolic', result.symbolic],
          ['Command', result.command],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {label}
            </div>
            <div className="flex items-center justify-between gap-3">
              <code className="break-all text-gray-900 dark:text-white">{value}</code>
              <CopyButton text={value} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 text-sm text-gray-600 dark:text-gray-300">
        {[
          ['setuid', 'setuid'],
          ['setgid', 'setgid'],
          ['sticky', 'sticky'],
        ].map(([key, label]) => (
          <label key={key} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={permissions[key as 'setuid' | 'setgid' | 'sticky']}
              onChange={() =>
                update({
                  ...permissions,
                  [key]: !permissions[key as 'setuid' | 'setgid' | 'sticky'],
                })
              }
              className="rounded border-gray-300 text-primary-600"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
