export interface HookFormFieldSpec {
  name: string;
  type: string;
  required?: boolean;
  label?: string;
}

function toSafeIdentifier(rawName: string, fallbackIndex: number): string {
  const cleaned = (rawName || '').trim().replace(/[^A-Za-z0-9_$]/g, '_');
  if (!cleaned) return `field_${fallbackIndex + 1}`;
  return /^[0-9]/.test(cleaned) ? `_${cleaned}` : cleaned;
}

export function generateReactHookFormCode(fields: HookFormFieldSpec[]): string {
  const normalizedFields = fields.map((f, idx) => ({
    name: toSafeIdentifier(f.name, idx),
    label: (f.label || f.name || `field_${idx + 1}`).replace(/[<>&]/g, ''),
    type: f.type || 'text',
    required: f.required ?? true,
  }));

  const fieldsMarkup = normalizedFields
    .map((f) => {
      const registerArgs = f.required ? `'${f.name}', { required: true }` : `'${f.name}'`;
      if (f.type === 'textarea') {
        return `      <div>
        <label className="block text-sm font-medium">${f.label}</label>
        <textarea {...register(${registerArgs})} className="border p-2 rounded w-full" rows={3} />
        {errors.${f.name} && <span className="text-red-500 text-xs">Required</span>}
      </div>`;
      }
      if (f.type === 'checkbox') {
        return `      <label className="flex items-center gap-2 text-sm font-medium">
        <input {...register(${registerArgs})} type="checkbox" className="rounded" />
        ${f.label}
      </label>`;
      }
      return `      <div>
        <label className="block text-sm font-medium">${f.label}</label>
        <input {...register(${registerArgs})} type="${f.type}" className="border p-2 rounded w-full" />
        {errors.${f.name} && <span className="text-red-500 text-xs">Required</span>}
      </div>`;
    })
    .join('\n');

  return `import React from 'react';
import { useForm } from 'react-hook-form';

export function GeneratedForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: Record<string, unknown>) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
${fieldsMarkup}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
    </form>
  );
}`;
}
