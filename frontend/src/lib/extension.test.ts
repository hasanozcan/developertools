// @vitest-environment node
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { toolCatalog } from './api';
import { readToolInput } from './toolInput';

const extensionDir = path.resolve(process.cwd(), '../extension');

describe('extension web integration', () => {
  it('ships exactly the web catalogue and current tool count', () => {
    const catalog = JSON.parse(fs.readFileSync(path.join(extensionDir, 'catalog.json'), 'utf8'));
    const manifest = JSON.parse(fs.readFileSync(path.join(extensionDir, 'manifest.json'), 'utf8'));
    expect(catalog.map((tool: { slug: string }) => tool.slug)).toEqual(
      toolCatalog.map((tool) => tool.slug),
    );
    expect(manifest.name).toContain(String(toolCatalog.length));
  });

  it('opens real tools and preserves selected text exclusively in the fragment', () => {
    const onClicked = { addListener: vi.fn() };
    const create = vi.fn();
    vm.runInNewContext(fs.readFileSync(path.join(extensionDir, 'background.js'), 'utf8'), {
      chrome: {
        contextMenus: { onClicked, create: vi.fn() },
        runtime: { onInstalled: { addListener: vi.fn() } },
        omnibox: {
          onInputChanged: { addListener: vi.fn() },
          onInputEntered: { addListener: vi.fn() },
        },
        tabs: { create },
      },
    });
    const handler = onClicked.addListener.mock.calls[0][0];
    const selectionText = '  Türkçe + / & # = % 🔒  ';
    for (const menuItemId of [
      'devstools-json',
      'devstools-base64',
      'devstools-jwt',
      'devstools-hash',
    ]) {
      handler({ menuItemId, selectionText });
      const url = new URL(create.mock.lastCall![0].url);
      expect(url.search).toBe('');
      expect(
        toolCatalog.some((tool) => url.pathname === `/tools/${tool.categorySlug}/${tool.slug}`),
      ).toBe(true);
      expect(readToolInput(url.hash)).toBe(selectionText);
    }
    handler({ menuItemId: 'devstools-search', selectionText });
    const searchUrl = new URL(create.mock.lastCall![0].url);
    expect(searchUrl.search).toBe('');
    expect(new URLSearchParams(searchUrl.hash.slice(1)).get('search')).toBe(selectionText);
  });
});
