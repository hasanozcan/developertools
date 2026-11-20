import { describe, expect, it } from 'vitest';
import { generateEditorConfig } from './editorconfigGenerator';

describe('editorconfigGenerator', () => {
  it('generates standard .editorconfig file', () => {
    const config = generateEditorConfig(4, 'space');
    expect(config).toContain('root = true');
    expect(config).toContain('indent_style = space');
    expect(config).toContain('indent_size = 4');
    expect(config).toContain('end_of_line = lf');
    expect(config).toContain('charset = utf-8');
  });

  it('supports custom options and tab indentation', () => {
    const config = generateEditorConfig({
      indentStyle: 'tab',
      indentSize: 4,
      endOfLine: 'crlf',
      charset: 'utf-8-bom',
      trimTrailingWhitespace: false,
      insertFinalNewline: false,
    });
    expect(config).toContain('indent_style = tab');
    expect(config).toContain('tab_width = 4');
    expect(config).toContain('end_of_line = crlf');
    expect(config).toContain('charset = utf-8-bom');
    expect(config).toContain('trim_trailing_whitespace = false');
    expect(config).toContain('insert_final_newline = false');
  });
});
