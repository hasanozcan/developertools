import { describe, expect, it } from 'vitest';
import { generateNextjsMetadata } from './nextjsMetadataGenerator';

describe('nextjsMetadataGenerator', () => {
  it('generates complete App Router Metadata object', () => {
    const code = generateNextjsMetadata({
      title: 'DevsTools',
      description: 'Free developer tools',
      url: 'https://devstools.app',
      siteName: 'DevsTools',
      imageUrl: 'https://devstools.app/og.png'
    });
    expect(code).toContain("import type { Metadata } from 'next'");
    expect(code).toContain("canonical: 'https://devstools.app'");
    expect(code).toContain("card: 'summary_large_image'");
  });
});
