import { describe, it, expect } from 'vitest';
import { searchRnIcons } from './reactNativeIconFinder';

describe('reactNativeIconFinder', () => {
  it('filters React Native vector icons by keyword', () => {
    const res = searchRnIcons('home');
    expect(res.some((i) => i.name === 'home')).toBe(true);
  });
});
