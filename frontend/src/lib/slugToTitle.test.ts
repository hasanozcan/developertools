import { describe, it, expect } from 'vitest';
import { slugToTitleCase, slugToPascalCase, slugToCamelCase } from './slugToTitle';

describe('slugToTitle', () => {
  it('should convert kebab-case slug to natural Title Case', () => {
    expect(slugToTitleCase('how-to-build-a-modern-web-app')).toBe('How to Build a Modern Web App');
    expect(slugToPascalCase('user_profile_data')).toBe('UserProfileData');
    expect(slugToCamelCase('user_profile_data')).toBe('userProfileData');
  });
});
