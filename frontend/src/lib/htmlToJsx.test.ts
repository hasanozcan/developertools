import { describe, it, expect } from 'vitest';
import { convertHtmlToJsx } from './htmlToJsx';

describe('htmlToJsx', () => {
  it('should convert class and for attributes', () => {
    const html = '<label class="btn" for="input1">Label</label>';
    const jsx = convertHtmlToJsx(html);
    expect(jsx).toContain('className="btn"');
    expect(jsx).toContain('htmlFor="input1"');
  });

  it('should self-close void tags and convert style attributes', () => {
    const html = '<img src="pic.jpg" class="photo" style="width: 100px; margin-top: 10px">';
    const jsx = convertHtmlToJsx(html);
    expect(jsx).toContain('className="photo"');
    expect(jsx).toContain("style={{ width: '100px', marginTop: '10px' }}");
    expect(jsx).toContain('/>');
  });

  it('should wrap in a React function component', () => {
    const html = '<div>Hello</div>';
    const jsx = convertHtmlToJsx(html, { createFunctionComponent: true, componentName: 'Greeting' });
    expect(jsx).toContain('export default function Greeting()');
  });
});
