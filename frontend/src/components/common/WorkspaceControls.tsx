'use client';

import { useRef } from 'react';
import { Download, FolderPlus, Plus, Upload } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';

export default function WorkspaceControls({ toolSlug }: { toolSlug: string }) {
  const {
    ready,
    workspaces,
    activeWorkspace,
    setActiveWorkspaceId,
    createWorkspace,
    toggleTool,
    isToolInActiveWorkspace,
    exportActiveWorkspace,
    importWorkspace,
  } = useWorkspace();
  const importRef = useRef<HTMLInputElement>(null);

  if (!ready) return null;
  const saved = isToolInActiveWorkspace(toolSlug);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        aria-label="Active workspace"
        value={activeWorkspace.id}
        onChange={(event) => setActiveWorkspaceId(event.target.value)}
        className="max-w-40 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
      >
        {workspaces.map((workspace) => (
          <option key={workspace.id} value={workspace.id}>
            {workspace.name} ({workspace.toolSlugs.length})
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => toggleTool(toolSlug)}
        className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition ${
          saved
            ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300'
            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300'
        }`}
      >
        <FolderPlus className="h-3.5 w-3.5" />
        {saved ? 'Saved' : 'Add to workspace'}
      </button>
      <button
        type="button"
        onClick={createWorkspace}
        title="Create workspace"
        aria-label="Create workspace"
        className="rounded-xl border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={exportActiveWorkspace}
        title="Export workspace"
        aria-label="Export workspace"
        className="rounded-xl border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
      >
        <Download className="h-3.5 w-3.5" />
      </button>
      <input
        ref={importRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file) importWorkspace(await file.text());
          event.target.value = '';
        }}
      />
      <button
        type="button"
        onClick={() => importRef.current?.click()}
        title="Import workspace"
        aria-label="Import workspace"
        className="rounded-xl border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-indigo-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
      >
        <Upload className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
