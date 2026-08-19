export function xmlToJson(xmlString: string): Record<string, unknown> {
  const trimmed = xmlString.trim();
  if (!trimmed) throw new Error('XML input cannot be empty');

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(trimmed, 'text/xml');

  const parserError = xmlDoc.getElementsByTagName('parsererror');
  if (parserError.length > 0) {
    throw new Error(parserError[0].textContent || 'Invalid XML structure');
  }

  return domNodeToObject(xmlDoc.documentElement);
}

function domNodeToObject(node: Element): Record<string, unknown> {
  const obj: Record<string, unknown> = {};

  // Parse element attributes
  if (node.attributes.length > 0) {
    const attrs: Record<string, string> = {};
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      attrs[`@${attr.name}`] = attr.value;
    }
    Object.assign(obj, attrs);
  }

  // Parse child nodes
  const children = node.childNodes;
  let hasElementChildren = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (child.nodeType === 1) {
      // Element Node
      hasElementChildren = true;
      const childElement = child as Element;
      const nodeName = childElement.nodeName;
      const childData = domNodeToObject(childElement);

      if (obj[nodeName] !== undefined) {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName]];
        }
        (obj[nodeName] as unknown[]).push(childData);
      } else {
        obj[nodeName] = childData;
      }
    } else if (child.nodeType === 3) {
      // Text Node
      const text = child.nodeValue?.trim();
      if (text) {
        if (hasElementChildren || Object.keys(obj).length > 0) {
          obj['#text'] = parseValue(text);
        } else {
          return parseValue(text) as unknown as Record<string, unknown>;
        }
      }
    }
  }

  return obj;
}

function parseValue(val: string): unknown {
  if (val.toLowerCase() === 'true') return true;
  if (val.toLowerCase() === 'false') return false;
  if (val.toLowerCase() === 'null') return null;
  const num = Number(val);
  if (!isNaN(num) && val.trim() !== '') return num;
  return val;
}

export function jsonToXml(jsonObj: unknown, rootName: string = 'root', indent: number = 2): string {
  if (jsonObj === null || jsonObj === undefined) return `<${rootName}/>`;

  function toXml(data: unknown, name: string, level: number): string {
    const sp = ' '.repeat(level * indent);
    if (typeof data !== 'object' || data === null) {
      return `${sp}<${name}>${escapeXml(String(data))}</${name}>`;
    }

    if (Array.isArray(data)) {
      return data.map((item) => toXml(item, name, level)).join('\n');
    }

    const entries = Object.entries(data as Record<string, unknown>);
    const attrs = entries
      .filter(([k]) => k.startsWith('@'))
      .map(([k, v]) => ` ${k.slice(1)}="${escapeXml(String(v))}"`)
      .join('');

    const children = entries
      .filter(([k]) => !k.startsWith('@') && k !== '#text')
      .map(([k, v]) => toXml(v, k, level + 1))
      .join('\n');

    const textContent = (data as Record<string, unknown>)['#text'];

    if (!children && textContent !== undefined) {
      return `${sp}<${name}${attrs}>${escapeXml(String(textContent))}</${name}>`;
    }

    if (!children && !textContent) {
      return `${sp}<${name}${attrs}/>`;
    }

    return `${sp}<${name}${attrs}>\n${children}\n${sp}</${name}>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(jsonObj, rootName, 0)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
