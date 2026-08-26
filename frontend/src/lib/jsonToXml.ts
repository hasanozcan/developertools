export interface JsonToXmlOptions {
  rootName?: string;
  itemName?: string;
  indent?: number;
  includeDeclaration?: boolean;
  attributePrefix?: string;
  selfClosingNull?: boolean;
}

export function jsonToXml(
  jsonInput: string | object,
  options: JsonToXmlOptions = {}
): string {
  const {
    rootName = 'root',
    itemName = 'item',
    indent = 2,
    includeDeclaration = true,
    attributePrefix = '@',
    selfClosingNull = true,
  } = options;

  let data: any;
  if (typeof jsonInput === 'string') {
    if (!jsonInput.trim()) {
      return '';
    }
    data = JSON.parse(jsonInput);
  } else {
    data = jsonInput;
  }

  function escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function sanitizeTagName(name: string): string {
    const clean = name.replace(/[^a-zA-Z0-9_\-]/g, '_');
    return /^[a-zA-Z_]/.test(clean) ? clean : `_${clean}`;
  }

  function buildXmlNode(value: any, tagName: string, depth: number): string {
    const spaces = ' '.repeat(depth * indent);

    if (value === null || value === undefined) {
      return selfClosingNull
        ? `${spaces}<${tagName}/>`
        : `${spaces}<${tagName}></${tagName}>`;
    }

    if (typeof value === 'boolean' || typeof value === 'number') {
      return `${spaces}<${tagName}>${value}</${tagName}>`;
    }

    if (typeof value === 'string') {
      return `${spaces}<${tagName}>${escapeXml(value)}</${tagName}>`;
    }

    if (Array.isArray(value)) {
      return value
        .map((item) => buildXmlNode(item, tagName, depth))
        .join('\n');
    }

    if (typeof value === 'object') {
      const attributes: string[] = [];
      const children: string[] = [];

      for (const [k, v] of Object.entries(value)) {
        if (k.startsWith(attributePrefix)) {
          const attrName = sanitizeTagName(k.slice(attributePrefix.length));
          attributes.push(`${attrName}="${escapeXml(String(v))}"`);
        } else {
          const childTagName = sanitizeTagName(k);
          if (Array.isArray(v)) {
            v.forEach((childItem) => {
              children.push(buildXmlNode(childItem, childTagName || itemName, depth + 1));
            });
          } else {
            children.push(buildXmlNode(v, childTagName, depth + 1));
          }
        }
      }

      const attrStr = attributes.length > 0 ? ` ${attributes.join(' ')}` : '';

      if (children.length === 0) {
        return `${spaces}<${tagName}${attrStr}/>`;
      }

      return `${spaces}<${tagName}${attrStr}>\n${children.join('\n')}\n${spaces}</${tagName}>`;
    }

    return `${spaces}<${tagName}>${escapeXml(String(value))}</${tagName}>`;
  }

  const decl = includeDeclaration ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '';
  const sanitizedRoot = sanitizeTagName(rootName);

  if (Array.isArray(data)) {
    const inner = data.map((item) => buildXmlNode(item, itemName, 1)).join('\n');
    return `${decl}<${sanitizedRoot}>\n${inner}\n</${sanitizedRoot}>`;
  }

  if (typeof data === 'object' && data !== null) {
    const inner = Object.entries(data)
      .map(([k, v]) => {
        if (Array.isArray(v)) {
          return v.map((item) => buildXmlNode(item, sanitizeTagName(k), 1)).join('\n');
        }
        return buildXmlNode(v, sanitizeTagName(k), 1);
      })
      .join('\n');
    return `${decl}<${sanitizedRoot}>\n${inner}\n</${sanitizedRoot}>`;
  }

  return `${decl}<${sanitizedRoot}>${escapeXml(String(data))}</${sanitizedRoot}>`;
}
