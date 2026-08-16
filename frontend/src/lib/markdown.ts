import DOMPurify from 'dompurify';
import { marked } from 'marked';

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

export interface MarkdownRenderOptions {
  allowNetworkImages?: boolean;
  blockedImageLabel?: string;
}

const LOCAL_IMAGE_SOURCE = /^data:image\/(?:png|jpe?g|gif|webp|avif)(?:;[^,]*)?,/i;

function applyImagePolicy(html: string, options: MarkdownRenderOptions): string {
  if (typeof document === 'undefined') return html;

  const template = document.createElement('template');
  template.innerHTML = html;

  for (const image of template.content.querySelectorAll('img')) {
    const src = image.getAttribute('src')?.trim() ?? '';
    const srcSet = image.getAttribute('srcset')?.trim() ?? '';
    const isLocalSource = !srcSet && (LOCAL_IMAGE_SOURCE.test(src) || src.startsWith('blob:'));

    if (!options.allowNetworkImages && (srcSet || (src && !isLocalSource))) {
      const placeholder = document.createElement('span');
      const alt = image.getAttribute('alt')?.trim();
      placeholder.className = 'markdown-image-blocked';
      placeholder.dataset.blockedImage = 'true';
      placeholder.setAttribute('role', 'note');
      placeholder.textContent = `${options.blockedImageLabel ?? 'Linked image blocked'}${
        alt ? `: ${alt}` : ''
      }`;
      image.replaceWith(placeholder);
      continue;
    }

    image.setAttribute('loading', 'lazy');
    image.setAttribute('decoding', 'async');
    image.setAttribute('referrerpolicy', 'no-referrer');
  }

  return template.innerHTML;
}

export function renderSafeMarkdown(
  markdown: string,
  options: MarkdownRenderOptions = {},
): string {
  const parsed = marked.parse(markdown, {
    async: false,
    breaks: true,
    gfm: true,
  });

  if (typeof parsed !== 'string') {
    throw new Error('Asynchronous Markdown rendering is not supported');
  }

  const sanitized = DOMPurify.sanitize(parsed, {
    FORBID_ATTR: ['style'],
    FORBID_TAGS: FORBIDDEN_TAGS,
    USE_PROFILES: { html: true },
  });

  return applyImagePolicy(sanitized, options);
}
