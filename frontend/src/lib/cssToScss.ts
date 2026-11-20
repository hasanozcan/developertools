interface ScssNode {
  selector: string;
  declarations: string[];
  children: Map<string, ScssNode>;
  order: Array<{ type: 'child'; key: string } | { type: 'raw'; text: string }>;
}

function createNode(selector: string): ScssNode {
  return {
    selector,
    declarations: [],
    children: new Map(),
    order: [],
  };
}

function stripComments(css: string): string {
  let out = '';
  let i = 0;
  let quote: string | null = null;

  while (i < css.length) {
    const ch = css[i];
    const next = css[i + 1];

    if (quote) {
      out += ch;
      if (ch === '\\' && next !== undefined) {
        out += next;
        i += 2;
        continue;
      }
      if (ch === quote) quote = null;
      i++;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      out += ch;
      i++;
      continue;
    }

    if (ch === '/' && next === '*') {
      const end = css.indexOf('*/', i + 2);
      if (end === -1) {
        throw new Error('Unclosed CSS comment (/* ... */).');
      }
      i = end + 2;
      continue;
    }

    out += ch;
    i++;
  }

  if (quote) {
    throw new Error('Unclosed string literal in CSS.');
  }

  return out;
}

function splitTopLevel(text: string, delimiter: string): string[] {
  const parts: string[] = [];
  let current = '';
  let quote: string | null = null;
  let parenDepth = 0;
  let bracketDepth = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      current += ch;
      if (ch === '\\' && i + 1 < text.length) {
        current += text[++i];
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }

    if (ch === '(') parenDepth++;
    else if (ch === ')' && parenDepth > 0) parenDepth--;
    else if (ch === '[') bracketDepth++;
    else if (ch === ']' && bracketDepth > 0) bracketDepth--;

    if (ch === delimiter && parenDepth === 0 && bracketDepth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }

  parts.push(current);
  return parts;
}

function tokenizeComplexSelector(selector: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = selector.trim();
  let pendingCombinator = '';

  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;

    if (s[i] === '>' || s[i] === '+' || s[i] === '~') {
      pendingCombinator = s[i];
      i++;
      continue;
    }

    let compound = '';
    let quote: string | null = null;
    let parenDepth = 0;
    let bracketDepth = 0;

    while (i < s.length) {
      const ch = s[i];
      if (quote) {
        compound += ch;
        if (ch === '\\' && i + 1 < s.length) {
          compound += s[++i];
        } else if (ch === quote) {
          quote = null;
        }
        i++;
        continue;
      }

      if (ch === '"' || ch === "'") {
        quote = ch;
        compound += ch;
        i++;
        continue;
      }

      if (ch === '(') parenDepth++;
      else if (ch === ')' && parenDepth > 0) parenDepth--;
      else if (ch === '[') bracketDepth++;
      else if (ch === ']' && bracketDepth > 0) bracketDepth--;

      if (
        parenDepth === 0 &&
        bracketDepth === 0 &&
        (/\s/.test(ch) || ch === '>' || ch === '+' || ch === '~')
      ) {
        break;
      }

      compound += ch;
      i++;
    }

    if (compound) {
      tokens.push(pendingCombinator ? `${pendingCombinator} ${compound}` : compound);
      pendingCombinator = '';
    }
  }

  return tokens;
}

