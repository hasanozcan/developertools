import DOMPurify from 'dompurify';

const FORBIDDEN_TAGS = [
  'audio',
  'base',
  'button',
  'embed',
  'form',
  'iframe',
  'input',
  'link',
  'meta',
  'object',
  'option',
  'picture',
  'select',
  'source',
  'style',
  'textarea',
  'track',
  'video',
];

const SAFE_DATA_IMAGE_RE = /^data:image\/(?:png|jpe?g|gif|webp|avif)(?:;[^,]*)?,/i;
const CONTROL_OR_SPACE_RE = /[\u0000-\u0020\u007F]/g;

function decodeHtmlEntitiesForScheme(value: string): string {
  return value
    .replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&colon;/gi, ':');
}

export function sanitizeLinkUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  const normalized = decodeHtmlEntitiesForScheme(trimmed).replace(CONTROL_OR_SPACE_RE, '');
  const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(normalized);
  if (!schemeMatch) return trimmed;
  const scheme = schemeMatch[1].toLowerCase();
  if (scheme === 'http' || scheme === 'https' || scheme === 'mailto' || scheme === 'tel') {
    return trimmed;
  }
  return null;
}

export function sanitizeImageUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  const normalized = decodeHtmlEntitiesForScheme(trimmed).replace(CONTROL_OR_SPACE_RE, '');
  const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(normalized);
  if (!schemeMatch) return trimmed;
  const scheme = schemeMatch[1].toLowerCase();
  if (scheme === 'http' || scheme === 'https' || scheme === 'blob') {
    return trimmed;
  }
  if (scheme === 'data' && SAFE_DATA_IMAGE_RE.test(normalized)) {
    return trimmed;
  }
  return null;
}

export function sanitizeHtmlFragment(html: string): string {
  if (typeof DOMPurify?.sanitize === 'function') {
    return DOMPurify.sanitize(html, {
      FORBID_ATTR: ['style'],
      FORBID_TAGS: FORBIDDEN_TAGS,
      USE_PROFILES: { html: true },
    });
  }
  return html;
}

function escapeRawHtmlOutsideBlockquotes(input: string): string {
  return input
    .split('\n')
    .map((line) => {
      if (/^>\s?/.test(line)) {
        return '> ' + escapeHtml(line.replace(/^>\s?/, ''));
      }
      return escapeHtml(line);
    })
    .join('\n');
}

export function markdownToHtml(markdown: string): string {
  if (!markdown.trim()) return '';

  const placeholders: string[] = [];
  const hold = (content: string) => {
    const token = `\u0000CODEBLOCK_${placeholders.length}\u0000`;
    placeholders.push(content);
    return token;
  };

  let html = markdown;

  // Code blocks ```lang ... ```
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const safeLang = /^[a-zA-Z0-9_-]+$/.test(lang) ? lang : 'text';
    const safeCode = escapeHtml(code.trim());
    return hold(`<pre><code class="language-${safeLang}">${safeCode}</code></pre>`);
  });

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, (_, code) => hold(`<code>${escapeHtml(code)}</code>`));

  // When DOMPurify is unavailable (SSR), escape raw HTML up front so no unsafe tags survive.
  if (typeof DOMPurify?.sanitize !== 'function') {
    html = escapeRawHtmlOutsideBlockquotes(html);
  }

  // Headings
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.*?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
    const safeUrl = sanitizeImageUrl(url);
    if (!safeUrl) {
      return escapeAttribute(alt);
    }
    return `<img src="${escapeAttribute(safeUrl)}" alt="${escapeAttribute(alt)}" />`;
  });

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    const safeUrl = sanitizeLinkUrl(url);
    if (!safeUrl) {
      return `<a>${text}</a>`;
    }
    return `<a href="${escapeAttribute(safeUrl)}">${text}</a>`;
  });

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr />');

  // Lists
  html = html.replace(/^\s*[-*+]\s+(.*$)/gim, '<ul>\n  <li>$1</li>\n</ul>');
  html = html.replace(/<\/ul>\n<ul>/g, '');

  // Restore code placeholders before wrapping/sanitizing
  html = html.replace(/\u0000CODEBLOCK_(\d+)\u0000/g, (_, idx) => placeholders[Number(idx)] ?? '');

  // Wrap remaining text blocks in <p>
  const lines = html.split('\n\n');
  const wrapped = lines.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<hr')
    ) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return sanitizeHtmlFragment(wrapped.filter(Boolean).join('\n\n'));
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function escapeAttribute(str: string): string {
  return escapeHtml(str)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
