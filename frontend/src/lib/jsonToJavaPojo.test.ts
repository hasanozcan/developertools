import { describe, it, expect } from 'vitest';
import { jsonToJavaPojo } from './jsonToJavaPojo';

describe('jsonToJavaPojo', () => {
  it('converts JSON to Java Lombok @Data POJO class', () => {
    const json = JSON.stringify({ id: 10, name: 'Product A', price: 29.99 });
    const javaCode = jsonToJavaPojo(json, 'Product');
    expect(javaCode).toContain('@Data');
    expect(javaCode).toContain('public class Product {');
    expect(javaCode).toContain('private Long id;');
    expect(javaCode).toContain('private Double price;');
  });
});
