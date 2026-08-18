import { describe, it, expect } from 'vitest';
import { generateMarkdownTable, createEmptyTable } from './markdownTableGenerator';

describe('markdownTableGenerator', () => {
  it('should generate formatted markdown table with alignments', () => {
    const output = generateMarkdownTable({
      headers: ['Name', 'Role', 'Age'],
      alignments: ['left', 'center', 'right'],
      rows: [
        ['Alice', 'Engineer', '28'],
        ['Bob', 'Designer', '32'],
      ],
    });

    expect(output).toContain('| Name | Role | Age |');
    expect(output).toContain('| :--- | :---: | ---: |');
    expect(output).toContain('| Alice | Engineer | 28 |');
    expect(output).toContain('| Bob | Designer | 32 |');
  });

  it('should create default empty table structure', () => {
    const table = createEmptyTable(2, 2);
    expect(table.headers.length).toBe(2);
    expect(table.alignments.length).toBe(2);
    expect(table.rows.length).toBe(2);
  });
});
