import { describe, it, expect } from 'vitest';
import { parseKeyboardEvent, getLocationDescription } from './keyCodeInfo';

describe('keyCodeInfo', () => {
  it('should describe locations properly', () => {
    expect(getLocationDescription(0)).toBe('Standard / General');
    expect(getLocationDescription(1)).toContain('Left side');
    expect(getLocationDescription(3)).toBe('Numpad');
  });

  it('should parse standard keyboard event object', () => {
    const fakeEvent = {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      location: 0,
      ctrlKey: false,
      shiftKey: true,
      altKey: false,
      metaKey: false,
    } as unknown as KeyboardEvent;

    const info = parseKeyboardEvent(fakeEvent);
    expect(info.key).toBe('Enter');
    expect(info.keyCode).toBe(13);
    expect(info.shiftKey).toBe(true);
  });
});
