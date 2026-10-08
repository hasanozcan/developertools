import { describe, expect, it } from 'vitest';
import { translations } from './index';
import { enhancedToolTranslations } from './enhancedTools';
import { toolPageContent } from '@/lib/toolPageContent';
import { getRelatedTools } from '@/lib/relatedTools';
import { getDeveloperGuidesForTool } from '@/lib/developerGuides';

describe('approved three-tool page copy', () => {
  it.each([
    ['curl-to-fetch', 'cURL to Fetch Converter & Request Builder'],
    ['sha256-hash', 'SHA-256 Hash Generator & File Checksum Checker'],
    ['file-checksum-comparator', 'File Checksum Calculator & Comparator'],
  ])(
    'keeps the winning English H1 for %s after the enhanced translation spread',
    (slug, heading) => {
      expect(translations.en[`toolName.${slug}`]).toBe(heading);
      expect(translations.en[`toolName.${slug}`]).not.toBe(
        enhancedToolTranslations.en[`toolName.${slug}`],
      );
    },
  );

  it('describes the actual conversion and SHA-256 tasks in the winning introductions', () => {
    expect(translations.en['toolDesc.curl-to-fetch']).toContain('without sending a request');
    expect(translations.en['toolDesc.sha256-hash']).toContain('UTF-8 text or a local file');
    expect(translations.en['toolDesc.sha256-hash']).toContain(
      'trusted 64-character expected checksum',
    );
    expect(translations.tr['toolName.sha256-hash']).toBe('SHA256 Hash Oluşturucu');
  });

  it('retains the existing cURL and SHA-256 SEO titles and descriptions and checksum title', () => {
    expect(toolPageContent.utilities['curl-to-fetch']).toMatchObject({
      metadataTitle: 'cURL to Fetch Converter & Request Builder Online',
      description:
        'Convert supported cURL commands to JavaScript Fetch, or build quoted cURL and Fetch requests from method, URL, headers, query, and body input. Nothing is executed.',
    });
    expect(toolPageContent.crypto['sha256-hash']).toMatchObject({
      metadataTitle: 'SHA-256 Hash Generator & File Checksum Checker',
      description:
        'Generate SHA-256 hashes from text or files and verify a trusted checksum locally in your browser. Includes working JavaScript and Python examples.',
    });
    expect(toolPageContent.crypto['file-checksum-comparator'].metadataTitle).toBe(
      'File Checksum Calculator & Hash Comparator',
    );
  });

  it('covers all six checksums, a reproducible abc example, and the actual local implementations', () => {
    const content = toolPageContent.crypto['file-checksum-comparator'];
    for (const algorithm of ['MD5', 'CRC32', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      expect(content.description).toContain(algorithm);
      expect(translations.en['toolDesc.file-checksum-comparator']).toContain(algorithm);
    }
    const fileFaq = content.faqs.find(
      ({ question }) => question === 'Is my file uploaded to a server?',
    )!.answer;
    expect(fileFaq).toContain('browser memory');
    expect(fileFaq).toContain('MD5 and CRC32 use JavaScript');
    expect(fileFaq).toContain('SHA-384 and SHA-512 use Web Crypto');
    expect(
      content.answerSections?.flatMap(({ paragraphs }) => paragraphs ?? []).join(' '),
    ).toContain('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    expect(content.longDescription).not.toMatch(/unlimited|any size/i);
  });

  it('reuses exactly one existing SHA-256 guide for checksum comparison', () => {
    expect(getDeveloperGuidesForTool('file-checksum-comparator')).toEqual(
      getDeveloperGuidesForTool('sha256-hash'),
    );
    expect(getDeveloperGuidesForTool('file-checksum-comparator').map(({ slug }) => slug)).toEqual([
      'verify-sha256-file-checksum',
    ]);
  });

  it.each([
    ['sha256-hash', 'file-checksum-comparator'],
    ['file-checksum-comparator', 'sha256-hash'],
    ['curl-to-fetch', 'fetch-to-curl'],
  ])('exposes the contextual %s → %s relationship through related tools', (from, to) => {
    expect(getRelatedTools(from).map(({ slug }) => slug)).toContain(to);
  });
});
