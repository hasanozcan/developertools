import { describe, expect, it } from 'vitest';
import { jsonToXml } from './jsonToXml';

describe('jsonToXml', () => {
  it('converts basic json object to xml', () => {
    const json = { name: 'John Doe', age: 30, active: true };
    const xml = jsonToXml(json, { includeDeclaration: false, indent: 2 });
    expect(xml).toContain('<root>');
    expect(xml).toContain('<name>John Doe</name>');
    expect(xml).toContain('<age>30</age>');
    expect(xml).toContain('<active>true</active>');
    expect(xml).toContain('</root>');
  });

  it('handles attributes with prefix @', () => {
    const json = {
      user: {
        '@id': '101',
        name: 'Alice',
      },
    };
    const xml = jsonToXml(json, { includeDeclaration: false, rootName: 'users' });
    expect(xml).toContain('<user id="101">');
    expect(xml).toContain('<name>Alice</name>');
  });

  it('converts array of items', () => {
    const json = [{ id: 1 }, { id: 2 }];
    const xml = jsonToXml(json, { includeDeclaration: false, rootName: 'items', itemName: 'item' });
    expect(xml).toContain('<items>');
    expect(xml).toContain('<item>');
    expect(xml).toContain('<id>1</id>');
    expect(xml).toContain('<id>2</id>');
  });
});
