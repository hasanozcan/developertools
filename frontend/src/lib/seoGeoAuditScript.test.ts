// @vitest-environment node

import { spawn } from 'node:child_process';
import { createServer, type Server } from 'node:http';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

type MockMode =
  | 'wrong-canonical'
  | 'wrong-sitemap-origin'
  | 'broken-sitemap-entry'
  | 'missing-lastmod'
  | 'invalid-lastmod'
  | 'future-lastmod';

let server: Server | undefined;

afterEach(async () => {
  if (!server) return;
  await new Promise<void>((resolve, reject) => server?.close((error) => error ? reject(error) : resolve()));
  server = undefined;
});

async function runAudit(mode: MockMode) {
  server = createServer((request, response) => {
    const origin = `http://127.0.0.1:${(server?.address() as { port: number }).port}`;
    if (request.url === '/robots.txt') {
      response.writeHead(200, { 'content-type': 'text/plain' });
      response.end('User-agent: *\nAllow: /');
      return;
    }

    if (request.url === '/sitemap.xml') {
      const location = mode === 'wrong-sitemap-origin'
        ? 'https://wrong.example/'
        : `${origin}${mode === 'broken-sitemap-entry' ? '/gone' : '/'}`;
      const lastModified = mode === 'missing-lastmod'
        ? ''
        : `<lastmod>${mode === 'invalid-lastmod'
          ? 'not-a-date'
          : mode === 'future-lastmod'
            ? '2999-01-01'
            : '2026-07-11'}</lastmod>`;
      response.writeHead(200, { 'content-type': 'application/xml' });
      response.end(`<urlset><url><loc>${location}</loc>${lastModified}</url></urlset>`);
      return;
    }

    if (request.url === '/gone') {
      response.writeHead(404, { 'content-type': 'text/html' });
      response.end('<h1>Gone</h1>');
      return;
    }

    if (request.url === '/') {
      const canonical = mode === 'wrong-canonical' ? 'https://wrong.example/' : origin;
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end(`<html><head><link rel="canonical" href="${canonical}"></head><body><main><h1>Home</h1></main></body></html>`);
      return;
    }

    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>Not found</h1>');
  });

  await new Promise<void>((resolve) => server?.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  const script = path.resolve(process.cwd(), 'scripts/seo-geo-audit.mjs');

  const result = await new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [
      script,
      `--base-url=${origin}`,
      `--canonical-origin=${origin}`,
    ], { cwd: process.cwd() });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });

  expect(result.stderr).toBe('');
  expect(result.code).toBe(2);
  return JSON.parse(result.stdout) as {
    issues: Array<{ code: string; details: unknown[] }>;
  };
}

describe('SEO/GEO audit script', () => {
  it('rejects a canonical on the wrong origin', async () => {
    const report = await runAudit('wrong-canonical');
    expect(report.issues.find((issue) => issue.code === 'invalid-canonical')).toBeTruthy();
    expect(report.issues.find((issue) => issue.code === 'invalid-sitemap-entry')?.details)
      .toEqual(expect.arrayContaining([expect.objectContaining({ path: '/', reasons: ['canonical-mismatch'] })]));
  });

  it('rejects sitemap URLs on the wrong origin', async () => {
    const report = await runAudit('wrong-sitemap-origin');
    expect(report.issues.find((issue) => issue.code === 'invalid-sitemap-url')).toBeTruthy();
  });

  it('rejects a broken sitemap entry', async () => {
    const report = await runAudit('broken-sitemap-entry');
    expect(report.issues.find((issue) => issue.code === 'invalid-sitemap-entry')?.details)
      .toEqual(expect.arrayContaining([
        expect.objectContaining({ path: '/gone', reasons: expect.arrayContaining(['not-200']) }),
      ]));
  });

  it('reports sitemap entries without lastmod', async () => {
    const report = await runAudit('missing-lastmod');
    expect(report.issues.find((issue) => issue.code === 'sitemap-entries-without-lastmod')?.details)
      .toEqual([expect.stringMatching(/\/$/)]);
  });

  it.each([
    ['invalid-lastmod', 'not-a-date'],
    ['future-lastmod', '2999-01-01'],
  ] as const)('rejects %s sitemap values', async (mode, lastModified) => {
    const report = await runAudit(mode);
    expect(report.issues.find((issue) => issue.code === 'invalid-sitemap-lastmod')?.details)
      .toEqual([expect.objectContaining({ url: expect.stringMatching(/\/$/), lastModified })]);
  });
});
