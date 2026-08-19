import { describe, it, expect } from 'vitest';
import { generateMacAddress } from './macAddress';

describe('macAddress', () => {
  it('should generate valid MAC addresses in colon format', () => {
    const mac = generateMacAddress({ format: 'colon', caseType: 'upper', isUnicast: true });
    expect(mac.length).toBe(17);
    expect(/^([0-9A-F]{2}:){5}[0-9A-F]{2}$/.test(mac)).toBe(true);
  });

  it('should generate Cisco dot notation format', () => {
    const mac = generateMacAddress({ format: 'cisco', caseType: 'lower', isUnicast: true });
    expect(/^([0-9a-f]{4}\.){2}[0-9a-f]{4}$/.test(mac)).toBe(true);
  });
});
