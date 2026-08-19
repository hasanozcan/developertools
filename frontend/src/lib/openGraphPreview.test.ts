import { describe, it, expect } from 'vitest';
import { generateOpenGraphMetaTags, parseDomain } from './openGraphPreview';

describe('openGraphPreview', () => {
  it('should generate valid meta tags for Open Graph and Twitter', () => {
    const meta = generateOpenGraphMetaTags({
      title: 'DevTools Suite',
      description: 'Free developer tools',
      url: 'https://example.com/tool',
      imageUrl: 'https://example.com/banner.png',
      siteName: 'DevTools',
      twitterHandle: '@devtools',
    });

    expect(meta).toContain('<title>DevTools Suite</title>');
    expect(meta).toContain('<meta property="og:title" content="DevTools Suite" />');
    expect(meta).toContain('<meta property="og:image" content="https://example.com/banner.png" />');
    expect(meta).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(meta).toContain('<meta name="twitter:site" content="@devtools" />');
  });

  it('should parse domain hostname correctly', () => {
    expect(parseDomain('https://github.com/hasanozcan')).toBe('github.com');
    expect(parseDomain('invalid-url')).toBe('invalid-url');
  });
});
