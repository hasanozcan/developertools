import { describe, it, expect } from 'vitest';
import { markdownToHtml } from './markdownToHtml';

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
});
