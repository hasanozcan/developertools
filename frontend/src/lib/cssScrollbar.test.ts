import { describe, it, expect } from 'vitest';
import { generateScrollbarCss, DEFAULT_SCROLLBAR } from './cssScrollbar';

describe('cssScrollbar', () => {
  it('should generate standard and webkit scrollbar CSS', () => {
    const css = generateScrollbarCss(DEFAULT_SCROLLBAR);
    expect(css).toContain('scrollbar-color: #6366f1 #1e293b;');
    expect(css).toContain('width: 10px;');
    expect(css).toContain('::-webkit-scrollbar-thumb:hover');
  });
});
