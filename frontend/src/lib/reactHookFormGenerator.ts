export function generateReactHookFormCode(fields: { name: string; type: string }[]): string {
  return `import React from 'react';
import { useForm } from 'react-hook-form';

export function GeneratedForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
${fields.map(f => `      <div>
        <label className="block text-sm font-medium">${f.name}</label>
        <input {...register('${f.name}', { required: true })} type="${f.type}" className="border p-2 rounded w-full" />
        {errors.${f.name} && <span className="text-red-500 text-xs">Required</span>}
      </div>`).join('\n')}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
    </form>
  );
}`;
}