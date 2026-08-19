export interface HtmlToJsxOptions {
  createFunctionComponent?: boolean;
  componentName?: string;
}

export function convertHtmlToJsx(html: string, options: HtmlToJsxOptions = {}): string {
  let jsx = html.trim();
  if (!jsx) return '';

  // Replace class= with className=
  jsx = jsx.replace(/\bclass=(["'])/g, 'className=$1');

  // Replace for= with htmlFor=
  jsx = jsx.replace(/\bfor=(["'])/g, 'htmlFor=$1');

  // Replace SVG / HTML kebab-case attributes with camelCase
  const attributeMap: Record<string, string> = {
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus',
    'crossorigin': 'crossOrigin',
    'contenteditable': 'contentEditable',
    'spellcheck': 'spellCheck',
    'srcset': 'srcSet',
    'usemap': 'useMap',
    'enctype': 'encType',
    'frameborder': 'frameBorder',
    'marginheight': 'marginHeight',
    'marginwidth': 'marginWidth',
    'scrolling': 'scrolling',
    'allowfullscreen': 'allowFullScreen',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'clip-path': 'clipPath',
  };

  for (const [kebab, camel] of Object.entries(attributeMap)) {
    const reg = new RegExp(`\\b${kebab}=(["'])`, 'gi');
    jsx = jsx.replace(reg, `${camel}=$1`);
  }

  // Convert inline style="..." to style={{ ... }}
  jsx = jsx.replace(/\bstyle=["']([^"']+)["']/g, (_match, styleContent: string) => {
    const styleObj: Record<string, string> = {};
    const rules = styleContent.split(';').filter((r) => r.trim().length > 0);
    for (const rule of rules) {
      const colonIdx = rule.indexOf(':');
      if (colonIdx !== -1) {
        const prop = rule.slice(0, colonIdx).trim().replace(/-([a-z])/g, (_, g) => g.toUpperCase());
        const val = rule.slice(colonIdx + 1).trim();
        styleObj[prop] = val;
      }
    }
    const inner = Object.entries(styleObj)
      .map(([k, v]) => `${k}: '${v.replace(/'/g, "\\'")}'`)
      .join(', ');
    return `style={{ ${inner} }}`;
  });

  // Self-close tags that are unclosed in HTML (e.g. <input>, <img ...>, <br>, <hr>)
  const voidTags = ['input', 'img', 'br', 'hr', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'];
  for (const tag of voidTags) {
    const voidTagRegex = new RegExp(`<(${tag})(\\b[^>]*?)(?<!/)>`, 'gi');
    jsx = jsx.replace(voidTagRegex, '<$1$2 />');
  }

  if (options.createFunctionComponent) {
    const compName = options.componentName?.trim() || 'MyComponent';
    return `export default function ${compName}() {\n  return (\n    ${jsx.split('\n').join('\n    ')}\n  );\n}`;
  }

  return jsx;
}
