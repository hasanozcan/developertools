import { describe, expect, it } from 'vitest';
import { convertHtmlTable } from './htmlTableConverter';

describe('htmlTableConverter', () => {
  it('converts HTML table to Markdown, CSV, and JSON', () => {
    const html = '<table><tr><th>Name</th><th>Age</th></tr><tr><td>Alice</td><td>30</td></tr></table>';
    const res = convertHtmlTable(html);
    expect(res.markdown).toContain('| Name | Age |');
    expect(res.csv).toContain('"Alice","30"');
    expect(JSON.parse(res.json)[0].Name).toBe('Alice');
  });
});
