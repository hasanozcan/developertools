import { describe, it, expect } from 'vitest';
import { convertHtmlToMarkdown, convertMarkdownToHtml } from './htmlToMarkdown';

describe('htmlToMarkdown', () => {
  it('converts HTML elements to markdown', () => {
    const html = '<h1>Title</h1><p>Hello <strong>World</strong> with <a href="https://example.com">link</a></p>';
    const md = convertHtmlToMarkdown(html);
    expect(md).toContain('# Title');
    expect(md).toContain('Hello **World** with [link](https://example.com)');
  });

  it('converts markdown to basic HTML', () => {
    const md = '# Title\n**Bold** text';
    const html = convertMarkdownToHtml(md);
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<strong>Bold</strong>');
  });

  it('sanitizes XSS payloads and unsafe URLs in both conversion directions', () => {
    const md = convertHtmlToMarkdown(
      '<p>Hello</p><script>alert(1)</script><a href="javascript:alert(2)">click</a>',
    );
    expect(md).not.toContain('alert(1)');
    expect(md).not.toMatch(/javascript:/i);
    expect(md).toContain('click');

    const html = convertMarkdownToHtml(
      '<script>alert(1)</script><img src="x" onerror="alert(2)">\n[xss](javascript:alert(3))\n[vb](vbscript:msgbox(4))\n[data](data:text/html,<script>alert(5)</script>)',
    );
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/onerror\s*=/i);
    expect(html).not.toMatch(/javascript:/i);
    expect(html).not.toMatch(/vbscript:/i);
    expect(html).not.toMatch(/data:text\/html/i);
  });
});
