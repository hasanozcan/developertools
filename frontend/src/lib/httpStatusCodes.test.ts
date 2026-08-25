import { describe, expect, it } from 'vitest';
import { lookupHttpStatusCode, HTTP_STATUS_LIST } from './httpStatusCodes';

describe('httpStatusCodes', () => {
  it('finds code by number or text', () => {
    expect(lookupHttpStatusCode('404')[0].phrase).toBe('Not Found');
    expect(lookupHttpStatusCode('Unauthorized')[0].code).toBe(401);
  });
});
