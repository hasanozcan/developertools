import { fireEvent, render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import SvgMinifierTool from './SvgMinifierTool';
import SvgOptimizerTool from './SvgOptimizerTool';
import SvgToPngConverterTool from './SvgToPngConverterTool';
import SvgToPngTool from './SvgToPngTool';
import SvgPlaceholderGeneratorTool from './SvgPlaceholderGeneratorTool';
import { generateSvgPlaceholder } from '@/lib/svgPlaceholder';

afterEach(cleanup);
const payload = '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><img xmlns="http://www.w3.org/1999/xhtml" src="data:image/png;base64,AA==" onerror="window.auditXss=1" /></foreignObject></svg>';

describe('SVG preview isolation', () => {
  it.each([
    ['minifier', SvgMinifierTool], ['optimizer', SvgOptimizerTool],
    ['converter', SvgToPngConverterTool], ['legacy converter', SvgToPngTool],
  ] as const)(
    'keeps untrusted markup out of the page DOM in %s', (_name, Tool) => {
      const { container } = render(<LanguageProvider><Tool /></LanguageProvider>);
      fireEvent.change(container.querySelector('textarea')!, { target: { value: payload } });
      expect(container.querySelector('img[onerror]')).toBeNull();
      expect(container.querySelector('foreignObject')).toBeNull();
      expect(container.querySelector('img[src^="data:image/svg+xml"]')).not.toBeNull();
    },
  );

  it('treats placeholder text and colors as text, including in downloaded SVG', () => {
    const { svg } = generateSvgPlaceholder({
      width: 100, height: 100,
      bgColor: 'red" onload="alert(1)', textColor: '#000',
      text: '</text><image onerror="alert(1)"/><text>',
    });
    const parsed = new DOMParser().parseFromString(svg, 'image/svg+xml');
    expect(parsed.querySelector('parsererror')).toBeNull();
    expect(parsed.querySelector('[onload], [onerror], image')).toBeNull();
    expect(parsed.querySelector('text')?.textContent).toBe('</text><image onerror="alert(1)"/><text>');
  });

  it('isolates the placeholder preview', () => {
    const { container } = render(<LanguageProvider><SvgPlaceholderGeneratorTool /></LanguageProvider>);
    expect(container.querySelector('img[src^="data:image/svg+xml"]')).not.toBeNull();
  });
});
