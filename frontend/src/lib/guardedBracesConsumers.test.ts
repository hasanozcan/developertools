// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const localRequire = createRequire(import.meta.url);
const fastGlob = localRequire('fast-glob') as typeof import('fast-glob');
const chokidar = localRequire('chokidar') as typeof import('chokidar');
const { ESLint } = localRequire('eslint') as typeof import('eslint');
const { getRootDirs } = localRequire('@next/eslint-plugin-next/dist/utils/get-root-dirs.js') as {
  getRootDirs(context: {
    cwd: string;
    settings: { next: { rootDir: string | string[] } };
  }): string[];
};
const temporaryRoots: string[] = [];
const normalized = (value: string) => value.replace(/\\/g, '/');
const fixture = () => {
  const root = mkdtempSync(path.join(tmpdir(), 'devstools-braces-regression-'));
  temporaryRoots.push(root);
  for (const file of [
    'one/app/page.tsx',
    'one/lib/file.ts',
    'two/app/page.tsx',
    'two/lib/ignored.js',
  ]) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), 'export const value = 1;');
  }
  return root;
};
afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    const absolute = path.resolve(root);
    if (
      !absolute.startsWith(path.resolve(tmpdir()) + path.sep) ||
      !path.basename(absolute).startsWith('devstools-braces-regression-')
    ) {
      throw new Error('Unsafe temporary cleanup path');
    }
    rmSync(absolute, { recursive: true, force: true });
  }
});

describe('installed guarded braces consumers', () => {
  it('uses the reviewed implementation on every declared installed consumer path', () => {
    const report = JSON.parse(
      execFileSync(process.execPath, ['scripts/verify-guarded-braces.mjs'], {
        cwd: process.cwd(),
        encoding: 'utf8',
        timeout: 5000,
      }),
    );
    expect(report.package).toBe('@devstools/guarded-braces');
    expect(report.upstreamAdvisory).toBe('GHSA-vfj7-8cjw-p6xm');
    expect(report.verifiedInstalledConsumers).toEqual(
      expect.arrayContaining(['node_modules/chokidar', 'node_modules/micromatch']),
    );
    expect(report.structuralAttackChecks).toBe('passed');
  });

  it('preserves compound glob exclusions and Next root-directory glob settings', () => {
    const root = fixture();
    const pattern = normalized(path.join(root, '{one,two}', '**', '*.{ts,tsx}'));
    const matches = fastGlob.globSync([
      pattern,
      '!' + normalized(path.join(root, '**', 'file.ts')),
    ]);
    expect(matches.map((file) => normalized(path.relative(root, file))).sort()).toEqual([
      'one/app/page.tsx',
      'two/app/page.tsx',
    ]);
    for (const rootDir of [
      normalized(path.join(root, '{one,two}', 'app')),
      ['one', 'two'].map((directory) => normalized(path.join(root, directory, 'app'))),
    ]) {
      const dirs = getRootDirs({ cwd: root, settings: { next: { rootDir } } });
      expect(dirs.map((file) => normalized(path.relative(root, file))).sort()).toEqual([
        'one/app',
        'two/app',
      ]);
    }
  });

  it('watches new files matching brace-alternative paths', async () => {
    const root = fixture();
    const watcher = chokidar.watch(normalized(path.join(root, '{one,two}', '**', '*.{ts,tsx}')), {
      ignoreInitial: true,
    });
    const waitFor = (event: 'ready' | 'add', accepts: (file: string) => boolean) =>
      new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => {
          cleanup();
          reject(new Error(`Watcher ${event} timed out`));
        }, 5000);
        const complete = (file = '') => {
          if (accepts(file)) {
            cleanup();
            resolve(file);
          }
        };
        const failed = (error: Error) => {
          cleanup();
          reject(error);
        };
        const cleanup = () => {
          clearTimeout(timer);
          watcher.off(event, complete);
          watcher.off('error', failed);
        };
        watcher.on(event, complete);
        watcher.on('error', failed);
      });
    try {
      await waitFor('ready', () => true);
      const created = waitFor('add', (file) => path.basename(file) === 'created.tsx');
      writeFileSync(path.join(root, 'two/app/created.tsx'), 'export const created = true;');
      expect(normalized(path.relative(root, await created))).toBe('two/app/created.tsx');
    } finally {
      await watcher.close();
    }
  });

  it('retains Next image, accessibility, and Hooks lint coverage', async () => {
    const eslint = new ESLint({ cwd: process.cwd() });
    const filePath = path.resolve('src/components/BracesLintProbe.tsx');
    const image = await eslint.lintText(
      'export default function Probe() { return <img src="/asset.png" />; }',
      { filePath },
    );
    const hooks = await eslint.lintText(
      'import { useState } from "react"; export default function Probe({ flag }: { flag: boolean }) { if (flag) { useState(0); } return null; }',
      { filePath },
    );
    const rules = [...image[0].messages, ...hooks[0].messages].map((message) => message.ruleId);
    expect(rules).toEqual(
      expect.arrayContaining([
        '@next/next/no-img-element',
        'jsx-a11y/alt-text',
        'react-hooks/rules-of-hooks',
      ]),
    );
  });

  it('rejects deeply nested patterns on the actual build and lint glob path', () => {
    expect(() => fastGlob.generateTasks('{'.repeat(3500) + 'x' + '}'.repeat(3500))).toThrow(
      expect.objectContaining({ name: 'SyntaxError', code: 'ERR_BRACES_COMPLEXITY' }),
    );
  });
});
