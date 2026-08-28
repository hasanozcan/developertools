import { describe, it, expect } from 'vitest';
import { convertJsxToHtml } from './jsxToHtml';

describe('jsxToHtml', () => {
  it('converts jsx to html', () => {
    expect(convertJsxToHtml('<div className="box"></div>')).toContain('class="box"');
  });
});
