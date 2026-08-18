import { describe, it, expect } from 'vitest';
import { generateMockData } from './mockData';

describe('mockData generator', () => {
  it('generates specified number of user records', () => {
    const data = generateMockData('users', 5);
    expect(data.length).toBe(5);
    expect(data[0]).toHaveProperty('firstName');
    expect(data[0]).toHaveProperty('email');
    expect(data[0]).toHaveProperty('role');
  });

  it('generates products with valid prices and ratings', () => {
    const products = generateMockData('products', 3);
    expect(products.length).toBe(3);
    expect(products[0].price).toBeGreaterThan(0);
    expect(products[0].rating).toBeGreaterThanOrEqual(1);
  });

  it('generates orders with currencies and statuses', () => {
    const orders = generateMockData('orders', 4);
    expect(orders.length).toBe(4);
    expect(orders[0]).toHaveProperty('total');
    expect(orders[0].currency).toBe('USD');
  });
});
