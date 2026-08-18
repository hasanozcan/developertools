import { describe, it, expect } from 'vitest';
import { csvToMarkdownTable, markdownTableToCsv } from './csvToMarkdown';

describe('csvToMarkdown table converter', () => {
  const sampleCsv = `Name, Age, Country\nAlice, 30, USA\nBob, 25, UK`;

  it('converts basic CSV to GitHub markdown table', () => {
    const md = csvToMarkdownTable(sampleCsv, { alignment: 'left' });
    expect(md).toContain('| Name');
    expect(md).toContain('| Alice');
    expect(md).toContain(':--');
  });

  it('supports center and right alignments', () => {
    const centerMd = csvToMarkdownTable(sampleCsv, { alignment: 'center' });
    expect(centerMd).toContain(':---:');
    const rightMd = csvToMarkdownTable(sampleCsv, { alignment: 'right' });
    expect(rightMd).toContain('---:');
  });

  it('converts markdown table back to CSV', () => {
    const md = `| Name | Age |\n| :--- | :--- |\n| Alice | 30 |`;
    const csv = markdownTableToCsv(md);
    expect(csv).toContain('Name,Age');
    expect(csv).toContain('Alice,30');
  });
});
