import DOMPurify from 'dompurify';

export interface SvgDimensions {
  width: number;
  height: number;
}

export function parseSvgDimensions(svgContent: string): SvgDimensions {
  const widthMatch = svgContent.match(/\bwidth\s*=\s*["']?([\d.]+)(px)?["']?/i);
  const heightMatch = svgContent.match(/\bheight\s*=\s*["']?([\d.]+)(px)?["']?/i);
  const viewBoxMatch = svgContent.match(
    /\bviewBox\s*=\s*["']?[\d.]+[\s,]+[\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)["']?/i,
  );

  let width = 300;
  let height = 150;

  if (widthMatch) width = parseFloat(widthMatch[1]);
  if (heightMatch) height = parseFloat(heightMatch[1]);

  if ((!widthMatch || !heightMatch) && viewBoxMatch) {
    width = parseFloat(viewBoxMatch[1]);
    height = parseFloat(viewBoxMatch[2]);
  }

  return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
}

export function calculateExportDimensions(original: SvgDimensions, scale: number): SvgDimensions {
  const s = Math.max(0.1, scale);
  return {
    width: Math.max(1, Math.round(original.width * s)),
    height: Math.max(1, Math.round(original.height * s)),
  };
}

const DANGEROUS_SVG_TAGS =
  'script|foreignObject|iframe|object|embed|style|animate[a-z0-9_-]*|set|handler|listener';
const DANGEROUS_SVG_TAG_SELF_CLOSING_RE = new RegExp(
  `<(?:[a-z0-9_-]+:)?(?:${DANGEROUS_SVG_TAGS})\\b(?:[^>"']|"[^"]*"|'[^']*')*\\/>`,
  'gi',
);
const DANGEROUS_SVG_TAG_BLOCK_RE = new RegExp(
  `<(?:[a-z0-9_-]+:)?(${DANGEROUS_SVG_TAGS})\\b(?:[^>"']|"[^"]*"|'[^']*')*>[\\s\\S]*?<\\/(?:[a-z0-9_-]+:)?\\1\\s*>`,
  'gi',
);
const DANGEROUS_SVG_TAG_SINGLE_RE = new RegExp(
  `<(?:[a-z0-9_-]+:)?(?:${DANGEROUS_SVG_TAGS})\\b(?:[^>"']|"[^"]*"|'[^']*')*>`,
  'gi',
);
const SVG_TAG_RE = /<([a-zA-Z][a-zA-Z0-9:_-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
const SVG_ATTR_RE =
  /([a-zA-Z_:][a-zA-Z0-9:._-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`\/]+)))?/g;
const URL_ATTR_NAMES = new Set(['href', 'xlink:href', 'src', 'action', 'formaction']);
const SAFE_SVG_DATA_URI_RE = /^data:image\/(?:png|jpe?g|gif|webp);base64,/i;
const EXTERNAL_CSS_URL_RE = /url\(\s*['"]?\s*(?:https?:|\/\/)/i;
const CONTROL_OR_SPACE_RE = /[\u0000-\u0020\u007F]/g;

const DOMPURIFY_SVG_FORBID_TAGS = [
  'script',
  'foreignObject',
  'iframe',
  'object',
  'embed',
  'style',
  'animate',
  'set',
  'animateTransform',
  'animateMotion',
  'animateColor',
  'handler',
  'listener',
];

const DOMPURIFY_SVG_FORBID_ATTR = [
  'onload',
  'onerror',
  'onclick',
  'onmouseover',
  'onfocus',
  'onbegin',
  'onend',
  'onrepeat',
];

function decodeEntitiesForProtocolCheck(value: string): string {
  return value
    .replace(/&#(\d+);?/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&colon;/gi, ':')
    .replace(/&tab;?/gi, '\t')
    .replace(/&newline;?/gi, '\n');
}

function isUnsafeSvgUrl(value: string): boolean {
  const normalized = decodeEntitiesForProtocolCheck(value).replace(CONTROL_OR_SPACE_RE, '');
  if (/^(?:javascript|vbscript):/i.test(normalized)) {
    return true;
  }
  if (/^(?:https?:)?\/\//i.test(normalized)) {
    return true;
  }
  if (/^data:/i.test(normalized) && !SAFE_SVG_DATA_URI_RE.test(normalized)) {
    return true;
  }
  return false;
}

function isUnsafeSvgStyle(value: string): boolean {
  const normalized = decodeEntitiesForProtocolCheck(value).replace(CONTROL_OR_SPACE_RE, '');
  return (
    /(?:javascript|vbscript):|expression\(|data:text\/html|@import/i.test(normalized) ||
    EXTERNAL_CSS_URL_RE.test(normalized)
  );
}

function stripUnsafeSvgAttributes(tag: string, tagName: string, rawAttrs: string): string {
  const selfClosing = /\/\s*$/.test(rawAttrs);
  const attrSource = selfClosing ? rawAttrs.replace(/\/\s*$/, '') : rawAttrs;
  const keptAttrs: string[] = [];
  let removedAny = false;

  SVG_ATTR_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SVG_ATTR_RE.exec(attrSource)) !== null) {
    const attrName = match[1];
    const lowerName = attrName.toLowerCase();
    const attrValue = match[2] ?? match[3] ?? match[4] ?? '';

    if (lowerName.startsWith('on')) {
      removedAny = true;
      continue;
    }
    if (URL_ATTR_NAMES.has(lowerName) && isUnsafeSvgUrl(attrValue)) {
      removedAny = true;
      continue;
    }
    if (lowerName === 'style' && isUnsafeSvgStyle(attrValue)) {
      removedAny = true;
      continue;
    }
    if (
      !lowerName.startsWith('xmlns') &&
      EXTERNAL_CSS_URL_RE.test(
        decodeEntitiesForProtocolCheck(attrValue).replace(CONTROL_OR_SPACE_RE, ''),
      )
    ) {
      removedAny = true;
      continue;
    }

    keptAttrs.push(match[0]);
  }

  if (!removedAny) {
    return tag;
  }

  const attrsPart = keptAttrs.length > 0 ? ` ${keptAttrs.join(' ')}` : '';
  return `<${tagName}${attrsPart}${selfClosing ? ' /' : ''}>`;
}

export function sanitizeSvg(svg: string): string {
  let cleaned = svg;

  if (typeof DOMPurify?.sanitize === 'function') {
    cleaned = DOMPurify.sanitize(cleaned, {
      USE_PROFILES: { svg: true, svgFilters: true },
      FORBID_TAGS: DOMPURIFY_SVG_FORBID_TAGS,
      FORBID_ATTR: DOMPURIFY_SVG_FORBID_ATTR,
    });
  } else {
    let previous = '';
    while (cleaned !== previous) {
      previous = cleaned;
      cleaned = cleaned
        .replace(DANGEROUS_SVG_TAG_SELF_CLOSING_RE, '')
        .replace(DANGEROUS_SVG_TAG_BLOCK_RE, '')
        .replace(DANGEROUS_SVG_TAG_SINGLE_RE, '');
    }
  }

  cleaned = cleaned.replace(SVG_TAG_RE, (fullTag, tagName: string, rawAttrs: string) =>
    stripUnsafeSvgAttributes(fullTag, tagName, rawAttrs),
  );

  if (
    /<svg\b/i.test(cleaned) &&
    !cleaned.includes('xmlns="http://www.w3.org/2000/svg"') &&
    !cleaned.includes("xmlns='http://www.w3.org/2000/svg'")
  ) {
    cleaned = cleaned.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  return cleaned;
}