function splitCompoundPseudo(token: string): string[] {
  let prefix = '';
  let body = token;
  if (/^[>+~]\s+/.test(token)) {
    prefix = token.slice(0, 2);
    body = token.slice(2);
  }

  const pseudoStarts: number[] = [];
  let quote: string | null = null;
  let parenDepth = 0;
  let bracketDepth = 0;

  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === '(') parenDepth++;
    else if (ch === ')' && parenDepth > 0) parenDepth--;
    else if (ch === '[') bracketDepth++;
    else if (ch === ']' && bracketDepth > 0) bracketDepth--;
    else if (ch === ':' && parenDepth === 0 && bracketDepth === 0) {
      if (i > 0 && body[i - 1] === ':') continue;
      pseudoStarts.push(i);
    }
  }

  if (pseudoStarts.length === 0) {
    return [token];
  }

  // If selector itself starts with ':' (e.g. ':root'), keep the root pseudo intact and split subsequent pseudos.
  const firstSplit = pseudoStarts[0] === 0 ? pseudoStarts[1] : pseudoStarts[0];
  if (firstSplit === undefined) {
    return [token];
  }

  const base = `${prefix}${body.slice(0, firstSplit)}`;
  const rest = body.slice(firstSplit);

  // Split chained pseudos (e.g. ':hover::before' -> ['&:hover', '&::before'])
  const parts: string[] = [base];
  const restIndices = pseudoStarts.filter((idx) => idx >= firstSplit);
  for (let k = 0; k < restIndices.length; k++) {
    const start = restIndices[k] - firstSplit;
    const end = k + 1 < restIndices.length ? restIndices[k + 1] - firstSplit : rest.length;
    parts.push(`&${rest.slice(start, end)}`);
  }

  return parts;
}

function segmentSelector(selector: string): string[] {
  const tokens = tokenizeComplexSelector(selector);
  return tokens.flatMap(splitCompoundPseudo);
}

