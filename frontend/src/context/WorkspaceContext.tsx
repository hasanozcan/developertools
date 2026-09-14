'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'devstools-workspaces-v1';

export interface ToolWorkspace {
  id: string;
  name: string;
  toolSlugs: string[];
}

interface WorkspaceState {
  activeWorkspaceId: string;
  workspaces: ToolWorkspace[];
}

interface WorkspaceContextValue extends WorkspaceState {
  ready: boolean;
  activeWorkspace: ToolWorkspace;
  createWorkspace: () => void;
  setActiveWorkspaceId: (id: string) => void;
  toggleTool: (toolSlug: string) => void;
  isToolInActiveWorkspace: (toolSlug: string) => boolean;
  exportActiveWorkspace: () => void;
  importWorkspace: (content: string) => boolean;
}

const DEFAULT_WORKSPACE: ToolWorkspace = { id: 'default', name: 'My Workspace', toolSlugs: [] };
const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>({
    activeWorkspaceId: DEFAULT_WORKSPACE.id,
    workspaces: [DEFAULT_WORKSPACE],
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WorkspaceState;
        if (Array.isArray(parsed.workspaces) && parsed.workspaces.length > 0) setState(parsed);
      }
    } catch {
      // Ignore malformed or unavailable local storage.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Keep the in-memory workspace usable even if persistence is blocked.
    }
  }, [ready, state]);

  const activeWorkspace =
    state.workspaces.find((workspace) => workspace.id === state.activeWorkspaceId) ??
    state.workspaces[0] ??
    DEFAULT_WORKSPACE;

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      ...state,
      ready,
      activeWorkspace,
      createWorkspace: () => {
        setState((current) => {
          const nextIndex = current.workspaces.length + 1;
          const workspace: ToolWorkspace = {
            id: `workspace-${Date.now()}`,
            name: `Workspace ${nextIndex}`,
            toolSlugs: [],
          };
          return {
            activeWorkspaceId: workspace.id,
            workspaces: [...current.workspaces, workspace],
          };
        });
      },
      setActiveWorkspaceId: (id) =>
        setState((current) =>
          current.workspaces.some((workspace) => workspace.id === id)
            ? { ...current, activeWorkspaceId: id }
            : current,
        ),
      toggleTool: (toolSlug) =>
        setState((current) => ({
          ...current,
          workspaces: current.workspaces.map((workspace) => {
            if (workspace.id !== current.activeWorkspaceId) return workspace;
            const hasTool = workspace.toolSlugs.includes(toolSlug);
            return {
              ...workspace,
              toolSlugs: hasTool
                ? workspace.toolSlugs.filter((slug) => slug !== toolSlug)
                : [...workspace.toolSlugs, toolSlug],
            };
          }),
        })),
      isToolInActiveWorkspace: (toolSlug) => activeWorkspace.toolSlugs.includes(toolSlug),
      exportActiveWorkspace: () => {
        const blob = new Blob([JSON.stringify(activeWorkspace, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${activeWorkspace.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'workspace'}.devstools.json`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      importWorkspace: (content) => {
        try {
          const parsed = JSON.parse(content) as Partial<ToolWorkspace>;
          if (!parsed.name || !Array.isArray(parsed.toolSlugs)) return false;
          const toolSlugs = parsed.toolSlugs.filter(
            (slug): slug is string => typeof slug === 'string' && slug.length > 0,
          );
          const workspace: ToolWorkspace = {
            id: `workspace-${Date.now()}`,
            name: String(parsed.name).slice(0, 80),
            toolSlugs: [...new Set(toolSlugs)],
          };
          setState((current) => ({
            activeWorkspaceId: workspace.id,
            workspaces: [...current.workspaces, workspace],
          }));
          return true;
        } catch {
          return false;
        }
      },
    }),
    [state, ready, activeWorkspace],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return value;
}
