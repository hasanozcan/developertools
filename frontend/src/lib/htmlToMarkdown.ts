import {
  escapeAttribute,
  escapeHtml,
  sanitizeHtmlFragment,
  sanitizeLinkUrl,
} from './markdownToHtml';

export function convertHtmlToMarkdown(html: string): string {
  if (!html.trim()) return '';

  let md = sanitizeHtmlFragment(html);
  // Strip any script/style blocks if running without DOMPurify (e.g. SSR)
  md = md.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
  md = md.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '');

  // Convert headers
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');

  // Convert bold / italic
  md = md.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');
  md = md.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*');

  // Convert links (reject unsafe protocols)
  md = md.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, (_, href, text) => {
    const safeUrl = sanitizeLinkUrl(href);
    return safeUrl ? `[${text}](${safeUrl})` : text;
  });

  // Convert code blocks and inline code
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\`\`\`\n$1\n\`\`\`\n\n');
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '\`$1\`');

  // Convert list items
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');

  // Convert paragraphs and line breaks
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, '');

  return md.trim();
}

export function convertMarkdownToHtml(md: string): string {
  if (!md.trim()) return '';

  const placeholders: string[] = [];
  const hold = (content: string) => {
    const token = `\u0000INLINE_${placeholders.length}\u0000`;
    placeholders.push(content);
    return token;
  };

  let html = md.replace(/\`([^\`]+)\`/gim, (_, code) => hold(`<code>${escapeHtml(code)}</code>`));

  if (typeof window === 'undefined') {
    html = escapeHtml(html);
  }

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, (_, text, url) => {
    const safeUrl = sanitizeLinkUrl(url);
    if (!safeUrl) {
      return `<a>${text}</a>`;
    }
    return `<a href="${escapeAttribute(safeUrl)}">${text}</a>`;
  });

  html = html.replace(/\u0000INLINE_(\d+)\u0000/g, (_, idx) => placeholders[Number(idx)] ?? '');

  return sanitizeHtmlFragment(html).trim();
}
