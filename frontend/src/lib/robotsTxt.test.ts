import { describe, it, expect } from 'vitest';
import { generateRobotsTxt } from './robotsTxt';

describe('robotsTxt', () => {
  it('should generate valid robots.txt file with rules and sitemap', () => {
    const output = generateRobotsTxt({
      rules: [
        {
          userAgent: '*',
          allow: ['/public/'],
          disallow: ['/admin/', '/private/'],
          crawlDelay: 2,
        },
      ],
      sitemaps: ['https://example.com/sitemap.xml'],
      host: 'example.com',
    });

    expect(output).toContain('User-agent: *');
    expect(output).toContain('Disallow: /admin/');
    expect(output).toContain('Disallow: /private/');
    expect(output).toContain('Allow: /public/');
    expect(output).toContain('Crawl-delay: 2');
    expect(output).toContain('Sitemap: https://example.com/sitemap.xml');
    expect(output).toContain('Host: example.com');
  });
});
