import { describe, it, expect } from 'vitest';
import { xmlToJson, jsonToXml } from './xmlToJson';

describe('xmlToJson', () => {
  it('should convert valid XML to JSON object', () => {
    const xml = `<user id="42"><name>Alice</name><active>true</active><age>30</age></user>`;
    const json = xmlToJson(xml);

    expect(json['@id']).toBe('42');
    expect(json.name).toBe('Alice');
    expect(json.active).toBe(true);
    expect(json.age).toBe(30);
  });

  it('should convert JSON object to valid XML', () => {
    const obj = {
      '@id': '101',
      name: 'Bob',
      role: 'Admin',
    };
    const xml = jsonToXml(obj, 'account');

    expect(xml).toContain('<account id="101">');
    expect(xml).toContain('<name>Bob</name>');
    expect(xml).toContain('<role>Admin</role>');
    expect(xml).toContain('</account>');
  });

  it('should throw error for empty or invalid XML', () => {
    expect(() => xmlToJson('')).toThrow();
  });
});
