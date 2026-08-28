import { describe, it, expect } from 'vitest';
import { inspectOgTags } from './opengraphTagInspector';

describe('opengraphTagInspector', () => {
  it('extracts og meta tags', () => {
    const html = '<meta property="og:title" content="My Title" />';
    expect(inspectOgTags(html)['og:title']).toBe('My Title');
  });
});
