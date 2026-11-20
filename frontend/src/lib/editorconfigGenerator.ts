export type EditorConfigEndOfLine = 'lf' | 'crlf' | 'cr';
export type EditorConfigCharset = 'utf-8' | 'utf-8-bom' | 'utf-16be' | 'utf-16le' | 'latin1';

export interface EditorConfigOptions {
  indentSize?: number;
  indentStyle?: 'space' | 'tab';
  endOfLine?: EditorConfigEndOfLine;
  charset?: EditorConfigCharset;
  trimTrailingWhitespace?: boolean;
  insertFinalNewline?: boolean;
  root?: boolean;
  markdownKeepTrailingWhitespace?: boolean;
}

export function generateEditorConfig(
  indentSizeOrOptions: number | EditorConfigOptions = 2,
  indentStyle: 'space' | 'tab' = 'space',
  extraOptions: Omit<EditorConfigOptions, 'indentSize' | 'indentStyle'> = {},
): string {
  const opts: EditorConfigOptions =
    typeof indentSizeOrOptions === 'object'
      ? indentSizeOrOptions
      : { indentSize: indentSizeOrOptions, indentStyle, ...extraOptions };

  const style = opts.indentStyle ?? 'space';
  const size = Math.max(1, Math.min(16, Math.round(opts.indentSize ?? 2)));
  const eol = opts.endOfLine ?? 'lf';
  const charset = opts.charset ?? 'utf-8';
  const trimTrailing = opts.trimTrailingWhitespace ?? true;
  const finalNewline = opts.insertFinalNewline ?? true;
  const root = opts.root ?? true;
  const keepMdTrailing = opts.markdownKeepTrailingWhitespace ?? true;

  const lines = [
    '# http://editorconfig.org',
    `root = ${root}`,
    '',
    '[*]',
    `indent_style = ${style}`,
    style === 'tab' ? `tab_width = ${size}` : `indent_size = ${size}`,
    `end_of_line = ${eol}`,
    `charset = ${charset}`,
    `trim_trailing_whitespace = ${trimTrailing}`,
    `insert_final_newline = ${finalNewline}`,
  ];

  if (keepMdTrailing && trimTrailing) {
    lines.push('', '[*.md]', 'trim_trailing_whitespace = false');
  }

  return lines.join('\n');
}
