export interface JavaScriptMinifyOptions {
  removeComments: boolean;
  removeConsole: boolean;
  removeDebugger: boolean;
  shortenBooleans: boolean;
}

export interface CssMinifyOptions {
  removeComments: boolean;
}

export async function minifyJavaScript(
  source: string,
  options: JavaScriptMinifyOptions,
): Promise<string> {
  if (!source.trim()) return '';

  const { minify } = await import('terser');
  const result = await minify(source, {
    compress: {
      booleans: options.shortenBooleans,
      drop_console: options.removeConsole,
      drop_debugger: options.removeDebugger,
    },
    format: {
      comments: options.removeComments ? false : 'all',
    },
    mangle: false,
  });

  if (typeof result.code !== 'string') {
    throw new Error('JavaScript minification did not produce output.');
  }

  return result.code;
}

interface ProtectedCssComments {
  source: string;
  restore: (minified: string) => string;
}

function protectCssComments(source: string): ProtectedCssComments {
  let markerPrefix = '__DEVSTOOLS_PRESERVED_COMMENT_';
  while (source.includes(markerPrefix)) markerPrefix += '_';

  const comments: string[] = [];
  let protectedSource = '';
  let quote: '"' | "'" | null = null;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (quote) {
      protectedSource += character;
      if (character === '\\' && nextCharacter !== undefined) {
        protectedSource += nextCharacter;
        index += 1;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      protectedSource += character;
      continue;
    }

    if (character === '/' && nextCharacter === '*') {
      const commentEnd = source.indexOf('*/', index + 2);
      if (commentEnd === -1) throw new Error('CSS contains an unterminated comment.');

      const commentIndex = comments.length;
      comments.push(source.slice(index, commentEnd + 2));
      protectedSource += `/*!${markerPrefix}${commentIndex}__*/`;
      index = commentEnd + 1;
      continue;
    }

    protectedSource += character;
  }

  return {
    source: protectedSource,
    restore: (minified) =>
      minified.replace(
        new RegExp(`/\\*!${markerPrefix}(\\d+)__\\*/`, 'g'),
        (_match, rawIndex: string) => comments[Number(rawIndex)] ?? '',
      ),
  };
}

export async function minifyStylesheet(source: string, options: CssMinifyOptions): Promise<string> {
  if (!source.trim()) return '';

  const { minify } = await import('csso');
  const protectedComments = options.removeComments ? null : protectCssComments(source);
  const input = protectedComments?.source ?? source;
  const result = minify(input, {
    comments: options.removeComments ? false : true,
    restructure: false,
  }).css;

  return protectedComments ? protectedComments.restore(result) : result;
}
