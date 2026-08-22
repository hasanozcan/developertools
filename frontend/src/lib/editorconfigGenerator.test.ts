import { describe, it, expect } from 'vitest';
import { generateEditorConfig } from './editorconfigGenerator';

describe('editorconfigGenerator', () => {
  it('generates standard .editorconfig file', () => {
    const config = generateEditorConfig(4, 'space');
    expect(config).toContain('root = true');
    expect(config).toContain('indent_size = 4');
  });
});