function buildSelectorPaths(selectorListRaw: string): string[][] {
  const selectors = splitTopLevel(selectorListRaw, ',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (selectors.length === 0) return [];
  if (selectors.length === 1) return [segmentSelector(selectors[0])];

  const segmented = selectors.map(segmentSelector);
  const minLen = Math.min(...segmented.map((segs) => segs.length));

  let commonLen = 0;
  while (commonLen < minLen - 1) {
    const candidate = segmented[0][commonLen];
    if (segmented.every((segs) => segs[commonLen] === candidate)) {
      commonLen++;
    } else {
      break;
    }
  }

  if (commonLen > 0) {
    const prefix = segmented[0].slice(0, commonLen);
    const suffixes = segmented.map((segs) =>
      segs
        .slice(commonLen)
        .map((part, idx) => (idx > 0 && part.startsWith('&') ? part.slice(1) : part))
        .join(' ')
        .replace(/\s+&/g, ''),
    );
    return [[...prefix, suffixes.join(', ')]];
  }

  return [[selectors.join(', ')]];
}

function parseDeclarations(body: string): string[] {
  return splitTopLevel(body, ';')
    .map((decl) => decl.trim())
    .filter(Boolean)
    .map((decl) => (decl.endsWith(';') ? decl : `${decl};`));
}

function insertRule(root: ScssNode, path: string[], declarations: string[]) {
  let cursor = root;
  for (const segment of path) {
    let child = cursor.children.get(segment);
    if (!child) {
      child = createNode(segment);
      cursor.children.set(segment, child);
      cursor.order.push({ type: 'child', key: segment });
    }
    cursor = child;
  }
  cursor.declarations.push(...declarations);
}

function parseBlock(css: string, root: ScssNode): void {
  let i = 0;
  const len = css.length;

  while (i < len) {
    while (i < len && /\s/.test(css[i])) i++;
    if (i >= len) break;

    if (css[i] === '}') {
      throw new Error('Unexpected closing brace "}" in CSS.');
    }

    let header = '';
    let quote: string | null = null;
    let foundOpenBrace = false;
    let foundSemicolon = false;

    while (i < len) {
      const ch = css[i];
      if (quote) {
        header += ch;
        if (ch === '\\' && i + 1 < len) {
          header += css[++i];
        } else if (ch === quote) {
          quote = null;
        }
        i++;
        continue;
      }

      if (ch === '"' || ch === "'") {
        quote = ch;
        header += ch;
        i++;
        continue;
      }

      if (ch === '{') {
        foundOpenBrace = true;
        i++;
        break;
      }

      if (ch === ';' && header.trim().startsWith('@')) {
        foundSemicolon = true;
        i++;
        break;
      }

      if (ch === '}') {
        throw new Error(`Unexpected closing brace "}" near "${header.trim()}".`);
      }

      header += ch;
      i++;
    }

    const trimmedHeader = header.trim();

    if (foundSemicolon) {
      if (trimmedHeader) {
        root.order.push({ type: 'raw', text: `${trimmedHeader};` });
      }
      continue;
    }

    if (!foundOpenBrace) {
      if (trimmedHeader) {
        throw new Error(`Missing "{" for rule "${trimmedHeader}".`);
      }
      break;
    }

    // Extract balanced brace body
    let depth = 1;
    let body = '';
    quote = null;

    while (i < len && depth > 0) {
      const ch = css[i];
      if (quote) {
        body += ch;
        if (ch === '\\' && i + 1 < len) {
          body += css[++i];
        } else if (ch === quote) {
          quote = null;
        }
        i++;
        continue;
      }

      if (ch === '"' || ch === "'") {
        quote = ch;
        body += ch;
        i++;
        continue;
      }

      if (ch === '{') depth++;
      else if (ch === '}') depth--;

      if (depth > 0) {
        body += ch;
      }
      i++;
    }

    if (depth !== 0) {
      throw new Error(`Unclosed block "{" for "${trimmedHeader}".`);
    }

    if (!trimmedHeader) {
      throw new Error('Empty selector before "{".');
    }

    if (trimmedHeader.startsWith('@')) {
      const lower = trimmedHeader.toLowerCase();
      if (
        lower.startsWith('@keyframes') ||
        lower.startsWith('@-webkit-keyframes') ||
        lower.startsWith('@font-face') ||
        lower.startsWith('@page')
      ) {
        const formattedInner = body
          .trim()
          .split('\n')
          .map((line) => `  ${line.trim()}`)
          .join('\n');
        root.order.push({
          type: 'raw',
          text: formattedInner ? `${trimmedHeader} {\n${formattedInner}\n}` : `${trimmedHeader} {}`,
        });
      } else {
        const nestedRoot = createNode(trimmedHeader);
        parseBlock(body, nestedRoot);
        const childKey = `__at__${root.order.length}_${trimmedHeader}`;
        root.children.set(childKey, nestedRoot);
        root.order.push({ type: 'child', key: childKey });
      }
      continue;
    }

    const declarations = parseDeclarations(body);
    const paths = buildSelectorPaths(trimmedHeader);
    for (const path of paths) {
      insertRule(root, path, declarations);
    }
  }
}

function emitNode(node: ScssNode, indentLevel: number): string {
  const indent = '  '.repeat(indentLevel);
  const innerIndent = '  '.repeat(indentLevel + 1);
  const lines: string[] = [`${indent}${node.selector} {`];

  for (const decl of node.declarations) {
    lines.push(`${innerIndent}${decl}`);
  }

  for (const item of node.order) {
    if (item.type === 'raw') {
      const rawLines = item.text.split('\n').map((l) => `${innerIndent}${l}`);
      lines.push(...rawLines);
    } else {
      const child = node.children.get(item.key);
      if (child) {
        lines.push(emitNode(child, indentLevel + 1));
      }
    }
  }

  lines.push(`${indent}}`);
  return lines.join('\n');
}

export function convertCssToScss(css: string): string {
  const clean = stripComments(css || '').trim();
  if (!clean) return '';

  const root = createNode('');
  parseBlock(clean, root);

  const chunks: string[] = [];
  for (const item of root.order) {
    if (item.type === 'raw') {
      chunks.push(item.text);
    } else {
      const child = root.children.get(item.key);
      if (child) {
        chunks.push(emitNode(child, 0));
      }
    }
  }

  return chunks.join('\n\n');
}
