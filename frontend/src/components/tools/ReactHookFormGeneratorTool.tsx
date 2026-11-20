'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import { generateReactHookFormCode, type HookFormFieldSpec } from '@/lib/reactHookFormGenerator';

interface FieldDraft extends HookFormFieldSpec {
  id: number;
}

const FIELD_TYPES = [
  'text',
  'email',
  'password',
  'number',
  'tel',
  'url',
  'date',
  'textarea',
  'checkbox',
];

const INITIAL_FIELDS: FieldDraft[] = [
  { id: 1, name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { id: 2, name: 'email', label: 'Email Address', type: 'email', required: true },
  { id: 3, name: 'password', label: 'Password', type: 'password', required: true },
];

export default function ReactHookFormGeneratorTool() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<FieldDraft[]>(INITIAL_FIELDS);
  const [nextId, setNextId] = useState(4);

  const code = useMemo(
    () =>
      generateReactHookFormCode(
        fields.map(({ name, type, required, label }) => ({
          name,
          type,
          required,
          label,
        })),
      ),
    [fields],
  );

  const updateField = (id: number, patch: Partial<HookFormFieldSpec>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: nextId,
        name: `field${nextId}`,
        label: `Field ${nextId}`,
        type: 'text',
        required: true,
      },
    ]);
    setNextId((n) => n + 1);
  };

  const removeField = (id: number) => {
    setFields((prev) => (prev.length > 1 ? prev.filter((f) => f.id !== id) : prev));
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Form Fields ({fields.length})
          </h3>
          <button
            type="button"
            onClick={addField}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Field
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="sm:col-span-3 space-y-1">
                <label
                  htmlFor={`rhf-name-${field.id}`}
                  className="block text-[11px] font-semibold text-slate-500"
                >
                  Field Name #{index + 1}
                </label>
                <input
                  id={`rhf-name-${field.id}`}
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(field.id, { name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label
                  htmlFor={`rhf-label-${field.id}`}
                  className="block text-[11px] font-semibold text-slate-500"
                >
                  Label
                </label>
                <input
                  id={`rhf-label-${field.id}`}
                  type="text"
                  value={field.label ?? ''}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label
                  htmlFor={`rhf-type-${field.id}`}
                  className="block text-[11px] font-semibold text-slate-500"
                >
                  Input Type
                </label>
                <select
                  id={`rhf-type-${field.id}`}
                  value={field.type}
                  onChange={(e) => updateField(field.id, { type: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                >
                  {FIELD_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center py-1.5">
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(field.required)}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  />
                  Required
                </label>
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  disabled={fields.length <= 1}
                  aria-label={`Remove field ${index + 1}`}
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
          <label htmlFor="rhf-code-output" className="text-sm font-medium text-muted-foreground">
            {t('uiText.003ae5d6')}
          </label>
          <CopyButton text={code} />
        </div>
        <textarea
          id="rhf-code-output"
          readOnly
          value={code}
          rows={14}
          className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-xs"
        />
      </div>
    </div>
  );
}
