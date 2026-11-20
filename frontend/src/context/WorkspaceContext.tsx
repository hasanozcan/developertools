'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isToolSlug } from '@/lib/api';

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

function createWorkspaceId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `workspace-${crypto.randomUUID()}`;
  }
  return `workspace-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function sanitizeToolSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(
      value.filter((slug): slug is string => typeof slug === 'string' && isToolSlug(slug)),
    ),
  ];
}

function sanitizeWorkspace(raw: unknown): ToolWorkspace | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const candidate = raw as Record<string, unknown>;
  if (
    typeof candidate.id !== 'string' ||
    candidate.id.trim().length === 0 ||
    typeof candidate.name !== 'string' ||
    candidate.name.trim().length === 0 ||
    !Array.isArray(candidate.toolSlugs)
  ) {
    return null;
  }
  return {
    id: candidate.id.trim().slice(0, 80),
    name: candidate.name.trim().slice(0, 80),
    toolSlugs: sanitizeToolSlugs(candidate.toolSlugs),
  };
}

function sanitizeWorkspaceState(raw: unknown): WorkspaceState | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const candidate = raw as Record<string, unknown>;
  if (!Array.isArray(candidate.workspaces)) return null;

  const seenIds = new Set<string>();
  const workspaces: ToolWorkspace[] = [];
  for (const entry of candidate.workspaces) {
    const workspace = sanitizeWorkspace(entry);
    if (!workspace || seenIds.has(workspace.id)) continue;
    seenIds.add(workspace.id);
    workspaces.push(workspace);
  }
  if (workspaces.length === 0) return null;

  const activeId =
    typeof candidate.activeWorkspaceId === 'string' &&
    seenIds.has(candidate.activeWorkspaceId.trim())
      ? candidate.activeWorkspaceId.trim()
      : workspaces[0].id;

  return { activeWorkspaceId: activeId, workspaces };
}

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
        const parsed: unknown = JSON.parse(raw);
        const sanitized = sanitizeWorkspaceState(parsed);
        if (sanitized) setState(sanitized);
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
            id: createWorkspaceId(),
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
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      importWorkspace: (content) => {
        try {
          const parsed: unknown = JSON.parse(content);
          if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
          const candidate = parsed as Record<string, unknown>;
          if (
            typeof candidate.name !== 'string' ||
            candidate.name.trim().length === 0 ||
            !Array.isArray(candidate.toolSlugs)
          ) {
            return false;
          }
          const workspace: ToolWorkspace = {
            id: createWorkspaceId(),
            name: candidate.name.trim().slice(0, 80),
            toolSlugs: sanitizeToolSlugs(candidate.toolSlugs),
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
