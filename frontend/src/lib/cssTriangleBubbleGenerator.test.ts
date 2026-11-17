import { describe, it, expect } from 'vitest';
import {
  generateCssTriangle,
  getCssTriangleBubblePreviewStyles,
  sanitizeCssColor,
} from './cssTriangleBubbleGenerator';

describe('cssTriangleBubbleGenerator', () => {
  it('generates top-pointing CSS triangle', () => {
    const res = generateCssTriangle({ direction: 'top', size: 12, color: '#3b82f6', type: 'triangle' });
    expect(res.css).toContain('border-width: 0 12px 12px 12px');
    expect(res.css).toContain('#3b82f6');
  });

  it('generates speech bubble with pseudo-element tail', () => {
    const res = generateCssTriangle({ direction: 'bottom', size: 10, color: '#10b981', type: 'bubble' });
    expect(res.css).toContain('.speech-bubble::after');
    expect(res.css).toContain('border-top-color: #10b981');
  });

  it('sanitizes malicious CSS/HTML color payloads and allows valid CSS colors', () => {
    expect(sanitizeCssColor('#abc')).toBe('#abc');
    expect(sanitizeCssColor('#3b82f6')).toBe('#3b82f6');
    expect(sanitizeCssColor('#3b82f680')).toBe('#3b82f680');
    expect(sanitizeCssColor('rgb(59, 130, 246)')).toBe('rgb(59, 130, 246)');
    expect(sanitizeCssColor('hsl(217, 91%, 60%)')).toBe('hsl(217, 91%, 60%)');
    expect(sanitizeCssColor('crimson')).toBe('crimson');

    const malicious = 'red; } </style><img src=x onerror=alert(1)>';
    expect(sanitizeCssColor(malicious)).toBe('#4f46e5');
    expect(sanitizeCssColor('url(javascript:alert(1))')).toBe('#4f46e5');

    const res = generateCssTriangle({ direction: 'top', size: 12, color: malicious, type: 'bubble' });
    expect(res.css).not.toContain('</style>');
    expect(res.css).not.toContain('<img');
    expect(res.css).toContain('#4f46e5');

    const preview = getCssTriangleBubblePreviewStyles({
      direction: 'top',
      size: 12,
      color: malicious,
      type: 'bubble',
    });
    expect(preview.containerStyle.backgroundColor).toBe('#4f46e5');
    expect(preview.tailStyle?.borderColor).toBe('transparent transparent #4f46e5 transparent');
  });
});
