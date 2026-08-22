import { describe, it, expect } from 'vitest';
import { parseMongoObjectId } from './mongodbObjectIdParser';

describe('mongodbObjectIdParser', () => {
  it('extracts timestamp and metadata from 24-character hex ObjectId', () => {
    const parsed = parseMongoObjectId('507f1f77bcf86cd799439011');
    expect(parsed.isValid).toBe(true);
    expect(parsed.timestamp?.getFullYear()).toBe(2012);
  });
});
