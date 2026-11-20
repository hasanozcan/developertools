import DOMPurify from 'dompurify';
import { describe, it, expect } from 'vitest';
import {
  markdownToHtml,
  sanitizeHtmlFragment,
  sanitizeImageUrl,
  sanitizeLinkUrl,
} from './markdownToHtml';

describe('markdownToHtml', () => {
  it('should convert markdown headings, bold, and links to html', () => {
    const md = '# Title\n\nThis is **bold** and [a link](https://example.com).';
    const html = markdownToHtml(md);

    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<a href="https://example.com">a link</a>');
  });

  it('should convert code blocks and lists', () => {
    const md = '```ts\nconst x = 1;\n```\n\n- item 1\n- item 2';
    const html = markdownToHtml(md);

    expect(html).toContain('<pre><code class="language-ts">const x = 1;</code></pre>');
    expect(html).toContain('<li>item 1</li>');
    expect(html).toContain('<li>item 2</li>');
  });

  it('should return empty string for empty input', () => {
    expect(markdownToHtml('')).toBe('');
  });

  it('strips dangerous HTML tags, event handlers, and unsafe URL schemes', () => {
    const xss = [
      '<script>alert(1)</script>',
      '<img src="x" onerror="alert(2)">',
      '<svg onload="alert(3)"></svg>',
      '[bad](javascript:alert(4))',
      '[bad2](vbscript:msgbox(5))',
      '[bad3](data:text/html,<script>alert(6)</script>)',
      '![img](javascript:alert(7))',
      '![img2](data:text/html,<script>alert(8)</script>)',
    ].join('\n\n');

    const html = markdownToHtml(xss);

    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/onerror\s*=/i);
    expect(html).not.toMatch(/onload\s*=/i);
    expect(html).not.toMatch(/javascript:/i);
    expect(html).not.toMatch(/vbscript:/i);
    expect(html).not.toMatch(/data:text\/html/i);
  });

  it('rejects &Tab; / &NewLine; scheme obfuscation and protocol-relative // URLs', () => {
    expect(sanitizeLinkUrl('java&Tab;script:alert(1)')).toBeNull();
    expect(sanitizeLinkUrl('java&TABscript:alert(1)')).toBeNull();
    expect(sanitizeLinkUrl('java&NewLine;script:alert(1)')).toBeNull();
    expect(sanitizeLinkUrl('java&newlinealert:1')).toBeNull();
    expect(sanitizeImageUrl('java&Tab;script:alert(1)')).toBeNull();
    expect(sanitizeImageUrl('java&NewLine;script:alert(1)')).toBeNull();

    expect(sanitizeLinkUrl('//evil.example/path')).toBeNull();
    expect(sanitizeLinkUrl('&Tab;//evil.example/path')).toBeNull();
    expect(sanitizeImageUrl('//evil.example/img.png')).toBeNull();
    expect(sanitizeImageUrl('&#x2f;/evil.example/img.png')).toBeNull();

    expect(sanitizeLinkUrl('https://example.com/docs?a=1&tab=2')).toBe(
      'https://example.com/docs?a=1&tab=2',
    );
    expect(sanitizeLinkUrl('/docs/guide')).toBe('/docs/guide');
    expect(sanitizeImageUrl('/images/logo.png')).toBe('/images/logo.png');

    const html = markdownToHtml(
      '[tab](java&Tab;script:alert(1))\n\n[proto](//evil.example)\n\n![img](//evil.example/a.png)',
    );
    expect(html).not.toMatch(/javascript:/i);
    expect(html).not.toContain('//evil.example');
    expect(html).toContain('<a>tab</a>');
    expect(html).toContain('<a>proto</a>');
  });

  it('fails closed in sanitizeHtmlFragment and markdownToHtml when DOMPurify.sanitize is unavailable', () => {
    const purifyRecord = DOMPurify as unknown as { sanitize?: typeof DOMPurify.sanitize };
    const originalSanitize = purifyRecord.sanitize;
    purifyRecord.sanitize = undefined;

    try {
      const fragment = sanitizeHtmlFragment(
        '<script>alert(1)</script><img src=x onerror=alert(2)>',
      );
      expect(fragment).not.toMatch(/<script/i);
      expect(fragment).not.toMatch(/<img/i);
      expect(fragment).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
      expect(fragment).toContain('&lt;img src=x onerror=alert(2)&gt;');

      const rendered = markdownToHtml('# Heading\n\n<script>alert(1)</script>');
      expect(rendered).toContain('<h1>Heading</h1>');
      expect(rendered).not.toMatch(/<script/i);
      expect(rendered).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    } finally {
      purifyRecord.sanitize = originalSanitize;
    }
  });
});
