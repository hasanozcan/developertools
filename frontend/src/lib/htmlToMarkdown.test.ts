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
});
