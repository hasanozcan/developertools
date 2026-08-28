import { describe, it, expect } from 'vitest';
import { convertHtmlToJsxTailwind } from './htmlToJsxTailwind';

describe('htmlToJsxTailwind', () => {
  it('converts html to jsx with className', () => {
    expect(convertHtmlToJsxTailwind('<div class="p-2"></div>')).toContain('className="p-2"');
  });
});
