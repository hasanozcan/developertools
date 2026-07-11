import DOMPurify from 'dompurify';
import { marked } from 'marked';

const FORBIDDEN_TAGS = [
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
  'select',
  'style',
  'textarea',
];

export function renderSafeMarkdown(markdown: string): string {
  const parsed = marked.parse(markdown, {
    async: false,
    breaks: true,
    gfm: true,
  });

  if (typeof parsed !== 'string') {
    throw new Error('Asynchronous Markdown rendering is not supported');
  }

  return DOMPurify.sanitize(parsed, {
    FORBID_ATTR: ['style'],
    FORBID_TAGS: FORBIDDEN_TAGS,
    USE_PROFILES: { html: true },
  });
}
