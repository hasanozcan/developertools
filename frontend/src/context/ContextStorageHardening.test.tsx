// @vitest-environment jsdom

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toolCatalog } from '@/lib/api';
import { FavoritesProvider, useFavorites } from './FavoritesContext';
import { HistoryProvider, useHistory } from './HistoryContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import { WorkspaceProvider, useWorkspace } from './WorkspaceContext';

function makeThrowingStorage(): Storage {
  return {
    get length(): number {
      throw new Error('storage blocked');
    },
    clear() {
      throw new Error('storage blocked');
    },
    getItem() {
      throw new Error('storage blocked');
    },
    key() {
      throw new Error('storage blocked');
    },
    removeItem() {
      throw new Error('storage blocked');
    },
    setItem() {
      throw new Error('storage blocked');
    },
  };
}

describe('Context storage hardening', () => {
  const originalLocalStorage = window.localStorage;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: originalLocalStorage,
    });
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: originalLocalStorage,
    });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('FavoritesContext', () => {
    function FavoritesHarness() {
      const { favorites, toggleFavorite } = useFavorites();
      return (
        <div>
          <span data-testid="favorites">{JSON.stringify(favorites)}</span>
          <button
            type="button"
            onClick={() => {
              toggleFavorite('json-formatter');
              toggleFavorite('base64');
            }}
          >
            Toggle Two
          </button>
          <button type="button" onClick={() => toggleFavorite('json-formatter')}>
            Toggle JSON
          </button>
        </div>
      );
    }

    it('recovers from corrupted JSON in localStorage', () => {
      window.localStorage.setItem('favorites', '{bad json');
      render(
        <FavoritesProvider>
          <FavoritesHarness />
        </FavoritesProvider>,
      );
      expect(screen.getByTestId('favorites')).toHaveTextContent('[]');
    });

    it('filters non-strings, unknown slugs, and duplicates from persisted favorites', () => {
      window.localStorage.setItem(
        'favorites',
        JSON.stringify([
          'json-formatter',
          42,
          null,
          'unknown-tool-slug',
          'json-formatter',
          'base64',
        ]),
      );
      render(
        <FavoritesProvider>
          <FavoritesHarness />
        </FavoritesProvider>,
      );
      expect(screen.getByTestId('favorites')).toHaveTextContent('["json-formatter","base64"]');
    });

    it('handles non-array persisted values safely', () => {
      window.localStorage.setItem('favorites', JSON.stringify({ slug: 'json-formatter' }));
      render(
        <FavoritesProvider>
          <FavoritesHarness />
        </FavoritesProvider>,
      );
      expect(screen.getByTestId('favorites')).toHaveTextContent('[]');
    });

    it('survives throwing localStorage and updates functionally across batched toggles', () => {
      const throwing = makeThrowingStorage();
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: throwing });
      Object.defineProperty(window, 'localStorage', { configurable: true, value: throwing });

      render(
        <FavoritesProvider>
          <FavoritesHarness />
        </FavoritesProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Toggle Two' }));
      expect(screen.getByTestId('favorites')).toHaveTextContent('["json-formatter","base64"]');

      fireEvent.click(screen.getByRole('button', { name: 'Toggle JSON' }));
      expect(screen.getByTestId('favorites')).toHaveTextContent('["base64"]');
    });
  });

  describe('HistoryContext', () => {
    function HistoryHarness() {
      const { history, addToHistory, clearHistory } = useHistory();
      return (
        <div>
          <span data-testid="history">{JSON.stringify(history)}</span>
          <button
            type="button"
            onClick={() =>
              addToHistory({ slug: 'json-formatter', name: 'JSON Formatter', category: 'json' })
            }
          >
            Add JSON
          </button>
          <button type="button" onClick={clearHistory}>
            Clear
          </button>
        </div>
      );
    }

    it('recovers from corrupted JSON in localStorage', () => {
      window.localStorage.setItem('toolHistory', 'not json');
      render(
        <HistoryProvider>
          <HistoryHarness />
        </HistoryProvider>,
      );
      expect(screen.getByTestId('history')).toHaveTextContent('[]');
    });

    it('filters invalid entries, unknown slugs, duplicates, and caps at 10 items', () => {
      const validSlugs = toolCatalog.slice(0, 11).map((tool) => tool.slug);
      const payload = [
        null,
        { slug: 'not-a-real-tool', name: 'Fake', category: 'json', timestamp: 100 },
        { slug: 'json-formatter', name: '   ', category: 'json', timestamp: 100 },
        { slug: 'json-formatter', name: 'JSON Formatter', category: '', timestamp: 100 },
        { slug: 'json-formatter', name: 'JSON Formatter', category: 'json', timestamp: null },
        ...validSlugs.slice(0, 3).map((slug, idx) => ({
          slug,
          name: `Tool ${idx}`,
          category: 'utilities',
          timestamp: 1000 + idx,
        })),
        { slug: validSlugs[0], name: 'Duplicate Tool', category: 'utilities', timestamp: 9999 },
        ...validSlugs.slice(3).map((slug, idx) => ({
          slug,
          name: `Tool ${idx + 3}`,
          category: 'utilities',
          timestamp: 1003 + idx,
        })),
      ];
      window.localStorage.setItem('toolHistory', JSON.stringify(payload));

      render(
        <HistoryProvider>
          <HistoryHarness />
        </HistoryProvider>,
      );

      const parsed = JSON.parse(screen.getByTestId('history').textContent || '[]') as {
        slug: string;
      }[];
      expect(parsed).toHaveLength(10);
      expect(parsed.map((item) => item.slug)).toEqual(validSlugs.slice(0, 10));
    });

    it('survives throwing localStorage', () => {
      const throwing = makeThrowingStorage();
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: throwing });
      Object.defineProperty(window, 'localStorage', { configurable: true, value: throwing });

      render(
        <HistoryProvider>
          <HistoryHarness />
        </HistoryProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Add JSON' }));
      const parsed = JSON.parse(screen.getByTestId('history').textContent || '[]') as {
        slug: string;
      }[];
      expect(parsed).toHaveLength(1);
      expect(parsed[0].slug).toBe('json-formatter');

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
      expect(screen.getByTestId('history')).toHaveTextContent('[]');
    });
  });

  describe('ThemeContext', () => {
    function ThemeHarness() {
      const { theme, resolvedTheme, setTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <span data-testid="resolved-theme">{resolvedTheme}</span>
          <button type="button" onClick={() => setTheme('dark')}>
            Dark
          </button>
          <button type="button" onClick={() => setTheme('invalid' as 'dark')}>
            Invalid
          </button>
        </div>
      );
    }

    it('ignores invalid persisted theme values and missing window.matchMedia', () => {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: undefined,
      });
      window.localStorage.setItem('theme', 'ultraviolet');

      render(
        <ThemeProvider>
          <ThemeHarness />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('survives throwing localStorage and ignores invalid setTheme calls', () => {
      const throwing = makeThrowingStorage();
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: throwing });
      Object.defineProperty(window, 'localStorage', { configurable: true, value: throwing });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: undefined,
      });

      render(
        <ThemeProvider>
          <ThemeHarness />
        </ThemeProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Invalid' }));
      expect(screen.getByTestId('theme')).toHaveTextContent('system');

      fireEvent.click(screen.getByRole('button', { name: 'Dark' }));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('hydrates without SSR mismatch even when localStorage has dark theme', async () => {
      window.localStorage.setItem('theme', 'dark');
      const onRecoverableError = vi.fn();
      const element = (
        <ThemeProvider>
          <ThemeHarness />
        </ThemeProvider>
      );
      const html = renderToString(element);
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);

      let root: ReturnType<typeof hydrateRoot> | undefined;
      try {
        await act(async () => {
          root = hydrateRoot(container, element, { onRecoverableError });
        });
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(container.querySelector('[data-testid="theme"]')).toHaveTextContent('dark');
        expect(container.querySelector('[data-testid="resolved-theme"]')).toHaveTextContent('dark');
      } finally {
        act(() => root?.unmount());
        container.remove();
      }
    });
  });

  describe('WorkspaceContext', () => {
    function WorkspaceHarness() {
      const {
        ready,
        activeWorkspaceId,
        workspaces,
        createWorkspace,
        importWorkspace,
        exportActiveWorkspace,
        toggleTool,
      } = useWorkspace();
      const [importResult, setImportResult] = React.useState<string>('');
      return (
        <div>
          <span data-testid="ws-ready">{String(ready)}</span>
          <span data-testid="ws-active">{activeWorkspaceId}</span>
          <span data-testid="ws-list">{JSON.stringify(workspaces)}</span>
          <span data-testid="ws-import-result">{importResult}</span>
          <button
            type="button"
            onClick={() => {
              createWorkspace();
              createWorkspace();
            }}
          >
            Create Two
          </button>
          <button type="button" onClick={() => toggleTool('json-formatter')}>
            Toggle JSON
          </button>
          <button type="button" onClick={() => exportActiveWorkspace()}>
            Export
          </button>
          <button
            type="button"
            onClick={() =>
              setImportResult(
                String(
                  importWorkspace(
                    JSON.stringify({
                      name: 'Imported Team',
                      toolSlugs: ['json-formatter', 'fake-tool', 123, 'json-formatter'],
                    }),
                  ),
                ),
              )
            }
          >
            Import Valid
          </button>
          <button
            type="button"
            onClick={() => setImportResult(String(importWorkspace('{corrupted')))}
          >
            Import Bad JSON
          </button>
          <button
            type="button"
            onClick={() =>
              setImportResult(String(importWorkspace(JSON.stringify({ name: 42, toolSlugs: [] }))))
            }
          >
            Import Bad Shape
          </button>
        </div>
      );
    }

    it('falls back to default workspace on corrupted JSON', () => {
      window.localStorage.setItem('devstools-workspaces-v1', '{broken');
      render(
        <WorkspaceProvider>
          <WorkspaceHarness />
        </WorkspaceProvider>,
      );
      expect(screen.getByTestId('ws-ready')).toHaveTextContent('true');
      expect(screen.getByTestId('ws-active')).toHaveTextContent('default');
      expect(JSON.parse(screen.getByTestId('ws-list').textContent || '[]')).toHaveLength(1);
    });

    it('sanitizes persisted workspace state, unknown slugs, and dangling activeWorkspaceId', () => {
      window.localStorage.setItem(
        'devstools-workspaces-v1',
        JSON.stringify({
          activeWorkspaceId: 'missing-id',
          workspaces: [
            null,
            { id: '', name: 'Blank Id', toolSlugs: [] },
            { id: 'bad-slugs', name: 'Bad Slugs', toolSlugs: 'not-array' },
            {
              id: 'ws-1',
              name: '  Backend Kit  ',
              toolSlugs: ['json-formatter', 'invalid-slug', 99, 'json-formatter', 'base64'],
            },
            { id: 'ws-1', name: 'Duplicate ID', toolSlugs: ['uuid-generator'] },
          ],
        }),
      );

      render(
        <WorkspaceProvider>
          <WorkspaceHarness />
        </WorkspaceProvider>,
      );

      const list = JSON.parse(screen.getByTestId('ws-list').textContent || '[]') as {
        id: string;
        name: string;
        toolSlugs: string[];
      }[];
      expect(list).toEqual([
        { id: 'ws-1', name: 'Backend Kit', toolSlugs: ['json-formatter', 'base64'] },
      ]);
      expect(screen.getByTestId('ws-active')).toHaveTextContent('ws-1');
    });

    it('creates collision-safe workspace IDs, sanitizes imports, and delays URL revocation on export', () => {
      vi.useFakeTimers();
      const createObjectURL = vi.fn(() => 'blob:mock-url');
      const revokeObjectURL = vi.fn();
      vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL });
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

      render(
        <WorkspaceProvider>
          <WorkspaceHarness />
        </WorkspaceProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Create Two' }));
      const listAfterCreate = JSON.parse(screen.getByTestId('ws-list').textContent || '[]') as {
        id: string;
      }[];
      expect(listAfterCreate).toHaveLength(3);
      expect(new Set(listAfterCreate.map((w) => w.id)).size).toBe(3);

      fireEvent.click(screen.getByRole('button', { name: 'Import Bad JSON' }));
      expect(screen.getByTestId('ws-import-result')).toHaveTextContent('false');

      fireEvent.click(screen.getByRole('button', { name: 'Import Bad Shape' }));
      expect(screen.getByTestId('ws-import-result')).toHaveTextContent('false');

      fireEvent.click(screen.getByRole('button', { name: 'Import Valid' }));
      expect(screen.getByTestId('ws-import-result')).toHaveTextContent('true');

      const listAfterImport = JSON.parse(screen.getByTestId('ws-list').textContent || '[]') as {
        id: string;
        name: string;
        toolSlugs: string[];
      }[];
      expect(listAfterImport[3].name).toBe('Imported Team');
      expect(listAfterImport[3].toolSlugs).toEqual(['json-formatter']);

      fireEvent.click(screen.getByRole('button', { name: 'Export' }));
      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(revokeObjectURL).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');

      vi.unstubAllGlobals();
    });

    it('survives throwing localStorage', () => {
      const throwing = makeThrowingStorage();
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: throwing });
      Object.defineProperty(window, 'localStorage', { configurable: true, value: throwing });

      render(
        <WorkspaceProvider>
          <WorkspaceHarness />
        </WorkspaceProvider>,
      );

      expect(screen.getByTestId('ws-ready')).toHaveTextContent('true');
      fireEvent.click(screen.getByRole('button', { name: 'Toggle JSON' }));
      const list = JSON.parse(screen.getByTestId('ws-list').textContent || '[]') as {
        toolSlugs: string[];
      }[];
      expect(list[0].toolSlugs).toEqual(['json-formatter']);
    });
  });
});
