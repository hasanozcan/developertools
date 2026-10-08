'use strict';

// This is a local source fix, not a maintainer-published braces release.
// Bound actual traversal before any recursive walker or parser cleanup runs.
const MAX_AST_DEPTH = 128;
const MAX_AST_VISITS = 65536;

const complexityError = reason => {
  const error = new SyntaxError(`Brace pattern exceeds structural limits: ${reason}`);
  error.code = 'ERR_BRACES_COMPLEXITY';
  return error;
};

const assertParserDepth = stackLength => {
  // The parser's root occupies one stack entry; a terminal child takes one
  // further AST edge. This admits 127 containers and at most 128 child edges.
  if (stackLength >= MAX_AST_DEPTH) {
    throw complexityError('nesting depth');
  }
};

const assertSafeOptions = options => {
  // fill-range and to-regex-range coerce these fields with Number/String.
  // Passive nested arrays can exhaust the stack during that coercion too.
  for (const key of ['step', 'rangeLimit', 'relaxZeros', 'shorthand', 'capture', 'wrap']) {
    const value = options && options[key];
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      throw complexityError('non-primitive range option');
    }
  }
};

const assertSafeAst = ast => {
  const active = new WeakSet();
  const pending = [{ node: ast, depth: 0, leaving: false }];
  let visits = 0;
  let scheduled = 1;

  while (pending.length > 0) {
    const frame = pending.pop();
    const { node, depth, leaving } = frame;
    if (leaving) {
      active.delete(node);
      continue;
    }
    scheduled--;
    if (node === null || typeof node !== 'object' || Array.isArray(node)) {
      throw complexityError('invalid AST node');
    }
    if (depth > MAX_AST_DEPTH || ++visits > MAX_AST_VISITS) {
      throw complexityError('AST depth or visit count');
    }
    if (active.has(node)) {
      throw complexityError('child cycle');
    }
    if (node.value !== undefined && typeof node.value !== 'string') {
      throw complexityError('non-string AST value');
    }
    // These counters are coerced by the upstream walkers. Nested JSON arrays
    // would recurse during numeric coercion even in a shallow child tree.
    for (const key of ['commas', 'ranges']) {
      if (node[key] !== undefined && typeof node[key] !== 'number') {
        throw complexityError('non-numeric AST counter');
      }
    }
    if (node.nodes !== undefined && !Array.isArray(node.nodes)) {
      throw complexityError('invalid AST children');
    }
    active.add(node);
    pending.push({ node, depth, leaving: true });
    if (node.nodes) {
      // Count scheduled edges too: a broad caller-created AST must not allocate
      // an unbounded pending queue before the visit limit is reached.
      if (node.nodes.length > MAX_AST_VISITS - visits - scheduled) {
        throw complexityError('AST visit count');
      }
      scheduled += node.nodes.length;
      for (let index = node.nodes.length - 1; index >= 0; index--) {
        pending.push({ node: node.nodes[index], depth: depth + 1, leaving: false });
      }
    }
  }
};

module.exports = { assertParserDepth, assertSafeOptions, assertSafeAst, MAX_AST_DEPTH, MAX_AST_VISITS };
