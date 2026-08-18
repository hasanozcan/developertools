import { describe, it, expect } from 'vitest';
import { htmlToMarkdown } from './htmlToMarkdown';

describe('htmlToMarkdown', () => {
  it('should convert headings, bold, italic, and links', () => {
    const html = `<h1>Main Title</h1>
<p>This is <strong>bold</strong> and <em>italic</em>.</p>
<p><a href="https://example.com">My Link</a></p>`;

    const md = htmlToMarkdown(html);
    expect(md).toContain('# Main Title');
    expect(md).toContain('**bold**');
    expect(md).toContain('*italic*');
    expect(md).toContain('[My Link](https://example.com)');
  });

  it('should convert lists and blockquotes', () => {
    const html = `<blockquote>A famous quote</blockquote>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`;

    const md = htmlToMarkdown(html);
    expect(md).toContain('> A famous quote');
    expect(md).toContain('- Item 1');
    expect(md).toContain('- Item 2');
  });

  it('should return empty string for empty input', () => {
    expect(htmlToMarkdown('')).toBe('');
  });
});
