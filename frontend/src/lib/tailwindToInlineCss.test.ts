import { describe, it, expect } from 'vitest';
import { convertTailwindToInlineCss } from './tailwindToInlineCss';

describe('tailwindToInlineCss', () => {
  it('converts Tailwind class names to inline CSS styles', () => {
    const html = '<div class="p-4 bg-white text-center font-bold">Hello Email</div>';
    const inline = convertTailwindToInlineCss(html);
    expect(inline).toContain('padding: 16px;');
    expect(inline).toContain('background-color: #ffffff;');
    expect(inline).toContain('text-align: center;');
    expect(inline).toContain('font-weight: 700;');
  });
});
