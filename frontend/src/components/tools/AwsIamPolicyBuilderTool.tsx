'use client';

import React, { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { buildAwsIamPolicy, type IamStatement } from '@/lib/awsIamPolicyBuilder';

interface StatementDraft {
  id: number;
  sid: string;
  effect: 'Allow' | 'Deny';
  actionsText: string;
  resourcesText: string;
}

const INITIAL_STATEMENTS: StatementDraft[] = [
  {
    id: 1,
    sid: 'S3ReadBucket',
    effect: 'Allow',
    actionsText: 's3:GetObject, s3:ListBucket',
    resourcesText: 'arn:aws:s3:::my-bucket, arn:aws:s3:::my-bucket/*',
  },
];

function splitCommaOrNewline(raw: string): string[] {
  return raw
    .split(/[\r\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AwsIamPolicyBuilderTool() {
  const [statements, setStatements] = useState<StatementDraft[]>(INITIAL_STATEMENTS);
  const [nextId, setNextId] = useState(2);

  const policy = useMemo(() => {
    const mapped: IamStatement[] = statements.map((s) => ({
      sid: s.sid.trim() || undefined,
      effect: s.effect,
      actions: splitCommaOrNewline(s.actionsText),
      resources: splitCommaOrNewline(s.resourcesText),
    }));
    return buildAwsIamPolicy(mapped);
  }, [statements]);

  const updateStatement = (id: number, patch: Partial<StatementDraft>) => {
    setStatements((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const addStatement = () => {
    setStatements((prev) => [
      ...prev,
      {
        id: nextId,
        sid: `Statement${nextId}`,
        effect: 'Allow',
        actionsText: 'logs:CreateLogStream, logs:PutLogEvents',
        resourcesText: '*',
      },
    ]);
    setNextId((n) => n + 1);
  };

  const removeStatement = (id: number) => {
    setStatements((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Policy Statements ({statements.length})
          </h3>
          <button
            type="button"
            onClick={addStatement}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Statement
          </button>
        </div>

        <div className="space-y-4">
          {statements.map((stmt, idx) => (
            <div
              key={stmt.id}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Statement #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeStatement(stmt.id)}
                  disabled={statements.length <= 1}
                  aria-label={`Remove statement ${idx + 1}`}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor={`iam-sid-${stmt.id}`}
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Sid (optional)
                  </label>
                  <input
                    id={`iam-sid-${stmt.id}`}
                    type="text"
                    value={stmt.sid}
                    onChange={(e) => updateStatement(stmt.id, { sid: e.target.value })}
                    placeholder="AllowS3Read"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor={`iam-effect-${stmt.id}`}
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Effect
                  </label>
                  <select
                    id={`iam-effect-${stmt.id}`}
                    value={stmt.effect}
                    onChange={(e) =>
                      updateStatement(stmt.id, { effect: e.target.value as 'Allow' | 'Deny' })
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="Allow">Allow</option>
                    <option value="Deny">Deny</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor={`iam-actions-${stmt.id}`}
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Actions (comma or newline separated)
                  </label>
                  <textarea
                    id={`iam-actions-${stmt.id}`}
                    rows={3}
                    value={stmt.actionsText}
                    onChange={(e) => updateStatement(stmt.id, { actionsText: e.target.value })}
                    placeholder="s3:GetObject, s3:PutObject"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor={`iam-resources-${stmt.id}`}
                    className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Resources (ARNs, comma or newline separated)
                  </label>
                  <textarea
                    id={`iam-resources-${stmt.id}`}
                    rows={3}
                    value={stmt.resourcesText}
                    onChange={(e) => updateStatement(stmt.id, { resourcesText: e.target.value })}
                    placeholder="arn:aws:s3:::my-bucket/*"
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="iam-policy-output"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Generated IAM Policy JSON
          </label>
          <CopyButton text={policy} />
        </div>
        <textarea
          id="iam-policy-output"
          readOnly
          rows={14}
          value={policy}
          className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400"
        />
      </div>
    </div>
  );
}
