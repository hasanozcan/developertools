'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import {
  generatePrometheusRecordingRules,
  type PrometheusRecordingRule,
} from '@/lib/prometheusRecordingRulesGenerator';

interface RuleDraft extends PrometheusRecordingRule {
  id: number;
}

export default function PrometheusRecordingRulesGeneratorTool() {
  const { t } = useLanguage();
  const [groupName, setGroupName] = useState('api_slos');
  const [interval, setIntervalValue] = useState('1m');
  const [rules, setRules] = useState<RuleDraft[]>([
    {
      id: 1,
      record: 'job:http_requests:rate5m',
      expr: 'sum(rate(http_requests_total[5m])) by (job)',
    },
    {
      id: 2,
      record: 'job:http_errors:ratio_rate5m',
      expr: 'sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))',
    },
  ]);
  const [nextId, setNextId] = useState(3);

  let output = '';
  let error = '';

  try {
    output = generatePrometheusRecordingRules({
      groupName,
      interval,
      rules: rules.map(({ record, expr }) => ({ record, expr })),
    });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Error generating rules YAML';
  }

  const updateRule = (id: number, patch: Partial<PrometheusRecordingRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { id: nextId, record: `custom:metric_${nextId}:rate5m`, expr: 'up == 1' },
    ]);
    setNextId((id) => id + 1);
  };

  const removeRule = (id: number) => {
    setRules((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="prom-group-name"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Group Name
            </label>
            <input
              id="prom-group-name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="api_slos"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="prom-interval"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Evaluation Interval (optional)
            </label>
            <input
              id="prom-interval"
              type="text"
              value={interval}
              onChange={(e) => setIntervalValue(e.target.value)}
              placeholder="1m"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Recording Rules ({rules.length})
            </span>
            <button
              type="button"
              onClick={addRule}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Rule
            </button>
          </div>

          {rules.map((rule, index) => (
            <div
              key={rule.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="md:col-span-5 space-y-1">
                <label
                  htmlFor={`prom-record-${rule.id}`}
                  className="block text-[11px] font-semibold text-slate-500"
                >
                  Record Metric #{index + 1}
                </label>
                <input
                  id={`prom-record-${rule.id}`}
                  type="text"
                  value={rule.record}
                  onChange={(e) => updateRule(rule.id, { record: e.target.value })}
                  placeholder="level:metric:operations"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <div className="md:col-span-6 space-y-1">
                <label
                  htmlFor={`prom-expr-${rule.id}`}
                  className="block text-[11px] font-semibold text-slate-500"
                >
                  PromQL Expression #{index + 1}
                </label>
                <input
                  id={`prom-expr-${rule.id}`}
                  type="text"
                  value={rule.expr}
                  onChange={(e) => updateRule(rule.id, { expr: e.target.value })}
                  placeholder="rate(http_requests_total[5m])"
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <div className="md:col-span-1 flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => removeRule(rule.id)}
                  disabled={rules.length <= 1}
                  aria-label={`Remove rule ${index + 1}`}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="prom-yaml-output"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {t('uiText.74d2d309')}
          </label>
          <CopyButton text={output} />
        </div>
        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        ) : (
          <textarea
            id="prom-yaml-output"
            value={output}
            readOnly
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          />
        )}
      </div>
    </div>
  );
}
